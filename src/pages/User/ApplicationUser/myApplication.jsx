import { Container, Table } from "@mantine/core";
// import { Container, Table } from "react-bootstrap";

import "./myApplication.css";
import { useEffect, useState } from "react";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { MdHelpOutline } from "react-icons/md";
import { FaRocket } from "react-icons/fa6";
import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import { httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import PaginationJobs from "../../Jobs/component/Pagination/PaginationJobs.jsx";

export const MyApplication = () => {
	const token = JSON.parse(localStorage.getItem("userInfo")).data.token;
	const [appData, setAppData] = useState([]);
	const getAppDataFromApi = async () => {
		httpRequest(API_CONFIG.endpoints.user.userApplication,"GET",{},{Authorization:`${API_CONFIG.secretKey}${token}`}).then((res=>{
			console.log(res);
			setAppData(res.data.data)
		}))
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
												<Link to={`/jobs/details/${app.jobId}`} className="edite-icon">
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
					{/* <Pagination />   */}
					{/* <Pagination getPageNumber={getPageNumber} />  */}
					<PaginationJobs
						route={"/jobs"}
						totalElements={10}
						ITEMS_PER_PAGE={10}
						numberOfPage={1}
						/>
				</section>
			</Container>
		</div>
	);
};

export default MyApplication;
