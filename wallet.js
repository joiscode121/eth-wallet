require('dotenv').config();
const { ethers, JsonRpcProvider } = require('ethers');

// Debugging lines
console.log('Ethers:', ethers);
console.log('Sepolia RPC URL:', process.env.SEPOLIA_RPC_URL);
console.log('Private Key:', process.env.PRIVATE_KEY);

// Set up provider and wallet
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Function to get balance
async function getBalance() {
  const balance = await wallet.getBalance();
  console.log(`Balance: ${ethers.utils.formatEther(balance)} ETH`);
}

// Function to send funds
async function sendFunds(to, amount) {
  const tx = await wallet.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(amount)
  });
  console.log(`Transaction hash: ${tx.hash}`);
  await tx.wait();
  console.log(`Transaction confirmed`);
}


async function main() {
  await getBalance();

  
  await sendFunds('recipient_address', 'amount_in_eth');
}

main().catch(console.error);
