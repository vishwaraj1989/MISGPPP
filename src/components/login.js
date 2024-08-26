

// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
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
//       const response = await axios.post('http://localhost:5000/api/authRoutes/login', formData);
//       setMessage(response.data.message);
//       localStorage.setItem('token', response.data.token);
//       navigate('/Dashboard');
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Something went wrong!');
//     }
//   };

//   // const handleSignupClick = () => {
//   //   navigate('/signup');
//   // };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
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
//           <button type="submit" className="login-button">Login</button>
//         </form>
//         {message && <p>{message}</p>}
//         {/* <button onClick={handleSignupClick} className="signup-button">Signup</button> */}
//       </div>
//     </div>
//   );
// };

// export default Login;

// --------- Post IP Address Change ---------------

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      const response = await axios.post('https://76.76.21.9:5000/api/authRoutes/login', formData);
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      navigate('/Dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
