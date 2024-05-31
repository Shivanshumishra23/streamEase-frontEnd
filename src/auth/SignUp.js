import React, { useState } from "react";
import { Axios } from "../axios/axios";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.fullName) newErrors.fullName = "Full Name is required";
    if (!formValues.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formValues.username) newErrors.username = "Username is required";
    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    try {
      const resp = await toast.promise(
        Axios.post("/users/register", formValues),
        {
          pending: 'Registering...',
          success: 'Registration successful 👌',
          error: 'Registration failed 🤯'
        }
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your name" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter your mail" },
            { label: "Username", name: "username", type: "text", placeholder: "Enter your username" },
            { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
          ].map((field, index) => (
            <div key={index} className="space-y-2">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
                <span className="text-red-600">*</span>
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formValues[field.name]}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:bg-white focus:outline-none ${errors[field.name] && "border-red-500"}`}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-600">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
