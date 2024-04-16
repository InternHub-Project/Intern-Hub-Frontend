const API_CONFIG = {
  baseUrl: "https://api.codesplus.online/api/v1/",
  // baseUrl: 'http://localhost:3003/api/v1/',
  endpoints: {
    auth: {
      user: {
        login: "auth/user/login",
        signup: "auth/user/signup",
      },
      company: {
        login: "auth/company/login",
        signup: "auth/company/signup",
      },
      forgetPassword: "auth/forgetPassword",
      setPassword: "auth/user/setPassword",
      resendCode: "auth/reSendcode",
    },
    user: {
      userProfile: "user/userdata",
      updateProfile: "user/updateUserprofile",
      applyToJob: "user/apply",
    },
    job: {
      allJobs: "job/jobs",
      recommendedJobs: "job/recommendedjobs",
      userApllications: "job/applications",
      jobDetails: "/job/jobdetails",
      jobApplications_for_company: "/job/jobapplicants",
    },
  },
};

export default API_CONFIG;
