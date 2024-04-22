const API_CONFIG = {
  baseUrl: "https://api.codesplus.online/api/v1/",
  // baseUrl: "http://localhost:3003/api/v1/",
  secretKey:"internHub__",
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
      userApplication:"job/applications"
    },
    company: {
      fetchCompany: "company/companydata",
    },
    jobs: {
      allJobs: "job/jobs",
      jobDetails: "job/jobdetails",
      getRecommendedJobs: "job/recommendedjobs",
      getCompanyJobs: "company/companyjobs",
      createJob: "company/createJob",
    },
    accounts:{
      changePassword:"account/changePassword"
    }
  },
};

export default API_CONFIG;
