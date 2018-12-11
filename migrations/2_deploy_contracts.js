var BlockchainRatings = artifacts.require("./BlockchainRatings.sol");

module.exports = function(deployer) {
	deployer.deploy(BlockchainRatings);
};
