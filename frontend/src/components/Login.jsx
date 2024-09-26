import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!logindata.email) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(logindata.email)) {
      err.email = "Email is invalid";
    }
    if (!logindata.password) {
      err.password = "Password is required";
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:8001/api/profiles/login",
          logindata
        );
        alert("Login successful");
        // Assuming response.data contains userId
        localStorage.setItem("userId", response.data.userId);
        console.log(response.data);
        
        Navigate("/workPage");
      } catch (error) {
        console.error("Error logging in:", error);
        setError({ global: "Login failed. Please check your credentials." });
      }
    } else {
      setError(errors);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary-foreground">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none sr-only"
            >
              Email address
            </label>
            <input
              value={logindata.email}
              onChange={handleChange}
              id="email"
              autoComplete="email"
              placeholder="Email address"
              type="email"
              name="email"
              className="h-10 bg-background text-sm border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {error.email && <p className="text-red-500">{error.email}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none sr-only"
            >
              Password
            </label>
            <input
              value={logindata.password}
              onChange={handleChange}
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              type="password"
              name="password"
              className="h-10 bg-background text-sm border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {error.password && <p className="text-red-500">{error.password}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              Sign in
            </button>
          </div>
          {error.global && (
            <p className="text-red-500 text-center">{error.global}</p>
          )}
        </form>
        <div className="flex items-center justify-center">
          <Link
            to="/SignUp"
            className="font-medium text-primary hover:text-primary-foreground"
          >
            Create a new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
