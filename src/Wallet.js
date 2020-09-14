import React, { useState } from 'react'
import Login from './Login'
import useInterval from './useInterval'

function Wallet({ computer, chain}) {
  const [balance, setBalance] = useState(0)

  useInterval(() => {
    const getBalance = async () => {
      if(computer) setBalance(await computer.db.wallet.getBalance())
    }
    getBalance()
  }, 3000)

  return(<div>
    <div className='flex list-group-item p-3'>
    <small><b>Public Key</b> {computer ? computer.db.wallet.getPublicKey().toString() : ''}<br /></small>
    <small><b>Balance</b> {balance / 1e8} {chain}</small>
    <small><b>Address</b> {computer ? computer.db.wallet.getAddress().toString() : ''}<br /></small>
    <small><Login ></Login></small>
    </div>
    <br/>
    </div>)
}

export default Wallet
