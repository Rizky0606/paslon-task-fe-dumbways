// import React from "react";
import { useEffect } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";

interface DataVotes {
  id: number;
  voter_name: string;
  paslon: {
    id: number;
    name: string;
    visi: string;
  };
}
const Votes = () => {
  const {
    data: votes,
    isLoading,
    refetch: voteRefetch,
  } = useQuery("voteCache", async () => {
    const response = await API.get("/votes");

    return response.data;
  });

  useEffect(() => {
    voteRefetch();
  }, [voteRefetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center align-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="backdrop-opacity-10 bg-white/30 p-12 mx-40 my-20 rounded-md text-white">
      <div className="text-center text-[36px] font-bold">
        <h1>Partisipasi Voter Sebanyak : {votes.length} Orang</h1>
      </div>
      <div className="my-10 text-[24px] font-semibold">
        {votes?.map((item: DataVotes) => {
          return (
            <div key={item.id}>
              <p>
                {item.voter_name} Memilih :{" "}
                <span className="font-bold">{item.paslon.name}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Votes;
