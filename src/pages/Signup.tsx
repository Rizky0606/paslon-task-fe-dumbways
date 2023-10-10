import React, { useState } from "react";
import { API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let body = {
        username,
        email,
        password,
      };

      API.post("/users", body, config);
      alert("Register Berhasil");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="backdrop-opacity-10 bg-white/30 mx-40 my-20 rounded-md text-white grid grid-cols-2">
      {/* LEFT */}
      <div className="p-12">
        <div className="flex justify-center">
          <p className="font-bold text-[36px]">Register</p>
        </div>
        <div className="mt-12 ml-20">
          <div className="flex align-items">
            <label
              htmlFor="username"
              className="text-[24px] w-[150px] font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={handleChangeUsername}
              id="username"
              placeholder="Masukan Username"
              className="input input-bordered px-5  sm:w-3/12 md:w-6/12 lg:w-7/12 text-black font-medium"
            />
          </div>
          <div className="flex align-items my-5">
            <label
              htmlFor="email"
              className="text-[24px] w-[150px] font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleChangeEmail}
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
              value={password}
              onChange={handleChangePassword}
              id="password"
              placeholder="Masukan Password"
              className="input input-bordered px-5 sm:w-3/12 md:w-6/12 lg:w-7/12 text-black font-medium"
            />
          </div>
          <div className="ml-[150px]">
            <button
              type="button"
              className="bg-blue-600 text-white rounded-md p-3 mt-5 w-[100px] hover:bg-blue-400"
              onClick={handleClickRegister}
            >
              Daftar
            </button>
            <p className="mt-8 text-[18px]">
              Sudah punya akun?{" "}
              <Link to="/login">
                <span className="text-blue-700 "> Klik disini</span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="justify-center">
        <img
          src="/assets/register-logo.png"
          alt=""
          className="w-full h-[500px]"
        />
      </div>
    </div>
  );
};

export default Signup;
