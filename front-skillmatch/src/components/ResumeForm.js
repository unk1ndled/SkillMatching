import React, {useState} from "react";
import styled from "styled-components";
import Paper from "./Paper";
import AnswerButton from "./AnswerButton";

const ResumeForm = (props) => {

  // State to hold the list of experiences
  const [experiences, setExperiences] = useState([]);

  // Function to add a new experience field
  const addExperienceField = () => {
    const newExperience = {
      id: experiences.length,
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      responsibilities: [""]
    };
    setExperiences([...experiences, newExperience]);
    console.log(experiences);
  };

  const removeExperienceField = (indexToRemove) => {
    setExperiences(experiences.filter((_, index) => index !== indexToRemove));
  };

  const removeExperience = (experienceIndex) => {
    setExperiences(experiences.filter((_, index) => index !== experienceIndex));
  };
  

  const addResponsibility = (experienceIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[experienceIndex].responsibilities.push("");
    setExperiences(updatedExperiences);
    console.log(experiences);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
    //console.log(experiences);
    props.saveExperience(JSON.stringify(experiences));
  };

  
  const handleResponsibilityChange = (experienceIndex, responsibilityIndex, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[experienceIndex].responsibilities[responsibilityIndex] = value;
    setExperiences(updatedExperiences);
    //console.log(experiences);
    props.saveExperience(JSON.stringify(experiences));
  };

  const removeResponsibility = (experienceIndex, responsibilityIndex) => {
    const updatedExperiences = [...experiences];
    const updatedResponsibilities = updatedExperiences[experienceIndex].responsibilities.filter((_, index) => index !== responsibilityIndex);
    updatedExperiences[experienceIndex].responsibilities = updatedResponsibilities;
    setExperiences(updatedExperiences);
  };
  
  

  return (
    <Container>
      <VerticalSplit>
        <ResumeElement width="45%">
          FIRST NAME
          <Paper height="33px" onInput={props.savefirstname}></Paper>
        </ResumeElement>
        <ResumeElement width="45%">
          LAST NAME
          <Paper height="33px" onInput={props.savelastname}></Paper>
        </ResumeElement>
      </VerticalSplit>

      <VerticalSplit>
        <ResumeElement width="32%">
          Email
          <Paper height="33px" onInput={props.saveemail}></Paper>
        </ResumeElement>
        <ResumeElement width="32%">
          Phone number
          <Paper height="33px" onInput={props.savephone}></Paper>
        </ResumeElement>
        <ResumeElement width="32%">
          Address
          <Paper height="33px" onInput={props.saveadress}></Paper>
        </ResumeElement>
      </VerticalSplit>

      <ResumeElement>
        CAREER OBJECTIVE
        <Paper height="15vw" onInput={props.saveobjective}></Paper>
      </ResumeElement>

      <ResumeElement>
        PROFESSIONAL SKILLS
        <Paper height="15vw" onInput={props.saveskills}></Paper>
      </ResumeElement>

      <ResumeElement>
        Experience
      </ResumeElement>

      {experiences.map((experience, experienceIndex) => (
        <ExperienceContainer key={experienceIndex}>
          <StyledInput
            type="text"
            placeholder="Title"
            value={experience.title}
            onChange={(e) => handleExperienceChange(experienceIndex, 'title', e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="Company"
            value={experience.company}
            onChange={(e) => handleExperienceChange(experienceIndex, 'company', e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="Location"
            value={experience.location}
            onChange={(e) => handleExperienceChange(experienceIndex, 'location', e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="Start Date"
            value={experience.startDate}
            onChange={(e) => handleExperienceChange(experienceIndex, 'startDate', e.target.value)}
          />
          <StyledInput
            type="text"
            placeholder="End Date"
            value={experience.endDate}
            onChange={(e) => handleExperienceChange(experienceIndex, 'endDate', e.target.value)}
          />
          {/* Repeat for location, startDate, endDate using StyledInput */}

          {experience.responsibilities.map((responsibility, respIndex) => (
            <div key={respIndex}>
              <StyledInput
                type="text"
                placeholder="Responsibility"
                value={responsibility}
                onChange={(e) => handleResponsibilityChange(experienceIndex, respIndex, e.target.value)}
              />
              <StyledButton className="delete" onClick={() => removeResponsibility(experienceIndex, respIndex)}>Delete Responsibility</StyledButton>
            </div>
          ))}
          <StyledButton className="add" onClick={() => addResponsibility(experienceIndex)}>Add Responsibility</StyledButton>
          <StyledButton className="delete" onClick={() => removeExperience(experienceIndex)}>Delete Experience</StyledButton>
        </ExperienceContainer>
))}

      {/* Button to add new experience field */}
      <AnswerButton textcolor="#2C0735" bgcolor="#B6B6B6" clickcolor="#FBA400" onClick={addExperienceField}>
        ADD EXPERIENCE
      </AnswerButton>

      <ButtonWrapper>
        <AnswerButton textcolor="#2C0735" bgcolor="#B6B6B6" clickcolor="#FBA400" onClick={props.cancel}>
          CANCEL
        </AnswerButton>
        <AnswerButton textcolor="#2C0735" bgcolor="#B6B6B6" clickcolor="#FBA400" onClick={props.submit}>
          SUBMIT
        </AnswerButton>
      </ButtonWrapper>
    </Container>
  );
};


const ExperienceContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  padding: 8px 15px;
  margin-right: 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:first-of-type {
    margin-top: 10px;
  }

  &.delete {
    background-color: #ff4d4d;
    color: white;
  }

  &.add {
    background-color: #4CAF50;
    color: white;
  }
`;

const Container = styled.div`
  margin-top: 3%;
  margin-bottom: 3%;
  width: 80vw;
  background-color: #1C1C1C;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 35px 20px 35px;
  box-sizing: border-box; /* Include padding and border in the width */
`;
const VerticalSplit = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;
const ResumeElement = styled.div`
  width: ${(props) => props.width || "100%"};
  color: #f1ede9;
  font-weight: bold;
  font-size: 20px;
`;

export default ResumeForm;
