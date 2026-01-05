import styled from "styled-components";
import type { BeakjoonTierType, Problem, ProgrammersTierType } from "../../../types/problemType";
import { TIER_COLOR, TIER_TINT } from "../../../shared/styles/palette";
import { getProblemTier } from "../../../shared/utils/tier";
import StudyProblemDetailModal from "./StudyProblemDetailModal";
import { useState } from "react";

const StudyProblemItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  padding: 10px 14px;

  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);

  transition:
    box-shadow 0.12s ease,
    transform 0.05s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.15);
  }

  @media (max-width: 480px) {
    align-items: flex-start;
    padding: 12px 12px;
    gap: 12px;
  }
`;

interface AccentProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

const Accent = styled.div<AccentProps>`
  width: 3px;
  height: 36px;
  border-radius: 999px;
  background: ${({ tier }) => TIER_COLOR[tier]};
  flex-shrink: 0;

  @media (max-width: 480px) {
    height: 44px;
  }
`;

const Main = styled.div`
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111827;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 15px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Sub = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6b7280;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    font-size: 12px;
    justify-content: flex-start;
  }
`;

const User = styled.span`
  font-weight: 600;
`;

interface TierInfoProps {
  tier: BeakjoonTierType | ProgrammersTierType;
}

const TierInfo = styled.div<TierInfoProps>`
  flex-shrink: 0;

  padding: 5px 9px;
  min-width: 80px;

  text-align: center;
  background-color: ${({ tier }) => TIER_TINT[tier]};
  border-radius: 10px;

  font-size: 14px;
  font-weight: 700;
  color: ${({ tier }) => TIER_COLOR[tier]};

  @media (max-width: 480px) {
    min-width: 0;
    padding: 6px 10px;
    font-size: 13px;
    border-radius: 999px;
  }
`;

const StudyProblemItemCompact = ({ problem }: { problem: Problem }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const tier = getProblemTier(problem);
  return (
    <>
      <StudyProblemItemContainer onClick={() => setModalOpen(true)}>
        <Accent tier={tier} />
        <Main>
          <Title>
            [{problem?.platform}] {problem?.problemId} - {problem?.title}
          </Title>
          <Sub>
            <div>
              solved by <User>{problem?.userId?.name}</User>
            </div>
          </Sub>
        </Main>
        <TierInfo tier={tier}>{problem?.tier}</TierInfo>
      </StudyProblemItemContainer>
      {modalOpen && (
        <StudyProblemDetailModal onClose={() => setModalOpen(false)} problem={problem} />
      )}
    </>
  );
};

export default StudyProblemItemCompact;
