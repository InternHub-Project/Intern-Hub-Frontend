import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Button,
  Text,
  Box,
  rem,
  Textarea,
  Divider,
} from "@mantine/core";
import classes from "./ApplyButton.module.css";
import React, { useEffect } from "react";


import { FileButton, Group } from "@mantine/core";
import { useState, useRef } from "react";
import axios from "axios";
import API_CONFIG from "../../../../core/utils/apiConfig";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export default function ApplyButton({ companyNameJob, nameJob, JobID }) {
  let token
  if(JSON.parse(localStorage.getItem("userInfo")))
    { 
      token = JSON.parse(localStorage.getItem("userInfo")).data.token;
    }
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  function clickApply() {
    if (!localStorage.getItem("userInfo")) {
      navigate("/LoginUser");
    } else {
      open();
    }
  }

  const [applyData, setApplyData] = useState({
    coverLetter: "",
    questions:[]
  });
  

  const setData = (e, index) => {
    const { name, value } = e.target;
  
    // Create a copy of the current state
    const updatedApplyData = { ...applyData };
  
    if (!updatedApplyData.questions[index]) {
      updatedApplyData.questions[index] = {};
    }
  
    // Update the answer for the current question
    updatedApplyData.questions[index][name] = value;
     
    // Set the updated state
    setApplyData(updatedApplyData);
  };


  const setCoverLetter=(e)=>{
    const cover=e.target.value;
    setApplyData({...applyData,coverLetter:cover})
  }



  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  
  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };


  const title = (
    <Box className={classes.containerHeader}>
      <Text fz={"19px"} fw={600}>
        Applying for {nameJob} job
      </Text>
      <Text fz={"15px"} c={"#454545"}>
        {companyNameJob}
      </Text>
    </Box>
  );


  const [questionApply, setQuestionApply] = useState<any>();
  

  useEffect(() => {
    axios({
      url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.jobs.applyJob}/${JobID}`, //ToDo change static id when modify in backend to dynamic id
      headers: {
        "Content-Type": "application/json",
        Authorization: `internHub__${token}`,
      },
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        setQuestionApply(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [JobID]);

// console.log(applyData);

  function applyToJob(e) {
    e.preventDefault();
		const formData = new FormData();
    if(file){
      formData.append('file', file);
  }
  if(applyData){
    formData.append("coverLetter",applyData.coverLetter)
    formData.append("question",applyData.questions)
    }

    
    axios({
      url: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.user.applyToJob}/${JobID}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `internHub__${token}`,
      },
      method: "POST",
      data:formData
    })
      .then((res) => {console.log(res)
        notifications.show({
          message: res.data.message,
          color: "green",
        });
      })
      .catch((err) => {
        console.log(err);
        notifications.show({
          message: err.response.data.message,
          color: "blue",
        });
      });
  }


  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        position="right"
        size="lg"
        transitionProps={{
          transition: "rotate-left",
          duration: 150,
          timingFunction: "linear",
        }}
        opened={opened}
        onClose={close}
        title={title}
        styles={{
          header: {
            padding: "10px",
            backgroundColor: "rgb(244 244 244)",
            borderBottom: "rgb(201,201,201) solid 1px",
          },

          inner: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            marginRight: "30px",
          },
        }}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <form onSubmit={applyToJob}>


          <Box>
            <Box mt={10}>
              <Text fz={"19px"} fw={600}>
                Your Resume.{" "}
                <span style={{ color: "#454545", fontSize: "12px" }}>
                  Updated recently
                </span>
              </Text>
              <Text fz={"15px"} c={"#454545"}>
                Your current resume will be submitted along with this
                application.{" "}
                <span
                  style={{
                    color: "rgb(0,139,220)",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  <Link to={"/edite_user_profile"} style={{textDecoration:"none"}}>Edit resume</Link>
                </span>
              </Text>
            </Box>

            <Box mt={20}>
              <Text fz={"19px"} fw={600}>
                Cover letter
              </Text>

              <Text mb={5} fz={"15px"} c={"#454545"}>
                Why should you be heired for this role?
              </Text>
              <Textarea
                name="coverLetter"
                required
                onChange={setCoverLetter}
                value={applyData.coverLetter}

                autosize
                minRows={5}
                resize="vertical"
                placeholder="Mention in detail what relevant skills or past experience you have for this job. what excites you about this job? why would you be a good fit?"
              />
            </Box>

            <Box mt={20}>

              <Box>
                {questionApply ? (
                  <>
                    {questionApply.map((item,index) => (
                      <Box key={item._id}>
                        {item.type === "multiple_choice" ? (
                          <Box>
                            <Text fz={"19px"} fw={600}>
                              {item.question}
                            </Text>
                            {item.options.map((option) => (
                              <Box key={option}>
                                <input
                                  required
                                   onChange={(e)=>setData(e,index)}
                                  type="radio"
                                  value={option}
                                  name={`answer`} 
                                  id={option}/>{" "}
                                <label
                                  style={{
                                    color: "#454545",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                  }}
                                  htmlFor={option}
                                >
                                  {option}
                                </label>
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          <Box mt={20}>
                            <Text fz={"19px"} fw={600}>
                              {item.question}
                            </Text>
                            <Box>
                              <Textarea
                                required
                                onChange={(e) => setData(e, index)}
                                name={"answer"}
                                value={applyData.questions[index]?.answer || ""}
                                autosize
                                minRows={5}
                                resize="vertical"
                                placeholder="..."
                              />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </>
                ) : (
                  <>
                    
                  </>
                )}
              </Box>
              {/* <Question
                nameDes={"desExp"}
                nameOption={"proLang"}
                // proLang={applyData.proLang}
                // desExp={applyData.desExp}
                setQuestion={questionApply}
                onChange={setData}
              /> */}

            </Box>

            <Box mt={20}>
              <Text fz={"19px"} fw={600}>
                Custom resume{" "}
                <span
                  style={{ color: "rgb(112 112 112 / 92%)", fontSize: "14px" }}
                >
                  (Optional)
                </span>
              </Text>
              <Text mt={3} mb={10} fz={"15px"} c={"#454545"}>
                Employer can download and view this resume
              </Text>

              <Group justify="start">
                <FileButton resetRef={resetRef} onChange={setFile} accept="pdf">

                  {(props) => (
                    <Button {...props} value={applyData.resume}>
                      Upload file
                    </Button>
                  )}


                </FileButton>
                <Button disabled={!file} color="red" onClick={clearFile}>
                  Reset
                </Button>
              </Group>

              {file && (
                <Text size="sm" ta="start" mt="sm" >
                  <Text bg="#f4f4f4" w={"fit-content"}  px={6} style={{borderRadius:"5px"}} >Picked file: {file.name}</Text>
                </Text>
              )}
            </Box>
          </Box>
          <Divider my="md" />

          <Box ta={"end"}>
            <Button
              mr={15}
              // type="reset"
              variant="transparent"
              onClick={close}
            >
              Back
            </Button>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Drawer>

      <div style={{ textAlign: "center" }}>
        <Button

          onClick={clickApply}
          type="submit"


          bg={"rgb(0,165,236)"}
          size="lg"
        >
          Apply now
        </Button>
      </div>
    </>
  );

}

