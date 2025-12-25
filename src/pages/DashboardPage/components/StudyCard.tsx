import styled from "styled-components";
import studyDefaultImg from "../../../assets/Study_default_img.png";

const StudyCardContainer = styled.div`
  min-width: 220px;
  max-width: 260px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition:
    transform 0.08s ease-in-out,
    box-shadow 0.12s ease-in-out,
    background-color 0.12s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.12);
    background-color: #f9fafb;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08);
  }
`;

const StudyImg = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  object-position: center center;
  border-radius: 12px;
`;

const StudyTextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 2px 2px;
`;

const StudyTitle = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StudyLeader = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const StudyMeta = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #9ca3af;
`;

const StudyCard = () => {
  return (
    <StudyCardContainer>
      <StudyImg src={studyDefaultImg} />
      <StudyTextArea>
        <StudyTitle>알고리즘 스터디 1</StudyTitle>
        <StudyLeader>xode114kr1</StudyLeader>
        <StudyMeta>매주 2회 · 온라인</StudyMeta>
      </StudyTextArea>
    </StudyCardContainer>
  );
};

export default StudyCard;
