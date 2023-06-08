import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";

export const Contact = () => {
  return (
    <div className="home_section center d-flex flex-column">
      <div className="main center">
        <div className="main-left d-flex flex-column justify-content-center">
          <h1 className="mx-3 center">KONTAKTAI</h1>
          <div className="container d-flex mt-3">
            <div
              className="w-50 center d-flex flex-column"
              style={{ borderRight: "1px solid grey" }}
            >
              <GiIcons.GiRotaryPhone size={"50px"} />
              <div
                style={{ fontSize: "20px", fontWeight: "600" }}
                className="pt-2"
              >
                <a href="tel:+37066233328">+37066233328</a>
              </div>
            </div>
            <div className="w-50 center d-flex flex-column">
              <BsIcons.BsMailbox2 size={"50px"} />
              <div
                style={{ fontSize: "20px", fontWeight: "600" }}
                className="pt-2"
              >
                <a href="mailto:mano.autoserivsas@gmail.com">
                  mano.autoserivsas@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="main-right center flex-column ">
          <div className="contact-right-img img-cover"></div>
        </div>
      </div>
    </div>
  );
};
