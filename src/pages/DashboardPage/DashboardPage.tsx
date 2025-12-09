import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import Slider from "react-slick";
import ProfileCard from "./components/ProfileCard";
import PendingItem from "./components/PendingItem";
import type { BeakjoonTierType } from "../../types/problemType";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import StudyCard from "./components/StudyCard";
import { useGetProblemList } from "../../shared/hooks/useProblem";
import { useNavigate } from "react-router-dom";

const DashboardContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 1024px) {
    width: 90%;
    padding: 40px 0 48px;
  }
`;

const UserInfoContainer = styled.section`
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) 2fr minmax(260px, 0.9fr);
  grid-template-rows: auto;
  grid-template-areas: "profile stats pending";
  gap: 20px;
  align-items: stretch;

  @media (max-width: 1280px) {
    grid-template-columns: minmax(260px, 1fr) 1.7fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "profile stats"
      "pending pending";
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "profile"
      "stats"
      "pending";
  }
`;

const ProfileContainer = styled.div`
  grid-area: profile;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenualButton = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 4px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #f9fafb;
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.25);
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition:
    transform 0.08s ease-in-out,
    box-shadow 0.12s ease-in-out,
    opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
  }
`;

const DashboardInfoContainer = styled.section`
  grid-area: stats;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, auto);
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 18px 20px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  border: 1px solid #e5e7eb;
  gap: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
`;

const StatSubText = styled.div`
  font-size: 13px;
  color: #9ca3af;
`;

const ChartBox = styled.div`
  grid-column: 1 / 3;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  border: 1px solid #e5e7eb;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  @media (max-width: 1440px) {
    padding: 16px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
`;

const ChartTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

const ChartSubtitle = styled.div`
  font-size: 13px;
  color: #9ca3af;
`;

const ChartInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PendingListContainer = styled.section`
  grid-area: pending;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  /* max-height: 460px; */

  @media (max-width: 1280px) {
    max-height: 380px;
  }
`;

const PendingListTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  gap: 8px;
  background-color: #f9fafb;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  font-size: 15px;
  font-weight: 600;
  color: #4f46e5;
  border-bottom: 1px solid #e5e7eb;
`;

const PendingListTitleBadge = styled.span`
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 999px;
  background-color: #eef2ff;
  color: #4f46e5;
`;

const PendingListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 12px 12px;
  height: 100%;
  overflow-y: auto;
  gap: 6px;
`;

const EmptyPending = styled.div`
  padding: 20px 12px 24px;
  font-size: 14px;
  color: #9ca3af;
  text-align: center;
`;

const StudySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StudyHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StudyTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StudyTitleMain = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`;

const StudyTitleSub = styled.span`
  font-size: 13px;
  color: #9ca3af;
`;

const CreateStudyButton = styled.button`
  background: #4f46e5;
  border: none;
  color: #f9fafb;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.15s ease-in-out,
    transform 0.05s ease-in-out,
    box-shadow 0.12s ease-in-out;

  &:hover {
    background: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const StudyContainer = styled.section`
  width: 100%;
  padding: 16px 10px 30px;
`;

const StudySlider = styled(Slider)`
  .slick-track {
    display: flex !important;
    margin-left: 0;
    margin-right: 0;
  }

  .slick-slide {
    padding: 0 6px;
  }

  .slick-dots li button:before {
    font-size: 8px;
  }
`;

const TIER_COLOR: Record<BeakjoonTierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",
};

const tierSolvedData: { name: BeakjoonTierType; value: number }[] = [
  { name: "bronze", value: 20 },
  { name: "silver", value: 15 },
  { name: "gold", value: 8 },
  { name: "platinum", value: 5 },
  { name: "diamond", value: 2 },
  { name: "ruby", value: 1 },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { data: pendingProblem } = useGetProblemList({ state: "pending" });

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          variableWidth: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          variableWidth: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <Wapper>
      <DashboardContainer>
        <UserInfoContainer>
          <ProfileContainer>
            <ProfileCard />
            <MenualButton onClick={() => navigate("/dashboard/menual")}>
              Growithm이 처음이신가요?
            </MenualButton>
          </ProfileContainer>

          <DashboardInfoContainer>
            <StatCard>
              <StatLabel>전체 풀이</StatLabel>
              <StatValue>125</StatValue>
              <StatSubText>백준 기준 누적 풀이 수</StatSubText>
            </StatCard>
            <StatCard>
              <StatLabel>보류 문제</StatLabel>
              <StatValue>20</StatValue>
              <StatSubText>다시 풀어볼 문제</StatSubText>
            </StatCard>
            <StatCard>
              <StatLabel>오늘 풀이</StatLabel>
              <StatValue>2</StatValue>
              <StatSubText>오늘 해결한 문제</StatSubText>
            </StatCard>
            <StatCard>
              <StatLabel>연속 풀이</StatLabel>
              <StatValue>15</StatValue>
              <StatSubText>연속 풀이 일수</StatSubText>
            </StatCard>

            <ChartBox>
              <ChartHeader>
                <ChartTitle>티어별 풀이 분포</ChartTitle>
                <ChartSubtitle>최근 풀이를 기준으로 한 티어 분포</ChartSubtitle>
              </ChartHeader>
              <ChartInner>
                <PieChart
                  style={{ width: "100%", maxWidth: "420px", aspectRatio: 1 }}
                  margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
                >
                  <Tooltip
                    formatter={(value, _name, props) => [
                      `${value} solved`,
                      props?.payload?.name?.toUpperCase?.(),
                    ]}
                  />
                  <Pie
                    data={tierSolvedData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="80%"
                    label={(entry) => entry.value}
                    labelLine={false}
                  >
                    {tierSolvedData.map((entry) => (
                      <Cell key={entry.name} fill={TIER_COLOR[entry.name]} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartInner>
            </ChartBox>
          </DashboardInfoContainer>

          <PendingListContainer>
            <PendingListTitle>
              보류 문제
              <PendingListTitleBadge>{pendingProblem?.length ?? 0}개</PendingListTitleBadge>
            </PendingListTitle>
            <PendingListBox>
              {pendingProblem && pendingProblem.length > 0 ? (
                pendingProblem.map((item) => <PendingItem pendingProblem={item} key={item._id} />)
              ) : (
                <EmptyPending>보류 중인 문제가 없습니다. 새 문제를 추가해보세요 ✏️</EmptyPending>
              )}
            </PendingListBox>
          </PendingListContainer>
        </UserInfoContainer>

        <StudySection>
          <StudyHeader>
            <StudyTitle>
              <StudyTitleMain>내 스터디</StudyTitleMain>
              <StudyTitleSub>현재 참여 중인 스터디 목록입니다.</StudyTitleSub>
            </StudyTitle>
            <CreateStudyButton>스터디 생성</CreateStudyButton>
          </StudyHeader>

          <StudyContainer>
            <StudySlider {...settings}>
              <StudyCard />
              <StudyCard />
              <StudyCard />
              <StudyCard />
              <StudyCard />
              <StudyCard />
              <StudyCard />
              <StudyCard />
              <StudyCard />
            </StudySlider>
          </StudyContainer>
        </StudySection>
      </DashboardContainer>
    </Wapper>
  );
};

export default DashboardPage;
