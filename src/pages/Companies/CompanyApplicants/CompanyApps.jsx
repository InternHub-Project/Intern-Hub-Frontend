/* eslint-disable no-unused-vars */
import { Container, Table } from "@mantine/core";
// import { Container, Table } from "react-bootstrap";
import "./CompanyApp.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
// import ReactTooltip from "react-tooltip";
import Pagination from "../../User/ApplicationUser/pagination.jsx";
import API_CONFIG from "../../../core/utils/apiConfig.js";

export const CompanyApps = () => {
	const { jobId } = useParams();
	const [appData, setAppData] = useState([]);
	const [job, setJob] = useState([]);
	const token =JSON.parse(localStorage.getItem("companyInfo")).data?.token
	const navigate=useNavigate()
	const getComponyDataFromApi = async () => {
		try {
			const componyData = await axios({
				method: "get",
				url: `http://localhost:3003/api/v1/${API_CONFIG.endpoints.company.jobApplicants}/Jobeac873e0-508d-499b-9d2e-fa1ec695b7ae`,
				headers: {
					"Content-Type": "application/json",
					Authorization:
						`${API_CONFIG.secretKey}${token}`
				},
			});
			setAppData(componyData.data.data);
		} catch (err) {
			console.log(err);
		}
	};
	console.log(appData);
	const startChat=(user)=>{
		console.log(user);
		axios({
			method:"post",
			url: `http://localhost:3003/api/v1/${API_CONFIG.endpoints.company.startChat}`,
			data:{
				userId:user
			},
			headers: {
				"Content-Type": "application/json",
				Authorization:
					`${API_CONFIG.secretKey}${token}`
			},
			
		}).then((res)=>{
			if(res.status==201){
				navigate("/chat");
			}
			console.log(res)
		}).catch((err)=>{
			console.log(err);
		})
	}
	const getPageNumber = (pageNum) => {
		return 2;
	};

	useEffect(() => {
		getComponyDataFromApi();
	}, []);



	return (
		<div className="application">
			<Container>
				<section className="app-table">
					<h1 className="application-title">JOB APPLICANTS</h1>

					<h3 className="job-title">{appData[0] && appData[0].title}</h3>
					<p className="job-info">
						<span className="title">JOB TYPE: </span>
						{appData[0] && appData[0].jobType}
					</p>
					<p className="job-info">
						<span className="title">INTERN TYPE: </span>
						{appData[0] && appData[0].internType}
					</p>
					<div className="job-info">
						<span className="title">SKILLS: </span>
						<ul>
							{appData[0] &&
								appData[0].skills.map((job) => <li key={job}>{job}</li>)}
						</ul>
					</div>

					<div className="table-style">
						<Table responsive>
							<thead>
								<tr>
									<th>USER NAME</th>
									<th>EMAIL</th>
									<th>coverLetter</th>
									<th>PHONE NUMBER</th>
									<th>STATUS</th>
									<th>POINTS</th>
									<th>CV</th>
									<th>CHAT</th>
									<th>MISSING SKILLS</th>
									

								</tr>
							</thead>
							<tbody>
								{appData[0] &&
									appData[0].applicants.map((app) => {
										return (
											<tr key={app.jobId}>
												
												<td>
													<span>{app.userName}</span>
												</td>
												<td>
													<span>{app.email}</span>
												</td>
												<td>
													<span>{app.coverLetter}</span>
												</td>
												<td>
													<span>{app.phone.length?app.phone:"_______________"}</span>

												</td>
												<td>
													<span>{app.status}</span>
												</td>
												<td>
													<span>{app.points}</span>
												</td>
												
												<td>
													<Link to={app.resume} className="icon">
														<FiFileText />
													</Link>
												</td>
												
												<td>
													<Link onClick={()=>startChat(app.userId)} className="icon">
														<BsChatDots />
													</Link>
												</td>
												<td className="tooltip-container">
													<FaQuestionCircle className="tooltip-icon" />
													<span className="tooltip-text">
														{app.missingSkills.length>1?app.missingSkills.join(", "):"No Missing Skills"}
													</span>
													</td>
											</tr>
										);
									})}
							</tbody>
						</Table>
					</div>
					<Pagination getPageNumber={getPageNumber} />
				</section>
			</Container>
		</div>
	);
};

export default CompanyApps;