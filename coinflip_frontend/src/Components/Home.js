import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";

import WalletConnector from "./WalletConnector";
import BalanceController from "./BalanceController";

import '../styles/styles.css';
import luckirish from '../styles/images/luckirish.png';
import etherlogo from '../styles/images/ether.png';
import headimg from '../styles/images/head.png';
import tailsimg from '../styles/images/tails.png';
import { coinFlipContract, getPlayerBalance , play} from "../util/interact";

require('dotenv').config();
const { REACT_APP_ALCHEMY_KEY  } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_KEY);

const Home = ({wallet, setWallet}) => {
    const [guess, setGuess] =  useState(1);
    const [gameStatus, setGameStatus] = useState("");
    const [balance, setBalance] = useState(1);
    const [spining, setSpinning] = useState(false);

    useEffect(() => {
        const playerBalanceReq = async () => {
            const {_balance, _status} = await getPlayerBalance(wallet);
            console.log('Float:  ', parseFloat(web3.utils.fromWei(_balance.toString(), 'ether')).toFixed(2));
            setGameStatus(_status);
            setBalance(parseFloat(web3.utils.fromWei(_balance.toString(), 'ether')).toFixed(4));
            console.log("_balance:   ", _balance);
            console.log("_status:     ", _status);
            console.log("wallet:   ", wallet);
        };
        if(wallet) {
            playerBalanceReq();
        };
    }, [wallet]);

    useEffect(() => {
        addSmartContractListener();
    }, [balance]);

    const playGame = async () => {
        const res = await play(wallet,  web3.utils.toWei((1).toString(), 'ether'), guess, setSpinning);
        console.log(res);
    };

    function addSmartContractListener() {
        coinFlipContract.events.balanceChanged({}, (error, data) => {
            console.log('Curr balance:   ', balance);
          if (error) {
            setGameStatus("😥 " + error.message);
            setSpinning(false);
          } else {
            console.log(data);
            let newB = parseFloat(web3.utils.fromWei(data.returnValues[1].toString(), 'ether')).toFixed(4);
            console.log(newB, '    ', balance);
            if(newB > balance) {
                setGameStatus("You won !");
            } else if(newB < balance) {
                setGameStatus("You lost");
            };
            setBalance(newB);
            setSpinning(false);
          }
        });
    };


    return(
        <div className="w-100 bg-wh">
            <div className="mx-w-1100 m-rl-auto pd-30 flex-col">
                <div className="m-rl-auto">
                    <img src={luckirish} alt="" className="luck-irish-container"/>
                </div>
                <div className="flex-row m-t-3">
                    <div className="m-rl-auto">
                        <WalletConnector wallet={wallet} setWallet={setWallet}/>
                    </div>
                    <div className="m-rl-auto bg-lgr pd-30 min-h-4 content-center dashed-border border-cl-gr">
                        <div className="flex-row">
                            <div>
                                Balance : {balance}  
                            </div>
                            <div>
                                <img src={etherlogo} alt="" className="ether-logo"/>
                            </div>
                        </div>
                        <div>
                            {wallet !== "" ? <BalanceController balance={balance} setBalance={setBalance} wallet={wallet}/> : null}
                        </div>
                    </div>
                </div>
                <div className="m-rl-auto">
                    <div>
                        Your choice: {
                            guess ? "Head" : "Tails"
                        }
                    </div>
                    <div>
                        <button onClick={() => setGuess(1)}>Head</button>
                        <button onClick={() => setGuess(0)}>Tail</button>
                    </div>
                    <div>
                        <button onClick={() => playGame()}>Play</button>
                    </div>
                </div>
                <div className="m-rl-auto">
                <div className="coin" style={spining ? {"animation" : "spin-heads 3s forwards infinite"} : null} id="coin">
                    <div className="heads">
                        <img src={headimg}/>
                    </div>
                    <div className="tails">
                        <img src={tailsimg}/>
                    </div>
                </div>
                        {gameStatus}
                </div>
            </div>
        </div>
    );
};

export default Home;