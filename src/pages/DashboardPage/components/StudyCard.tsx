import styled from "styled-components";
import studyDefaultImg from "../../../assets/Study_default_img.png";
const StudyCardContainer = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 10px;
`;

const StudyImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  object-position: center center;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const StudyTitle = styled.div`
  width: 100%;
  line-height: 20px;
  height: 20px;
  font-size: 18px;
  font-weight: 500;
  padding: 0px 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #2d3436;
`;

const StudyLeader = styled.div`
  font-size: 15px;
  color: #866e72;
  padding: 0 2px;
`;

const StudyCard = () => {
  return (
    <StudyCardContainer>
      <StudyImg src={studyDefaultImg} />
      <StudyTitle>알고리즘 스터디 1</StudyTitle>
      <StudyLeader>xode114kr1</StudyLeader>
    </StudyCardContainer>
  );
};

export default StudyCard;
