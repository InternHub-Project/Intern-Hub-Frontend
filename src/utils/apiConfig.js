const API_CONFIG = {
  // baseUrl: "https://api.codesplus.online/api/v1/",
  baseUrl: "https://192.168.71.26:3003/api/v1/",
  endpoints: {
    auth: {
      user: {
        login: "auth/user/login",
        signup: "auth/user/signup",
        resetPassword: "auth/forgetPassword",
        resendCode: "auth/user/resendCode",
      },
      company: {
        login: "auth/company/login",
        signup: "auth/company/signup",
        resetPassword: "auth/company/forgetPassword",
        setNewPassword: "auth/company/updatePassword",
        resendCode: "auth/company/resendCode",
      },
      logout: "auth/logout",
      isTokenValid: "auth/istokenvalid",
    },
    user: {
      fetchUser: "user/userdata",
      updateUser: "user/updateUserprofile",
    },
    company: {
      fetchCompany: "company/companydata",
    },
    jobs: {
      getJobs: "job/jobs",
      getRecommendedJobs: "job/recommendedjobs",
      getCompanyJobs: "company/companyjobs",
      createJob: "company/createJob",
    },
  },
};

export default API_CONFIG;
