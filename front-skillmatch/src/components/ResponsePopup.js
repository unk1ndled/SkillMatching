import React from 'react'
import styled from 'styled-components'
import AnswerButton from './AnswerButton'

const ResponsePopup = (props) => {
  return (
    <Container>
      <AnswerButton textcolor="#2C0735" bgcolor="#6F00EF" clickcolor="#613DC1" onClick={props.close}>Close</AnswerButton>
    </Container>
  )
}

const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

`

export default ResponsePopup