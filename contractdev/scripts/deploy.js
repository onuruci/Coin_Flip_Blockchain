const fs = require('fs');


async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const coinflip = await CoinFlip.deploy();
  
    console.log("CoinFlip:", coinflip.address);
    fs.writeFile('scripts/addr.txt', coinflip.address, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
        console.log("Written:  ", coinflip.address);
      });
      
      
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  