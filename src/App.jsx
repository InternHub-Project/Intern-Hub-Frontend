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
import ForgetPass from "./pages/Accounts/ForgetPassword/ForgetPass.jsx";
import ChangePass from "./pages/Accounts/ChangePassword/ChangePass.jsx";
import UpdatePassUser from "./pages/Accounts/UpdatePassword/UpdatePass.jsx";
import ConfirmationPage from "./pages/Accounts/ConfirmationEmail/ConfirmationPage.jsx";
import MyApplication from "./pages/User/ApplicationUser/myApplication.jsx";
import EditeProfilePage from "./pages/User/editeProfilePage/EditeProfilePage.jsx";
import JobDetails from "./pages/Jobs/JobDetails/JobDetails.jsx";
import JobsPage from "./pages/Jobs/JobsPage.jsx";
// import Chat from "./pages/chat/Chat.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/jobs/:page?" Component={JobsPage}/>
        <Route path="/jobs/details/:jobId" Component={JobDetails}/>
        <Route path="/internships" Component={errorPage} />

        <Route  path="*" Component={errorPage} />
        
        <Route path="/SignupCompanies" Component={SignupCompanies} />
        <Route path="/LoginCompanies" Component={LoginCompanies} />

        <Route path="/SignupUser" Component={SignupUser} />
        <Route path="/LoginUser" Component={LoginUser} />
        <Route path="/ForgetPassword" Component={ForgetPass} />
        <Route path="/UpdatePassword" Component={UpdatePassUser} />
        <Route path="/ChangePassword" Component={ChangePass} />
        <Route path="/confirmation/:token"  Component={ConfirmationPage} />
        
        {/* my application component route */}
				<Route path="/user/myapps" Component={MyApplication} />
				<Route path="/user_profile" Component={EditeProfilePage} />
				{/* <Route path="/chat" Component={Chat} /> */}
	


        

      </Routes>
      <Footer />
    </>
  );
}

export default App;