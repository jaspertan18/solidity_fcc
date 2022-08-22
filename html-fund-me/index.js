import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fund");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdraw");
connectButton.onclick = connect;
balanceButton.onclick = getBalance;
fundButton.onclick = fund;
withdrawButton.onclick = withdraw;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        connectButton.innerHTML = "Connected";
    } else {
        connectButton.innerHTML = "Please install metamask";
    }
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        console.log("Withdrawing...");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.withdraw();
            await listenForTransactionMined(transactionResponse, provider);
        } catch (error) {
            console.log(error);
        }
    }
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(ethers.utils.formatEther(balance));
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value;
    console.log(`Funding with ${ethAmount}`);
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            });
            await listenForTransactionMined(transactionResponse, provider);
            console.log("Done!");
        } catch (error) {
            console.log(error);
        }
    }
}

function listenForTransactionMined(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`
            );

            resolve(); // <- Only return after provider.once is completed
        });
    });
}
