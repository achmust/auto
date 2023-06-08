import { useEffect, useState } from "react";
import "./scss/style.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./components/links/home";
import { About } from "./components/links/about";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthApi from "./helpers/authApi";
import { User } from "./types/types";
import { Reservation } from "./components/links/reservation";
import { Skeleton } from "./components/links/skeleton";
import { Cars } from "./components/links/cars";
import { Visits } from "./components/links/visits";
import { Profile } from "./components/links/profile";
import { Contact } from "./components/links/contact";
import axios from "axios";
import { url } from "./helpers/url";
import { LoginForm } from "./components/forms/loginForm";
import { Dialog } from "./helpers/dialog";
import { Schedule } from "./components/links/schedule";
import { Error } from "./components/links/error";

import { RegisterForm } from "./components/forms/resgisterForm";
import { NewProfile } from "./components/links/newprofile";
import { WorkerForm } from "./components/forms/workerform";
import { UserReservation } from "./components/links/userReservation";
import { AdminVisits } from "./components/links/adminVisits";
import { AdminCars } from "./components/links/adminCars";
import { AdminProfiles } from "./components/links/adminProfiles";
import { AdminWorkers } from "./components/links/adminworkers";
import { ReservationLogin } from "./components/links/reservationlogin";
import { Alert } from "./helpers/alert";

function App() {
  const [user, setUser] = useState<User & { role: string }>();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [logout, setLogOut] = useState<boolean>(false);
  const navigate = useNavigate();
  const autentification = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios.post(`${url}/autentification`, { token }).then((res) => {
      if (res.data.success) {
        const { name, surname, id, roleId, rolename } = res.data.user[0];
        setUser({
          fullname: `${name} ${surname}`,
          id: id,
          role: rolename,
        });
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 2000);
      }
    });
  };
  useEffect(() => {
    autentification();
  }, []);
  const logOut = () => {
    navigate("/");
    setUser(undefined);
    localStorage.clear();
    setLogOut(true);
    setTimeout(() => {
      setLogOut(false);
    }, 2000);
  };
  return (
    <AuthApi.Provider value={{ name: "", password: "" }}>
      <>
        <Routes>
          <Route
            element={
              <Skeleton user={user} logOut={logOut} role={user && user?.role} />
            }
          >
            <>
              <Route path="/" element={<Home role={user?.role} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/login"
                element={<LoginForm autintification={autentification} />}
              />
              <Route
                path="/registration"
                element={<RegisterForm roleId={3} title={"Registracija"} />}
              />
              <Route path="/reservation/login" element={<ReservationLogin />} />
            </>
            <Route path="/" element={<Home role={user?.role} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={<LoginForm autintification={autentification} />}
            />
            <Route
              path="/registration"
              element={<RegisterForm roleId={3} title={"Registracija"} />}
            />
            <Route path="/reservation/login" element={<ReservationLogin />} />

            {user?.role == "user" && (
              <>
                <Route path="/cars" element={<Cars userId={user.id} />} />
                <Route
                  path="/visits"
                  element={
                    <Visits user={{ fullname: user.fullname, id: user.id }} />
                  }
                />
                <Route path="/profile" element={<Profile userid={user.id} />} />
                <Route
                  path="/reservation"
                  element={
                    <UserReservation
                      user={{ fullname: user.fullname, id: user.id }}
                      role={user.role}
                      buttonTitle={"Rezervuoti"}
                    />
                  }
                />
              </>
            )}
            {user?.role == "admin" && (
              <>
                <Route
                  path="/admin/reservation"
                  element={<Reservation user={user} role={user.role} />}
                />

                <Route
                  path="/admin/reservations"
                  element={
                    <AdminVisits
                      user={{ fullname: user.fullname, id: user.id }}
                    />
                  }
                />
                <Route
                  path="/admin/create"
                  element={<NewProfile admin={true} />}
                >
                  <Route
                    path="/admin/create/administrator"
                    element={
                      <RegisterForm
                        roleId={2}
                        title={"Administratoriaus registracija"}
                      />
                    }
                  />
                  <Route
                    path="/admin/create/user"
                    element={
                      <RegisterForm
                        roleId={3}
                        title={"Vartotojo registracija"}
                      />
                    }
                  />
                  <Route path="/admin/create/worker" element={<WorkerForm />} />
                </Route>
                <Route
                  path="/admin/cars"
                  element={<AdminCars userId={user.id} role={user.role} />}
                />
                <Route
                  path="/admin/schedule"
                  element={<Schedule user={user} />}
                />
                <Route
                  path="/admin/profiles"
                  element={<AdminProfiles userId={user.id} />}
                />
                <Route path="/admin/workers" element={<AdminWorkers />} />
              </>
            )}
            {user?.role == "administrator" && (
              <>
                <Route
                  path="/admin/reservation"
                  element={<Reservation user={user} role={user.role} />}
                />
                <Route
                  path="/admin/reservations"
                  element={
                    <Visits user={{ fullname: user.fullname, id: user.id }} />
                  }
                />
                <Route
                  path="/admin/create"
                  element={<NewProfile admin={false} />}
                >
                  <Route
                    path="/admin/create/user"
                    element={
                      <RegisterForm
                        roleId={3}
                        title={"Vartotojo registracija"}
                      />
                    }
                  />
                </Route>
                <Route path="/admin/cars" element={<Cars userId={user.id} />} />
                <Route
                  path="/admin/schedule"
                  element={<Schedule user={user} />}
                />
                <Route path="/admin/workers" element={<AdminWorkers />} />
                <Route
                  path="/admin/profiles"
                  element={<AdminProfiles userId={user.id} />}
                />
              </>
            )}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        {logout && <Dialog title="Sėkmingai!" text="Atsijungta sėkmingai!" />}
        {showDialog && (
          <Dialog title="Sėkmingai!" text="Sėkmingai Prisijunta!" />
        )}
      </>
    </AuthApi.Provider>
  );
}

export default App;
