import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';


function Signup(props) {
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        //fetch("http://localhost:5000/api/auth/login")
        const {name,email,password,cpassword}=credentials; 
        if (password !== cpassword) {
          props.showAlert('Passwords do not match', 'danger');
          return;
        }
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ name,email,password}),
 
       });
       const json=await response.json();
       console.log(json);
       if(json.sucess){
        //save authtoken and redirect
        localStorage.setItem('token',json.authToken);
        history("/");
        props.showAlert("Signed Up Sucessfully","success")


      }
      else{
        props.showAlert("User Already Exist","danger")

      }
     } 
     const onChange = (e) => {
         setCredentials({ ...credentials, [e.target.name]: e.target.value });
       };
  return (
    <>
      <style>
        {`
          form {
            max-width: 400px;
            width: 100%;
          }
          .container{
            max-width: 400px;
            margin-left:100px;
            margin-top:40px;
      
          }
          img{
            height:400px;
            margin-top:-500px;
            margin-left:700px;
        
          }
        `}
      </style>
      <div className='container1'>
       <div className='container'>
        <h2>Create your mYnoteBook account </h2>
       </div>
       </div>
      <div className='container1'>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input onChange={onChange} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input required onChange={onChange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input required minLength={5} onChange={onChange} type="password" className="form-control" name="password" id="password" />
          </div>
          <div className="mb-3">
            <label required minLength={5} htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input onChange={onChange} type="password" className="form-control" name="cpassword" id="cpassword" />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
      </div>
      <div className='image'>
        <a
          href="https://storyset.com/illustration/programming/rafiki#088940FF&hide=&hide=complete"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://stories.freepiklabs.com/api/vectors/programming/pana/render?color=088940FF&background=complete&hide="
            alt="Web Illustration"
          
          />
        </a>
      </div>
    </>
  );
}

export default Signup;
