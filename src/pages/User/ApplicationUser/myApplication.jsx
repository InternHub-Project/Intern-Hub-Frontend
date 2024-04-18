import { Container, Table } from "@mantine/core";
// import { Container, Table } from "react-bootstrap";

import "./myApplication.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { MdHelpOutline } from "react-icons/md";
import { FaRocket } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import Pagination from "./pagination.jsx";

export const MyApplication = () => {
	const [appData, setAppData] = useState([]);
	const getAppDataFromApi = async () => {
		axios({
			method: "get",
			url: "https://api.codesplus.online/api/v1/job/applications",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"internHub__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVc2VyN2FkNjc1NTUtZTQwMi00NTIyLWFjMjQtNzEwMTBiNTA3Mzk5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTMzNTIyNDQsImV4cCI6MTcxMzQzODY0NH0.qZLOyanF7NNah8M3XY_yfZ-_1RSs0AtOjfoYuIKWUaY",
			},
		})
			.then((res) => {
				console.log(res.data.data);
				setAppData(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const getPageNumber = async (pageNumber) => {
	// 	// const count = await axios.get("")
	// };

	useEffect(() => {
		getAppDataFromApi();
	}, []);

	return (
		<div className="my-application">
			<Container>
				<section className="app-table">
					<h3 className="my-application-title">My Applications</h3>
					<div className="table-style">
						<Table responsive>
							<thead>
								<tr>
									<th>COMPANY</th>
									<th>PROFILE</th>
									<th>APPLIED ON</th>
									<th>NUMBER OF APPLICANTS</th>
									<th>APPLICATION STATUS</th>
									<th>
										<div>REVIEW APPLICATION</div>
									</th>
								</tr>
							</thead>
							<tbody>
								{appData.map((app) => {
									return (
										<tr key={app.companyId}>
											<td>
												<div>{app.companyName}</div>
											</td>
											<td>
												<span>{app.jobtitle}</span>
												<Link to="#" className="edite-icon">
													<HiMiniArrowTopRightOnSquare />
												</Link>
											</td>
											<td>
												<div>{app.createdAt}</div>
											</td>
											<td>
												<div>{app.numberOfApplicants}</div>
											</td>
											<td>
												<div className="application-status-1">
													<span>{app.status}</span>
													<Link to="#" className="help-icon">
														<MdHelpOutline />
													</Link>
												</div>
												<div className="application-status-2">
													<Link to="#" className="rock-icon">
														<FaRocket />
													</Link>
													<span>Boost application</span>
												</div>
											</td>
											<td>
												<Link to="#" className="icon">
													<FiFileText />
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
					<Pagination />  
					{/* <Pagination getPageNumber={getPageNumber} />  */}
				</section>
			</Container>
		</div>
	);
};

export default MyApplication;
