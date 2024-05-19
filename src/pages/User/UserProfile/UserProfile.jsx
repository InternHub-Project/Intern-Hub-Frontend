import axios from "axios";
import { useState, useEffect } from "react";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import "./UserProfile.module.css"
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const Navigate=useNavigate()
  const [userData, setUserData] = useState([]);
  const token = JSON.parse(localStorage.getItem("userInfo")).data.token;

  useEffect(() => {
    axios({
      method: 'get',
      url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.fetchUser}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `internHub__${token}`
      }
    })
      .then(response => {
        setUserData(response.data.data)
        console.log(userData);
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, [])

  const handleEdit=()=>{
    Navigate("/edite_user_profile")
  }
  return (
    <div className="container">
    <div className="main-body">
          <div className="row gutters-sm"  style={{ justifyContent: "center"}}>
          <div style={{textAlign:"center", fontSize:"35px", fontWeight:"600" ,marginBottom:"30px"}}>
                General Information
            </div>
            <div style={{textAlign:"center", fontSize:"18px" ,marginBottom:"5px", backgroundColor:"#ffff6c", borderRadius:"8px" ,padding:"4px"}} className="col-md-8 text-secondary">
            Complete you Profile before Start apply to Internships. Always make sure it is up to date.
            </div>
            <div className="col-md-8" style={{ border: "1px solid var(--outline-field-color)", borderRadius: "10px", boxShadow: "-2px -2px 6px var(--form-shadow), 2px 2px 6px var(--form-shadow)" }}>
                <h3 style={{marginLeft:"15px", marginBottom:"25px",marginTop:"20px", fontSize:"30px"}}>User information :</h3>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Full Name</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.userName}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Email</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">User Bio</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData.bio}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Phone</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.phone}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Gender</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData.gender}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Address</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData?.address?.address? userData?.address?.address: "____"}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">City</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData?.address?.city? userData?.address?.city: "____"}

                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Country</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.address?.country? userData?.address?.country: "____"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">State</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.address?.state? userData?.address?.state: "____"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">ExperienceYears</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData?.experienceYears}
                    </div>
                  </div>
                  <hr />
                  
                  <div className="row">
                    <div className="col-sm-12">
                      <button className="btn" style={{backgroundColor:"rgb(34,139,230)", color:"white", fontSize:"20px"}} onClick={handleEdit}>Edit Profile</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                <div className="card h-100">
                        <div className="card-body">
                            <h4 className="mb-3">User Skills</h4>
                            <div className="row">
                            <div className="col">
                                <ul>
                                {userData?.skills?.map((element, index) => (
                                    index % 2 === 0 && (
                                    <li key={index}>{element}</li>
                                    )
                                ))}
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                {userData?.skills?.map((element, index) => (
                                    index % 2 === 1 && (
                                    <li key={index}>{element}</li>
                                    )
                                ))}
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>

                </div>
                <div className="col-sm-6 mb-3">
                <div className="card h-100">
                        <div className="card-body">
                            <h4 className="mb-3">User Interests : </h4>
                            <div className="row">
                            <div className="col">
                                <ul>
                                {userData?.fieldOfInterest?.map((element, index) => (
                                    index % 2 === 0 && (
                                    <li key={index}>{element}</li>
                                    )
                                ))}
                                </ul>
                            </div>
                            <div className="col">
                                <ul>
                                {userData?.fieldOfInterest?.map((element, index) => (
                                    index % 2 === 1 && (
                                    <li key={index}>{element}</li>
                                    )
                                ))}
                                </ul>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
              </div>
            </div>
          </div>

        </div>
    </div>
        
  );
}

export default UserProfile;
