import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../helpers/url";
import { CarList, CarType } from "../../types/types";
import Modal from "../modal/modal";
import { Input } from "../../helpers/inputs/input";
import { CarModal } from "../modal/carModal";
type Props = {
  userId: number;
  role: string;
};
type AdminCar = {
  UserId: number;
  carbrand: string;
  carmodel: string;
  carplate: string;
  caryear: string;
  id: number;
  name: string;
  surname: string;
};
export const AdminCars = (props: Props) => {
  const [carsList, setCarsList] = useState<AdminCar[]>();
  const [expand, setExpand] = useState<boolean>(false);
  const [addCar, setAddCar] = useState<boolean>(false);
  const [userid, setUserId] = useState<number>(0);
  const [car, setCar] = useState<CarType>({
    carbrand: "",
    carmodel: "",
    caryear: "",
    carplate: "",
  });
  const [carId, setCardId] = useState<number>(0);
  const onSubmit = () => {
    if (car.carbrand && car.carmodel && car.carplate && car.caryear) {
      if (props.role != "user" && userid == 0) {
        alert("Neužpildėte visu reikiamu laukeliu");
      } else {
        axios
          .post(`${url}/add/car`, {
            car,
            userid: props.role == "user" ? props.userId : userid,
          })
          .then((res: any) => {
            if (res.data.success) {
              clearState();
              setAddCar(false);
            } else {
              console.log(res.data);
            }
          });
        setUserId(0);
      }
    }
  };
  const onChange = () => {
    if (car.carbrand && car.carmodel && car.carplate && car.caryear) {
      axios
        .post(`${url}/car/update`, {
          car,
          userid: props.userId,
          carid: carId,
        })
        .then((res: any) => {
          if (res.data.success) {
            clearState();
            setExpand(false);
          } else {
            console.log(res.data);
          }
        });
    }
  };
  useEffect(() => {
    axios
      .post(`${url}/admin/cars/get`, { userid: props.userId })
      .then((res) => {
        setCarsList(res.data.cars);
      });
  }, [props.userId, onSubmit, onChange]);
  const clearState = () => {
    setCar({
      carbrand: "",
      carmodel: "",
      caryear: "",
      carplate: "",
    });
  };
  return (
    <>
      <div className="container">
        <div className="reservation">
          <div className="reservation-header center">
            <h1>Automobiliai</h1>
          </div>
          <div>
            <div
              className="custom-btn"
              onClick={() => {
                setAddCar(true);
              }}
            >
              Prideti automobili
            </div>
          </div>
          <div className="reservation-body">
            <div className="container">
              <div className="w-100">
                <div className="cars-list-header d-flex w-100">
                  <div className="car-brand w-25 ps-2">Savininkas</div>
                  <div className="car-brand w-25 ps-2">Gamintojas</div>
                  <div className="car-model w-25 ps-2">Modelis</div>
                  <div className="car-year w-25 ps-2">Metai</div>
                  <div className="car-plate w-25 ps-2">Numeriai</div>
                </div>
                <div className="cars-list-body d-flex flex-column w-100 pt-2">
                  {carsList &&
                    carsList.map((car) => {
                      return (
                        <div
                          className="car-item w-100 d-flex"
                          key={car.id}
                          onClick={() => {
                            setCardId(car.id);
                            setCar({
                              carbrand: car.carbrand,
                              carmodel: car.carmodel,
                              caryear: car.caryear,
                              carplate: car.carplate,
                            });
                            setExpand(true);
                          }}
                        >
                          <div className="car-brand w-25 ps-2">
                            {car.name} {car.surname}
                          </div>
                          <div className="car-brand w-25 ps-2">
                            {car.carbrand}
                          </div>
                          <div className="car-model w-25 ps-2">
                            {car.carmodel}
                          </div>
                          <div className="car-year w-25 ps-2">
                            {car.caryear}
                          </div>
                          <div className="car-plate w-25 ps-2">
                            {car.carplate}
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
      {expand && (
        <CarModal
          buttonText="Redaguoti"
          setCar={setCar}
          setExpand={() => {
            setExpand(false);
            clearState();
          }}
          onSubmit={onChange}
          {...car}
        />
      )}
      {addCar && (
        <CarModal
          buttonText="Pridėti"
          setCar={setCar}
          setExpand={() => {
            setAddCar(false);
            clearState();
          }}
          setUserId={setUserId}
          onSubmit={onSubmit}
          admin={props.role == "user" ? false : true}
          {...car}
        />
      )}
    </>
  );
};
