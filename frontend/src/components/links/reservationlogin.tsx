import { Link } from "react-router-dom";

export const ReservationLogin = (props: { role?: string }) => {
  return (
    <div className="home_section center d-flex flex-column">
      <div className="main center">
        <div className="main-left d-flex flex-column justify-content-center">
          <h2 className="mx-3">
            Norėdami sukurti rezervaciją, būtina prisijungti!
          </h2>

          <Link to="/login" className="custom-btn">
            Prisijungti
          </Link>
          <h2 className="mx-3 mt-5">Neturite paskyros? Prisiregistruokite !</h2>
          <Link to="/registration" className="custom-btn">
            Registracija
          </Link>
        </div>
        <div className="main-right center flex-column ">
          <div className="main-right-img img-contain"></div>
        </div>
      </div>
    </div>
  );
};
