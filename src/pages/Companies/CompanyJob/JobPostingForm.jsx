import { useState } from 'react';
import reactLogo from "../../../assets/images/avatar.png";
import DynamicFieldForm from "./DynamicFieldForm.jsx";
import "./Companyjob.css"


const JobPostingForm = () => {
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
    questions: [
      {
        question: "What programming languages do you know?",
        type: "multiple_choice",
        options: ["JavaScript", "Python", "Java", "C++"]
      },
      {
        question: "Describe your relevant experience.",
        type: "text"
      }
    ]
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
   
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const inputStyle = { width: '100%', height: '40px' };

  return (
    <div className="container">
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <h1>Job Posting</h1>

      <div className="job-details">
        <p>Job Title</p>
        <p>Job Location</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }} />
        <br />
		<br />
		<input type="text" name="startDate" placeholder="Start Date" value={formData.startDate} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }} />
        <br />
		<br />
		<select name="duration" value={formData.duration} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }}>
          <option value="">Duration</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="day">Day</option>
        </select>
		<br />
		<br />
        <select name="job" value={formData.job} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }}>
          <option value="">Job Type</option>
          <option value="job">Job</option>
          <option value="internship">Internship</option>
        </select>
		<br />
		<br />
        <select name="salary" value={formData.salary} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }}>
          <option value="">Salary Type</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="daily">Daily</option>
        </select>
		<br />
		<br />
        <select name="intern" value={formData.intern} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }}>
          <option value="">Intern Type</option>
          <option value="part-time" >Part-Time</option>
          <option value="full-time">Full-Time</option>
        </select>
		<br />
		<br />
        <input type="text" name="internLocation" placeholder="Intern Location" value={formData.internLocation} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }} />
        <input type="number" name="numberOfOpenings" placeholder="Number of Openings" value={formData.numberOfOpenings} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }} />
        <br />
		<br />
		<input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} required style={{ ...inputStyle, height: '40px' }} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, height: '80px' }} />
        {/* أضف المزيد من حقول الإدخال حسب الحاجة */}
        {/* ... */}

        {/* زر الإرسال */}
		<br />
		<br />
         <DynamicFieldForm/>
		<br />
		<br />
        <button type="submit" style={inputStyle}>Submit</button>
      </form>
    </div>
  );
};

export default JobPostingForm;