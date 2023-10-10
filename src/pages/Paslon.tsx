import React, { useState } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";

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
interface DataPartai {
  id: number;
  name: string;
}

const Paslon = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [paslonName, setPaslonName] = useState<string>("");
  const [visiPaslon, setVisiPaslon] = useState<string>("");
  const [partaiPaslon, setPartaiPaslon] = useState<string>("");

  const { data: paslon, isLoading } = useQuery("paslonCache", async () => {
    const response = await API.get("/paslons");
    return response.data.data;
  });

  const { data: partai } = useQuery("partaiCache", async () => {
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

  const handleChangeOptionPartai = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPartaiPaslon(e.target.value);
  };

  const handleSubmitPaslon = () => {
    alert(`Nama Paslon: ${paslonName}
Visi: ${visiPaslon}
Partai: ${partaiPaslon}`);
    setPaslonName("");
    setVisiPaslon("");
    setPartaiPaslon("");
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
                <div className="form-control">
                  <label htmlFor="" className="label font-semibold text-black">
                    Partai
                  </label>
                  <select
                    className="select select-bordered w-full text-black"
                    onChange={handleChangeOptionPartai}
                  >
                    <option selected disabled>
                      Pilih Partai
                    </option>
                    {partai?.map((partai: DataPartai) => {
                      return (
                        <option key={partai.id} value={partai.name}>
                          {partai.name}
                        </option>
                      );
                    })}
                  </select>
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
        <h1 className="text-center text-[50px]">PASLON</h1>
      </div>
      <div className="grid grid-cols-2 my-10 rounded-md">
        {paslon?.map((item: DataPaslon, index: number) => {
          return (
            <div
              key={item.id}
              className="bg-[#176B87] mx-5 text-center rounded-md"
            >
              <h1 className="text-[72px]">{index + 1}</h1>
              <h3 className="text-[45px]">{item.name}</h3>
              <h3 className="text-[30px]">{item.visi}</h3>
              {item?.party?.map((parti) => {
                return (
                  <div key={parti.id}>
                    <p>{parti.name}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Paslon;
