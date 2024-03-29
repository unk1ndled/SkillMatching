import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// Dummy data for the resume content
const personalInfoPlaceholder = {
  name: "Thiago Braga",
  address:
    "770 Margial de Arruda Campos St., Bauru, SP, Brazil, Zip: 17063-060",
  email: "contato@thiagobraga.org",
  phone: "+55 14 99165 5873",
};

const professionalSummary = `PHP & JavaScript developer + Devops Enthusiast with a decade of success leading teams in delivering appropriate technology solutions for desktop and mobile products.

Comprehensive knowledge of enterprise architecture, agile methodologies, remote work, cloud services and web-based applications.`;

const employments = [
  {
    title: "Senior React Developer",
    company: "Innovative Tech Solutions",
    location: "San Francisco, CA",
    startDate: "June 2021",
    endDate: "Present",
    responsibilities: [
      "Lead the development of client-side applications using React.",
      "Implement state management solutions with Redux.",
      "Optimize application performance for maximum speed and scalability.",
      "Collaborate with UX/UI designers to translate designs and wireframes into high-quality code.",
      "Mentor junior developers and provide code reviews.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Creative Web Studios",
    location: "New York, NY",
    startDate: "May 2018",
    endDate: "May 2021",
    responsibilities: [
      "Developed new user-facing features using React.js.",
      "Built reusable components and front-end libraries for future use.",
      "Translated designs and wireframes into high-quality code.",
      "Ensured the technical feasibility of UI/UX designs.",
    ],
  },
  {
    title: "Junior Web Developer",
    company: "Startup Dreams",
    location: "Austin, TX",
    startDate: "Jan 2016",
    endDate: "Apr 2018",
    responsibilities: [
      "Assisted in the development of web applications and websites using HTML, CSS, and JavaScript.",
      "Maintained and improved website functionality and responsiveness.",
      "Participated in the full software development lifecycle, from concept to deployment.",
      "Worked closely with back-end developers to integrate APIs and services.",
    ],
  },
];
const experiencePlaceholder = [
  {
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    responsibilities: [""],
  },
  {
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    responsibilities: [""],
  },
  {
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    responsibilities: [""],
  },
];

const handlePrint = () => {
  window.print();
};

const skillsPlaceholder = [
  { name: "PHP", level: 80 }, // Level is a percentage of proficiency
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "React Native", level: 70 },
  { name: "Vue", level: 60 },
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "DevOps", level: 75 },
  { name: "Docker", level: 80 },
  { name: "AWS", level: 70 },
  { name: "CI/CD", level: 65 },
  { name: "PostgreSQL", level: 80 },
  { name: "MySQL", level: 85 },
  { name: "Elasticsearch", level: 70 },
  { name: "Redis", level: 75 },
  { name: "GNU/Linux", level: 90 },
  { name: "Mac OS", level: 80 },
  { name: "Windows", level: 65 },
];

// Resume component
const Resume = () => {
  const [skillIds, setskillIds] = useState([]);
  const [skillsLevel, setSkillsLevel] = useState({});
  const [idName, setIdName] = useState({});
  const [skills, setSkills] = useState(skillsPlaceholder);
  const [experience, setExperience] = useState(experiencePlaceholder);
  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");
  const [summary, setSummary] = useState("summary");
  const [personalInfo, setPersonalInfo] = useState(personalInfoPlaceholder);

  const { userData } = useAuth();

  const SERVER = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${SERVER}api/v1/profiles/${userData.id}`
      );

      const data = response.data;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setExperience(JSON.parse(data.experience));
      setPersonalInfo(JSON.parse(data.personalInfo));

      const recognizedSkills = response.data.recognizedSkills;
      setSkillsLevel(recognizedSkills);
      const skillIds = Object.keys(recognizedSkills);
      const idName = {};

      await Promise.all(
        skillIds.map(async (skillId) => {
          try {
            const response = await axios.get(
              `${SERVER}api/v1/keywords/${skillId}`
            );
            idName[skillId] = response.data.name;
          } catch (error) {
            console.error(`Error fetching keyword ${skillId}:`, error);
          }
        })
      );
      const final = skillIds
        .filter((skillId) => recognizedSkills.hasOwnProperty(skillId))
        .map((skillId) => ({
          name: idName[skillId],
          level: recognizedSkills[skillId],
        }));

      setSkills(final);
      console.log(final);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <ResumeContainer>
      <PrintButton onClick={handlePrint}>Print Resume</PrintButton>
      <ResumeHeader>
        <FullName>
          {firstName} {lastName}
        </FullName>
        <ContactInfo>{personalInfo.address}</ContactInfo>
        <ContactInfo>{personalInfo.email}</ContactInfo>
        <ContactInfo>{personalInfo.phone}</ContactInfo>
      </ResumeHeader>

      <ContentSection>
        <MainContent>
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
                <JobPeriod>
                  {job.startDate} - {job.endDate}
                </JobPeriod>
                <JobDescription>
                  {job.responsibilities.map((duty, i) => (
                    <JobDuty key={i}>{duty}</JobDuty>
                  ))}
                </JobDescription>
              </EmploymentExperience>
            ))}
          </Section>
        </MainContent>

        <SkillsSection>
          <SectionHeader>Skills</SectionHeader>
          {skills.map((skill, index) => (
            <Skill key={index}>
              <SkillName>{skill.name}</SkillName>
              <SkillLevel>
                {Array.from({ length: 3 }, (_, i) => (
                  <Dot
                    key={i}
                    style={{ opacity: i < skill.level + 1 ? 1 : 0.2 }}
                  />
                ))}
              </SkillLevel>
            </Skill>
          ))}
        </SkillsSection>
      </ContentSection>
    </ResumeContainer>
  );
};

const ResumeContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  border: 1px solid #ddd;
`;

// Header now spans the full width
const ResumeHeader = styled.header`
  display: block; // or 'flex' if you want to align items horizontally
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

// MainContent and SkillsSection now within ContentSection for side by side layout
const ContentSection = styled.section`
  display: flex;
`;

// Adjust MainContent padding
const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ddd;
`;

// Adjust SkillsSection padding
const SkillsSection = styled.aside`
  width: 300px;
  padding: 20px;
`;

///////////////////

const Skill = styled.div`
  margin-bottom: 10px;
`;

const SkillName = styled.h4`
  color: #333;
  margin-bottom: 4px;
`;

const Dot = styled.span`
  height: 10px;
  width: 10px;
  margin-right: 5px;
  background-color: #0077b5;
  border-radius: 50%;
  display: inline-block;
`;

const SkillLevel = styled.div`
  display: flex;
  align-items: center;
`;

// Styled components for the resume layout
const Container = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
    content: "• ";
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
