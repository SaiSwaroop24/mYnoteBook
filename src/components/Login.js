import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Logged In Successfully", "success");
      history("/");
    } else {
      props.showAlert("Invalid Email or Password", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      //alignItems: "center",
      padding: "40px",
      //border: "2px solid #ddd",
      borderRadius: "4px",
      margin: "20px",
      marginLeft:"200px",
      width: "400px",
      height: "500px",
      //boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    form: {
      maxWidth: "400px",
    },
    label: {
      marginTop: "20px",
      marginBottom: "5px",
    },
    button: {
      marginTop: "10px",
    },
    image: {
      height: "500px",
    },
    imageContainer: {
      marginLeft: "700px", 
      marginTop:"-540px"
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.form}>
          <h2>LogIn to MyNoteBook</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                style={styles.label}
                htmlFor="email"
                className="form-label"
              >
                Email address
              </label>
              <input
                onChange={onChange}
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label
                style={styles.label}
                htmlFor="password"
                className="form-label"
              >
                Password
              </label>
              <input
                onChange={onChange}
                name="password"
                value={credentials.password}
                type="password"
                className="form-control"
                id="password"
              />
            </div>

            <button
              type="submit"
              style={styles.button}
              className="btn btn-success"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div style={styles.imageContainer}>
        <a
          href="https://storyset.com/illustration/programming/rafiki#088940FF&hide=&hide=complete"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://stories.freepiklabs.com/api/vectors/programming/rafiki/render?color=088940FF&background=complete&hide="
            alt="Web Illustration"
            style={styles.image}
          />
        </a>
      </div>
    </>
  );
}

export default Login;
