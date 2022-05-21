import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";

import WalletConnector from "./WalletConnector";
import BalanceController from "./BalanceController";

import '../styles/styles.css';
import luckirish from '../styles/images/luckirish.png';
import etherlogo from '../styles/images/ether.png';
import { getPlayerBalance , play} from "../util/interact";

require('dotenv').config();
const { REACT_APP_ALCHEMY_KEY  } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_KEY);

const Home = ({wallet, setWallet}) => {
    const [guess, setGuess] =  useState(-1);
    const [gameStatus, setGameStatus] = useState("");
    const [balance, setBalance] = useState(0);

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

    const playGame = async () => {
        const res = await play(wallet,  web3.utils.toWei((1).toString(), 'ether'), guess);
        console.log(res);
    }


    return(
        <div className="w-100 bg-wh">
            <div className="mx-w-1100 m-rl-auto pd-30 flex-col">
                <div className="m-rl-auto">
                    <img src={luckirish} alt="" className="luck-irish-container"/>
                </div>
                <WalletConnector wallet={wallet} setWallet={setWallet}/>
                {wallet !== "" ? <BalanceController balance={balance} setBalance={setBalance} wallet={wallet}/> : null}
                <div className="flex-row">
                    <div>
                        Balance : {balance}  
                    </div>
                    <div>
                        <img src={etherlogo} alt="" srcset="" className="ether-logo"/>
                    </div>
                </div>
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
        </div>
    );
};

export default Home;