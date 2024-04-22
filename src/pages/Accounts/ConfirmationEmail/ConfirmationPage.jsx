import {  useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
// import { httpRequest } from '../../../core/utils/httpRequest.js';
import API_CONFIG from '../../../core/utils/apiConfig.js';
import axios from 'axios';
import { notifications } from '@mantine/notifications';

function ConfirmationPage() {
  const Navigate = useNavigate();
  const { token } = useParams();
  const [comfirmationValue,setcomfirmationValue]=useState(false);
  if(comfirmationValue==false){
      const fetchdata=async()=>{
       await axios({
          method:"get",
          url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.auth.confirmEmail}/${token}`
        }).then((result=>{
            if(result.status==200){
              if(result.data.data=="user"){
                setcomfirmationValue(true)
                notifications.show({
                  message:result.data.message,
                  color:"green"
                })
                Navigate({
                      pathname: '/LoginUser',
                      state: { confirmationMessage: 'Email confirmed successfully!' },
                      });
              }
              else{
                notifications.show({
                  message:result.data.message,
                  color:"green"
                })
                Navigate({
                      pathname: '/LoginCompanies',
                      state: { confirmationMessage: 'Email confirmed successfully!' },
                      });
    
              }
        }
      })).catch((err=>{
        if(err.response.status==400){
          setcomfirmationValue(true)
          notifications.show({
            message:err.response.data.message,
            color:"red"
          })
          if(JSON.stringify(err.response.data.data)==`"user"`){
            Navigate({
                  pathname: '/LoginUser',
                  state: { confirmationMessage: 'Email confirmed successfully!' }
                  });
          }
          else{
            Navigate({
                  pathname: '/LoginCompanies',
                  state: { confirmationMessage: 'Email confirmed successfully!' }
                  });
          }
    }
      }))
      }
      fetchdata()
   
  }
 

  return null
}

export default ConfirmationPage;


