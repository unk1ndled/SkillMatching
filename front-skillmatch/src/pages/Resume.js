import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from "../context/AuthContext";
import axios from "axios";



// Dummy data for the resume content
const personalInfoPlaceholder = {
  name: 'Thiago Braga',
  address: '770 Margial de Arruda Campos St., Bauru, SP, Brazil, Zip: 17063-060',
  email: 'contato@thiagobraga.org',
  phone: '+55 14 99165 5873',
};

const professionalSummary = `PHP & JavaScript developer + Devops Enthusiast with a decade of success leading teams in delivering appropriate technology solutions for desktop and mobile products.

Comprehensive knowledge of enterprise architecture, agile methodologies, remote work, cloud services and web-based applications.`;

const employments = [
  {
    "title": "Senior React Developer",
    "company": "Innovative Tech Solutions",
    "location": "San Francisco, CA",
    "startDate": "June 2021",
    "endDate": "Present",
    "responsibilities": [
      "Lead the development of client-side applications using React.",
      "Implement state management solutions with Redux.",
      "Optimize application performance for maximum speed and scalability.",
      "Collaborate with UX/UI designers to translate designs and wireframes into high-quality code.",
      "Mentor junior developers and provide code reviews."
    ]
  },
  {
    "title": "Frontend Developer",
    "company": "Creative Web Studios",
    "location": "New York, NY",
    "startDate": "May 2018",
    "endDate": "May 2021",
    "responsibilities": [
      "Developed new user-facing features using React.js.",
      "Built reusable components and front-end libraries for future use.",
      "Translated designs and wireframes into high-quality code.",
      "Ensured the technical feasibility of UI/UX designs."
    ]
  },
  {
    "title": "Junior Web Developer",
    "company": "Startup Dreams",
    "location": "Austin, TX",
    "startDate": "Jan 2016",
    "endDate": "Apr 2018",
    "responsibilities": [
      "Assisted in the development of web applications and websites using HTML, CSS, and JavaScript.",
      "Maintained and improved website functionality and responsiveness.",
      "Participated in the full software development lifecycle, from concept to deployment.",
      "Worked closely with back-end developers to integrate APIs and services."
    ]
  }
]
;

const experiencePlaceholder = [
    {
      "title": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "responsibilities": [""]
    },
    {
      "title": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "responsibilities": [""]
    },
    {
      "title": "",
      "company": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "responsibilities": [""]
    }
  ];



const handlePrint = () => {
  window.print();
};

// Resume component
const Resume = () => {



  const [experience, setExperience] = useState(experiencePlaceholder);
  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");
  const [summary, setSummary] = useState("summary");
  const [personalInfo, setPersonalInfo] = useState(personalInfoPlaceholder);

  const { userData } = useAuth();

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/profiles/${userData.id}`
      );

      console.log(response.data);
      await setFirstName(response.data.firstName);
      await setLastName(response.data.lastName);
      await setExperience(JSON.parse(response.data.experience));
      await setPersonalInfo(JSON.parse(response.data.personalInfo));


      //await console.log(experience);

      


    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);




  return (

    
    <Container>
      <PrintButton onClick={handlePrint}>Print Resume</PrintButton>
      <Header>
        <FullName>{firstName} {lastName}</FullName>
        <ContactInfo>{personalInfo.address}</ContactInfo>
        <ContactInfo>{personalInfo.email}</ContactInfo>
        <ContactInfo>{personalInfo.phone}</ContactInfo>
      </Header>

      <Section>
        <SectionHeader>Professional Summary</SectionHeader>
        <p>{professionalSummary}</p>
      </Section>

      <Section>
        <SectionHeader>Experience</SectionHeader>
        {experience.map((job, index) => (
            <EmploymentExperience key={index}>
                <JobTitle>{job.title}</JobTitle>
                <Company>@ {job.company}</Company>
                <JobPeriod>{job.startDate} - {job.endDate}</JobPeriod>
                <JobDescription>
                {job.responsibilities.map((duty, i) => (
                    <JobDuty key={i}>{duty}</JobDuty>
                ))}
                </JobDescription>
            </EmploymentExperience>
        ))}
      </Section>
    </Container>
  );
};






// Styled components for the resume layout
const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 600px;
  margin: 20px auto;
  border: 1px solid #ddd;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const FullName = styled.h1`
  font-size: 2em;
  margin-bottom: 5px;
`;

const ContactInfo = styled.p`
  margin: 2px 0;
  color: #666;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const SectionHeader = styled.h2`
  font-size: 1.5em;
  border-left: 5px solid #0077b5;
  padding-left: 10px;
  color: #333;
`;

const EmploymentExperience = styled.div`
  margin-bottom: 20px;
`;

const JobTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #333;
`;

const Company = styled.p`
  margin: 2px 0;
  font-weight: bold;
`;

const JobPeriod = styled.p`
  margin: 2px 0;
  font-style: italic;
  color: #666;
`;

const JobDescription = styled.ul`
  list-style: none;
  padding: 0;
  color: #333;
`;

const JobDuty = styled.li`
  margin-bottom: 5px;
  &:before {
    content: '• ';
    color: #0077b5;
  }
`;

const PrintButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;




export default Resume;
