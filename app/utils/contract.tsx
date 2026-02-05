import { ethers } from "ethers";
// @ts-ignore - Ignoring if the JSON doesn't have a generated type file
import OceanTokenArtifact from "./OceanTokenABI.json";

const OceanTokenABI = OceanTokenArtifact.abi;
const envAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
console.log("DEBUG: Contract Address is:", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
export const getProvider = () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not detected");
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const getContract = async () => {
  // 1. Validation check
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Please install MetaMask to use this feature");
  }

  if (!envAddress) {
    throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is missing in .env");
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // envAddress is guaranteed to be a string here due to the check above
    return new ethers.Contract(envAddress, OceanTokenABI, signer);
  } catch (error) {
    console.error("User denied account access or error occurred:", error);
    throw error;
  }
};