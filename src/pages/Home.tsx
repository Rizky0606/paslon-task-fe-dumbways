import React, { useState } from "react";
import { useQuery } from "react-query";
// import { API } from "../config/api";

interface PartyObj {
  id: number;
  name: string;
}

interface DataUsers {
  id: number;
  name: string;
  visi: string;
  party: PartyObj[];
}

const DataPaslon = {
  code: 200,
  data: [
    {
      id: 1,
      name: "Jhon doe",
      visi: "merebut isekai dari pemerintahan dunia",
      party: [
        {
          id: 1,
          name: "Wota",
        },
        {
          id: 3,
          name: "Wibooo",
        },
      ],
      created_at: "2023-09-23T18:11:54.223+07:00",
      updated_at: "2023-09-23T18:11:54.223+07:00",
    },
    {
      id: 2,
      name: "Rebbecca Eltra",
      visi: "merebut isekai dari pemerintahan dunia",
      party: [
        {
          id: 2,
          name: "Nusantara United",
        },
        {
          id: 3,
          name: "Muhammadiah City",
        },
      ],
      created_at: "2023-09-23T19:18:26.666+07:00",
      updated_at: "2023-09-23T19:18:26.666+07:00",
    },
  ],
};

const Home = () => {
  //   const [dataUsers, setDataUsers] = useState<DataUsers[] | null>(null);
  const [dataPaslon, setDataPaslon] = useState<string>("");
  const [nameVoter, setNameVoter] = useState<string>("");

  const {
    data: users,
    isLoading,
    // error,
  } = useQuery("usersCache", () => {
    // const response = await API.get("/users?_page=1&_limit=3");
    const response = DataPaslon;

    return response.data;
  });
  //   console.log(error);

  const handleChangeVoterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameVoter(e.target.value);
  };
  const handleChangeRadioPaslon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataPaslon(e.target.value);
  };

  const handleSubmitPaslon = () => {
    setDataPaslon("");
    setNameVoter("");
    alert(`Name: ${nameVoter}
Paslon: ${dataPaslon}`);
  };

  //   if (error) {
  //     return <div>Error: {error}</div>;
  //   }

  if (isLoading) {
    return (
      <div className="flex justify-center align-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* PASLON */}
      <div className="grid px-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {users?.map((paslon: DataUsers) => {
          return (
            <div
              className=" m-5 backdrop-opacity-10 bg-white/30 rounded-md hover:scale-110 "
              key={paslon.id}
            >
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 py-10 lg:mx-0 lg:max-w-none ">
                  <article className="flex max-w-xl flex-col items-start justify-between">
                    <div className="group relative ">
                      <h3 className="mt-3 leading-6 text-white font-bold text-[30px] group-hover:text-gray-600">
                        <p>
                          <span className="absolute inset-0"></span>
                          {paslon.name}
                        </p>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-lg leading-6 text-gray-800">
                        {paslon.visi}
                      </p>
                    </div>
                    <div className="mt-5 flex gap-5 text-[12px]">
                      {/* <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        Marketing
                      </p> */}
                      {paslon?.party?.map((item) => {
                        return (
                          <p
                            key={item.id}
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {item.name}
                          </p>
                        );
                      })}
                    </div>
                  </article>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* END PASLON */}

      <div className="w-full flex flex-wrap">
        {/* COUNTER VOTES */}
        <div className="flex-1 m-10 backdrop-opacity-10 backdrop-invert bg-white/30 p-7 rounded-md">
          <div className="flex flex-col items-start">
            <p className="font-bold text-white text-[30px] m-auto">
              Suara Saat Ini
            </p>
            <ul>
              {users?.map((paslon: DataUsers) => {
                return (
                  <li
                    key={paslon.id}
                    className="my-5 text-white text-[20px] font-bold"
                  >
                    {paslon.name} :
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* FORM VOTE */}
        <div className="flex-1 m-10 backdrop-opacity-10 backdrop-invert bg-white/30 text-white rounded-md">
          <div className="flex flex-col px-7 py-5">
            <label htmlFor="inputName" className="text-[20px]">
              Masukan Nama
            </label>
            <input
              className="w-72 my-3 h-10 rounded-md px-5"
              type="text"
              id="inputName"
              value={nameVoter}
              placeholder="Input Name"
              onChange={handleChangeVoterName}
            />
          </div>
          <div className="flex mx-7 py-3">
            <div className="form-control ">
              {users?.map((paslon: DataUsers) => {
                return (
                  <div key={paslon.id} className="flex">
                    <label className="label cursor-pointer">
                      <input
                        type="radio"
                        name="radio-10"
                        onChange={handleChangeRadioPaslon}
                        className="radio radio-info mx-5"
                        value={paslon.name}
                      />
                      <span className="label-text text-white font-semibold text-[20px]">
                        {paslon.name}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="py-5 px-7">
            {nameVoter === "" || dataPaslon === "" ? (
              <button
                className="w-20 rounded-md bg-blue-300 h-10 text-white font-bold "
                disabled
              >
                Submit
              </button>
            ) : (
              <button
                className="w-20 rounded-md bg-blue-500 h-10 text-white font-bold hover:bg-blue-300"
                onClick={handleSubmitPaslon}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
