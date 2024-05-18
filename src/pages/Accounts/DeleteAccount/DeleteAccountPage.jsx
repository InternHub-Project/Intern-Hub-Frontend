import { Container, Button } from '@mantine/core';
import classes from "./DeleteAccount.module.css"
import { useNavigate } from 'react-router-dom';
import { httpRequest } from '../../../core/utils/httpRequest.js';
import API_CONFIG from '../../../core/utils/apiConfig.js';
function DeleteAccountPage() {

    const navigate=useNavigate()
    const token=JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")).data.token:JSON.parse(localStorage.getItem("companyInfo")).data.token

  const handleDelete = () => {
    httpRequest(API_CONFIG.endpoints.accounts.DeleteAccount,"DELETE",{},{Authorization:`${API_CONFIG.secretKey}${token}`}).then((res)=>{
      console.log(res)
      if(res.status==200){
        localStorage.clear()
        navigate("/LoginUser")
      }
    }).catch((err)=>{
      console.log(err)
    })
  
  };

  const handleCancel = () => {
    navigate("/")
  };

  return (
    <Container className={classes.main}>
        <Container className={classes.child}>
      <h1 className={classes.title}>Delete Account</h1>
      <p style={{color:"black",paddingBottom:"10px"}}>Are you sure you want to delete your account?</p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={handleDelete} className={classes.submit}>
          Delete
        </Button>
        <Button onClick={handleCancel} className={classes.cancel}>
          Cancel
        </Button>
      </div>
    </Container>
    </Container>
  );
}

export default DeleteAccountPage;
