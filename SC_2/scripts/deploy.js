
async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  // Start deployment, returning a promise that resolves to a contract object
  const Voting_ = await Voting.deploy();
  console.log("Contract address:", Voting_.address);

  // Wait for the contract to be deployed
  await Voting_.deployed();

  // You can optionally perform additional actions here, such as interacting with the contract.
  // For example, you can call contract methods, etc.
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });

