import React from "react";
import { useState, useEffect } from "react";

import { addBalance, withdrawPlayerBalance } from "../util/interact";

require('dotenv').config();
const { REACT_APP_ALCHEMY_KEY  } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(REACT_APP_ALCHEMY_KEY);

const BalanceController = ({balance, setBalance, wallet}) => {
    const [inputBalance, setInputBalance] = useState(0);

    const handleSend = async () => {
        const status = await addBalance(wallet, web3.utils.toWei(inputBalance.toString(), 'ether'));
        console.log(status);
    };

    const handleWithdraw = () => {
        withdrawPlayerBalance(wallet, 0, true);
    };

    return(
        <div>
            <div>
                <div>
                    <input type="number" value={inputBalance} onChange={e => setInputBalance(e.target.value)}/>
                </div>
                <div>
                    <button onClick={() => handleSend()}>Send Balance</button>
                </div>
            </div>
            <div>
                <div>
                    <button onClick={() => handleWithdraw()}>Withdraw funds</button>
                </div>
            </div>
        </div>
    );
};

export default BalanceController;