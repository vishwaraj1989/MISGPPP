import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import './Signup.css'; // Optional: Import a separate CSS file for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/authRoutes/signup', formData);
      toast.success(response.data.message); // Show success toast
      setFormData({ email: '', password: '' }); // Clear form fields
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful signup
      }, 2000); // Redirect after 2 seconds to allow time for toast to be visible
    } catch (error) {
      console.log('Error response:', error.response);
      toast.error(error.response?.data?.message || 'Something went wrong!'); // Show error toast
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
    </div>
  );
};

export default Signup;
