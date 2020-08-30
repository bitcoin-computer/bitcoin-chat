import React, { useState } from 'react'
import Login from './Login'
import useInterval from './useInterval'
import { makeStyles } from '@material-ui/core/styles';
import {Card, Typography, Grid} from '@material-ui/core'
//import {SendIcon} from '@material-ui/core'

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


function Wallet({ computer }) {
  const [balance, setBalance] = useState(0)

  useInterval(() => {
    const getBalance = async () => {
      if(computer) setBalance(await computer.db.wallet.getBalance())
    }
    getBalance()
  }, 3000)
  //const classes = useStyles();
  return (
    <div>
    <Card className='flex'>
      <Grid container>
        <Grid item xs={6}>
        <Typography color="primary" variant="caption">Public Key</Typography><br/> <Typography variant="body2">{computer ? computer.db.wallet.getPublicKey().toString() : ''}</Typography> <br/>
        </Grid>
        <Grid item xs={2}>
          <Typography color="primary" variant="caption">Balance (BSV)</Typography><br/> <Typography variant="body2">{balance / 1e8}</Typography> <br/>
       </Grid>
       <Grid item xs={3}>
          <Typography color="primary" variant="caption">Address</Typography><br/> <Typography variant="body2">{computer ? computer.db.wallet.getAddress().toString() : ''}</Typography> <br/>
       </Grid>
       <Grid item xs={1}><small><Login></Login></small></Grid>
      </Grid>
    </Card>
    </div>
  )
}
export default Wallet
