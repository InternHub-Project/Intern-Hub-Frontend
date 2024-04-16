import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";

import { useEffect, useState } from "react";
// import { vars } from "../theme";
import classes from "./LatestJobs.module.css";
import { Link } from "react-router-dom";
import APP_CONFIG from "../../../../core/utils/apiConfig.js";
import {
  HTTP_METHODS,
  httpRequest,
} from "../../../../core/utils/httpRequest.js";

export default function LatestJobs() {
  const [allJobs, setAllJobs] = useState([]);

  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    //  todo: change this endpoint according to the UI requirements and add the query parameters
    httpRequest(APP_CONFIG.endpoints.jobs.getJobs, HTTP_METHODS.GET).then(
      (res) => {
        if (res.status === 200) {
          setAllJobs(res.data);
          setJobs(res.data);
        }
      },
    );
  }, []); // category

  useEffect(() => {
    //  todo: change this endpoint according to the UI requirements
    httpRequest(APP_CONFIG.endpoints.jobs.getJobs, HTTP_METHODS.GET).then(
      (res) => {
        setCategory(res.data);
      },
    );
  }, []);

  const handleSelectCategory = (category) => {
    const newJobs = allJobs.filter((ele) => ele.category === category);
    setJobs(newJobs);
    setActive(category);
  };

  const [active, setActive] = useState(category[0]);

  return (
    <div className={classes.up}>
      {/* categories */}
      <p className={classes.titleInternship}>Latest internships on Jobs</p>
      <div className={classes.categories}>
        <p style={{ margin: "9px 5px", fontSize: "18px", fontWeight: 400 }}>
          POPULAR CATEGORIES:
        </p>
        {category.map((item) => {
          return (
            <Button
              styles={{
                label: {
                  overflow: "inherit",
                },
              }}
              color="rgb(93,93,93)"
              variant={item === active ? "gradient" : "outline"}
              key={item}
              onClick={() => handleSelectCategory(item)}
              className={classes.category} //TODO: Give active button border...
              style={{
                borderRadius: "22px",
                borderColor: `${item === active ? "" : ""}`,
              }}
            >
              {item}
            </Button>
          );
        })}
      </div>
      <Carousel
        containScroll={"keepSnaps"}
        height={300}
        style={{ margin: "10px" }}
        styles={{ container: { width: "100%" } }}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 10, sm: "md", md: "sm" }}
        // loop
        align="start"
        controlSize={40}
        controlsOffset="xs"
      >
        {jobs.map((job) => (
          <Carousel.Slide key={job.id} className={classes.card}>
            <Link to="" className={classes.linkCard}>
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
                    {job.hint}
                  </p>
                </span>
                <div>
                  <img src={job.img} width="50px" height="50px" />
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
                      style={{ padding: "5px 5px 10px 0px" }}
                    ></i>
                    {job.country}
                  </li>
                  <li>
                    <i
                      className="fa-solid fa-dollar-sign"
                      style={{ padding: "5px 5px 5px 0px" }}
                    ></i>
                    ${job.salary} /Monthly
                  </li>
                </ul>
                <div className={classes.linkVeiw}>
                  <div>
                    <p className={classes.logoJob}>Job</p>
                  </div>
                  <div>
                    <a
                      href=""
                      className={classes.viewDetails}
                      style={{
                        margin: "0px 7px 8px ",
                        textDecoration: "none",
                      }}
                    >
                      View details
                    </a>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
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
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}
