import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginCompanies from "./pages/Companies/LoginCompanies/LoginCompanies";
import SignupCompanies from "./pages/Companies/SignupCompanies/SignupCompanies";
import ForgetPassCompanies from './pages/Companies/ForgetPasswordCompanies/ForgetPassCompanies';
import UpdatePassCompanies from './pages/Companies/UpdatePasswordCompanies/UpdatePassCompanies';
import ForgetPassUser from "./pages/User/ForgetPasswordUser/ForgetPassUser";
import LoginUser from "./pages/User/LoginUser/LoginUser";
import SignupUser from "./pages/User/SignupUser/SignupUser";
import UpdatePassUser from "./pages/User/UpdatePasswordUser/UpdatePassUser";
import "@mantine/core/styles.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/ForgetPassCompanies" Component={ForgetPassCompanies} />
        <Route path="/LoginCompanies" Component={LoginCompanies} />
        <Route path="/SignupCompanies" Component={SignupCompanies} />
        <Route path="/UpdatePassWordCompanies" Component={UpdatePassCompanies} />
        <Route path="/ForgetPasswordUser" Component={ForgetPassUser} />
        <Route path="/LoginUser" Component={LoginUser} />
        <Route path="/SignupUser" Component={SignupUser} />
        <Route path="/UpdatePasswordUser" Component={UpdatePassUser} />
      </Routes>
    </>
  );
}

export default App;
