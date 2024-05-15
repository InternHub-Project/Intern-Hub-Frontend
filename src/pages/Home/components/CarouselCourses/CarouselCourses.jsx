import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import classes from "./CarouselCourses.module.css";
import { Link } from "react-router-dom";


export default function CarouselCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("https://internships-api.onrender.com/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .then((err) => console.log(err));
  }, []);

  return (
    <div className={classes.up}>
      <div>
        <p className={classes.certification}>Certification courses</p>
        <p className={classes.fastest}>Fastest way to build your CV</p>
      </div>
      <Carousel
        controlsOffset="xs"
        controlSize={40}
        height={400}
        style={{ margin: "0px 0px", padding: "0px 40px" }}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        loop
        align="start"
      >
        {courses.map((course) => (
          <Carousel.Slide key={course.id} style={{ padding: "0px 20px" }}>
            <Link
              to={`/courses/${course.id}`}
              style={{
                textDecoration: "none",
              }}
            >
              <div className={classes.slide}>
                <img
                  src={course.img}
                  width={"100%"}
                  height={"150px"}
                  className={classes.img}
                />
                <div className={classes.description}>
                  <p
                    className={classes.weeks}
                    style={{
                      margin: " 0px 0px 0px",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {course.time} Weeks
                  </p>
                  <p
                    style={{
                      margin: " 5px 0px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {course.title}
                  </p>
                  <div style={{ margin: "6px 0px 0px" }}>
                    <span>
                      <i
                        className="fa-solid fa-star"
                        style={{ color: "gold" }}
                      ></i>{" "}
                      {course.rate}
                    </span>
                    <span
                      style={{
                        borderLeft: "solid 2px rgb(51 170 238 / 30%)",
                        margin: "0px 8px",
                        padding: "0px 0px 0px 10px",
                      }}
                    >
                      {course.student}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#008BDC",
                      paddingTop: "5px",
                      marginTop: "5px",
                    }}
                  >
                    <span>
                      Know more <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Carousel.Slide>
        ))}
        <Carousel.Slide className={classes.linkMore}>
          <a
            href="/courses"
            style={{
              width: "100%",
              textDecoration: "none",
              textAlign: "start",
            }}
          >
            <div>
              <p className={classes.titleLinkMore}>
                Learn in-demand skills and get certified
              </p>
              <p className={classes.viewAll}>View all</p>
            </div>
          </a>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}
