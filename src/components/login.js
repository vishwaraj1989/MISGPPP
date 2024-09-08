// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Typography, Button } from '@mui/material';
// import './Login.css'; // Import the updated CSS file

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const emailRef = useRef(null); // Create a ref for the email input field

//   useEffect(() => {
//     // Focus on the email input field when the component mounts
//     if (emailRef.current) {
//       emailRef.current.focus();
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Replace the URL with your deployed server's IPv4 address
//       const response = await axios.post('http://localhost:5000/api/authRoutes/login', formData);
//       setMessage(response.data.message);
//       localStorage.setItem('token', response.data.token);
//       navigate('/Dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage(error.response?.data?.message || 'Something went wrong!');
//     }
//   };

//   const handleSignupClick = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <Typography variant="h2">Login</Typography>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             ref={emailRef} // Attach the ref to the email input field
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <Button type="submit" variant="contained" color="primary" className="login-button">Login</Button>
//         </form>
//         {message && <Typography>{message}</Typography>}
//         <Button onClick={handleSignupClick} variant="outlined" className="signup-button">Signup</Button>
//         <Typography variant="caption" align="center" style={{ marginTop: '20px' }}>
//           Made by Vishwaraj (Junior Assistant) Haldarwas SD
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import './Login.css'; // Import the updated CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const emailRef = useRef(null); // Create a ref for the email input field

  useEffect(() => {
    // Focus on the email input field when the component mounts
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the URL with your deployed server's IPv4 address
      const response = await axios.post('http://localhost:5000/api/authRoutes/login', formData);
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      navigate('/Dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Typography variant="h2">Login</Typography>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            ref={emailRef} // Attach the ref to the email input field
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" className="login-button">Login</Button>
        </form>
        {message && <Typography>{message}</Typography>}
        <Button onClick={handleSignupClick} variant="outlined" className="signup-button">Signup</Button>
        <Typography variant="caption" align="center" style={{ marginTop: '20px' }}>
          Made by Vishwaraj (Junior Assistant) Haldarwas SD
        </Typography>
      </div>
    </div>
  );
};

export default Login;

