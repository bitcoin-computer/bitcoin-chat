import React, { useState } from 'react'
import useInterval from './useInterval'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Avatar, Grid, Paper} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  large:{
    height: '100px',
    width: "100px", 
    margin: "auto"
  }
}));

function Login() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [chain, setChain] = useState('bsv')

  useInterval(() => {
    setLoggedIn(!!window.localStorage.getItem('BIP_39_KEY'))
  }, 500)

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem('BIP_39_KEY', password)
    window.localStorage.setItem('USER_NAME', username)
  }
  const classes = useStyles();
  return loggedIn
    ? <><Button onClick={() => window.localStorage.removeItem('BIP_39_KEY')}>
        Logout
      </Button><br /></>
    : <div className='login-screen'>
    <div>
    <Grid container spacing={3} direction="row" justify="center" alignItems="center">
      <Grid item xs={12}>
      <Paper className={classes.paper}><h1>Blabber</h1></Paper>
      <Paper className={classes.paper}>
        <h2 className="margin-left-sm"><i>By:</i><strong>BitcoinComputer</strong></h2>
        <Avatar className={classes.large} alt="Remy Sharp" src="https://camo.githubusercontent.com/e1060bb2e53aa9b4fa0bb98831d3ec4d1525e0f1/68747470733a2f2f692e6962622e636f2f724d6e526876512f6c6f676f2d626c61636b2d77686974652d7472616e73706172656e742d736d616c6c2e706e67" />
        </Paper>
      </Grid>
      <Grid container item xs={12}  justify="center">
        <div>
          <p> On The Blockchain Your 'Password' is a 12 word Phrase called a "seed'</p>
          <p> You do <b>NOT</b> make this up yourself.</p>
          <p>  If you dont have a random 12 word phrase <a rel='noopener noreferrer' target="_blank" href='http://bsv-account-generator.herokuapp.com'>Click Here</a></p>
          <form onSubmit={login}>
            <TextField placeholder='Display Name' type="string" value={username} onChange={(e) => setUsername(e.target.value)} variant="filled" /><br /><br></br>
            <TextField placeholder='Passphrase (your wallet seed)' type="string" value={password} onChange={(e) => setPassword(e.target.value)} variant='filled'/><br />
            <Button type="submit" variant="contained" color="primary" size="large">Login</Button>
          </form>
        </div>
      </Grid>
      <Grid item xs={12}>
      </Grid>
      <Grid item xs={3} ></Grid>
    </Grid>
    </div>
  </div>
}

export default Login
