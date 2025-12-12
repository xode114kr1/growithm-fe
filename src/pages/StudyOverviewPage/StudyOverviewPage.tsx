import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Study } from "../../types/studyType";
import { useOutletContext } from "react-router-dom";

interface StudyOutletContext {
  study: Study;
}

type StudyTier = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "ruby";

const TIER_COLOR: Record<StudyTier, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",
};

const TIER_PROGRESS_COLOR: Record<StudyTier, string> = {
  bronze: "#B86E34",
  silver: "#9FA5AD",
  gold: "#E2C24F",
  platinum: "#7ED5C7",
  diamond: "#6AA8FF",
  ruby: "#FF3760",
};

const TIER_KR: Record<StudyTier, string> = {
  bronze: "브론즈",
  silver: "실버",
  gold: "골드",
  platinum: "플래티넘",
  diamond: "다이아몬드",
  ruby: "루비",
};

const OverviewWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

const ContentGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2fr 1.4fr;
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 16px 14px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const CardHint = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  border-radius: 12px;
  padding: 10px 10px 8px;
  background: #f9fafb;

  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const StatValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const ProblemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProblemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 13px;
  color: #374151;
`;

const ProblemTierDot = styled.span<{ tier: StudyTier }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: ${({ tier }) => TIER_COLOR[tier]};
  flex-shrink: 0;
`;

const ProblemTitle = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TierCard = styled.div<{ tier: StudyTier }>`
  border-radius: 16px;
  padding: 16px 14px;
  background: ${({ tier }) =>
    `linear-gradient(135deg, ${TIER_COLOR[tier]}, ${TIER_COLOR[tier]}88)`};
  color: #111827;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TierLabel = styled.span`
  font-size: 13px;
  opacity: 0.9;
`;

const TierName = styled.span`
  font-size: 20px;
  font-weight: 800;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 6px;
`;

const ProgressBarFill = styled.div<{ value: number; tier: StudyTier }>`
  height: 100%;
  width: ${({ value }) => value}%;
  background: ${({ tier }) => TIER_PROGRESS_COLOR[tier]};
  transition: width 0.4s ease;
`;

const MemberCard = styled.div`
  flex: 1;
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 16px 14px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MemberHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

const MemberCount = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 220px;
  overflow-y: auto;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: linear-gradient(135deg, #a855f7, #6366f1);
  color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MemberName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #111827;
`;

const MemberRole = styled.span`
  font-size: 11px;
  color: #6b7280;
`;

const MOCK_PROBLEMS = [
  { title: "[백준] 1000 - A+B", tier: "bronze" as StudyTier },
  { title: "[백준] 11047 - 동전 0", tier: "silver" as StudyTier },
  { title: "[프로그래머스] K번째 수", tier: "gold" as StudyTier },
];

const MOCK_CONTRIBUTION = [
  { name: "xode114kr1", solved: 42 },
  { name: "study_user01", solved: 28 },
  { name: "algo_master", solved: 19 },
  { name: "baekjoon_lover", solved: 12 },
];

const StudyOverviewPage = () => {
  const { study } = useOutletContext<StudyOutletContext>();

  const tier: StudyTier = "gold";
  const weeklySolved = 18;
  const memberLength = study?.members?.length || 0;
  const problemLength = study?.problem?.length || 0;

  return (
    <OverviewWrapper>
      <Header>
        <Title>Overview</Title>
      </Header>
      <TierCard tier={tier}>
        <TierLabel>현재 스터디 티어</TierLabel>
        <TierName>{TIER_KR[tier]}</TierName>
        <ProgressBarWrapper>
          <ProgressBarFill value={65} tier={tier} />
        </ProgressBarWrapper>
      </TierCard>
      <ContentGrid>
        <LeftColumn>
          <Card style={{ flex: 0 }}>
            <CardHeader>
              <CardTitle>스터디 풀이 통계</CardTitle>
              <CardHint>최근 활동 기준</CardHint>
            </CardHeader>

            <StatsGrid>
              <StatCard>
                <StatLabel>전체 푼 문제</StatLabel>
                <StatValue>{problemLength}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>이번 주 푼 문제</StatLabel>
                <StatValue>{weeklySolved}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>스터디원 수</StatLabel>
                <StatValue>{memberLength}</StatValue>
              </StatCard>
            </StatsGrid>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>기여도 분석</CardTitle>
              <CardHint>스터디원별 풀이 기여도</CardHint>
            </CardHeader>

            <div style={{ width: "100%", height: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_CONTRIBUTION} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="solved" fill="#6366f1" radius={[4, 4, 4, 4]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </LeftColumn>

        <RightColumn>
          <MemberCard>
            <MemberHeader>
              <MemberTitle>스터디 멤버</MemberTitle>
              <MemberCount>{memberLength}명 참여 중</MemberCount>
            </MemberHeader>

            <MemberList>
              {memberLength
                ? study?.members?.map((member) => (
                    <MemberRow key={member?.name}>
                      <Avatar>{member?.name[0]?.toUpperCase()}</Avatar>
                      <MemberInfo>
                        <MemberName>{member?.name}</MemberName>
                        <MemberRole>
                          {member?._id == study?.owner._id ? "owner" : "member"}
                        </MemberRole>
                      </MemberInfo>
                    </MemberRow>
                  ))
                : null}
            </MemberList>
          </MemberCard>
          <Card>
            <CardHeader>
              <CardTitle>최근에 푼 문제</CardTitle>
              <CardHint>스터디원들이 함께 풀이한 문제들</CardHint>
            </CardHeader>

            <ProblemList>
              {problemLength
                ? MOCK_PROBLEMS.map((p) => (
                    <ProblemRow key={p.title}>
                      <ProblemTierDot tier={p.tier} />
                      <ProblemTitle>{p.title}</ProblemTitle>
                    </ProblemRow>
                  ))
                : null}
            </ProblemList>
          </Card>
        </RightColumn>
      </ContentGrid>
    </OverviewWrapper>
  );
};

export default StudyOverviewPage;
