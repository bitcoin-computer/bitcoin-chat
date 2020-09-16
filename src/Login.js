import React, { useState } from 'react'
import useInterval from './useInterval'

function Login() {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [chain, setChain] = useState('BSV')

  useInterval(() => {
    setLoggedIn(!!window.localStorage.getItem('BIP_39_KEY'))
  }, 500)

  const login = (e) => {
    e.preventDefault()
    window.localStorage.setItem('BIP_39_KEY', password)
    window.localStorage.setItem('USER_NAME', username)
    window.localStorage.setItem('CHAIN', chain)
  }

  const logout = (e) => {
    window.localStorage.clear()
  }

  const toggleChain = (e) => {
    e.preventDefault()
    if (chain === 'BSV'){
      //set the state for the value of the chain property here
      setChain("BCH")
      //assign the chosen chain to local storage for when the computer is init'd
      window.localStorage.setItem('CHAIN', "BCH")
    } else {
      //set the state for the value of the chain property here
      setChain("BSV")
      //assign the chosen chain to local storage for when the computer is init'd
      window.localStorage.setItem('CHAIN', "BSV")
    }
  }

  return loggedIn
    ? <><button className="btn-sm btn-danger" onClick={logout}>
        Logout
      </button><br /></>
    : <div className='login-screen'>
        <div id="">
          <div className="card center">
            <div className="card-header">
              <h2 className="margin-auto"> Chat - By Bitcoin Computer </h2>
            </div>
            <div className='row'>
               {/* Chain Toggle Buttons  */}
              <div className='col-sm-3 offset-sm-3'>
                <button className={chain === 'BSV' ? 'btn btn-warning btn-lg btn-block' : 'btn btn-secondary btn-lg btn-block'} onClick={toggleChain} > BSV </button>
              </div>
              <div className='col-sm-3'>
                <button className={chain === 'BCH' ? 'btn btn-success btn-lg btn-block' : 'btn btn-secondary btn-lg btn-block'} onClick={toggleChain}> BCH </button>
              </div>
            </div>
            {/* End Chain Toggle Buttons  */}
            {/* Login Form  */}
            {/* Use The on Submit Event to capture the bound state of the inputs, pass them to the instantiation of a computer object and store it in localStorage  */}
            <form onSubmit={login}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="string" className="form-control" placeholder="Username (can be aything)" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fas fa-key"></i></span>
                </div>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="string" className="form-control" placeholder="Password (BIP39 Generated Seed Phrase)" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              <button type="submit" className="button">Login</button>
            </form>
            {/* End Login Form  */}
            <div> Need A Seed (Password?) <a _target="blank" href='http://accounts.protoshi.com'>Click Here</a></div>
          </div>
        </div>
      </div>
}

export default Login
