import React, { useState } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";

interface DataPartai {
  id: number;
  name: string;
}

const Partai = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [partaiName, setPartaiName] = useState<string>("");

  const { data: partai, isLoading } = useQuery("partaiCache", async () => {
    const response = await API.get("/parties");
    return response.data.data;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center align-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleChangePartaiName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartaiName(e.target.value);
  };

  const handleSubmitPaslon = () => {
    alert(`Nama Partai: ${partaiName}`);
    setPartaiName("");
    setModal(false);
  };

  return (
    <div className="backdrop-opacity-10 bg-white/30 p-12 mx-40 my-20 rounded-md text-white">
      <div>
        {/* MODAL */}
        <div style={{ float: "right" }}>
          <button className="btn" onClick={handleChangeModal}>
            Tambah
          </button>
          <input
            type="checkbox"
            checked={modal}
            onChange={handleChangeModal}
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-black">Tambah Partai</h3>
              <form>
                <div className="form-control">
                  <label htmlFor="" className="label font-semibold text-black">
                    Nama Partai
                  </label>
                  <input
                    type="text"
                    className="input w-full input-bordered text-black"
                    placeholder="Nama Partai"
                    value={partaiName}
                    onChange={handleChangePartaiName}
                  />
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleChangeModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitPaslon}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* END MODAL */}
        <h1 className="text-center text-[50px]">PARTAI</h1>
      </div>
      <div className="grid grid-cols-2 my-10">
        {partai?.map((item: DataPartai, index: number) => {
          return (
            <div
              key={item.id}
              className="bg-[#445069] mx-5 text-center h-[200px] rounded-md"
            >
              <h1 className="text-[72px]">{index + 1}</h1>
              <h3 className="text-[30px]">{item.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Partai;
