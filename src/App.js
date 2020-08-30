import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Computer from 'bitcoin-computer'
import Wallet from './Wallet'
import Chat from './Chat'
import SideBar from './SideBar'
import './App.css'
import useInterval from './useInterval'
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const [computer, setComputer] = useState(null)
  const [chats, setChats] = useState([])

  useInterval(() => {
    const password = window.localStorage.getItem('BIP_39_KEY')
      // if you are currently logging in
      if (password !== null && !computer){
        setComputer(new Computer({ chain: 'BSV', network: 'testnet', seed: password }))
      // if you are currently logging out
      } else if (password === null && computer){
        setComputer(null)
      }
  }, 3000)

  useInterval(() => {
    const refresh = async () => {
      if (computer) {
        const revs = await computer.getRevs(computer.db.wallet.getPublicKey().toString())
        setChats(await Promise.all(revs.map(
          async rev => computer.sync(rev))
        ))
      }
    }
    refresh()
  }, 3000)
  const classes = useStyles();
  return (
    <Router>
      <div className="App">
        <Grid container >
          <Grid item xs={12}>
            <Wallet computer={computer}></Wallet>
          </Grid>
          <Grid item xs={2}><SideBar computer={computer} chats={chats}></SideBar></Grid>
          <Grid item xs={10}>
            <div className="main">
              <Switch>
                <Route path="/chat/:id" render={(): object => <Chat computer={computer}></Chat>} />
              </Switch>
            </div>
          </Grid>
        </Grid>
      </div>
    </Router>
  )
}

export default App
