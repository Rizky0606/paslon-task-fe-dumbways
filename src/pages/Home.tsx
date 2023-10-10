import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

interface PartyObj {
  id: number;
  name: string;
}

interface DataPaslon {
  id: number;
  name: string;
  visi: string;
  party: PartyObj[];
}

interface VoterObj {
  id: number;
  voter_name: string;
  paslon: {
    id: number;
    name: string;
    visi: string;
  };
}

const Home = () => {
  //   const [selectedPaslon, setSelectedPaslon] = useState<number | null>();
  const [selectedPaslon, setSelectedPaslon] = useState<string>("");
  const [nameVoter, setNameVoter] = useState<string>("");
  const [countVotes, setCountVotes] = useState<{ [paslonId: number]: number }>(
    {}
  );

  const {
    data: paslon,
    refetch: paslonRefetch,
    isLoading,
  } = useQuery("paslonCache", async () => {
    const response = await API.get("/paslons");

    return response.data.data;
  });

  const { data: votes, refetch: votesRefecth } = useQuery(
    "paslonCache",
    async () => {
      const response = await API.get("/votes");

      return response.data.data;
    }
  );
  //   console.log(error);

  const handleChangeVoterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameVoter(e.target.value);
  };

  //   const handleChangeRadioPaslon = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSelectedPaslon(parseInt(e.target.value));
  //   };

  const handleChangeRadioPaslon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaslon(e.target.value);
  };

  //   const handleSubmitPaslon = useMutation(
  //     async (e: React.MouseEvent<HTMLButtonElement>) => {
  //       try {
  //         e.preventDefault();
  //         const config = {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         };

  //         let body = JSON.stringify({
  //           paslon_id: selectedPaslon,
  //           voter_name: nameVoter,
  //         });

  //         const response = await API.post("/vote", body, config);
  //         console.log(response);

  //         setNameVoter("");
  //         setSelectedPaslon(null);
  //         paslonRefetch();
  //         votesRefecth();
  //       } catch (error) {
  //         console.log(`Error: ${error}`);
  //       }
  //     }
  //   );

  const handleSubmitPaslon = useMutation(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        alert(`Nama: ${nameVoter}
        Paslon: ${selectedPaslon}`);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  );

  useEffect(() => {
    const countVotes = () => {
      const counts: { [paslonId: number]: number } = {};

      votes?.forEach((voter: VoterObj) => {
        const paslonId = voter?.paslon?.id;

        if (counts[paslonId]) {
          counts[paslonId] = counts[paslonId] + 1;
        } else {
          counts[paslonId] = 1;
        }
      });
      setCountVotes(counts);
    };

    countVotes();
    paslonRefetch();
    votesRefecth();
  }, [votes, paslonRefetch, votesRefecth]);

  if (isLoading) {
    return (
      <div className="flex justify-center align-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* PASLON */}
        <div className="grid px-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {paslon?.map((paslon: DataPaslon) => {
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
                      <div className="mt-5  text-[12px]">
                        {/* <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        Marketing
                      </p> */}
                        {paslon?.party?.map((item) => {
                          return (
                            <p
                              key={item.id}
                              className="relative z-10 rounded-sm bg-gray-50 my-3 px-3 py-3 font-medium text-gray-600 hover:bg-gray-100"
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
                {paslon?.map((paslon: DataPaslon) => {
                  return (
                    <li key={paslon?.id}>
                      <span className="my-5 text-white text-[20px] font-bold">
                        {paslon?.name} :{" "}
                      </span>
                      <span className="countdown">
                        <span
                          style={
                            {
                              "--value": countVotes[paslon?.id],
                            } as React.CSSProperties
                          }
                        ></span>
                      </span>
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
                className="w-72 my-3 h-10 rounded-md px-5 text-black"
                type="text"
                id="inputName"
                value={nameVoter}
                placeholder="Input Name"
                onChange={handleChangeVoterName}
              />
            </div>
            <div className="flex mx-7 py-3">
              <div className="form-control ">
                {paslon?.map((paslon: DataPaslon) => {
                  return (
                    <div key={paslon.id} className="flex">
                      <label className="label cursor-pointer">
                        <input
                          type="radio"
                          name="radio-10"
                          onChange={handleChangeRadioPaslon}
                          className="radio radio-info mx-5"
                          //   value={paslon?.id}
                          value={paslon?.name}
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
              {nameVoter === "" || selectedPaslon === null ? (
                <button
                  className="w-20 rounded-md bg-blue-300 h-10 text-white font-bold "
                  disabled
                >
                  Submit
                </button>
              ) : (
                <button
                  className="w-20 rounded-md bg-blue-500 h-10 text-white font-bold hover:bg-blue-300"
                  onClick={(e) => handleSubmitPaslon.mutate(e)}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
