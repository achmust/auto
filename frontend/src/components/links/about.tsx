type Props = {};
export const About = (props: Props) => {
  return (
    <div className="home_section center d-flex flex-column">
      <div className="main center">
        <div className="main-left d-flex flex-column justify-content-center">
          <h1 className="mx-3">Apie mus</h1>

          <p>
            Įmonėje „Mano autoservisas“ esame atsidavusi automobilių entuziastų
            komanda, kuriai būdinga aistra teikti išskirtines paslaugas ir
            užtikrinti, kad jūsų transporto priemonės veiktų sklandžiai.
            Turėdami ilgametę patirtį šioje pramonėje, sukūrėme reputaciją dėl
            savo profesionalumo, patirties ir įsipareigojimo patenkinti
            klientus. Kaip pilno aptarnavimo automobilių servisas, siūlome platų
            paslaugų spektrą, kad patenkintume visus jūsų automobilių poreikius.
            Nuo įprastų techninės priežiūros darbų, tokių kaip tepalų keitimas,
            padangų keitimas ir skysčių patikra, iki sudėtingo remonto ir
            diagnostikos, mūsų kvalifikuoti technikai turi žinių ir patirties
            visa tai atlikti. Mes nuolat informuojame apie naujausius
            automobilių technologijų pasiekimus ir investuojame į naujausią
            įrangą, kad užtikrintume tikslią diagnostiką ir efektyvų remontą.
          </p>
          <div className="mx-3 d-flex buttons"></div>
        </div>
        <div className="main-right center flex-column ">
          <div className="about-right-img img-contain"></div>
        </div>
      </div>
    </div>
  );
};
