var TinyCoin = artifacts.require("./TinyCoin.sol");



module.exports = function(deployer) {
  deployer.deploy(TinyCoin, 10000, "TinyCoin", "TINY");
};

