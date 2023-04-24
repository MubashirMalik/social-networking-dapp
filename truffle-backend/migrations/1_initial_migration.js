const Migrations = artifacts.require("Migrations");
const SmartContract= artifacts.require("SmartContract")

module.exports = function (deployer) {
    deployer.deploy(Migrations);
    deployer.deploy(SmartContract);
};