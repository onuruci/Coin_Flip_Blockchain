require('dotenv').config();
const { REACT_APP_ALCHEMY_KEY  } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_KEY);
const contractABI = require("../contract-abi.json");
const CONTRACT_ADDRESS = "0x2Ed73d315938E8bf9F005b0da0F5b655E0Cd1f9C";


export const coinFlipContract = new web3.eth.Contract(
    contractABI,
    CONTRACT_ADDRESS
);

export const getPlayerBalance = async (address) => {
    const balance = await coinFlipContract.methods.getPlayerBalance().call({from : address});
    console.log("Balance:  ", balance);
    return {
        _balance : balance,
        _status : "Succesfull connection"
    }
};


const transactionSender = async (transactionParameters) => {
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        console.log("txhash:  " ,txHash);
    return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
};

export const addBalance = async (address, value) => {
    const transactionParameters = {
        to: CONTRACT_ADDRESS,
        from: address,
        value: parseInt(value).toString(16),
        data: coinFlipContract.methods.addBalance().encodeABI(),
    };
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
        console.log(txHash);
        return {
            status: " Once the transaction is verified by the network, the message will be updated automatically.",
        };
        } catch (error) {
        return {
            status: "😥 " + error.message,
        };
        }
};

export const withdrawPlayerBalance = async (address, value, all) => {
  const transactionParameters = {
      to: CONTRACT_ADDRESS,
      from: address,
      value: 0,
      data: coinFlipContract.methods.withdrawPlayerBalance(all, value).encodeABI(),
  };
  try {
      const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
      });
      console.log(txHash);
      return {
          status: " Once the transaction is verified by the network, the message will be updated automatically.",
      };
      } catch (error) {
      return {
          status: "😥 " + error.message,
      };
      }
};

export const play = async (address, value, guess) => {
  const transactionParameters = {
      to: CONTRACT_ADDRESS,
      from: address,
      value: 0,
      data: coinFlipContract.methods.play(guess, value).encodeABI(),
  };
  try {
      const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
      });
      console.log(txHash);
      return {
          status: " Once the transaction is verified by the network, the message will be updated automatically.",
      };
      } catch (error) {
      return {
          status: "😥 " + error.message,
      };
      }
};

// export const getBalance = async () => {
//   const balance = await fundMeContract.methods.getBalance().call();
//   return balance;
// };

// export const withdrawFunds = async (address) => {
//   const transactionParameters = {
//     to: CONTRACT_ADDRESS, // Required except during contract publications.
//     from: address, // must match user's active address.
//     data: fundMeContract.methods.withdraw().encodeABI(),
//   };

//   try {
//     const txHash = await window.ethereum.request({
//       method: "eth_sendTransaction",
//       params: [transactionParameters],
//     });
//     console.log(txHash);
//     return {
//       status: " Once the transaction is verified by the network, the message will be updated automatically.",
//     };
//   } catch (error) {
//     return {
//       status: "😥 " + error.message,
//     };
//   }
// };

// export const donate = async (address, value) => {
//   const transactionParameters = {
//     to: CONTRACT_ADDRESS, // Required except during contract publications.
//     from: address, // must match user's active address.
//     value: parseInt(value).toString(16),
//     data: fundMeContract.methods.fund("hello").encodeABI(),
//   };

//   try {
//     const txHash = await window.ethereum.request({
//       method: "eth_sendTransaction",
//       params: [transactionParameters],
//     });
//     console.log(txHash);
//     return {
//       status: " Once the transaction is verified by the network, the message will be updated automatically.",
//     };
//   } catch (error) {
//     return {
//       status: "😥 " + error.message,
//     };
//   }
// };

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const obj = {
            status: "👆🏽 You can send ropsten ether to your account",
            address: addressArray[0],
          };
          return obj;
        } catch (err) {
          return {
            address: "",
            status: "😥 " + err.message,
          };
        }
      } else {
        return {
          address: "",
          status: (
            <span>
              <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download.html`}>
                  You must install Metamask, a virtual Ethereum wallet, in your
                  browser.
                </a>
              </p>
            </span>
          ),
        };
      }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({method: "eth_accounts",});
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 You can send ropsten ether to your account",
        };
      } 
      else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
      <span>
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      </span>
      ),
    };
  }
};