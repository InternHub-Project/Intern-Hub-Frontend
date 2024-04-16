// import { Text } from "@mantine/core";
// import classes from "./Home.module.css";
import StartParagraph from "./components/StartPragraphe/StartParagraph";
import { CarouselTrending } from "./components/CarouselTrending/CarouselTrending";
import LatestInternships from "./components/LatestInternships/LatestInternships";
import LatestJobs from "./components/LatestJobs/LatestJobs";
import CarouselCourses from "./components/CarouselCourses/CarouselCourses";
import CarouselBigCourses from "./components/CarouselBigCourses/CarouselBigCourses";
import TopCompany from "./components/TopCompany/TopCompany";
import StateWebSite from "./components/StateWebSite/StateWebSite";

export default function Home() {
  return (
    <div>
      <StartParagraph />
      <CarouselTrending />
      <LatestInternships />
      <LatestJobs />
      <CarouselCourses />
      <CarouselBigCourses />
      <TopCompany />
      <StateWebSite />
    </div>
  );
}
