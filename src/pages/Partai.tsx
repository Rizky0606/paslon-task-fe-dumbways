import React, { useState } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";

interface DataPartai {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
const Partai = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [paslonName, setPaslonName] = useState<string>("");
  const [visiPaslon, setVisiPaslon] = useState<string>("");

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

  const handleChangePaslonName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaslonName(e.target.value);
  };

  const handleChangeVisiPaslon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisiPaslon(e.target.value);
  };

  const handleSubmitPaslon = () => {
    alert(`Nama Paslon: ${paslonName}
    Visi: ${visiPaslon}`);
    setPaslonName("");
    setVisiPaslon("");
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
              <h3 className="font-bold text-lg text-black">Tambah Paslon</h3>
              <form>
                <div className="form-control">
                  <label htmlFor="" className="label font-semibold text-black">
                    Nama Paslon
                  </label>
                  <input
                    type="text"
                    className="input w-full input-bordered text-black"
                    placeholder="Nama Paslon"
                    value={paslonName}
                    onChange={handleChangePaslonName}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="" className="label font-semibold text-black">
                    Visi
                  </label>
                  <input
                    type="text"
                    className="input w-full input-bordered text-black"
                    placeholder="Visi Paslon"
                    value={visiPaslon}
                    onChange={handleChangeVisiPaslon}
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
      <div className="grid grid-cols-2 my-10 rounded-md">
        {partai?.map((item: DataPartai) => {
          return (
            <div
              key={item.id}
              className="bg-neutral-400 mx-5 text-center h-[200px]"
            >
              <h1 className="text-[72px]">{item.id}</h1>
              <h3 className="text-[30px]">{item.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Partai;
