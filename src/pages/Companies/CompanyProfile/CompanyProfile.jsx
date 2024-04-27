import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./CompanyProfile.css";

function CompanyProfile() {
 
  const [userData, setUserData] = useState({
    userName: "Company profile",
    email: "john@example.com",
    address: {
      address: "123 Main St",
      city: "Cityville",
      state: "Stateville",
      country: "Countryland",
      postalCode: "12345"
    },
    field: ["Web Development", "Design"],
    phone: "123-456-7890",
    Employes_Number: 10
  });


  const [selectedImage, setSelectedImage] = useState(null);

 
  const [isEditable, setIsEditable] = useState(false);

 
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]; 
    const imageUrl = URL.createObjectURL(imageFile); 
    setSelectedImage(imageUrl); 
  };


  const handleDataChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };


  const enableEdit = () => {
    setIsEditable(true);
  };

  const disableEdit = () => {
    setIsEditable(false);
  };
   
  
  

  return (
    <div className="profile-container" style={{ borderRadius: '10px' }}>

		
<div style={{ textAlign: 'center' }}>
      <div>
        {}
        {selectedImage ? (
          <img src={selectedImage} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        ) : (
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#ddd' }}>Profile image</div>
        )}
      </div>
	<div> 

        <input type="file" onChange={handleImageChange} />
      </div>
    </div>
  


      <div className="avatar-section">
      </div>
      <div className="info-section">
	
	<div className="info-sect">
        <h1>Company profile</h1>
		</div>
        <p className="username">Description</p>
        <ul className="details-list">
          <li>
            <strong>Email:</strong> {isEditable ? <input type="text" name="email" value={userData.email} onChange={handleDataChange} /> : <span>{userData.email}</span>}
          </li>
          <li>
            <strong>Name:</strong> {isEditable ? <input type="text" name="userName" value={userData.userName} onChange={handleDataChange} /> : <span>{userData.userName}</span>}
          </li>
          <li>
            <strong>address:</strong> {isEditable ? <span><input type="text" name="address" value={userData.address.address} onChange={handleDataChange} />, <input type="text" name="city" value={userData.address.city} onChange={handleDataChange} />, <input type="text" name="state" value={userData.address.state} onChange={handleDataChange} />, <input type="text" name="country" value={userData.address.country} onChange={handleDataChange} />, <input type="text" name="postalCode" value={userData.address.postalCode} onChange={handleDataChange} /></span> : <span>{userData.address.address}, {userData.address.city}, {userData.address.state}, {userData.address.country}, {userData.address.postalCode}</span>}
          </li>
          <li>
            <strong>filed:</strong> {isEditable ? <input type="text" name="field" value={userData.field.join(',')} onChange={handleDataChange} /> : <span>{userData.field.join(',')}</span>}
          </li>
          <li>
            <strong>phone:</strong> {isEditable ? <input type="text" name="phone" value={userData.phone} onChange={handleDataChange} /> : <span>{userData.phone}</span>}
          </li>
          <li>
            <strong>Number of Employes :</strong> {isEditable ? <input type="text" name="Employes_Number" value={userData.Employes_Number} onChange={handleDataChange} /> : <span>{userData.Employes_Number}</span>}
          </li>
          <li>
            <strong>Empolyment:</strong> {isEditable ? <input type="text" name="field" value={userData.field.join(',')} onChange={handleDataChange} /> : <span>{userData.field.join(',')}</span>}
          </li>
          
          {isEditable ? <button onClick={disableEdit} style={{ borderRadius: '5px' }}>Save</button> : <button onClick={enableEdit} style={{ borderRadius: '5px' }}>Edit</button>}
        </ul>
      </div>
    </div>
  );
}

export default CompanyProfile;