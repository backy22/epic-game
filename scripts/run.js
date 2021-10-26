const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy(
    ["Mask", "Sailor Moon", "Barney"],       // Names
    ["https://i.imgur.com/dA6qCJO.png",
    "https://i.imgur.com/MIErC8R.gif", 
    "https://i.imgur.com/LgXev.gif"],
    [100, 200, 300],                    // HP values
    [100, 50, 25],                    // Attack damage values
    "Maleficent", // Boss name
    "https://i.imgur.com/Ky6ecWO.png",
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
  