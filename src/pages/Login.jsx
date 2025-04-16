import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axioInstance from "../config/axiosConfig";


const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trimStart() });
  };

  // HANDLES LOGIN API CALL
  const postLogin = async () => {
    try {
        const response = await axioInstance.post(`/api/v1/patient/login`,
        formData)
        
      const token = response.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      }

    } catch (error) {
        const message = error.response?.data?.message || "Something went wrong. Please try again later.";
      setError(message);
    }
  };
  
//   VALIDATES AND SUBMITS FORM DATA
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    postLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-white to-purple-500 ">
        <div className="bg-white mx-auto 
     p-8 rounded-xl shadow-md w-full max-w-sm mt-10 ">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default LoginPage;
