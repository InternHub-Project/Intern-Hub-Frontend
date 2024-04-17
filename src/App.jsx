import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginCompanies from "./pages/Companies/LoginCompanies/LoginCompanies";
import SignupCompanies from "./pages/Companies/SignupCompanies/SignupCompanies";
import LoginUser from "./pages/User/LoginUser/LoginUser";
import SignupUser from "./pages/User/SignupUser/SignupUser";
import "@mantine/core/styles.css";
import Header from "./pages/Home/components/Header/Header";
import { Footer } from "./pages/Home/components/Footer/Footer";
import { errorPage } from "./core/shared/component/errorPage/errorPage.jsx";
import JobsPage from "./pages/Jobs/JobsPage";
import ForgetPass from "./pages/Accounts/ForgetPassword/ForgetPass.jsx";
import UpdatePassUser from "./pages/Accounts/UpdatePassword/UpdatePass.jsx";
import ConfirmationPage from "./pages/Accounts/ConfirmationEmail/ConfirmationPage.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/jobs" Component={JobsPage} />
        <Route path="/internships" Component={errorPage} />

        <Route path="*" Component={errorPage} />

        <Route path="/SignupCompanies" Component={SignupCompanies} />
        <Route path="/LoginCompanies" Component={LoginCompanies} />

        <Route path="/SignupUser" Component={SignupUser} />
        <Route path="/LoginUser" Component={LoginUser} />

        <Route path="/ForgetPassword" Component={ForgetPass} />
        <Route path="/UpdatePassword" Component={UpdatePassUser} />
        
        <Route path="/confirmation/:token"  Component={ConfirmationPage} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
