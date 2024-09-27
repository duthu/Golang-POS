"use client"
import App from 'next/app'
import { useState, useEffect } from 'react'



function LoginBase({ children }) {
    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div>
      <head>
        <link rel="stylesheet" href="/css/NewLogin.css" />

        <title>Login</title>
      </head>
      
      <body style={{ background: "#fff" }}>
        <div className="container">
          
          {children}
         
          </div>
      </body>
    </div>
  );
}

export default LoginBase;
