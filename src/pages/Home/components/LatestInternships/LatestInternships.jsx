import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Button, Text } from "@mantine/core";
// import { Link } from "@mongez/react-router";
// import URLS from "apps/front-office/utils/urls";
import { useEffect, useState } from "react";
// import { vars } from "../theme";
import classes from "./LatestInternships.module.css";
import { Link } from "react-router-dom";

export default function LatestInternships() {
  const [allInternships, setAllInternships] = useState([]);
  const [intrenships, setIntrenships] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://internships-api.onrender.com/internships")
      .then((res) => res.json())
      .then((data) => {
        setAllInternships(data);
        setIntrenships(data);
      });
  }, []); // category

  useEffect(() => {
    fetch("https://internships-api.onrender.com/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  const [active, setActive] = useState(category[0]);

  const handleSelectCategory = (category) => {
    const newInternships = allInternships.filter(
      (ele) => ele.category === category
    );
    setIntrenships(newInternships);
    setActive(category);
  };

  return (
    <div className={classes.up}>
      {/* categories */}
      <p className={classes.titleInternship}>
        Latest internships on InternShips
      </p>
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
                padding:"8px 10px",
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
        {intrenships.map((intern) => (
          <Carousel.Slide key={intern.id} className={classes.card}>
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
                  <p style={{ margin: "0px" }} className={classes.titleJob}>
                    {intern.title}
                  </p>
                  <Text m={0} c="rgb(0 0 0 / 60%)">
                    {intern.hint}
                  </Text>
                </span>
                <div>
                  <img src={intern.img} width="50px" height="50px" />
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
                    {intern.country}
                  </li>
                  <li>
                    <i
                      className="fa-solid fa-dollar-sign"
                      style={{ padding: "5px 5px 5px 0px" }}
                    ></i>
                    ${intern.salary} /Month
                  </li>
                  <li>
                    <i
                      className="fa-regular fa-calendar"
                      style={{ padding: "5px 5px 5px 0px" }}
                    ></i>
                    {intern.time}
                  </li>
                </ul>
                <div className={classes.linkVeiw}>

                    <div>
                        <p className={classes.logoIntern}>Internship</p>
                    </div>

                  <div>
                  <a
                    className={classes.viewDetails}
                    href=""
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
        <Carousel.Slide className={classes.styleSlide}>
          <Link className={classes.linkCard} to="/internships">
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
                  Explore more than 15,000+ internships
                </p>
              </div>

              <div className={classes.moreLink}>
                <a
                  className={classes.viewMoreIntern}
                  href="/internships"
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
