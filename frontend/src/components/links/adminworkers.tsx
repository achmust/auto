import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../../helpers/dialog";
import { url } from "../../helpers/url";
import Modal from "../modal/modal";
import { WorkerModal } from "../modal/workermodal";

type Props = {};

export const AdminWorkers = (props: Props) => {
  const [workers, setWorkers] = useState<
    { id: number; Name: string; Surname: string }[]
  >([]);
  const navigate = useNavigate();
  const [expand, setExpand] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [worker, setWorker] = useState<{
    id: number;
    name: string;
    surname: string;
  }>({
    id: 0,
    name: "",
    surname: "",
  });
  const deleteWorker = (id: number) => {
    axios.post(`${url}/delete/worker`, { id }).then((res) => {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 2000);
    });
  };
  useEffect(() => {
    axios.post(`${url}/workers`).then((res) => {
      setWorkers(res.data.data);
    });
  }, [expand, deleteWorker]);
  return (
    <>
      <div className="container">
        <div className="reservation">
          <div className="reservation-header center">
            <h1>Darbuotojai</h1>
          </div>
          <div>
            <div
              className="custom-btn"
              onClick={() => {
                navigate("/admin/create/worker");
              }}
            >
              Prideti Darbuotoją
            </div>
          </div>
          <div className="reservation-body">
            <div className="container">
              <div className="w-100">
                <div className="cars-list-header d-flex w-100">
                  <div className="car-brand w-50 ps-2">Vardas</div>
                  <div className="car-brand w-50 ps-2">Pavardė</div>
                </div>
                <div className="cars-list-body d-flex flex-column w-100 pt-2">
                  {workers &&
                    workers.map((worker) => {
                      return (
                        <div
                          className="car-item w-100 d-flex"
                          key={worker.id}
                          style={{ position: "relative" }}
                          onClick={() => {
                            setExpand(true);
                            setWorker({
                              id: worker.id,
                              name: worker.Name,
                              surname: worker.Surname,
                            });
                          }}
                        >
                          <div className="car-brand w-50 ps-2">
                            {worker.Name}
                          </div>
                          <div className="car-brand w-50 ps-2">
                            {worker.Surname}
                          </div>
                          <div
                            className="worker-delete center"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteWorker(worker.id);
                            }}
                          >
                            X
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDialog && <Dialog title="Sėkmingai!" text="Sėkmingai Ištrinta!" />}
      {expand && (
        <Modal
          setOpenModal={setExpand}
          title={"Darbuotojo redagavimas"}
          fullscreen={false}
        >
          <WorkerModal {...worker} setExpand={setExpand} />
        </Modal>
      )}
    </>
  );
};
