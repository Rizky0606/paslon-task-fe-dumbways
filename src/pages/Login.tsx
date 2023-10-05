// import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="backdrop-opacity-10 bg-white/30 p-12 mx-40 my-20 rounded-md text-white">
      <div className="flex justify-center">
        <p className="font-bold text-[36px]">Login</p>
      </div>
      <div className="mt-12 ml-20">
        <div className="flex align-items">
          <label
            htmlFor="email"
            className="text-[24px] w-[150px] font-semibold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Masukan Email"
            className="input input-bordered px-5  sm:w-3/12 md:w-6/12 lg:w-7/12 text-black font-medium"
          />
        </div>
        <div className="my-5 flex align-items">
          <label
            htmlFor="password"
            className="text-[24px] w-[150px] font-semibold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Masukan Password"
            className="input input-bordered px-5 sm:w-3/12 md:w-6/12 lg:w-7/12 text-black font-medium"
          />
        </div>
        <div className="ml-[150px] flex">
          <button
            type="button"
            className="bg-blue-600 text-white rounded-md p-3 mt-5 w-[100px]"
          >
            Masuk
          </button>
          <p className="mt-8 ml-28 text-[18px]">
            Belum memiliki akun?{" "}
            <Link to="/sign-up">
              <span className="text-blue-700 "> Klik disini</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
