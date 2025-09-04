import React from "react";


export default function AuthLayout({ children }) {
  return (
    <div className="auth-container">
      {/* Left content */}
      <div className="auth-left">
        <h2 className="auth-title">Finance-Buddy</h2>
        {children}
      </div>

      {/* Right side with circles, icons, and text */}
      <div className="auth-right">
        {/* Decorative Circles */}
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>

        <div className="auth-content">
          {/* Floating Image */}
          <div className="image-wrapper">
            <img src="/card.png" alt="card" className="auth-image float-animation" />

            {/* Icons around image */}
            <i className="fas fa-coins icon icon1"></i>
            <i className="fas fa-chart-line icon icon2"></i>
            <i className="fas fa-wallet icon icon3"></i>
            <i className="fas fa-piggy-bank icon icon4"></i>
          </div>

          {/* Text */}
          <h3 className="auth-tagline">Smart Finance, Simplified.</h3>
          <p className="auth-subtext">
            Manage your expenses, track budgets, and achieve your goals with Finance-Buddy.
          </p>
        </div>
      </div>
    </div>
  );
}
