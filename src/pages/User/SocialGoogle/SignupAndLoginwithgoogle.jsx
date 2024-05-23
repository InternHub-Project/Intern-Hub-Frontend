import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import { useNavigate } from "react-router-dom";

function SignupAndLoginwithgoogle() {
  const Navigate=useNavigate()
  const clientId = "660288962062-oute3qb7ecihdoogaqb2nijlht714o7i.apps.googleusercontent.com"
  function handleGoogleLogin (response){
    const accessToken = response?.credential;
    if (accessToken) {
      httpRequest(API_CONFIG.endpoints.auth.user.loginWithGoogle,"POST",JSON.stringify({accessToken})).then((res=>{
        if(res.status==200||res.status==201){
          Navigate("/")
          localStorage.setItem("userInfo",JSON.stringify(res.data))
				window.location.reload()

        }
      }))
    }
  }
  return (
    <GoogleOAuthProvider   clientId={clientId}
    >
   <GoogleLogin
    onSuccess={(response)=>{handleGoogleLogin(response)}}
    onError={(error) => console.error(error)}
    buttonText="Sign in with Google"/>
   </GoogleOAuthProvider>
  )
}

export default SignupAndLoginwithgoogle