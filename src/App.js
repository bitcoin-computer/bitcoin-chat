import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Computer from 'bitcoin-computer'
import Wallet from './Wallet'
import Chat from './Chat'
import './App.css'
import useInterval from './useInterval'
import SideBar from './SideBar'

function App() {
  const [computer, setComputer] = useState(null)
  
  const [chain, setChain] = useState('BSV')
  const [chats, setChats] = useState('')
  useInterval(() => {
    // the BIP_39_KEY is set on login and we fetch it from local storage
    const password = window.localStorage.getItem('BIP_39_KEY')
    // the chain has also been stored in local storage on login, we need
    // to store the chain in the state because we pass it to Wallet
    setChain(window.localStorage.getItem('CHAIN'))

    const isLoggedIn = password && chain
    

    // if you are currently logging in
    if (isLoggedIn && !computer){
      setComputer(new Computer({ chain, network: 'testnet', seed: password }))
      console.log("Bitcoin Computer created on chain: " + chain)
    // if you are currently logging out
    } else if (!isLoggedIn && computer){
      console.log("You have been logged out")
      window.localStorage.clear()
      setComputer(null)
    }
  }, 3000)

  useInterval(() => {
    const refresh = async () => {
      if (computer) {
        console.log('finding revs')
        const revs = await computer.getRevs(computer.db.wallet.getPublicKey().toString())
        console.log(revs)
        setChats(await Promise.all(revs.map(
          async rev => computer.sync(rev))
        ))
      }
    }
    refresh()
  }, [3000])

  return (
    <Router >
      <div className="App">
        {/* bind the value of chain stored in the state to the child component */}
        <Wallet computer={computer} chain={chain}></Wallet>
        <div style={{margin:'12px', padding:'12px'}}>
          <div className='row'>
            <div className='col-sm-2'><SideBar computer={computer} chats={chats} ></SideBar></div>
            <div className="col-sm-10">
              <Switch>
                <Route path="/chat/:id" render={() => <Chat computer={computer}></Chat>} />
              </Switch>
            </div>
          </div>
        </div>
        <div className="branding">
          <small>This chat runs on the</small><br />
          <small><a className="clear" href='http:/bitcoincomputer.io'>Bitcoin Computer</a></small><br />
          <small><a className="clear" href='https://github.com/bitcoin-computer/bitcoin-chat'>Improve chat on Github</a></small>
        </div>
      </div>
    </Router>
  )
}

export default App
