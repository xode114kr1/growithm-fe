import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { Problem, BeakjoonTierType } from "../../../types/problemType";

interface PendingItemContainerProps {
  tier: BeakjoonTierType;
}

const TIER_COLOR: Record<BeakjoonTierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",
};

const PendingItemContainer = styled.div<PendingItemContainerProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  flex-shrink: 0;

  border-left: 3px solid ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
  border-radius: 8px;
  background-color: #ffffff;

  color: #111827;
  font-size: 14px;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  transition:
    background-color 0.15s ease-in-out,
    box-shadow 0.12s ease-in-out,
    transform 0.05s ease-in-out;

  &:hover {
    background-color: ${({ tier }) => (TIER_COLOR[tier] || TIER_COLOR.bronze) + "20"};
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(15, 23, 42, 0.08);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const TierDot = styled.span<PendingItemContainerProps>`
  width: 8px;
  height: 8px;
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
  const growithmTier = pendingProblem?.tier.split(" ")[0].toLowerCase() as BeakjoonTierType;

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
