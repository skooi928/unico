import React, { useState } from "react";
import "./UserLogin.css"; 

export const ULogin = () => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>LOGIN</h2>
          <p>Log in with your email address and password.</p>
          <form>
            <div className="form-group">
              <label htmlFor="email">EMAIL ADDRESS *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter a valid email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">PASSWORD *</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
              <p className="password-instructions">
                Password must be at least 8 characters, and contain both letters
                and numbers. Only these symbols can be used: _-.@
              </p>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor="show-password">Show my password</label>
              </div>
            </div>
            <div className="form-links">
              <a href="/terms">TERMS OF USE</a> | <a href="/privacy">PRIVACY POLICY</a>
            </div>
            <button type="submit" className="login-button">
              LOG IN
            </button>
            <div className="forgot-password">
              <a href="/forgot-password">FORGOT YOUR PASSWORD?</a>
            </div>
          </form>
        </div>
        <div className="create-account">
          <h2>CREATE AN ACCOUNT</h2>
          <p>
            If you create an account, it takes less time to go through checkout
            and complete your orders. Register today for free!
          </p>
          <a href="/register">
            <button className="create-account-button">CREATE AN ACCOUNT</button>
          </a>
        </div>
      </div>
      <footer>
        <p>
          COPYRIGHT © Unico ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
};
  
export default ULogin;