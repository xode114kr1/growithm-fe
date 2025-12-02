import styled from "styled-components";

type TierType = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "ruby";

interface PendingItemContainerProps {
  tier: TierType;
}

const TIER_COLOR: Record<TierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#DDEBFF",
  diamond: "#A0FFF0",
  ruby: "#FF4F7A",
};

const PendingItemContainer = styled.div<PendingItemContainerProps>`
  width: 100%;
  height: 40px;
  line-height: 40px;
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

const PendingItem = () => {
  return (
    <>
      <PendingItemContainer tier={"platinum"}>백준 1046 - DFS</PendingItemContainer>
      <PendingItemContainer tier={"gold"}>백준 34886 - 인버전 과제</PendingItemContainer>
    </>
  );
};

export default PendingItem;
