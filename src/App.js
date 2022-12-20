import './App.css';
import { useState} from 'react';
import Content from './hooks/Content.js';
import React from "react";
import GoogleLogin from 'react-google-login';


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
       <nav>
        <ul>
            <li><a href="#" title="Trang chủ">Trang chủ</a></li>
            <li><a href="#" title="Giới thiệu">Giới thiệu</a></li>
            <li><a href="#" title="Khóa học chuyên đề">Khóa học</a>
            
                <ul>
                    <li><a href="#" title="Lập trình JavaScript">Lập trình JavaScript</a></li>
                    <li><a href="#" title="Lập trình REACTJS">Lập trình REACTJS</a></li>
                    <li>
                        <a href="#" title="Lập trình Web ASP.NET">Lập trình Web với ASP.NET CORE 5</a>
                
                        <ul>
                            <li><a href="#" title="Lập Trình hướng đối tượng với C# (30h)">1. Lập trình hướng đối tượng với C#(30h)</a></li>
                            <li><a href="#" title="Lập trình cơ sở dữ liệu SQL Server (20h)">2. Lập trình cơ sở dữ liệu SQL Server (20h)</a></li>
                            <li><a href="#" title="Lập trình giao diện web với HTML5 (30h)">3. Lập trình giao diện web với HTML5 (30h)</a></li>
                            <li><a href="#" title="Lập trình ứng dụng với ASP.NET CORE20h)">4. Lập trình ứng dụng ASP.NET CORE (20h)</a></li>
                            <li>
                                <a href="#" title="Xây dựng dự án với ASP.NET MVC 5(30h)">5. Xây dựng dự án với ASP.NET MVC 5(30h)</a>
                                
                                <ul>
                                    <li><a href="#" title="Xây dựng bài toán">Xây dựng bài toán</a></li>
                                    <li><a href="#" title="Thiết kế giao diện chức năng">Thiết kế giao diện chức năng</a></li>
                                    <li><a href="#" title="Phát triển dự án">Phát triển dự án</a></li>
                                </ul>

                            </li>
                        </ul>
                    </li>
                    <li><a href="#" title="Lập trình Web Java Spring">Lập trình Web Java Spring Framework</a></li>
                </ul>
            </li>
            <li><a href="#" title="Dịch vụ">Dịch vụ</a>
                <ul>
                    <li><a href="#" title="Thực tập chuyên đề">Thực tập sinh chuyên đề</a></li>
                    <li><a href="#" title="Sản xuất phần mềm">Sản xuất phần mềm</a></li>
                </ul>
            </li>
            <li><a href="#" title="Liện hệ">Liên hệ</a></li>
            <li><button onClick={()=> setShow(!show)}>Toggle</button>               
                </li>     
        </ul>
    </nav>
      <header className="App-header">
      {show && <Content/>}
        <h1>React Google Login App</h1>
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
      </header>
    </div>
  );
}

export default App;