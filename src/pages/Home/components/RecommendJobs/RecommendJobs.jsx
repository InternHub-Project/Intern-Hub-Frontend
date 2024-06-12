import { Box } from "@mantine/core";
import { CloseButton } from "@mantine/core";
import { useState } from "react";
import Reco from "./Reco";
// import axios from "axios";
// import API_CONFIG from "../../../../core/utils/apiConfig";
// import { Carousel } from "@mantine/carousel";
// import { Link } from "react-router-dom";

export default function RecommendJobs() {
 

  const closeBtn = <CloseButton c={"blue"} onClick={e} />;
  const [close, setClose] = useState(closeBtn);

  const carousel = <Reco />;

  const [recommend, setRecommend] = useState(carousel);
  const [opened, setOpened] = useState(true);
  function e() {
    if (opened) {


      setRecommend(<></>);
      setClose(<></>);
      setOpened();
    }
  }

  return (
    <Box mt={50}>
      {localStorage.length ? (
        <Box>
          {" "}
          <Box ta={"end"} mr={20} pb={0}>
            {close}{" "}
          </Box>
          <Box pt={0}>{recommend}</Box>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
