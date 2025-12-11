// src/pages/StudyListPage/components/StudyCard.tsx
import styled from "styled-components";

interface StudyCardProps {
  name: string;
  explanation: string;
  members: number;
  ownerName: string;
}

const Card = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  cursor: pointer;

  border-radius: 14px;
  padding: 14px 12px;
  background: linear-gradient(135deg, #f9fafb, #eef2ff);
  border: 1px solid #e5e7eb;

  display: flex;
  flex-direction: column;
  gap: 8px;

  transition:
    transform 0.14s ease,
    box-shadow 0.14s ease,
    border-color 0.14s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #a5b4fc;
    box-shadow: 0 10px 22px rgba(129, 140, 248, 0.25);
  }
`;

const StudyName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const StudyExplanation = styled.p`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.4;
  min-height: 32px;
`;

const StudyMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: #6b7280;
`;

const MemberBadge = styled.span`
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(55, 65, 81, 0.06);
`;

const OwnerText = styled.span`
  font-size: 11px;
  color: #4b5563;
`;

const StudyCard = ({ name, explanation, members, ownerName }: StudyCardProps) => {
  return (
    <Card>
      <StudyName>{name}</StudyName>
      <StudyExplanation>{explanation}</StudyExplanation>
      <StudyMetaRow>
        <MemberBadge>👥 {members}명</MemberBadge>
        <OwnerText>리더 · {ownerName}</OwnerText>
      </StudyMetaRow>
    </Card>
  );
};

export default StudyCard;
