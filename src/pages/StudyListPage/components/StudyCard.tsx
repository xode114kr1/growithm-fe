// src/pages/StudyListPage/components/StudyCard.tsx
import styled from "styled-components";
import type { Study } from "../../../types/studyType";
import { useNavigate } from "react-router-dom";

interface StudyCardProps {
  study: Study;
}

const Card = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  cursor: pointer;

  border-radius: 16px;
  padding: 20px 18px;
  background: linear-gradient(135deg, #f9fafb, #eef2ff);
  border: 1px solid #e5e7eb;

  display: flex;
  flex-direction: column;
  gap: 12px;

  transition:
    transform 0.14s ease,
    box-shadow 0.18s ease,
    border-color 0.14s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #a5b4fc;
    box-shadow: 0 12px 26px rgba(129, 140, 248, 0.25);
  }
`;

const StudyName = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #111827;
`;

const StudyExplanation = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  min-height: 40px;
`;

const StudyMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 13px;
  color: #6b7280;
`;

const MemberBadge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(55, 65, 81, 0.08);
  font-weight: 500;
`;

const OwnerText = styled.span`
  font-size: 13px;
  color: #4b5563;
  font-weight: 500;
`;

const StudyCard = ({ study }: StudyCardProps) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`${study?._id}/overview`)}>
      <StudyName>{study?.title}</StudyName>
      <StudyExplanation>{study?.explanation}</StudyExplanation>
      <StudyMetaRow>
        <MemberBadge>👥 {study?.members?.length}명</MemberBadge>
        <OwnerText>리더 · {study?.owner.name}</OwnerText>
      </StudyMetaRow>
    </Card>
  );
};

export default StudyCard;
