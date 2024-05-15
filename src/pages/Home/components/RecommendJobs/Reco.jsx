import { Box, Title } from "@mantine/core";
import classes from "./Reco.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import API_CONFIG from "../../../../core/utils/apiConfig";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";

export default function Reco() {
  const token = JSON.parse(localStorage.getItem("userInfo")).data.token;
  const [recommendData, setRecommendData] = useState([]);

  useEffect(() => {
    axios({
      url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.jobs.getRecommendedJobs}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `internHub__${token}`,
      },
      method: "GET",
    })
      .then((res) => {
        console.log(res.data.data);
        setRecommendData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box className={classes.up}>
      <Title fz={"30px"}>Recommended Jobs</Title>
      <Box>
        <Box>
          <Carousel
            containScroll={"keepSnaps"}
            height={300}
            style={{ margin: "10px" }}
            styles={{
              container: { width: "100%" },
              
            }}
            slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
            slideGap={{ base: 10, sm: "md", md: "sm" }}
            // loop
            align="start"
            controlSize={40}
            controlsOffset="xs"
            // mt={50}
          >
            {recommendData.map((job) => (
              <Carousel.Slide key={job.companyId} className={classes.card}>
                <Link to={`/jobs/detailsRecommendJob/${job.jobId}`} className={classes.linkCard}>
                  <div className={classes.actively}>
                    <i
                      className="fa-solid fa-arrow-trend-up"
                      style={{ color: "#3ae" }}
                    ></i>
                    <p className={classes.active_hiring}>Actively hiring</p>
                  </div>
                  <div className={classes.cardCourses}>
                    <span className={classes.headingCard}>
                      <p className={classes.titleJob} style={{ margin: "0px" }}>
                        {job.title}
                      </p>
                      <p
                        style={{
                          margin: "0px",
                          color: "rgb(0 0 0 / 60%)",
                        }}
                      >
                        {/* {job.hint} */}
                      </p>
                    </span>
                    <div>
                      <img src={job.image} width="50px" height="50px" />
                    </div>
                  </div>
                  <div>
                    <ul
                      style={{
                        margin: "16px 0px 0px",
                        listStyle: "none",
                        textAlign: "start",
                        padding: "0px",
                        color: "rgb(0 0 0 / 74%)",
                        fontSize: "14px",
                      }}
                    >
                      <li>
                        <i
                          className="fa-solid fa-location-dot"
                          style={{ padding: "5px 5px 5px 0px" }}
                        ></i>
                        {job.internLocation}
                      </li>
                      <li>
                        <i
                          className="fa-solid fa-dollar-sign"
                          style={{ padding: "5px 5px 5px 0px" }}
                        ></i>
                        ${job.Salary} /{job.salaryType}
                      </li>
                      <li>
                        <i
                          className="fa-regular fa-calendar"
                          style={{ padding: "5px 5px 5px 0px" }}
                        ></i>
                        {job.duration} / {job.durationType} 
                      </li>
                    </ul>
                    <div className={classes.linkVeiw}>
                      <div>
                        <p className={classes.logoJob}>Job</p>
                      </div>
                      <div className={classes.linkVeiw}>
                       
                        <a
                          href={""}
                          style={{
                            margin: "0px 0px 8px ",
                            textDecoration: "none",
                            color: " #008bdc",
                          }}
                        >
                          View details
                          <i
                            className="fa-solid fa-chevron-right"
                            style={{ marginLeft: "5px" }}
                          ></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </Link>
              </Carousel.Slide>
            ))}
            {/* <Carousel.Slide className={classes.card}>
        <Link to="/jobs" className={classes.linkCard}>
          <div className={classes.moreInternships}>
            <div>
              <h1
                className={classes.unlock}
                style={{
                  fontSize: "25px",
                  textAlign: "start",
                  margin: "0px",
                }}
              >
                Unlock your true potential
              </h1>
              <p
                className={classes.explore}
                style={{
                  fontSize: "17px",
                  textAlign: "start",
                  marginTop: "0px",
                }}
              >
                Explore more than 15,000+ jobs
              </p>
            </div>

            <div className={classes.moreLink}>
              <a
                href="/jobs"
                className={classes.viewMoreJob}
                style={{
                  textDecoration: "none",
                  marginBottom: "21px",
                }}
              >
                View internships
              </a>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </div>
        </Link>
      </Carousel.Slide> */}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
}
