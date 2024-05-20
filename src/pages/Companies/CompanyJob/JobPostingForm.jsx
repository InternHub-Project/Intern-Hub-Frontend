import { useState } from 'react';
import DynamicFieldForm from "./DynamicFieldForm.jsx";
import { httpRequest } from '../../../core/utils/httpRequest.js';
import API_CONFIG from '../../../core/utils/apiConfig.js';
import {HTTP_METHODS} from '../../../core/utils/httpRequest.js'
import { showNotification } from "../../../core/helperMethods/showNotification.js";
import classes from "./Companyjob.module.css"


const JobPostingForm = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    duration: '',
    job: '',
    salary: '',
    intern: '',
    internLocation: '',
    numberOfOpenings: '',
    skills: [],
    description: '',
    questions: []
  });


  
  //onsole.log('me', fields);
  const handleFieldsChange = (updatedFields) => {
    setFields(updatedFields); // Update fields state based on changes from DynamicFieldForm
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formData.questions.push(...fields);
    const data = JSON.parse(localStorage.getItem('userInfo'));
    const token = data.token;
    const headers = {
      'Authorization': `${API_CONFIG.secretKey}${token}`,
    }
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
    })
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const inputStyle = { };

  return (
    <div className="container">
      <div className="formContainer">
        <h1>Create Job</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="number"
            name="duration"
            placeholder="Number of duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="input"
          />
          <select
            name="job"
            value={formData.job}
            onChange={handleChange}
            required
            className="input select"
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
            className="input select"
          >
            <option value="">Salary Type</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="daily">Daily</option>
          </select>
          <select
            name="intern"
            value={formData.intern}
            onChange={handleChange}
            required
            className="input select"
          >
            <option value="">Intern Type</option>
            <option value="part-time">Part-Time</option>
            <option value="full-time">Full-Time</option>
          </select>
          <input
            type="text"
            name="internLocation"
            placeholder="Intern Location"
            value={formData.internLocation}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="number"
            name="numberOfOpenings"
            placeholder="Number of Openings"
            value={formData.numberOfOpenings}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            required
            className="input"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea"
          />
          <DynamicFieldForm onFieldsChange={handleFieldsChange} />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostingForm;