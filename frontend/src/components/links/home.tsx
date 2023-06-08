import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

type Props = {
  role?: string;
};
export const Home = (props: Props) => {
  return (
    <div className="home_section center d-flex flex-column">
      <div className="main center">
        <div className="main-left d-flex flex-column justify-content-center">
          <h1 className="mx-3">Autoservisas</h1>

          <p>
            „Mano autoservisas“ didžiuojamės galėdami teikti išskirtines
            automobilių remonto ir priežiūros paslaugas, kad jūsų transporto
            priemonės veiktų sklandžiai. Turėdami ilgametę patirtį ir
            kvalifikuotų technikų komandą, esame pasiryžę teikti aukščiausios
            klasės paslaugas ir užtikrinti klientų pasitenkinimą. Mūsų
            moderniausia įranga aprūpinta naujausiais diagnostikos įrankiais ir
            įranga, kad būtų galima tiksliai nustatyti bet kokias problemas, su
            kuriomis gali susidurti jūsų transporto priemonė. Nuo įprastų
            techninės priežiūros darbų, tokių kaip alyvos keitimas, padangų
            keitimas ir stabdžių patikra, iki sudėtingo variklio remonto ir
            elektros sistemų diagnostikos – mūsų komanda turi kompetencijos visa
            tai atlikti.
          </p>
          <div className="mx-3 d-flex buttons">
            <Link
              to={
                !props.role
                  ? "/reservation/login"
                  : props.role == "user"
                  ? "/reservation"
                  : "/admin/reservation"
              }
              className="custom-btn"
            >
              Rezervacija
            </Link>
            <Link to="/contact" className="custom-btn">
              Kontaktai
            </Link>
          </div>
        </div>
        <div className="main-right center flex-column ">
          <div className="main-right-img img-contain"></div>
        </div>
      </div>
    </div>
  );
};
