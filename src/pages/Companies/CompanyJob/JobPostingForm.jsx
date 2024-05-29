import { useState } from "react";
import DynamicFieldForm from "./DynamicFieldForm.jsx";
import API_CONFIG from "../../../core/utils/apiConfig.js";
import { showNotification } from "../../../core/helperMethods/showNotification.js";
import classes from "./Companyjob.module.css";
import { Container } from "react-bootstrap";
import {  Box, Button, Text } from '@mantine/core';
import axios from "axios";

const JobPostingForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    duration: "",
    durationType:"",
    job: "",
    Salary: "",
    salaryType:"",
    internType: "",
    internLocation: "",
    numberOfOpenings: "",
    skills: [],
    description: "",
    questions: [],
  });
  console.log(formData);

  //onsole.log('me', fields);
  const handleFieldsChange = (updatedFields) => {
    setFields(updatedFields); // Update fields state based on changes from DynamicFieldForm
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.questions.push(...fields);
    const data = JSON.parse(localStorage.getItem("companyInfo"));
    const token = data.data.token;
    axios({method:"post",
      url:`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.company.createJob}`,
      headers:{Authorization:`${API_CONFIG.secretKey}${token}`},
      data:formData
    // eslint-disable-next-line no-unused-vars
    }).then((res=>{
      showNotification("Job Created Successfully");
      window.location.reload()
    })).catch((err=>{
      console.log(err);
    }))
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name=="skills"){
      setFormData({...formData, [name]:value.split(",")})
    }
    else{
    setFormData({ ...formData, [name]: value });
    }
  };
  


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
                 <select
                name="job"
                value={formData.job}
                onChange={handleChange}
                required
                className={classes.field}
                >
                 <option disabled selected value="">
                Job Type
                </option>
                <option value="job">Job</option>
                <option value="internship">Internship</option>
              </select>

         


            </div>

            <div style={{display:"flex"  ,gap:"10px"}}>


            <input
                type="number"
                name="Salary"
                placeholder="Salary"
                value={formData.Salary}
                onChange={handleChange}
                required
                className={classes.field}
                />

              <select
                name="salaryType"
                value={formData.salaryType}
                onChange={handleChange}
                required
                className={classes.field}
                
                >
                <option value="" disabled selected>Salary Type</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="daily">Daily</option>
              </select>


            </div>

            <div style={{display:"flex"  ,gap:"10px"}}>
          
  <input
    type="number"
    name="duration"
    placeholder="Number of duration"
    value={formData.duration}
    onChange={handleChange}
    required
    className={classes.field}
    />



  <select
    name="durationType"
    value={formData.durationType}
    onChange={handleChange}
    required
    className={classes.field}
    
    >
    <option value="" disabled selected>Duration Type</option>
    <option value="month">Month</option>
    <option value="year">Year</option>
    <option value="day">Day</option>
  </select>

</div>
            <div>
            <select
                name="internType"
                value={formData.internType}
                onChange={handleChange}
                required
                className={classes.field}
                >
                <option value="" disabled selected>Intern Type</option>
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
