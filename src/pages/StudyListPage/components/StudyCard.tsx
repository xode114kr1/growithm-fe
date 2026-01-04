// src/pages/StudyListPage/components/StudyCard.tsx
import styled from "styled-components";
import type { Study } from "../../../types/studyType";
import { useNavigate } from "react-router-dom";
import type { GrowithmTierType } from "../../../types/problemType";
import { TIER_CARD_STYLE } from "../../../shared/styles/palette";
import { calculateStudyTier } from "../../../shared/utils/tier";

interface StudyCardProps {
  study: Study;
}

interface CardProps {
  tier: GrowithmTierType;
}

export const Card = styled.button<CardProps>`
  width: 100%;
  text-align: left;
  border-radius: 16px;
  padding: 20px 18px;
  cursor: pointer;

  background: ${({ tier }) => TIER_CARD_STYLE[tier].bg};
  border: 1px solid ${({ tier }) => TIER_CARD_STYLE[tier].border};

  display: flex;
  flex-direction: column;
  gap: 12px;

  transition:
    transform 0.14s ease,
    box-shadow 0.18s ease,
    border-color 0.14s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ tier }) => TIER_CARD_STYLE[tier].hoverBorder};
    box-shadow: 0 14px 30px ${({ tier }) => TIER_CARD_STYLE[tier].shadow};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const StudyName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const StudyExplanation = styled.p`
  font-size: 15px;
  color: #6b7280;
  line-height: 1.5;
  min-height: 40px;
`;

const StudyMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  color: #6b7280;
`;

const MemberBadge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(55, 65, 81, 0.08);
  font-weight: 500;
`;

const OwnerText = styled.span`
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
`;

const StudyCard = ({ study }: StudyCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      tier={calculateStudyTier(study?.score)}
      onClick={() => navigate(`${study?._id}/overview`)}
    >
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
