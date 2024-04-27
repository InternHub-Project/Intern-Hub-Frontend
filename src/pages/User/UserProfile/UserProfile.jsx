import axios from "axios";
import { useState, useEffect } from "react";
import "./UserProfile.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const [userData, setUserData] = useState([]);
  const token=JSON.parse(localStorage.getItem("userInfo")).data.token;

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(()=>{
    axios({
        method: 'get',
        url: 'https://api.codesplus.online/api/v1/user/userdata',
        headers:{"Content-Type": "application/json",
        Authorization:`internHub__${token}`}
        })
        .then(response => {
        setUserData(response.data.data)
        console.log(userData);
	})
	.catch(error => {
		console.error('There was a problem with your fetch operation:', error);
	});
  },[])



  return (
    <div className="container bootstrap snippets bootdey">
<div className="panel-body inf-content">
    <div className="row">
        <div className="col-md-4">
            <img alt=""   title="" className="img-circle img-thumbnail isTooltip" src={userData.profileImage}/> 
            <ul title="Ratings" className="list-inline ratings text-center">
                <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
                <li><a href="#"><span className="glyphicon glyphicon-star"></span></a></li>
            </ul>
        </div>
        <div className="col-md-6">
            <strong >User Information</strong><br/>
            <div className="table-responsive">
            <table className="table table-user-information">
                <tbody>
                    <tr>        
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-asterisk text-primary"></span>
                                userName                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            {userData.userName}     
                        </td>
                    </tr>
                    <tr>    
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-user  text-primary"></span>    
                                Email                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            {userData.email}  
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                Phone                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            {userData.phone}  
                        </td>
                    </tr>

                    <tr>        
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-bookmark text-primary"></span> 
                                gender                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            {userData.gender} 
                        </td>
                    </tr>


                    <tr>        
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-eye-open text-primary"></span> 
                                experienceYears                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            {userData.experienceYears}
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-envelope text-primary"></span> 
                                Email                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            noreply@email.com  
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-calendar text-primary"></span>
                                created                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                            20 jul 20014
                        </td>
                    </tr>
                    <tr>        
                        <td>
                            <strong>
                                <span className="glyphicon glyphicon-calendar text-primary"></span>
                                Modified                                                
                            </strong>
                        </td>
                        <td className="text-primary">
                             20 jul 20014 20:00:00
                        </td>
                    </tr>                                    
                </tbody>
            </table>
            </div>
        </div>
    </div>
</div>
</div>                                        
  );
}

export default UserProfile;