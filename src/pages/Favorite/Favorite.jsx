/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import classes from "./Favorite.module.css";
import { Link, useParams } from "react-router-dom";
import API_CONFIG from "../../core/utils/apiConfig.js";
import { timeSincePublication } from "../../core/utils/helper.js";
import PaginationJobs from "../Jobs/component/Pagination/PaginationJobs.jsx";
import axios from "axios";
import FavoriteBtn from "../Jobs/component/FavoritBtn/FavoriteBtn.jsx";

// const JOBS_PER_PAGE = 10;

export default function Favorite() {
  const token = JSON.parse(localStorage.getItem("userInfo")).data.token;
  const { page: numberOfPage } = useParams();
  const [internShip, setInternShip] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(()=>{

    axios({
      url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.favorite}`,
      headers:{
       Authorization :`${API_CONFIG.secretKey}${token}`
      },
      method:"GET"
    }).then(res=>{
      setInternShip(res.data.data);
      setTotalElements(internShip.length)
    }).catch(err=>console.log(err))
  },[])



  return (
    <Container>
      {internShip.length > 0 ? (
        <>
          <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: '30px' }}>
            Favorite Jobs
          </Text>
          {internShip.map((item) => (
            <Box key={item.id} className={classes.styleIntern}>
              <div>
                <div className={classes.actively}>
                  <i className="fa-solid fa-arrow-trend-up" style={{ color: '#3ae' }}></i>
                  <p className={classes.active_hiring}>Actively hiring</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p className={classes.hint}>{item.title}</p>
                    <p className={classes.title}>{item.companyName}</p>
                  </div>
                  <div>
                    <img src={item.companyImage} width={'50px'} height={'50px'} alt={`${item.companyName} logo`} />
                  </div>
                </div>
                <div className={classes.country}>
                  <i className="fa-solid fa-location-dot" style={{ color: '#8A8A8A' }}></i>
                  {item.internLocation}
                </div>
                <div className={classes.info}>
                  <div style={{ margin: '7px 10px 7px 0px ' }}>
                    <p className={classes.start}>
                      <i className="fa-regular fa-circle-play" style={{ color: '#8A8A8A', padding: '0px 2px 2px 0px' }}></i>
                      START DATE
                    </p>
                    <p className={classes.immediately}>{item.startDate}</p>
                  </div>
                  <div style={{ margin: '7px 10px 7px 7px' }}>
                    <p className={classes.start}>
                      <i className="fa-regular fa-calendar" style={{ color: '#8A8A8A', padding: '0px 2px 2px 0px' }}></i>
                      DURATION
                    </p>
                    <p className={classes.immediately}>
                      {item.duration} / {item.durationType}
                    </p>
                  </div>
                  <div style={{ margin: '7px' }}>
                    <p className={classes.start}>
                      <i className="fa-solid fa-money-bill" style={{ color: '#8A8A8A', padding: '0px 2px 2px 0px' }}></i>
                      SALARY
                    </p>
                    <p className={classes.immediately}>${item.Salary} /monthly</p>
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <p
                    style={{
                      margin: '5px 10px 5px 0px',
                      backgroundColor: 'rgb(241,255,229)',
                      borderRadius: '6px',
                      padding: '4px 7px',
                      fontSize: '13px',
                      color: 'rgb(19,128,13)',
                    }}
                  >
                    <i className="fa-regular fa-clock" style={{ color: 'rgb(19,128,13)', padding: '0px 2px 2px 0px' }}></i>
                    {timeSincePublication(item.createdAt)}
                  </p>
                  <p
                    style={{
                      margin: '5px 10px 5px 10px',
                      backgroundColor: '#eee',
                      borderRadius: '6px',
                      padding: '4px 7px',
                      fontSize: '13px',
                      color: 'black',
                    }}
                  >
                    Fresher Job
                  </p>
                  <p
                    style={{
                      margin: '5px 10px 5px 10px',
                      backgroundColor: '#eee',
                      borderRadius: '6px',
                      padding: '4px 7px',
                      fontSize: '13px',
                      color: 'black',
                    }}
                  >
                    {item.internType}
                  </p>
                </div>
                <div style={{ backgroundColor: '#eee', height: '1px', margin: '10px 5px' }}></div>
              </div>
              <div style={{ textAlign: 'end', margin: '0px 5px', display: 'flex', justifyContent: 'end' }}>
                <Box mr={8}>
                  <FavoriteBtn jobId={item.jobId} />
                </Box>
                <Link className={classes.viewLink} to={`/jobs/details/${item.jobId}`}>
                  view details
                </Link>
              </div>
            </Box>
          ))}
          <PaginationJobs route={'/favorite'} totalElements={totalElements} ITEMS_PER_PAGE={10} numberOfPage={numberOfPage} />
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text style={{ fontWeight: '700', fontSize: '30px' }}>No jobs in Favorite</Text>
          <Link to="/jobs" className={classes.viewLink}>
            Go to Jobs Page
          </Link>
        </div>
      )}
    </Container>
  );
}
