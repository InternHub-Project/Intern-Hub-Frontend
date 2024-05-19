import axios from "axios";
import { useState, useEffect } from "react";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import { useNavigate } from "react-router-dom";

function CompanyProfile() {
    const Navigate=useNavigate()
  const [userData, setUserData] = useState([]);
  const token = JSON.parse(localStorage.getItem("companyInfo")).data.token;

  useEffect(() => {
    axios({
      method: 'get',
      url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.company.fetchCompany}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `internHub__${token}`
      }
    })
      .then(response => {
        setUserData(response.data.data)
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, [])

  const handleEdit=()=>{
    Navigate("/edite_company_profile")
  }
  return (
    <div className="container" >
    <div className="main-body">
          <div className="row gutters-sm"  style={{ justifyContent: "center"}}>
            <div style={{textAlign:"center", fontSize:"35px", fontWeight:"600" ,marginBottom:"30px"}}>
                General Information
            </div>
            <div style={{textAlign:"center", fontSize:"18px" ,marginBottom:"5px", backgroundColor:"#ffff6c", borderRadius:"8px" ,padding:"4px"}} className="col-md-8 text-secondary">
               Please Complete Profile Before Start To Publish Jobs
            </div>
            <div className="col-md-8" style={{ border: "1px solid var(--outline-field-color)", borderRadius: "10px", boxShadow: "-2px -2px 6px var(--form-shadow), 2px 2px 6px var(--form-shadow)" }}>
              
                <h3 style={{marginLeft:"15px", marginBottom:"25px",marginTop:"20px", fontSize:"22px"}}>Company information :</h3>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Company Name :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.name}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Email :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.email}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Descroption :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData.description}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Phone Number :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.phone}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">company Field :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userData?.field}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Address :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData?.address?.address? userData?.address?.address: "____"}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">City :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData?.address?.city? userData?.address?.city: "____"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Country :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.address?.country? userData?.address?.country: "____"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">State :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData.address?.state? userData?.address?.state: "____"}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h5 className="mb-0">Number of Employees :</h5>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    {userData?.employees_number}
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
            </div>
          </div>

        </div>
    </div>
        
  );
}

export default CompanyProfile;
