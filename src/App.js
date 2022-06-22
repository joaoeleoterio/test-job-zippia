import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [jobs, setJobs] = useState([]);
  const [jobsSortByCompany, setJobsSortByCompany] = useState([]);
  const [jobsLastSevenDays, setJobsLastSevenDays] = useState([]);

  const fetchJobs = async () => {
    await axios.post('https://www.zippia.com/api/jobs/', {
      "companySkills": true,
      "dismissedListingHashes": [],
      "fetchJobDesc": true,
      "jobTitle": "Business Analyst",
      "locations": [],
      "numJobs": 10,
      "previousListingHashes": []
    })
      .then(function (res) {
        // console.log(res.data);
        setJobs(res.data.jobs);
        SortByCompany();
        onlyCreatedSevenDaysAgo();
      });
  }

  const SortByCompany = async () => {
    const sorted = jobs.sort((a, b) => {
      if (a.companyName < b.companyName) {
        return -1;
      }
      if (a.companyName > b.companyName) {
        return 1;
      }
      return 0;
    }
    );
    setJobsSortByCompany(sorted);
  }

  const onlyCreatedSevenDaysAgo = async () => {
    const today = new Date();
    console.log(today);
    const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    console.log(sevenDaysAgo);
    const jobsCreatedSevenDaysAgo = jobs.filter(job => {
      const jobDate = new Date(job.postingDate);
      return jobDate >= sevenDaysAgo;
    });
    console.log(jobsCreatedSevenDaysAgo);
    setJobsLastSevenDays(jobsCreatedSevenDaysAgo);
  }

  useEffect(() => {
    fetchJobs();

  }, []);

  return (
    <div className="App">
      <h1>Only Ten</h1>
      {/*  List the first 10 jobs with cards, you should display the job title (jobTitle), the job company (companyName), and the job description (shortDesc).*/}
      <ul>
        {jobs.map(job => (
          <li key={job.listingHash}>
            <h2>{job.jobTitle}</h2>
            <p>{job.companyName}</p>
            <p>{job.shortDesc}</p>
          </li>
        ))}
      </ul>
      <h1>By Company</h1>
      {/* show on screen jobs sorted by Company Name */}
      <ul>
        {jobsSortByCompany.map(job => (
          <li key={job.listingHash}>
            <h2>{job.jobTitle}</h2>
            <p>{job.companyName}</p>
            <p>{job.shortDesc}</p>
          </li>
        ))}
      </ul>
      <h1>Created in the last 7 days</h1>
      {/* show on screen jobs created in the last 7 days */}
      <ul>
        {jobsLastSevenDays.map(job => (
          <li key={job.listingHash}>
            <h2>{job.jobTitle}</h2>
            <p>{job.companyName}</p>
            <p>{job.shortDesc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
