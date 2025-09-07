import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex">
      {/* Left content */}
      <div className="w-screen h-screen max-w-[50%] p-8 flex flex-col justify-center">
        <h2 className="text-blue-600 text-2xl font-semibold mb-6 ml-10">Finance-Buddy</h2>
        {children}
      </div>

      {/* Right side */}
      <div className="md:flex w-[60%] bg-gradient-to-br from-blue-50 to-blue-200 justify-center items-center text-center relative overflow-hidden p-8">
        {/* Background shapes */}
        <div className="absolute w-72 h-72 top-[-10%] left-[10%] bg-blue-400/30 rounded-full animate-spin-slow"></div>
        <div className="absolute w-96 h-96 bottom-[-15%] right-[-10%] bg-blue-300/25 rounded-full animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 top-[20%] right-[15%] bg-gradient-to-tr from-blue-400 to-blue-200 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute w-32 h-2 bg-gradient-to-r from-blue-500 to-blue-300 top-[35%] left-[20%] opacity-30 rotate-12"></div>
        <div className="absolute w-24 h-2 bg-gradient-to-r from-blue-500 to-blue-300 bottom-[40%] right-[15%] opacity-30 rotate-[-25deg]"></div>


        {/* Content */}
        <div className="max-w-[80%] relative z-10 flex flex-col items-center mx-auto px-4 py-25
                min-h-screen sm:min-h-0 sm:justify-start">
          {/* Card Image */}
          <div className="relative inline-block mb-6">
            <img
              src="/card.png"
              alt="card"
              className="lg:w-[90%] object-contain shadow-2xl rounded-2xl z-10 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_25px_rgba(37,99,235,0.8)]"
            />
          </div>

          {/* Text */}
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Smart Finance, Simplified.
          </h3>
          <p className="text-sm text-blue-800 leading-relaxed text-center">
            Manage your expenses, track budgets, and achieve your goals with
            Finance-Buddy.
          </p>
        </div>
      </div>
    </div>
  );
}
