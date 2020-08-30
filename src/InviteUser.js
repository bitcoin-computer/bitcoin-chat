import React from 'react'
import {Button, Grid} from '@material-ui/core'

function InviteUser({ chat }) {
  const inviteUser = async (e) => {
    try {
      e.preventDefault()
      const publicKey = prompt('Enter the public key of a friend and send them the url.')
      await chat.invite(publicKey)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
    <Grid container>
      <Grid item xs={10}></Grid>
      <Grid item xs={2}>
      <Button variant="contained" color="primary" onClick={inviteUser}>Invite User</Button>
      </Grid>
    </Grid>
    </div>
  )
}

export default InviteUser
