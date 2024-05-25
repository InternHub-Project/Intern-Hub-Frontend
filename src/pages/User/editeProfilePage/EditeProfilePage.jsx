import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./EditeProfilePage.css";
import "./vars.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar-edit";
import AvatarPicture from "../../../assets/images/avatar.png"
import { Dialog } from "primereact/dialog";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import { httpRequest } from "../../../core/utils/httpRequest.js";
import axios from "axios";
import { showNotification } from "@mantine/notifications";




export const EditeProfilePage = () => {
	const token = JSON.parse(localStorage.getItem("userInfo")).data.token;
	const [userName, setUserName] = useState("");
	const [emailValue, setEmail] = useState("");

	const [birthdate, setBirthdate] = useState("");
	const [bio, setBio] = useState("");
	const [phoneNumber, setPhoneNumber] = useState();
	const [address, setAddress] = useState({
		city: "",
		country: "",
		address: "",
	});
	const [gender, setGender] = useState("");
	// const [status, setStatus] = useState("");
	const [exprienceYears, setExprienceYears] = useState("");
	const [skills, setSkills] = useState("");
	const [allSkills, setAllSkills] = useState([]);
	const [interested, setInterested] = useState("");
	const [allInterested, setAllInterested] = useState([]);
	const [cv, setCV] = useState(null);

	const handleCVChange = (e) => {
		const file = e.target.files[0];
		setCV(file);
	};
	// profile ficture edit
	const [imageCrop, setImageCrop] = useState(false);
	const [profilePicture, setProfilePicture] = useState(AvatarPicture);
	const [pview, setPview] = useState(false);

	// image crop
	const onClose = () => {
		setPview(null);
	};
	const onCrop = (view) => {
		console.log(view);
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
		if (skills) {
			// Check if the skill already exists
			const skillExists = allSkills.some((skill) => skill.title === skills);
			if (!skillExists) {
				setAllSkills([...allSkills,  skills]); // Use skill title as ID
			}
			setSkills("");
		} else {
			return;
		}
	};

	const deleteSkillHandler = (skillTitle) => {
		let data = allSkills.filter((skill) => skill.title||skill!== skillTitle);
		setAllSkills(data);
	};

	const onAddInterestHandler = () => {
		if (interested) {
			const interestedExist = allInterested.some((interest) => interest.title === interested);
			{		
				if(!interestedExist){
					setAllInterested([
						...allInterested,
						interested
					]),
						setInterested("");
				}
				
			}
		} else {
			return;
		}
	};

	const deleteInterestedHandler = (interestedDelete) => {
		let data = allInterested.filter(
			(single) => single.title||single !== interestedDelete
		);
		setAllInterested(data);
	};
	// PUT requist
	const onSubmitHandler = async(e) => {
		e.preventDefault();
		let interestedArr=[]
		let SkillsArr=[]
		const formData = new FormData();

		if(allInterested.length>0){
			allInterested.map((aa=>{
				if(!aa.title){
					interestedArr.push(aa)
				}
				else{
					interestedArr.push(aa.title)
				}
			}))
		}
		
		if(allSkills.length>=0){
		allSkills.map((aa=>{
				if(!aa.title){
					SkillsArr.push(aa);
				}
				else{
					SkillsArr.push(aa.title);
				}
			}))
			
		}
		if(cv){
            formData.append('file', cv);
	
		}
		if(profilePicture){
			formData.append('profileImage', profilePicture);
			let userInfo = localStorage.getItem("userInfo");
			if (userInfo) {
				userInfo = JSON.parse(userInfo);
				userInfo.data.profileImage = profilePicture; 
				const updatedUserInfo = JSON.stringify(userInfo);
				localStorage.setItem("userInfo", updatedUserInfo);
			} 
		}		
		if(address.address){
			formData.append('address', address.address);
		}
		if(address.city){
			formData.append('city', address.city);
		}
		if(address.country){
			formData.append('country', address.country);
		}
		if(userName){
			formData.append('userName', userName);
			let userInfo = localStorage.getItem("userInfo");
			if (userInfo) {
				userInfo = JSON.parse(userInfo);
				userInfo.data.userName = userName; 
				const updatedUserInfo = JSON.stringify(userInfo);
				localStorage.setItem("userInfo", updatedUserInfo);
			}
		}
		if(phoneNumber){
			formData.append('phone', phoneNumber);
		}
		if(exprienceYears){
			formData.append('experienceYears', exprienceYears);
		}
		if(gender){
			formData.append('gender', gender);
		}
		if(birthdate){
			formData.append("birthdate",birthdate)
		}
		if(bio){
			formData.append('bio', bio);
		}
		if(allSkills){
			formData.append('skills',JSON.stringify(SkillsArr)); // Convert array to string
			let userInfo = localStorage.getItem("userInfo");
			if (userInfo) {
				userInfo = JSON.parse(userInfo);
				userInfo.data.skills = allSkills; 
				const updatedUserInfo = JSON.stringify(userInfo);
				localStorage.setItem("userInfo", updatedUserInfo);
		}
	}
		if(allInterested){
			formData.append('fieldOfInterest', JSON.stringify(interestedArr)); // Convert array to string
		}
		axios({
			method:"PUT",
			url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.updateUser}`,
			headers:{
				"Content-Type":"multipart/form-data",
				Authorization:
				`internHub__${token}`,
			},
			data:formData
		}).then((res=>{
			if(res.status==200){
				showNotification({message:"Profile Update successfully",color:"green"})
				window.location.reload()
			}
		})).catch((err=>{
			console.log(err);
			if(err.response.status==400)
			showNotification({message:err.response.data.message,color:"red"})
		}))

	
	};
	// get user data
	useEffect(() => {
		httpRequest(
			API_CONFIG.endpoints.user.fetchUser,
			"GET",
			{},
			{
				Authorization:
				`internHub__${token}`,
			}
		).then((result) => {
			const userData = result.data.data;
	
			setProfilePicture(userData?.profileImage || "");
			setEmail(userData?.email);
			setUserName(userData?.userName || "");
			const backendDate = userData.birthdate
				? userData.birthdate.split("T")[0]
				: "";
			setBirthdate(backendDate || "");
			setBio(userData?.bio || "");
			setPhoneNumber(userData?.phone || "");
			setAddress({
				city: userData.address?.city || "",
				country: userData.address?.country || "",
				address: userData.address?.address || "",
			});
			setGender(userData?.gender || "");
			setExprienceYears(userData?.experienceYears || "");
			setAllSkills(userData?.skills || "");
			setAllInterested(userData?.fieldOfInterest || "");
			setCV(userData?.cv || "");
		});
	}, []);

	return (
		<div className="edite-profile-data font-color">
			<Container>
				<Row className="bg-page-color">
					<div className="header">
						<h1 className="profile-header">UPDATE PROFILE</h1>
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
												width={400}
												height={400}
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
						{/* user img */}
						{/* <Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Profile Picture</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control value={profilePicture} disabled readOnly />
								</Col>
							</Form.Group>
						</Col> */}
						{/* user name */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>User Name</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={userName}
										onChange={(e) => setUserName(e.target.value)}
									/>
								</Col>
							</Form.Group>
						</Col>
						{/* Bio */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Bio</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										value={bio}
										onChange={(e) => setBio(e.target.value)}
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
						{/* gender */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Gender</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Select
										aria-label="Default select example"
										sm="6"
										value={gender}
										onChange={(e) => setGender(e.target.value)}
									>
										<option value="1">select gender</option>
										<option value="male">male</option>
										<option value="female">female</option>
									</Form.Select>
								</Col>
							</Form.Group>
						</Col>
						{/* phone */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Phon Number</Form.Label>
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
						{/* birthdate */}
						<Col>
							<Form.Group as={Row} className="mb-3">
								<Col sm="2">
									<Form.Label>Birthdate</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control
										type="date"
										value={birthdate}
										onChange={(e) => setBirthdate(e.target.value)}
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

						{/* exprience year */}
						<Form.Group as={Row} className="mb-3">
							<Col sm="2">
								<Form.Label>Exprience Years</Form.Label>
							</Col>
							<Col sm="10">
								<Form.Control
									type="number"
									value={exprienceYears}
									onChange={(e) => setExprienceYears(e.target.value)}
								/>
							</Col>
						</Form.Group>
						{/* skills */}
						
						<Form.Group as={Row} className="mb-3">
							<Col sm="2">
								<Form.Label>Skills</Form.Label>
							</Col>
							<Col sm="9">
								<Form.Control
									value={skills}
									onChange={(e) => setSkills(e.target.value)}
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
								{allSkills &&
									allSkills.map((single) => (
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
						{/* interested */}
						<Form.Group as={Row} className="mb-3">
							<Col sm="2">
								<Form.Label>Interested</Form.Label>
							</Col>
							<Col sm="9">
								<Form.Control
									value={interested}
									onChange={(e) => setInterested(e.target.value)}
								/>
							</Col>
							<Col sm="1">
								<button
									className="btn btn-success add-skill-btn"
									type="button"
									onClick={onAddInterestHandler}
								>
									Add
								</button>
							</Col>
						</Form.Group>

						<div className="skills">
							<ul className="privateUl">
								{allInterested &&
									allInterested.map((single) => (
										<li className="privateLi"
											key={generateRandomId()}
											onClick={() => deleteInterestedHandler(single)}
										>
											{single.title?single.title:single}
											<span className="delete-skill">Delete</span>
										</li>
									))}
							</ul>
						</div>

						{/* resume */}
						<Form.Group as={Row} controlId="formFileLg" className="mb-3">
							<Col sm="2">
								<Form.Label>Upload CV</Form.Label>
							</Col>
							<Col sm="10">
								{/* <div>{cv ? <div>{cv}</div> : <div>No file selected</div>}</div> */}
								<Form.Control
									type="file"
									size="lg"
									name="cv"
									onChange={handleCVChange}
								/>
							</Col>
						</Form.Group>
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

export default EditeProfilePage;
