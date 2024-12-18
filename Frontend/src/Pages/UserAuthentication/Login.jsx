// Import dependencies
import React, { useState } from "react"; // React library and useState hook for state management
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import axios from "axios"; // Axios for making HTTP requests
import "./Login.css"; // Import custom CSS for styling the login page

const Login = () => {
  // State variables to manage email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // React Router's navigate function for redirection

  // Function to validate the form before submission
  const validateForm = () => {
    // Check if both email and password fields are filled
    if (!email || !password) {
      setErrorMessage("Email and Password are required."); // Set error message for empty fields
      return false; // Return false to prevent submission
    }
    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation pattern
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address."); // Set error message for invalid email
      return false; // Return false to prevent submission
    }
    return true; // Validation passed
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrorMessage(""); // Clear any previous error messages

    // Validate the form before proceeding
    if (!validateForm()) return;

    try {
      // Make a POST request to the login API with email and password
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      // If the response contains a token, store it and notify the user
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store the token in localStorage
        alert("Login successful!"); // Display a success message
        navigate("/dashboard"); // Redirect to the dashboard page
      }
    } catch (error) {
      // Handle errors, such as incorrect credentials or server issues
      setErrorMessage(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="login-container"> {/* Container for the login form */}
      <header>
        <h1>Login</h1> {/* Header section with a title */}
      </header>
      <form onSubmit={handleSubmit} className="login-form"> {/* Form element with a submit handler */}
        <div className="form-group"> {/* Group for the email input */}
          <label htmlFor="email">Email:</label>
          <input
            type="email" // Input type for email
            id="email" // Input ID for accessibility
            value={email} // Bind input value to email state
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            placeholder="Enter your email" // Placeholder text for guidance
            required // Mark input as required
          />
        </div>
        <div className="form-group"> {/* Group for the password input */}
          <label htmlFor="password">Password:</label>
          <input
            type="password" // Input type for password
            id="password" // Input ID for accessibility
            value={password} // Bind input value to password state
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            placeholder="Enter your password" // Placeholder text for guidance
            required // Mark input as required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if present */}
        <button type="submit" className="login-button">Login</button> {/* Submit button */}
      </form>
    </div>
  );
};

export default Login; // Export the component for use in other parts of the application
