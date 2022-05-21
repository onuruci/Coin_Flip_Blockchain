import React from "react";
import { useState, useEffect } from "react";

import {
    getCurrentWalletConnected,
    connectWallet
  } from "../util/interact";

const WalletConnector = ({wallet, setWallet}) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        const walletConnection = async () => {
            const { address, status } = await getCurrentWalletConnected();
            setWallet(address);
            setStatus(status);
        };
        walletConnection();
    }, []);

    const handleConnect = async () => {
        console.log("Clicked");
        const { address, status } = await connectWallet();
        setWallet(address);
        setStatus(status);
    };

    return(
        <div>
            <div>
                {status}
            </div>
            {
                wallet !== "" ? 
                <div>
                    Wallet: {wallet}
                </div> :
                <div>
                    <button onClick={handleConnect}>Connect Wallet</button>
                </div>
            }
        </div>
    );
};

export default WalletConnector;