import { useState } from "react";
import DynamicFieldForm from "./DynamicFieldForm.jsx";
import { httpRequest } from "../../../core/utils/httpRequest.js";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import { HTTP_METHODS } from "../../../core/utils/httpRequest.js";
import { showNotification } from "../../../core/helperMethods/showNotification.js";
import classes from "./Companyjob.module.css";
import { Container } from "react-bootstrap";
import {  Box, Button, Text } from '@mantine/core';

const JobPostingForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    duration: "",
    job: "",
    salary: "",
    intern: "",
    internLocation: "",
    numberOfOpenings: "",
    skills: [],
    description: "",
    questions: [],
  });

  //onsole.log('me', fields);
  const handleFieldsChange = (updatedFields) => {
    setFields(updatedFields); // Update fields state based on changes from DynamicFieldForm
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.questions.push(...fields);
    const data = JSON.parse(localStorage.getItem("userInfo"));
    const token = data.token;
    const headers = {
      Authorization: `${API_CONFIG.secretKey}${token}`,
    };
    httpRequest(
      API_CONFIG.endpoints.company.createJob,
      HTTP_METHODS.POST,
      formData,
      headers
    ).then((res) => {
      if (res.status === 201) {
        showNotification("Created");
      }
      console.log(res);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const inputStyle = { };

  return (
    <div className={classes.style}>
      <div className="formContainer">

        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px auto 0px",
            paddingBottom: "50px",
          }}
        >

          <form onSubmit={handleSubmit} className={classes.form}>
          <Text fz={30} fw={500} ta={"center"} mb={5}>Create Job</Text>

            <div>
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                required
                className={classes.field}
                />
            </div>

            <div style={{display:"flex" , gap:"10px"}}>


              <input
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className={classes.field}
                />

              <input
                type="number"
                name="duration"
                placeholder="Number of duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className={classes.field}
                />


            </div>

            <div>
            </div>

            <div style={{display:"flex"  ,gap:"10px"}}>


              <select
                name="job"
                value={formData.job}
                onChange={handleChange}
                required
                className={classes.field}
                >
                <option value="">Job Type</option>
                <option value="job">Job</option>
                <option value="internship">Internship</option>
              </select>

              <select
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className={classes.field}
                
                >
                <option value="">Salary Type</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="daily">Daily</option>
              </select>


            </div>

            <div>
            <select
                name="intern"
                value={formData.intern}
                onChange={handleChange}
                required
                className={classes.field}
                >
                <option value="">Intern Type</option>
                <option value="part-time">Part-Time</option>
                <option value="full-time">Full-Time</option>
              </select>
            </div>


            <div style={{display:"flex" , gap:"10px"}}>
              <input
                type="text"
                name="internLocation"
                placeholder="Intern Location"
                value={formData.internLocation}
                onChange={handleChange}
                required
                className={classes.field}
                />


              <input
                type="number"
                name="numberOfOpenings"
                placeholder="Number of Openings"
                value={formData.numberOfOpenings}
                onChange={handleChange}
                required
                className={classes.field}
                />

            </div>

            

            <div>
              <input
                type="text"
                name="skills"
                placeholder="Skills (comma-separated)"
                value={formData.skills}
                onChange={handleChange}
                required
                className={classes.field}
                />
            </div>

            <div>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                className={classes.field}
                />
            </div>

            <div>
              <DynamicFieldForm onFieldsChange={handleFieldsChange}  />
            </div>

            <Box mt={5} ta={"center"}>
              <Button type="submit" w={"100%"} >
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default JobPostingForm;
