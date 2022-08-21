const networkConfig = {
    4: {
        name: "rinkeby",
        ethUsdPriceFeedAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
    5: {
        name: "goerli",
        ethUsdPriceFeedAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
};

const devChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 100000000000;

module.exports = {
    networkConfig,
    devChains,
    DECIMALS,
    INITIAL_ANSWER,
};
