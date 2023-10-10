import React, { useState, useEffect } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";

interface DataUser {
  id: number;
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const { data: users, refetch: userRefetch } = useQuery(
    "userCache",
    async () => {
      const response = await API.get("/users");
      return response.data;
    }
  );

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const filteringUser = users.filter((user: DataUser) => {
        return user.email === email && user.password === password;
      });

      if (filteringUser.length === 0) {
        alert("Login Gagal");
        setEmail("");
        setPassword("");
      } else {
        localStorage.setItem("user", JSON.stringify(filteringUser));
        alert("Login Berhasil");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userRefetch();
  }, [userRefetch]);

  return (
    <div className=" flex backdrop-opacity-10 bg-white/30  mx-40 my-20 rounded-md text-white">
      {/* LEFT  */}
      <div className="h-full">
        <img src="/assets/pemilu-login.jpg" alt="" />
      </div>

      {/* RIGHT  */}
      <div className="p-12">
        <div>
          <p className="font-bold text-[36px] text-center">Login</p>
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
              id="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="Masukan Password"
              className="input input-bordered px-5 sm:w-3/12 md:w-6/12 lg:w-7/12 text-black font-medium"
            />
          </div>
          <div className=" flex flex-col">
            <button
              type="button"
              className="btn bg-blue-500 text-white"
              onClick={handleClickLogin}
            >
              Masuk
            </button>
            <p className="mt-8 text-[18px]">
              Belum memiliki akun?{" "}
              <Link to="/sign-up">
                <span className="text-blue-700 "> Klik disini</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
