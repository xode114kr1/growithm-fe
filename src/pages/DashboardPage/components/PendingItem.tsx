import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { Problem, BeakjoonTierType, ProgrammersTierType } from "../../../types/problemType";
import { TIER_COLOR } from "../../../shared/styles/palette";

interface PendingItemContainerProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

const PendingItemContainer = styled.div<PendingItemContainerProps>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 14px;
  flex-shrink: 0;

  border-left: 4px solid ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
  border-radius: 12px;
  background-color: #ffffff;

  color: #111827;
  font-size: 17px;
  font-weight: 600;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  transition:
    background-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out,
    transform 0.05s ease-in-out;

  &:hover {
    background-color: ${({ tier }) => (TIER_COLOR[tier] || TIER_COLOR.bronze) + "26"};
    transform: translateY(-2px);
    box-shadow: 0 5px 14px rgba(15, 23, 42, 0.12);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const TierDot = styled.span<PendingItemContainerProps>`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background-color: ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
  flex-shrink: 0;
`;

const PendingTitle = styled.span`
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface PendingItemProps {
  pendingProblem: Problem;
}

const PendingItem = ({ pendingProblem }: PendingItemProps) => {
  const navigate = useNavigate();

  let growithmTier: BeakjoonTierType | ProgrammersTierType;

  if (pendingProblem?.platform === "programmers") {
    growithmTier = pendingProblem?.tier as ProgrammersTierType;
  } else {
    growithmTier = pendingProblem?.tier.split(" ")[0].toLowerCase() as BeakjoonTierType;
  }

  return (
    <PendingItemContainer
      tier={growithmTier}
      onClick={() => navigate(`/problem/${pendingProblem?._id}`)}
    >
      <TierDot tier={growithmTier} />
      <PendingTitle>{pendingProblem.title}</PendingTitle>
    </PendingItemContainer>
  );
};

export default PendingItem;
