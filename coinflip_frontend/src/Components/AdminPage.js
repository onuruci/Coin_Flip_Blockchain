import React, { useEffect } from "react";

import { useState } from "react";

import WalletConnector from "./WalletConnector";

import etherlogo from '../styles/images/ether.png';
import { getAdminBalance, withdrawAdminBalance } from "../util/interact";

require('dotenv').config();
const { REACT_APP_ALCHEMY_KEY  } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_KEY);

const AdminPage = ({wallet, setWallet}) => {
    const [adminBalance, setAdminBalance] = useState(0);

    useEffect(() => {
        const playerBalanceReq = async () => {
            const {_balance, _status} = await getAdminBalance(wallet);
            setAdminBalance(parseFloat(web3.utils.fromWei(_balance.toString(), 'ether')).toFixed(4));
            console.log("_balance:   ", _balance);
            console.log("_status:     ", _status);
            console.log("wallet:   ", wallet);
        };
        if(wallet) {
            playerBalanceReq();
        };
    }, [wallet]);

    const handleWithdraw = () => {
        withdrawAdminBalance(wallet);
    };


    return(
        <div className="w-100 bg-wh">
            <div className="mx-w-1100 m-rl-auto pd-30 flex-col">
                <div className="flex-row">
                    <div>
                        Admin Balance : {adminBalance}  
                    </div>
                    <div>
                        <img src={etherlogo} alt="" srcset="" className="ether-logo"/>
                    </div>
                </div>
                <div>
                    <button onClick={() => handleWithdraw()}>Withdraw Balance</button>
                </div>
                <div>
                    <WalletConnector wallet={wallet} setWallet={setWallet}/>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;