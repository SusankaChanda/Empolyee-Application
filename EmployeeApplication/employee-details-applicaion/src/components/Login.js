import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styling/login.css';
import Logo from '../assests/logo-1.png'
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordVisiable,setpasswordVisiable] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility =()=>{
        setpasswordVisiable(!passwordVisiable)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`http://localhost:5000/login`, { username, password });
            console.log(response)
    
            if (response.status === 200) {
                const loginDetails = { username, password };
                localStorage.setItem("logindetails", JSON.stringify(loginDetails));
                navigate("/dashboard");
            } else {
                alert("Invalid Email or Password");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Invalid username or password");
                alert("Internal Server Error");
            } else {
                console.error("An error occurred:", error);
                alert("An unexpected error occurred. Please try again later.");
            }
        } finally {
            setUsername("");
            setPassword("");
            setError(""); 
        }
    };
    

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <img src={Logo} className='logo-image' alt="Logo" />
                </div>
            </nav>
            <div className='row'>
                <div className='col-12'>
                    <form onSubmit={handleSubmit} className='form-main-container'>
                        <div className='form-sub-container'>  
                            <div className='form-container'>
                                <div className='d-flex flex-row justify-content-center'>
                                <h1 className='heading'>Login Form</h1>
                                </div>
                                <div>
                                    <h1 className='input-bar-text'>Email/Username</h1>
                                    <input
                                        type="text"
                                        className='input-bar'
                                        value={username}
                                        placeholder='Enter Username / Email ...... '
                                        onChange={handleUsername}
                                    />
                                </div>
                                <div>
                                    <h1 className='input-bar-text'>Password</h1>
                                    <div className='pass-container'>
                                        <input
                                            type={passwordVisiable?"text":"password"}
                                            className='input-bar'
                                            value={password}
                                            placeholder='Enter Password ...... '
                                            onChange={handlePassword}
                                        />
                                        <div className='password-toggle' onClick={togglePasswordVisibility}>
                                            {passwordVisiable ? (
                                                <i className="fa-regular fa-eye"></i>
                                            ) : (
                                                <i className="fa-regular fa-eye-slash"></i>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {error && alert("Invalid Email or Password")}
                                <button type="submit" className='btn btn-primary submit-button'>Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
