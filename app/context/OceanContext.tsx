"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
// Replace this with your actual contract utility/ABI import
import { getContract } from "../utils/contract"; 

const OceanContext = createContext();

export const OceanProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState("0");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [contract, setContract] = useState(null);
  const [blockReward, setBlockReward] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const [gasEstimate, setGasEstimate] = useState("0");

  const fetchGasEstimate = async () => {
  if (!contract || !recipient || !amount || !wallet) return;

  try {
    // We estimate the gas for the transfer function
    const estimate = await contract.transfer.estimateGas(
      recipient,
      ethers.parseUnits(amount, 18)
    );
    
    // Get current gas price from the provider
    const feeData = await provider.getFeeData();
    const totalGasCost = estimate * feeData.gasPrice;

    setGasEstimate(ethers.formatEther(totalGasCost));
  } catch (err) {
    // If estimation fails (e.g., insufficient balance), we set to 0
    setGasEstimate("0");
  }
};

// Re-run estimate when inputs change
useEffect(() => {
  const timeoutId = setTimeout(() => {
    fetchGasEstimate();
  }, 500); // Debounce to avoid spamming the RPC
  return () => clearTimeout(timeoutId);
}, [amount, recipient]);

  // Load contract + data for current wallet
  const loadContract = async (currentWallet) => {
    if (!currentWallet) return;
    try {
      const c = await getContract();
      setContract(c);

      const b = await c.balanceOf(currentWallet);
      console.log('balance',ethers.formatUnits(b, 18));
      setBalance(ethers.formatUnits(b, 18));

      const reward = await c.blockReward();
      setBlockReward(ethers.formatUnits(reward, 18));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contract");
    }
  };

  // Connect Wallet
  const connectWallet = async () => {
  // Extra safety check
  if (typeof window === "undefined" || !window.ethereum) {
    return toast.error("MetaMask not detected");
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setWallet(accounts[0]);
  } catch (err) {
    // This catches the "User Rejected" error (Code 4001)
    if (err.code === 4001) {
      toast.error("Connection request rejected by user");
    } else {
      console.error(err);
      toast.error("Failed to connect to MetaMask");
    }
  }
};
useEffect(() => {
  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        // Look for existing authorized accounts without triggering a popup
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
      const handleAccountsChanged = (accounts) => {
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
    
    setIsPending(true); // Start loading
    try {
      const tx = await contract.transfer(recipient, ethers.parseUnits(amount, 18));
      
      toast.loading("Transaction sent! Waiting for confirmation...", { id: "tx-loading" });
      
      await tx.wait(); // Wait for block confirmation
      
      toast.dismiss("tx-loading");
      toast.success("Transfer confirmed on-chain!");
      loadContract(wallet); 
    } catch (e) {
      toast.dismiss("tx-loading");
      toast.error(e.reason || "Transaction failed");
    } finally {
      setIsPending(false); // Stop loading
    }
  };

  const updateBlockReward = async () => {
    if (!contract) return;
    try {
      const tx = await contract.setBlockReward(ethers.parseUnits(amount, 18));
      await tx.wait();
      toast.success("Block reward updated");
      loadContract(wallet);
    } catch (e) {
      toast.error(e.message);
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
    connectWallet,
    transferTokens,
    updateBlockReward,
  };

  return <OceanContext.Provider value={value}>{children}</OceanContext.Provider>;
};

// Custom hook for easy access
export const useOcean = () => useContext(OceanContext);