import { useEffect, useState } from "react";
import classes from "./JobsFilter.module.css";
import React from "react";
import { Box, Divider, Select, Text } from "@mantine/core";
// import API_CONFIG from "../../../../utils/apiConfig";

type QueryProps = string;

export type CategoryProps = {
  title: string;
  salary: number;
  salaryType: string;
  location: string;
  jobType: string;
  type: string;
  skills: string;
  duration: number;
  durationType: string;
};

const arr = ["monthly", "yearly", "daily"];

export default function JobsFilter({ setFilterQuery }) {
  const [formData, setFormData] = useState<CategoryProps>({
    title: "",
    salary: 0,
    salaryType: "",
    location: "",
    jobType: "",
    type: "",
    skills: "",
    duration: 0,
    durationType: "",
  });

  

  

  // const [_, setInternShip] = useState([]);

  // useEffect(() => {
  //   fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.job.jobsFiltration}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setInternShip(data);
  //     });
  // }, []);

  function setData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function filterUrl(e) {
    e.preventDefault();
    const query: QueryProps[] = [];
    for (const key in formData) {
      if (formData[key] != "") {
        query.push(`${key}=${formData[key]}`);
      }
    }
    setFilterQuery(query.join("&"));
  }

 
  const [type, setType] = useState("");
  const [jobType, setJobType] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [durationType, setDurationType] = useState("");
  return (
    <div>
      <form className={classes.form} onSubmit={filterUrl}>
        <input
          className={classes.input}
          value={formData.title}
          onChange={setData}
          name="title"
          type="text"
          placeholder="title"
        />

        <br />
        <Box mt={10}>
          <input
            className={classes.input}
            value={formData.salary}
            onChange={setData}
            name="salary"
            type="number"
            placeholder="salary"
          />
        </Box>

        <Box mt={11}>
          <select
            className={classes.selectSalaryType}
            name="salaryType"
            value={salaryType}
            onChange={(e) =>
              setSalaryType((formData.salaryType = e.target.value))
            }
          >
            <option disabled selected value="">
              Select Salary Type
            </option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="daily">Daily</option>
          </select>
        </Box>

        <Box mt={10}>
          <input
            className={classes.input}
            value={formData.location}
            onChange={setData}
            name="location"
            type="text"
            placeholder="location"
          />
        </Box>
        <Box mt={13} mb={10}>
          <input
            className={classes.input}
            value={formData.skills}
            onChange={setData}
            name="skills"
            type="text"
            placeholder="skills"
          />
        </Box>

        <Box mt={12}>
          <Text className={classes.label} mb={5} fz={16} fw={700}>
            Job Type:
          </Text>

          <Box
            mt={5}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div>
              <input
                type="radio"
                name="jobType"
                onClick={() => setJobType((formData.jobType = "job"))}
                value={jobType}
                // onChange={setData}
                id="job"
              />
              <label htmlFor="job">job</label>
            </div>

            <div>
              <input
                type="radio"
                name="jobType"
                onClick={() => setJobType((formData.jobType = "internShip"))}
                value={jobType}
                // onChange={setData}
                id="intern"
              />
              <label htmlFor="intern">internShip</label>
            </div>
          </Box>
        </Box>

        <Box mt={15}>
          <Text className={classes.label} mb={3} fz={16} fw={700}>
            {" "}
            Type:
          </Text>

          <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <input
                type="radio"
                onClick={() => setType((formData.type = "full-time"))}
                value={type}
                // onChange={setData}
                name="type"
                id="full"
              />
              <label htmlFor="full">Full-time</label>
            </div>

            <div>
              <input
                type="radio"
                onClick={() => setType((formData.type = "part-time"))}
                value={type}
                // onChange={setData}
                name="type"
                id="part"
              />
              <label htmlFor="part">part-time</label>
            </div>
          </Box>
        </Box>

        <Box mt={13}>
          <Text className={classes.label} mb={5} fz={16} fw={700}>
            Duration:
          </Text>

          <label htmlFor="duration"></label>

          <input
            style={{ marginTop: "5px" }}
            id="duration"
            className={classes.input}
            value={formData.duration}
            onChange={setData}
            name="duration"
            type="number"
            placeholder="duration"
          />
          <Box mt={10} mb={10}>
            <select
              className={classes.selectSalaryType}
              name="durationType"
              value={durationType}
              onChange={(e) =>
                setDurationType((formData.durationType = e.target.value))
              }
            >
              <option disabled selected value="">
              Select Duration Type
            </option>
              <option value="day">Day</option>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </Box>
        </Box>

    

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "0px ",
          }}
        >
          <input
            className={classes.submit}
            onClick={() => {
              setFilterQuery("");
              setFormData({
                
                
                title: "",
                salary: 0,
                salaryType: "",
                location: "",
                jobType: "",
                type: "",
                skills: "",
                duration: 0,
                durationType: "",
              });
            }}
            type="reset"
            name="reset"
          />
          <input className={classes.submit} type="submit" name="submit" />
        </div>
        <Divider mx="xs" my="xs" label="OR" labelPosition="center" />
      </form>
     
    </div>
  );
}
