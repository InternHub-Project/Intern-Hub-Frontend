import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../User/editeProfilePage/EditeProfilePage.css";
import "../../User/editeProfilePage/vars.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar-edit";
import AvatarPicture from "../../../assets/images/avatar.png"
import { Dialog } from "primereact/dialog";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import { httpRequest } from "../../../core/utils/httpRequest.js";
// import { Notifications } from "@mantine/notifications";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
// import { showNotification } from "@mantine/notifications";



// you can recomented your import above dependent your project

export const EditCompanyProfile = () => {
	const token = JSON.parse(localStorage.getItem("userInfo")).data.token;
	const [companyName, setCompanyName] = useState("");
	const [emailValue, setEmail] = useState("");

	const [description, setDescription] = useState("");
	const [phoneNumber, setPhoneNumber] = useState();
	const [address, setAddress] = useState({
		city: "",
		country: "",
		address: "",
        state:""
	});
	const [employeesNumber, setEmployeesNumber] = useState("");
	const [fields, setFields] = useState("");
	const [allFields, setAllFields] = useState([]);


	// profile ficture edit
	const [imageCrop, setImageCrop] = useState(false);
	const [profilePicture, setProfilePicture] = useState(AvatarPicture);
	const [pview, setPview] = useState(false);

	// image crop
	const onClose = () => {
		setPview(null);
	};
	const onCrop = (view) => {
		setPview(view);
	};
	const saveCropImage = () => {
		setProfilePicture(pview);
		setImageCrop(false);
	};

	const generateRandomId = () => {
		return Math.floor(Math.random() * 1000000);
	};
	const onAddSkillsHandler = () => {
		if (fields) {
			// Check if the skill already exists
			const skillExists = allFields.some((skill) => skill.title === fields);
			if (!skillExists) {
				setAllFields([...allFields,  fields ]); // Use skill title as ID
			}
			setFields("");
		} else {
			return;
		}
	};

	const deleteSkillHandler = (skillTitle) => {
        console.log(skillTitle);
        console.log(allFields);
		let data = allFields.filter((skill) => skill.title||skill!== skillTitle);
		setAllFields(data);
	};



	// PUT requist
	const onSubmitHandler = async(e) => {
		e.preventDefault();
		let fieldsArr=[]
        const Data={}


		if(allFields.length>=0){
            allFields.map((aa=>{
				if(!aa.title){
					fieldsArr.push(aa);
				}
				else{
					fieldsArr.push(aa.title);
				}
			}))
			
		}
		if(profilePicture){
			Data.image=profilePicture
		}	
        if(description){
			Data.description= description;
		}
        if(companyName){
			Data.name =companyName
		}
        if(phoneNumber){
			Data.phone=phoneNumber;
        }
        if(employeesNumber){
			Data.employees_number=employeesNumber
		}
		if(address.address){
			Data.address= address.address;
		}
		if(address.city){
            Data.city= address.city;
		}
		if(address.country){
			Data.country= address.country;
		}
        if(address.state){
			Data.state= address.state;
		}
        if(allFields){
            Data.field=fieldsArr
        }
        console.log(Data);
	
		axios({
            method:"PUT",
            url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.company.updateCompany}`,
            data:Data,
            headers:{Authorization:`${API_CONFIG.secretKey}${token}`,"Content-Type":"application/json"}
        }).then((res)=>{
            if(res.status==200){
				showNotification({message:"Profile Update successfully",color:"green"})
				window.location.reload()
			}
            
        }).catch((err)=>{
            console.log(err);
            if(err.response.status==400)
			showNotification({message:err.response.data.message,color:"red"})
        })

	
	};
	// get user data
	useEffect(() => {
		httpRequest(
			API_CONFIG.endpoints.company.fetchCompany,
			"GET",
			{},
			{
				Authorization:
				`internHub__${token}`,
			}
		).then((result) => {
			const userData = result.data.data;
			setProfilePicture(userData?.image || "");
			setEmail(userData?.email);
			setCompanyName(userData?.name || "");
			setDescription(userData?.description || "");
			setPhoneNumber(userData?.phone || "");
			setAddress({
				city: userData.address?.city || "",
				country: userData.address?.country || "",
				address: userData.address?.address || "",
                state:userData.address?.state ||"",
			});
			setEmployeesNumber(userData?.employees_number|| "");
			setAllFields(userData?.field || "");
		});
	}, []);

	return (
		<div className="edite-profile-data font-color">
			<Container>
				<Row className="bg-page-color">
					<div className="header">
						<h1 className="profile-header">UPDATE COMPANY PROFILE</h1>
					</div>
					<Form onSubmit={onSubmitHandler}>
						{/* image */}

						<div className="d-flex justify-content-center align-items-center">
							<div className="text-center p-4">
								<div className="d-flex flex-column justify-content-center align-items-center">
									<img
										className="profile-img"
										src={profilePicture}
										alt="profile picture"
										onClick={() => setImageCrop(true)}
									/>
									<Dialog
										visible={imageCrop}
										header={() => {
											<p
												htmlFor=""
												className="text-2xl font-seibold textColor"
											></p>;
										}}
										onHide={() => setImageCrop(false)}
									>
										<div className="crop">
											<Avatar
												width={250}
												height={250}
												onCrop={onCrop}
												onClose={onClose}
											/>
											<div className="d-flex justify-content-center align-items-center">
												<Button
													onClick={saveCropImage}
													className="btn btn-primary m-3"
												>
													SAVE
												</Button>
											</div>
										</div>
									</Dialog>
								</div>
							</div>
						</div>
			
						{/* user name */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Comapny Name</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={companyName}
										onChange={(e) => setCompanyName(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>

						{/* Description */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Description</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* email */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Email</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control value={emailValue} disabled />
								</Col>
							</Form.Group>
						</Col>
				
						{/* phone */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Company Phone</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										type="tell"
										pattern="[0-9]{11}"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>

						{/* city */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>City</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={address.city}
										onChange={(e) =>
											setAddress({
												city: e.target.value,
												country: address.country,
												address: address.address,
											})
										}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* country */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Country</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={address.country}
										onChange={(e) =>
											setAddress({
												city: address.city,
												country: e.target.value,
												address: address.address,
											})
										}
										// onChange={(e) => setCountry(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* address */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Address</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										className="address"
										value={address.address}
										onChange={(e) =>
											setAddress({
												city: address.city,
												country: address.country,
												address: e.target.value,
											})
										}
									/>
								</Col>
							</Form.Group>
						</Col>

                        {/* State */}
                        <Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>State</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										className="address"
										value={address.state}
										onChange={(e) =>
											setAddress({
												city: address.city,
												country: address.country,
												address: address.address,
												state: e.target.value,
											})
										}
									/>
								</Col>
							</Form.Group>
						</Col>

						{/* exprience year */}
						<Form.Group as={Row} className="mb-3">
							<Col sm="2">
								<Form.Label>Employees Number</Form.Label>
							</Col>
							<Col sm="10">
								<Form.Control
									type="number"
									value={employeesNumber}
									onChange={(e) => setEmployeesNumber(e.target.value)}
								/>
							</Col>
						</Form.Group>
						{/* fields */}
						
						<Form.Group as={Row} className="mb-3">
							<Col sm="2">
								<Form.Label>Comapny Fields</Form.Label>
							</Col>
							<Col sm="9">
								<Form.Control
									value={fields}
									onChange={(e) => setFields(e.target.value)}
								/>
							</Col>
							<Col sm="1">
								<button
									className="btn btn-success add-skill-btn"
									type="button"
									onClick={onAddSkillsHandler}
								>
									Add
								</button>
							</Col>
						</Form.Group>

						<div className="skills">
							<ul className="privateUl">
								{allFields &&
									allFields.map((single) => (
										<li className="privateLi"
											key={generateRandomId()}
											onClick={() => deleteSkillHandler(single)}
										>
											{single.title?single.title:single}
											<span className="delete-skill">Delete</span>
										</li>
									))}
							</ul>
						</div>

                        
				
						<Col className="buttons">
							<Link variant="danger" to="/" className="btn btn-danger">
								Cancel
							</Link>
							<Button as="input" type="submit" value="Update Profile" />
						</Col>
					</Form>
				</Row>
			</Container>
		</div>
	);
};

export default EditCompanyProfile;
