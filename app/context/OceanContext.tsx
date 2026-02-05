"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
// Replace this with your actual contract utility/ABI import
import { getContract } from "../utils/contract";

// 1. Define the shape of your Context
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

// 2. Initialize with undefined (and handle in the hook) or null
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
    // Basic validation
    if (!contract || !recipient || !amount || !wallet || isNaN(Number(amount)) || Number(amount) <= 0) {
      setGasEstimate("0");
      return;
    }

    try {
      const amountWei = ethers.parseUnits(amount, 18);
      
      // Estimate gas units
      const estimate = await contract.transfer.estimateGas(recipient, amountWei);
      
      // Get gas price from the provider attached to the contract
      const feeData = await contract.runner.provider.getFeeData();
      const gasPrice = feeData.gasPrice || BigInt(0);
      
      const totalGasCost = estimate * gasPrice;
      setGasEstimate(ethers.formatEther(totalGasCost));
    } catch (err) {
      console.error("Gas estimation failed:", err);
      setGasEstimate("0");
    }
  };

  // Re-run estimate when inputs change (Debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchGasEstimate();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [amount, recipient, contract]);

  // Load contract + data for current wallet
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

  // Connect Wallet
  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      return toast.error("MetaMask not detected");
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
        console.error(err);
        toast.error("Failed to connect to MetaMask");
      }
    }
  };

  // Check for existing connection on mount
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

  // Watch for account changes
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

  // Load contract when wallet connects
  useEffect(() => {
    if (wallet) loadContract(wallet);
  }, [wallet]);

  // Actions
  const transferTokens = async () => {
    if (!contract || !amount || !recipient) return toast.error("Missing fields");
    
    setIsPending(true);
    const toastId = toast.loading("Confirming transaction...");
    try {
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18));
      await tx.wait(); 
      
      toast.success("Transfer confirmed!", { id: toastId });
      loadContract(wallet!); 
    } catch (e: any) {
      toast.error(e.reason || "Transaction failed", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  const updateBlockReward = async () => {
    if (!contract || !amount) return;
    try {
      const tx = await contract.setBlockReward(ethers.parseUnits(amount, 18));
      await tx.wait();
      toast.success("Block reward updated");
      loadContract(wallet!);
    } catch (e: any) {
      toast.error(e.message || "Update failed");
    }
  };

  const value = {
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

// 3. Custom hook with safety check
export const useOcean = () => {
  const context = useContext(OceanContext);
  if (context === undefined) {
    throw new Error("useOcean must be used within an OceanProvider");
  }
  return context;
};