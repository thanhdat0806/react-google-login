import './App.css';
import { useState} from 'react';
import Content from './hooks/Content'
import React from "react";
import GoogleLogin from 'react-google-login';
import Navbar from './components/Navbar';



function App() {
  const [show, setShow]=useState(false)
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
      <div className="nav-area">
        <a href="/#" className="logo">
          CodeSolution
        </a>
        <Navbar />
      </div>
     </header> 
        <h1>React Google Login App</h1>
        <div className="toggle" style={{padding:32}}>
      <button onClick={()=> setShow(!show)}>Toggle</button>
      {show && <Content/>}
      </div>
        <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
        <div>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          )}
        </div>
     </div>
    </div>
  );
}

export default App;