const API_CONFIG = {
  baseUrl: "https://api.codesplus.online/api/v1/",
  // baseUrl: "http://localhost:3003/api/v1/",
  secretKey:"internHub__",
  // socketConnection:"https://api.codesplus.online",
  socketConnection:"http://localhost:3003",

  endpoints: {
    auth: {
      user: {
        login: "auth/user/login",
        signup: "auth/user/signup",
        loginWithGoogle:"auth/googlelogin"
      },
      company: {
        login: "auth/company/login",
        signup: "auth/company/signup",
      },
      resendCode: "auth/resendCode",
      confirmEmail:"auth/confirmemail",
      forgetPassword: "auth/forgetPassword",
      setPassword: "auth/setPassword",
      isTokenValid: "auth/istokenvalid",
      logout: "auth/logout",
    },
    user: {
      fetchUser: "user/userdata",
      updateUser: "user/updateUserprofile",
      logout: "auth/logout",
      applyToJob: "user/apply",
      userApplication:"job/applications",
      favorite:"user/userfavourite",
      AddToFav:"user/addtofavourite",
      RemoveFromFav:"user/removeFromFavourite"
    },
    company: {
      fetchCompany: "company/companydata",
      topBrands:"job/topbrands",
      companyjobs:"company/companyjobs",
      createJob: "company/createJob",
      updateCompany: "company/updatecompanyprofile",
      jobApplicants:"job/jobapplicants",
      startChat:"company/startchat"

    },
    jobs: {
      allJobs: "job/jobs",
      jobDetails: "job/jobdetails",
      getRecommendedJobs: "job/recommendedjobs",
      getCompanyJobs: "company/companyjobs",

      applyJob:"job/apply_requirement",
      newjobs:"job/newjobs",
      

    },
    accounts:{
      changePassword:"account/changePassword",
      userOrCompanyList:"account/user_or_company_list",
      userOrCompanyChat:"account/user_or_company_chat",
      DeleteAccount:"account/delete"
    }
  },
};

export default API_CONFIG;
