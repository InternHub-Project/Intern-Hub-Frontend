const API_CONFIG = {
    // baseUrl: 'https://api.codesplus.online/api/v1/',
    baseUrl: 'http://localhost:3003/api/v1/',
    endpoints: {
        userLogin: 'user/login',
        userSignup: 'auth/user/signup',
        setPassword: 'auth/user/setPassword',
        resendCode: 'auth/reSendcode',
    },
};

export default API_CONFIG;
