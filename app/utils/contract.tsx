import { ethers } from "ethers";
import OceanTokenArtifact from "./OceanTokenABI"; // generate from your compiled contract
const OceanTokenABI = OceanTokenArtifact.abi;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!contractAddress) {
  throw new Error("NEXT_PUBLIC_CONTRACT_ADDRESS is missing in .env");
}
export const getProvider = () => {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  return new ethers.BrowserProvider(window.ethereum);
};

{/*export const getContract = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, OceanTokenABI, signer);
}; */}

export const getContract = async () => {
  // 1. Check if window exists (client-side check)
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Please install MetaMask to use this feature");
  }

  try {
    // 2. Use BrowserProvider for ethers v6
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // 3. Request account access if not already granted
    const signer = await provider.getSigner();
    
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    // Assuming your ABI import is working correctly
    return new ethers.Contract(contractAddress, OceanTokenABI, signer);
  } catch (error) {
    console.error("User denied account access or error occurred:", error);
    throw error;
  }
};