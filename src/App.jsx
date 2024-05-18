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
import "@mantine/carousel/styles.css";
import Favorite from "./pages/Favorite/Favorite.jsx";
import CompanyJobs from "./pages/Jobs/CompanyJobs/CompanyJobs.jsx";
import Chat from "./pages/chat/Chat.jsx";
import UserProfile from "./pages/User/UserProfile/UserProfile.jsx";
import CompanyProfile from "./pages/Companies/CompanyProfile/CompanyProfile.jsx";
import JobPostingForm from "./pages/Companies/CompanyJob/JobPostingForm.jsx";
import EditCompanyProfile from "./pages/Companies/EditCompanyProfile/EditCompanyProfile.jsx";
import DeleteAccountPage from "./pages/Accounts/DeleteAccount/DeleteAccountPage.jsx";
import CompanyApps from "./pages/Companies/CompanyApplicants/CompanyApps.jsx";
import CoursePage from "./pages/Home/components/CarouselCourses/CoursePage/CoursePage.jsx";
import BigCoursePage from "./pages/Home/components/CarouselBigCourses/BigCoursePage/BigCoursePage.jsx";
// import JobPostingForm from "./pages/Companies/CompanyJob/JobPostingForm.jsx";
// import DetailNewJob from "./pages/Home/components/sectionJobs/DetailNewJob/DetailNewJob";
// import DetailRecommendJob from "./pages/Home/components/RecommendJobs/DetailRecommendJob/DetailRecommendJob";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/jobs/:page?" Component={JobsPage} />
        <Route path="/jobs/details/:jobId" Component={JobDetails} />
        {/* <Route path="/jobs/detailsNewJob/:jobId" Component={DetailNewJob} /> */}
        {/* <Route
          path="/jobs/detailsRecommendJob/:jobId"
          Component={DetailRecommendJob}
        /> */}
        <Route path="/internships" Component={errorPage} />
        <Route path="/courses/:id" Component={CoursePage} />
        <Route path="/BigCourses/:id" Component={BigCoursePage} />

        <Route path="/favorite/:page?" Component={Favorite} />
        <Route path="/companyJobs" Component={CompanyJobs} />

        <Route path="*" Component={errorPage} />

        <Route path="/SignupCompanies" Component={SignupCompanies} />
        <Route path="/LoginCompanies" Component={LoginCompanies} />

        <Route path="/SignupUser" Component={SignupUser} />
        <Route path="/LoginUser" Component={LoginUser} />
        <Route path="/ForgetPassword" Component={ForgetPass} />
        <Route path="/UpdatePassword" Component={UpdatePassUser} />
        <Route path="/ChangePassword" Component={ChangePass} />
        <Route path="/confirmation/:token" Component={ConfirmationPage} />

        <Route path="/createjob" Component={JobPostingForm} />
        <Route path="/delete_account" Component={DeleteAccountPage} />

        <Route path="/user_profile" Component={UserProfile} />
        <Route path="/company_profile" Component={CompanyProfile} />
        <Route path="/company_app/:jobId" Component={CompanyApps} />

        {/* my application component route */}
        <Route path="/user/myapps" Component={MyApplication} />
        <Route path="/edite_user_profile" Component={EditeProfilePage} />
        <Route path="/edite_company_profile" Component={EditCompanyProfile} />

        <Route path="/chat" Component={Chat} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
