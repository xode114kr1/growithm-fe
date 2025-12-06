import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import type { Problem, TierType } from "../../../types/problemType";

interface PendingItemContainerProps {
  tier: TierType;
}

const TIER_COLOR: Record<TierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",
};

const PendingItemContainer = styled.div<PendingItemContainerProps>`
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  flex-shrink: 0;
  border-left: 4px solid ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
  padding: 0 10px;
  color: #2d3436;
  font-size: 17px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 300ms ease-in;
  cursor: pointer;

  &:hover {
    background: ${({ tier }) => TIER_COLOR[tier] || TIER_COLOR.bronze};
    opacity: 0.8;
  }
`;

interface PendingItemProps {
  pendingProblem: Problem;
}

const PendingItem = ({ pendingProblem }: PendingItemProps) => {
  const navigate = useNavigate();
  const handleFromPending = (problem: Problem) => {
    navigate("/solved/form", {
      state: {
        problem,
      },
    });
  };
  const growithmTier = pendingProblem?.tier.split(" ")[0].toLowerCase() as TierType;
  return (
    <PendingItemContainer tier={growithmTier} onClick={() => handleFromPending(pendingProblem)}>
      {pendingProblem.title}
    </PendingItemContainer>
  );
};

export default PendingItem;
