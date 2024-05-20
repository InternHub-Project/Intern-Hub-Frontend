import { Carousel } from "@mantine/carousel";
import { Box } from "@mantine/core";

import { useEffect, useState } from "react";
import classes from "./LestJobs.module.css";
import API_CONFIG from "../../../../core/utils/apiConfig";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LestJobs() {
  const [jobs, setJobs] = useState();


  useEffect(() => {
    axios({
      url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.jobs.newjobs}`,
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setJobs(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.up}>
      {/* categories */}
      <Box ta={"center"}>
        <p className={classes.titleInternship}>Latest internships on Jobs</p>
      </Box>
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
        {jobs &&
          jobs.map((job) => (
            <Carousel.Slide key={job.id} className={classes.card}>
              <Link to={`/jobs/details/${job.jobId}`} className={classes.linkCard}>
                <div className={classes.actively}>
                  <i
                    className="fa-solid fa-arrow-trend-up"
                    style={{ color: "#3ae" }}
                  ></i>
                  <p className={classes.active_hiring}>Actively hiring</p>
                </div>
                <div className={classes.cardCourses}>
                  <span className={classes.headingCard}>
                    <p style={{ margin: "0px", color: "black" }}>{job.title}</p>
                    <p
                      style={{
                        margin: "0px",
                        color: "rgb(0 0 0 / 57%)",
                      }}
                    >
                      {job.companyName}
                    </p>
                  </span>
                  <div>
                    <img src={job.companyImage} width="50px" height="50px" />
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
                  <Box ta={"start"}>
                  <p
                      style={{
                        margin: "5px 10px 5px 0px",
                        backgroundColor: "#eee",
                        borderRadius: "6px",
                        padding: "4px 7px",
                        fontSize: "13px",
                        color: "black",
                      }}
                    >
                      {job.jobType}
                    </p>
                  </Box>
                    <a
                      href={""}
                      style={{
                        margin: "0px 0px 8px ",
                        textDecoration: "none",
                        color: " #008bdc",
                        
                      }}
                    >
                      View details
                    <i className="fa-solid fa-chevron-right" style={{marginLeft:"5px"}}></i>
                    </a>
                  </div>
                </div>
              </Link>
            </Carousel.Slide>
          ))}
        <Carousel.Slide className={classes.card}>
          <Link to="/jobs" className={classes.linkCard}>
            <div className={classes.moreInternships}>
              <div>
                <h1
                  style={{
                    fontSize: "25px",
                    textAlign: "start",
                    margin: "0px",
                    color: "black",
                  }}
                >
                  Unlock your true potential
                </h1>
                <p
                  style={{
                    fontSize: "17px",
                    textAlign: "start",
                    marginTop: "0px",
                    color: "rgb(0 0 0 / 83%)",
                  }}
                >
                  Explore more than 15,000+ jobs
                </p>
              </div>

              <div className={classes.moreLink}>
                <a
                  href="/jobs"
                  style={{
                    textDecoration: "none",
                    color: " #008bdc",
                    marginBottom: "21px",
                  }}
                >
                  View internships
                </a>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
          </Link>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}
