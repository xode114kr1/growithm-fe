import styled from "styled-components";
import { calculateTier, getPrograss, getTierMaxScore } from "../../../shared/utils/tier";
import type { GrowithmTierType } from "../../../types/problemType";
import { TIER_PROGRESS_COLOR } from "../../../shared/styles/palette";

export const ProgressCard = styled.div`
  display: none;
  position: absolute;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%);
  width: 110%;
  padding: 14px 16px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  z-index: 10;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 13px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ value: number; tier: GrowithmTierType }>`
  height: 100%;
  width: ${({ value }) => value}%;
  background: ${({ tier }) => TIER_PROGRESS_COLOR[tier]};
  transition: width 0.4s ease;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 12px;
  color: #6b7280;
  text-align: right;
`;

const TierProgressHover = ({ score }: { score: number }) => {
  return (
    <ProgressCard>
      <ProgressBarWrapper>
        <ProgressBarFill value={getPrograss(score)} tier={calculateTier(score)} />
      </ProgressBarWrapper>
      <ProgressText>
        <span>{score}</span>
        <span>{getTierMaxScore(score)}</span>
      </ProgressText>
    </ProgressCard>
  );
};

export default TierProgressHover;
