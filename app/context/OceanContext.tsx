"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { getContract } from "../utils/contract";

// 1. Declare the ethereum object on the window
declare global {
  interface Window {
    ethereum?: any;
  }
}

// 2. Define the strict interface for the Context
interface OceanContextType {
  wallet: string | null;
  balance: string;
  recipient: string;
  setRecipient: (val: string) => void;
  amount: string;
  setAmount: (val: string) => void;
  contract: any;
  blockReward: string;
  isPending: boolean;
  gasEstimate: string;
  connectWallet: () => Promise<void>;
  transferTokens: () => Promise<void>;
  updateBlockReward: () => Promise<void>;
}

const OceanContext = createContext<OceanContextType | undefined>(undefined);

export const OceanProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [contract, setContract] = useState<any>(null);
  const [blockReward, setBlockReward] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const [gasEstimate, setGasEstimate] = useState("0");

  const fetchGasEstimate = async () => {
    if (!contract || !recipient || !amount || !wallet || isNaN(Number(amount)) || Number(amount) <= 0) {
      setGasEstimate("0");
      return;
    }

    try {
      const amountWei = ethers.parseUnits(amount, 18);
      const estimate = await contract.transfer.estimateGas(recipient, amountWei);
      
      // Accessing provider safely via the contract runner
      const provider = contract.runner?.provider;
      if (!provider) return;

      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice || BigInt(0);
      
      const totalGasCost = estimate * gasPrice;
      setGasEstimate(ethers.formatEther(totalGasCost));
    } catch (err) {
      setGasEstimate("0");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchGasEstimate();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [amount, recipient, contract, wallet]);

  const loadContract = async (currentWallet: string) => {
    if (!currentWallet) return;
    try {
      const c = await getContract();
      setContract(c);

      const b = await c.balanceOf(currentWallet);
      setBalance(ethers.formatUnits(b, 18));

      const reward = await c.blockReward();
      setBlockReward(ethers.formatUnits(reward, 18));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contract data");
    }
  };

  const connectWallet = async (): Promise<void> => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast.error("MetaMask not detected");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWallet(accounts[0]);
    } catch (err: any) {
      if (err.code === 4001) {
        toast.error("Connection request rejected");
      } else {
        toast.error("Failed to connect to MetaMask");
      }
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setWallet(accounts[0]);
          }
        } catch (err) {
          console.error("Error checking connection:", err);
        }
      }
    };
    checkConnection();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet(null);
          setBalance("0");
          setBlockReward("0");
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  useEffect(() => {
    if (wallet) loadContract(wallet);
  }, [wallet]);

  const transferTokens = async (): Promise<void> => {
    if (!contract || !amount || !recipient) {
      toast.error("Missing fields");
      return;
    }
    
    setIsPending(true);
    const toastId = toast.loading("Confirming transaction...");
    try {
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18));
      await tx.wait(); 
      
      toast.success("Transfer confirmed!", { id: toastId });
      if (wallet) loadContract(wallet); 
    } catch (e: any) {
      toast.error(e.reason || "Transaction failed", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  const updateBlockReward = async (): Promise<void> => {
    if (!contract || !amount) return;
    try {
      const tx = await contract.setBlockReward(ethers.parseUnits(amount, 18));
      await tx.wait();
      toast.success("Block reward updated");
      if (wallet) loadContract(wallet);
    } catch (e: any) {
      toast.error(e.message || "Update failed");
    }
  };

  const value: OceanContextType = {
    wallet,
    balance,
    recipient,
    setRecipient,
    amount,
    setAmount,
    contract,
    blockReward,
    isPending,
    gasEstimate,
    connectWallet,
    transferTokens,
    updateBlockReward,
  };

  return <OceanContext.Provider value={value}>{children}</OceanContext.Provider>;
};

export const useOcean = () => {
  const context = useContext(OceanContext);
  if (context === undefined) {
    throw new Error("useOcean must be used within an OceanProvider");
  }
  return context;
};