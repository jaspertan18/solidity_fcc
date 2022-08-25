const { network, ethers } = require("hardhat");
const { devChains } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25"); // <- 0.25 is the premium
const GAS_PRICE_LINK = 1e9; // <- Hardcoding this value for now, it is actually a calculated value based on the gas of ETH

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [BASE_FEE, GAS_PRICE_LINK];

    if (devChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...");
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        });
        log("Mocks Deployed");
        log("------------------------------------------------------");
    }
};

module.exports.tags = ["all", "mocks"];
