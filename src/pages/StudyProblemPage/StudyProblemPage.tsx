import styled from "styled-components";
import StudyProblemItem from "./components/StudyProblemItem";

const StudyProblemContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const ProblemItemList = styled.div``;

const StudyProblemPage = () => {
  return (
    <StudyProblemContainer>
      <Header>
        <Title>Problem</Title>
        <ProblemItemList>
          <StudyProblemItem />
        </ProblemItemList>
      </Header>
    </StudyProblemContainer>
  );
};

export default StudyProblemPage;
