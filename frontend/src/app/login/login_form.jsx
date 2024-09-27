
import {  useState } from "react";
import {  useRouter } from 'next/navigation'
import api_axios from "../../../api_axios";
import TryLogin from "./login_action"



export default  function LoginForm  () {

  //to change the page after login
  const router = useRouter()
  
  //holds form data by hook 
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data: " + username + " " + password);
     
   

    
    
    var userData = new FormData();
    userData.append("username", username)
    userData.append("password", password)
    
    const LoginAttempt = await TryLogin(userData)
    console.log("attempt: " + LoginAttempt)
    if (LoginAttempt == true){
      router.push("/home")
    } else {
        document.getElementById('loginError').innerText = LoginAttempt
    }
    
  }
   

  
  
  return (
    <div className="container" id="container">
      
  
      <div className="form-container sign-in-container">
        <form
          
         
          id="login-form"
          onSubmit={handleSubmit}
        >
          <img
            src="/img/login.jpeg"
            style={{ height: "200px", width: "200px" }}
            alt="Logo"
            srcSet=""
          />
          <h1>Login</h1>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control form-control-user"
            name="username"
            id="username"
            required
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
          ></input>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control form-control-user"
            name="password"
            id="password"
            required
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          ></input>
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Hello, User!</h1>
            <p>Welcome Back!</p>
            <h3 style={{ color: "red" }} id="loginError"></h3>
          </div>
        </div>
      </div>
    </div>
  );
}
