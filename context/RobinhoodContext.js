import { createContext, useEffect, useState } from "react";
import { useMoralis } from 'react-moralis'
import { dogeAbi, bitcoinAbi, solanaAbi, usdcAbi, dogeAddress, bitcoinAddress, solanaAddress, usdcAddress } from "../lib/constants";

export const RobinhoodContext = createContext();


export const RobinhoodProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formattedAccount, setFormattedAccount] = useState('');
    const [coinSelect, setCoinSelect] = useState('DOGE');
    const [toCoin, setToCoin] = useState();
    const [balance, setBalance] = useState();
    const [amount, setAmount] = useState();
    
    const { isAuthenticated, authenticate, user, logout, Moralis, enableWeb3 } = useMoralis();


    
    useEffect( ()=> {
        return(
            async () => {
                if(isAuthenticated){
            
            const account = user.get('ethAddress')
            let formatAccount = account.slice(0, 4) + '...' + account.slice(-4)
            setFormattedAccount(formatAccount);
            setCurrentAccount(account);   
            const currentBalance = await Moralis.Web3API.account.getNativeBalance({
                chain: 'rinkeby',
                address: currentAccount,
            })
            const balanceToEth = Moralis.Units.FromWei(currentBalance.balance)
            const formattedBalance = parseFloat(balanceToEth).toFixed(3)
            setBalance(formattedBalance);
        }
            })
             
    }, [isAuthenticated, enableWeb3])

useEffect(() => {
    
    return (
        async ()=> {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    walletAddress: currentAccount,
                }),
            })
            const data  = await response.json()
           
        })
},[isAuthenticated])
      
    const getContractAddress = () => {
        if(coinSelect === 'BTC') return bitcoinAddress
        if(coinSelect === 'DOGE') return dogeAddress
        if(coinSelect === 'SOL') return solanaAddress
        if(coinSelect === 'USDC') return usdcAddress
    }

    const getToAddress = () => {
        if (toCoin === 'BTC') return bitcoinAddress
        if (toCoin === 'DOGE') return dogeAddress
        if (toCoin === 'SOL') return solanaAddress
        if (toCoin === 'USDC') return usdcAddress
      }
    
      const getToAbi = () => {
        if (toCoin === 'BTC') return bitcoinAbi
        if (toCoin === 'DOGE') return dogeAbi
        if (toCoin === 'SOL') return solanaAbi
        if (toCoin === 'USDC') return usdcAbi
      }

    const connectWallet = () => {
        authenticate();
    }

    const signOut = () => {
        logout();
    }
    return (
        <RobinhoodContext.Provider
        value={{
          connectWallet,
          currentAccount,
          signOut,
          isAuthenticated,
          formattedAccount,
          setAmount,
          
          setCoinSelect,
          coinSelect,
          balance,
          
          amount,
          toCoin,
          setToCoin,
        }}
      >
            {children}
        </RobinhoodContext.Provider>
    )
}