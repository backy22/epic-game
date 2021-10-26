const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    ["Ted Lasso", "Don Draper", "Dexter"],
    ["QmTrS6Q4x6ntDA73FXFAPks1bHBTAg5xrtbVcz6jD3C457",
    "Qmf5Lb4HymBw5RKbU7YxWH9CwvDPHjY3KBo1EumrHfcSVX", 
    "QmVmWVveDwxT6sUKXsVvEZRXWQeVBys3eY7G4MWia8QqSN"],
    [500, 400, 300],                    // HP values
    [100, 50, 25],                    // Attack damage values
    "Queens Gambit", // Boss name
    "QmdYwYdP7KuK8vJimhpzAj1YY26rNgXikPYsezT5DxXPPk",
    1000, // Boss hp
    50 // Boss atack damage
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(2); // we have 3 characters
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1); //ECR721にもtokenURIがあるが、JSONで返ってくるのでcustomizeする必要。get actual data inside the NFT with tokenId 1
  console.log("Token URI:", returnedTokenUri);

};
  
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
  