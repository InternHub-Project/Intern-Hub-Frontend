import { Container, Grid, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./JobsPage.module.css";
import { Link } from "react-router-dom";
import JobsFilter from "./component/JobsFilter/JobsFilter";
import API_CONFIG from "../../utils/apiConfig";



export default function JobsPage() {
  const [filterQuery, setFilterQuery] = useState();
  const [internShip, setInternShip] = useState([]);
  useEffect(() => {    
    fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.job.allJobs}?${filterQuery}`)
      .then(res => res.json())
      .then(data =>{
        setInternShip(data.data)
        console.log(data.data);
      } 
    ).catch(err=>console.log(err))
  }, [filterQuery]);

  function timeSincePublication(publishDate) {
    const now = new Date();
    const publishDateObject = new Date(publishDate);
    const differenceInMilliseconds = now - publishDateObject;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  
    if (differenceInSeconds < 60) {
      return 'just now';
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 604800) {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 2592000) {
      const weeks = Math.floor(differenceInSeconds / 604800);
      return` ${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (differenceInSeconds < 31536000) {
      const months = Math.floor(differenceInSeconds / 2592000);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(differenceInSeconds / 31536000);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  }
  
  const publishDate = '2024-02-27T20:07:10.387Z';
  console.log(timeSincePublication(publishDate)); 

  return (
    <>
      <Container>
        <Grid style={{ margin: "30px" }}>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <div className={classes.filter}>
              <div>
                <div style={{ textAlign: "center" }}>
                  <p className={classes.filterIcon}>
                    {" "}
                    <i
                      className="fa-solid fa-filter"
                      style={{ color: "#008BDC", paddingRight: "2px" }}></i>
                    Filter
                  </p>
                </div>
                <JobsFilter setFilterQuery={setFilterQuery} />
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            {internShip.map(item => (
              <Link
                key={item.id}
                to={""}
                className={classes.styleIntern}>
                <div>
                  <div className={classes.actively}>
                    <i
                      className="fa-solid fa-arrow-trend-up"
                      style={{ color: "#3ae" }}></i>
                    <p className={classes.active_hiring}>Actively hiring</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <div>
                      <p className={classes.hint}>{item.title}</p>
                      <p className={classes.title}>{item.companyName}</p>
                    </div>
                    <div>
                      <img src={item.img} width={"50px"} height={"50px"} />
                    </div>
                  </div>
                  <div className={classes.country}>
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ color: "#8A8A8A" }}></i>{" "}
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
                          }}></i>
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
                          }}></i>
                        DURATION
                      </p>
                      <p className={classes.immediately}>
                        {item.duration}
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
                          }}></i>
                        SALARY
                      </p>
                      <p className={classes.immediately}>
                        ${item.Salary}
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
                      }}>
                      <i
                        className="fa-regular fa-clock"
                        style={{
                          color: "rgb(19,128,13)",
                          padding: "0px 2px 2px 0px",
                        }}></i>
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
                      }}>
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
                      }}>
                      {item.internType}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#eee",
                      height: "1px",
                      margin: "10px 5px",
                    }}></div>
                </div>
                <div style={{ textAlign: "end", margin: "0px 5px" }}>
                  <a
                    href=""
                    style={{
                      display: "inline-block",
                      marginTop: "2px",
                      padding: "5px 7px",
                      textDecoration: "none",
                      border: "1px solid #008BDC",
                      borderRadius: "6px",
                      color: "#008BDC",
                    }}>
                    view details
                  </a>
                </div>
              </Link>
            ))}
          </Grid.Col>
        </Grid>
      </Container>
      <div style={{display:"flex" , justifyContent:"center"}}>

       <Pagination total={10} color="orange" size="xs" withEdges />
      </div>

    </>
  );
}
