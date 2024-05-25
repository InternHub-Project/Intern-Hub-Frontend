/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Grid, Text} from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./CompanyJobs.module.css";
import { Link, useNavigate } from "react-router-dom";

// import PaginationJobs from "../Jobs/component/Pagination/PaginationJobs.jsx";
import axios from "axios";
import API_CONFIG from "./../../../core/utils/apiConfig";
import { timeSincePublication } from "./../../../core/utils/helper";
import PaginationJobs from "../component/Pagination/PaginationJobs.jsx";
import { IconPlus } from "@tabler/icons-react";

// const JOBS_PER_PAGE = 10;

export default function CompanyJobs() {
  const navigate=useNavigate()
  const companyData = JSON.parse(localStorage.getItem("companyInfo")).data;
  let token=companyData.token
  const [internShip, setInternShip] = useState([]);
  // const [totalElements, setTotalElements] = useState(0);
  // const { page: numberOfPage } = useParams();
  useEffect(() => {
    axios({
      url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.company.companyjobs}`,
      headers: {
        Authorization: `${API_CONFIG.secretKey}${token}`
      },
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setInternShip(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container style={{minHeight:"400px"}}>
        <Grid style={{ margin: "30px" }}>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <div className={classes.filter}>
              <div>
                <div style={{ textAlign: "center" }}>
                  <Button className={classes.filterIcon} onClick={()=>{navigate("/createjob")}}>
                    {""}
                    Create Job
                      <IconPlus style={{marginLeft:"5px"}}></IconPlus>

                  </Button>
                  
                </div>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Box  className={classes.search} mx={"xs"}  >
            <Box>
                <Text className={classes.label} mb={10} fz={16} fw={700}>
                  Search
                </Text>
              </Box>


              <Box>

              <input
                className={classes.input}
                // value={searchValue}
                // onChange={searchInput}
                placeholder="title , skills , descrepation"
              />
              </Box>
              
            </Box>
            {internShip.map((item) => (
              <Box
                key={item.id}
                className={classes.styleIntern}
              >
                <div>
                  <div className={classes.actively}>
                    <i
                      className="fa-solid fa-arrow-trend-up"
                      style={{ color: "#3ae" }}
                    ></i>
                    <p className={classes.active_hiring}>Actively hiring</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p className={classes.hint}>{item.title}</p>
                      <p className={classes.title}>{companyData.name}</p>
                    </div>
                    <div>
                      <img src={companyData.image} width={"50px"} height={"50px"} />
                    </div>
                  </div>
                  <div className={classes.country}>
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ color: "#8A8A8A" }}
                    ></i>{" "}
                    {item.internLocation}
                  </div>
                  <div className={classes.info}>
                    <div style={{ margin: "7px 10px 7px 0px " }}>
                      <p className={classes.start}>
                        {" "}
                        <i
                          className="fa-regular fa-circle-play"
                          style={{
                            color: "#8A8A8A",
                            padding: "0px 2px 2px 0px",
                          }}
                        ></i>
                        START DATE
                      </p>
                      <p className={classes.immediately}>{item.startDate}</p>
                    </div>
                    <div style={{ margin: "7px 10px 7px 7px" }}>
                      <p className={classes.start}>
                        {" "}
                        <i
                          className="fa-regular fa-calendar"
                          style={{
                            color: "#8A8A8A",
                            padding: "0px 2px 2px 0px",
                          }}
                        ></i>
                        DURATION
                      </p>
                      <p className={classes.immediately}>
                        {item.duration} / {item.durationType}
                      </p>
                    </div>
                    <div style={{ margin: "7px" }}>
                      <p className={classes.start}>
                        {" "}
                        <i
                          className="fa-solid fa-money-bill"
                          style={{
                            color: "#8A8A8A",
                            padding: "0px 2px 2px 0px",
                          }}
                        ></i>
                        SALARY
                      </p>
                      <p className={classes.immediately}>
                        ${item.Salary} /monthly
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        margin: "5px 10px 5px 0px",
                        backgroundColor: "rgb(241,255,229)",
                        borderRadius: "6px",
                        padding: "4px 7px",
                        fontSize: "13px",
                        color: "rgb(19,128,13)",
                      }}
                    >
                      <i
                        className="fa-regular fa-clock"
                        style={{
                          color: "rgb(19,128,13)",
                          padding: "0px 2px 2px 0px",
                        }}
                      ></i>
                      {timeSincePublication(item.createdAt)}
                    </p>
                    <p
                      style={{
                        margin: "5px 10px 5px 10px",
                        backgroundColor: "#eee",
                        borderRadius: "6px",
                        padding: "4px 7px",
                        fontSize: "13px",
                        color: "black",
                      }}
                    >
                      Fresher Job
                    </p>
                    <p
                      style={{
                        margin: "5px 10px 5px 10px",
                        backgroundColor: "#eee",
                        borderRadius: "6px",
                        padding: "4px 7px",
                        fontSize: "13px",
                        color: "black",
                      }}
                    >
                      {item.internType}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#eee",
                      height: "1px",
                      margin: "10px 5px",
                    }}
                  ></div>
                </div>


              <div style={{ textAlign: "end", margin: "0px 5px" ,display:"flex",justifyContent:"end"   }}>
                    <Box mr={8}>

              
                    </Box>
                  <Link
                  className={classes.viewLink}
                  to={`/company_app/${item.jobId}`}
                  >
                    view applicants
                  </Link>
              </div>
                    
              </Box>
              
            ))}
              <PaginationJobs
              route={"/jobs"}
              totalElements={internShip.length}
              ITEMS_PER_PAGE={10}
              numberOfPage={1}
            />
          </Grid.Col>
        </Grid>
      </Container>
  );
}
