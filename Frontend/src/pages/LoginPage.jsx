// imports cleaned up: login handled by useLogin hook
import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const { isLoading, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
  <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            {/* LOGO */}
            <ShipWheelIcon className="w-9 h-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Echooo
            </span>
          </div>
          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error?.response?.data?.message || error?.message || "An error occurred"}</span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your language journey
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="form-control w-full space-y-2">
                    <label htmlFor="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="hello@example.com"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                    <div className="form-control w-full space-y-2">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="********"
                        className="input input-bordered w-full"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="loading loading-spinner loading-xs"></span>
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <p className="text-sm">
                        Don't have an account ? {" "}
                        <Link to="/signup" className="text-primary hover:underline" >
                        Create one
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/*ILLUSTRATION*/}
              <div className="relative aspect-square max-w-sm mx-auto">
              {/* If the filename has spaces, either URL-encode it or rename the file to remove spaces (recommended) */}
              <img src="/Video%20call-bro.png" alt="Language connection illustration" className="w-full h-full object-cover" />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
