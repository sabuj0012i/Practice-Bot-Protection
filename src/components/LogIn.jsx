import React, { useState, useEffect, useRef } from "react";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // Turnstile token

  const turnstileRef = useRef(null);

  useEffect(() => {
    // Load Turnstile script dynamically
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);

    // Token will be set in this callback
    window.onTurnstileSuccess = function (token) {
      setToken(token);
      console.log("Turnstile Token:", token);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please verify you're not a bot first.");
      return;
    }

    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Turnstile Token:", token);

    alert("Login submitted! (Backend needed for real auth + Turnstile verification)");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Cloudflare Turnstile */}
          <div
            className="cf-turnstile"
            data-sitekey="0x4AAAAAABl5cLH7Yk_Dd0b5"   
            data-callback="onTurnstileSuccess"
            ref={turnstileRef}
          ></div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
