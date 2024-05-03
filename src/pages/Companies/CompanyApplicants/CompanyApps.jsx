/* eslint-disable no-unused-vars */
import { Container, Table } from "@mantine/core";
// import { Container, Table } from "react-bootstrap";
import "./CompanyApp.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pagination from "../../User/ApplicationUser/pagination.jsx";

export const CompanyApps = () => {
	const [appData, setAppData] = useState([]);
	const [job, setJob] = useState([]);

	const getComponyDataFromApi = async () => {
		try {
			const componyData = await axios({
				method: "get",
				url: "https://api.codesplus.online/api/v1/job/jobapplicants/Jobeac873e0-508d-499b-9d2e-fa1ec695b7ae",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiJDb21wYW55Y2JkNGZmMzgtNmQzMy00MGY0LWFlZjMtMzlmMDlkM2YxZmMzIiwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE3MTQ2MDU5MTgsImV4cCI6MTcxNDY5MjMxOH0.vJQCo1arZc4F4j_r2V9zp0ptLf0hHcv4OHTutGjrib4",
				},
			});
			console.log(componyData.data.data);
			setAppData(componyData.data.data);
		} catch (err) {
			console.log(err);
		}
	};
	const getJobDataFromApi = async () => {
		try {
			const componyData = await axios({
				method: "get",
				url: "https://api.codesplus.online/api/v1/job/jobapplicants/Jobeac873e0-508d-499b-9d2e-fa1ec695b7ae",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiJDb21wYW55Y2JkNGZmMzgtNmQzMy00MGY0LWFlZjMtMzlmMDlkM2YxZmMzIiwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE3MTQ2MDU5MTgsImV4cCI6MTcxNDY5MjMxOH0.vJQCo1arZc4F4j_r2V9zp0ptLf0hHcv4OHTutGjrib4",
				},
			});
			console.log(componyData.data.data[0].applicants);
			setJob(componyData.data.data[0].applicants);
		} catch (err) {
			console.log(err);
		}
	};
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
					<h1 className="application-title">APPLICATIONS</h1>

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
									<th>Id</th>
									<th>USER NAME</th>
									<th>EMAIL</th>
									<th>coverLetter</th>
									<th>PHONE NUMBER</th>
									<th>STATUS</th>
									<th>POINTS</th>
									<th>CV</th>
									<th>CHAT</th>

								</tr>
							</thead>
							<tbody>
								{appData[0] &&
									appData[0].applicants.map((app) => {
										return (
											<tr key={app.jobId}>
												<td>
													<span>
														{appData[0] && appData[0].applicants.length}
													</span>
												</td>
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
													<span>{app.phone}</span>
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
													<Link to="#" className="icon">
														<BsChatDots />
													</Link>
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