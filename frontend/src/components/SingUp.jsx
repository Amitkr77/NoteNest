import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const Navigate =  useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validate();
    if (Object.keys(validateErrors).length === 0) {
      try {
        const res = await axios.post('http://localhost:8001/api/profiles', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        alert("Registration successful");
        // Ensure that you're storing the correct data from response
        localStorage.setItem("userId", res.data.userId); // Adjust based on actual response
        console.log(res.data);
        Navigate("/")
      } catch (error) {
        console.error('Error creating profile:', error);
        setError({ global: "Error creating profile. Please try again." });
      }
    } else {
      setError(validateErrors);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 rounded-lg shadow-lg mt-20">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Register</h1>
        <p>Create your account</p>
      </div>
      <form className="space-y-4" onSubmit={formSubmit}>
        <div>
          <label className="text-sm font-medium leading-none" htmlFor="name">
            Name
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {error.name && <p className="text-red-500">{error.name}</p>}
        </div>
        <div>
          <label className="text-sm font-medium leading-none" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            id="email"
            placeholder="Enter your email"
            type="email"
          />
          {error.email && <p className="text-red-500">{error.email}</p>}
        </div>
        <div>
          <label className="text-sm font-medium leading-none" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            id="password"
            placeholder="Enter a password"
            type="password"
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
          type="submit"
        >
          Register
        </button>
        {error.global && <p className="text-red-500 text-center">{error.global}</p>}
      </form>
    </div>
  );
}

export default SignUp;
