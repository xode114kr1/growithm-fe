import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import Slider from "react-slick";
import ProfileCard from "./components/ProfileCard";
import PendingItem from "./components/PendingItem";
import type { PendingProblem, TierType } from "../../types/problem";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import StudyCard from "./components/StudyCard";

const DashboardContainer = styled.section`
  width: 80%;
  height: 100%;
  margin: 0 10%;
  padding: 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserInfoContainer = styled.section`
  display: flex;
  width: 100%;
  height: 450px;
  gap: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: clamp(250px, 20%, 350px);
  height: 100%;
`;
const MenualButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background: #6c5ce7;
  color: #f0f0f0;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: opacity 300ms ease-in;
  &:hover {
    opacity: 0.8;
  }
`;

const DashboardInfoContainer = styled.section`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 1440px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`;

const DashboardInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
`;

const DashboardInfoTitle = styled.h1`
  margin-top: 0px;
  font-size: 40px;
  font-weight: 500;
  color: #2d3436;
`;

const DashboardInfoSub = styled.span`
  font-size: 15px;
  color: #866e72;
`;

const ChartBox = styled.div`
  grid-column: 3/5;
  grid-row: 1/3;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 1440px) {
    display: none;
  }
`;

const PendingListContainer = styled.section`
  width: clamp(250px, 20%, 350px);
  height: 100%;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
`;

const PendingListTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #fafafa;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #6c5ce7;
`;

const PendingListBox = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 45px);
  overflow: auto;
`;

const StudyContainerHeader = styled.header`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreateStudyButton = styled.button`
  background-color: #6c5ce7;
  border: none;
  color: white;
  border-radius: 8px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;
  transition: 200ms ease-in;

  &:hover {
    opacity: 0.8;
  }
`;

const StudyContainer = styled.section`
  width: 100%;
`;

const StudySlider = styled(Slider)`
  .slick-track {
    display: flex !important;
    margin-left: 0;
    margin-right: 0;
  }
`;

const mockPendingProblems: PendingProblem[] = [
  { title: "백준 1000 - A+B", tier: "bronze" },
  { title: "백준 1001 - A-B", tier: "bronze" },
  { title: "백준 2557 - Hello World", tier: "bronze" },
  { title: "백준 2438 - 별 찍기 1", tier: "bronze" },
  { title: "백준 9498 - 시험 성적", tier: "silver" },
  { title: "백준 1546 - 평균", tier: "silver" },
  { title: "백준 1085 - 직사각형 탈출", tier: "silver" },
  { title: "백준 2839 - 설탕 배달", tier: "silver" },
  { title: "백준 1018 - 체스판 다시 칠하기", tier: "gold" },
  { title: "백준 2751 - 수 정렬하기 2", tier: "gold" },
  { title: "백준 2178 - 미로 탐색", tier: "gold" },
  { title: "백준 9095 - 1, 2, 3 더하기", tier: "gold" },
  { title: "백준 1931 - 회의실 배정", tier: "platinum" },
  { title: "백준 1107 - 리모컨", tier: "platinum" },
  { title: "백준 12865 - 평범한 배낭", tier: "platinum" },
  { title: "백준 1504 - 특정한 최단 경로", tier: "diamond" },
  { title: "백준 1202 - 보석 도둑", tier: "diamond" },
  { title: "백준 2263 - 트리의 순회", tier: "diamond" },
  { title: "백준 13549 - 숨바꼭질 3", tier: "ruby" },
  { title: "백준 14003 - 가장 긴 증가하는 부분 수열 5", tier: "ruby" },
];

const TIER_COLOR: Record<TierType, string> = {
  bronze: "#CC8846",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#A0FFF0",
  diamond: "#DDEBFF",
  ruby: "#FF4F7A",
};

const tierSolvedData: { name: TierType; value: number }[] = [
  { name: "bronze", value: 20 },
  { name: "silver", value: 15 },
  { name: "gold", value: 8 },
  { name: "platinum", value: 5 },
  { name: "diamond", value: 2 },
  { name: "ruby", value: 1 },
];

const DashboardPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
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
          slidesToShow: 2,
          variableWidth: true,
        },
      },
      {
        breakpoint: 768,
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
            <MenualButton>Growithm이 처음이신가요?</MenualButton>
          </ProfileContainer>
          <DashboardInfoContainer>
            <DashboardInfoBox>
              <DashboardInfoTitle>125</DashboardInfoTitle>
              <DashboardInfoSub>Solved</DashboardInfoSub>
            </DashboardInfoBox>
            <DashboardInfoBox>
              <DashboardInfoTitle>20</DashboardInfoTitle>
              <DashboardInfoSub>Pending</DashboardInfoSub>
            </DashboardInfoBox>
            <DashboardInfoBox>
              <DashboardInfoTitle>2</DashboardInfoTitle>
              <DashboardInfoSub>Today</DashboardInfoSub>
            </DashboardInfoBox>
            <DashboardInfoBox>
              <DashboardInfoTitle>15</DashboardInfoTitle>
              <DashboardInfoSub>Streak</DashboardInfoSub>
            </DashboardInfoBox>
            <ChartBox>
              <PieChart
                style={{ width: "100%", maxWidth: "500px", maxHeight: "80vh", aspectRatio: 1 }}
                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
              >
                <Tooltip formatter={(_, __, props) => [props.payload.name]} />

                <Pie
                  data={tierSolvedData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="100%"
                  label={(entry) => entry.value}
                  labelLine={false}
                >
                  {tierSolvedData.map((entry) => (
                    <Cell key={entry.name} fill={TIER_COLOR[entry.name]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartBox>
          </DashboardInfoContainer>
          <PendingListContainer>
            <PendingListTitle>PendingList</PendingListTitle>
            <PendingListBox>
              {mockPendingProblems?.map((problem) => (
                <PendingItem problem={problem} />
              ))}
            </PendingListBox>
          </PendingListContainer>
        </UserInfoContainer>
        <StudyContainerHeader>
          <span style={{ fontSize: "20px", fontWeight: 500 }}>내 스터디</span>
          <CreateStudyButton>스터디 생성</CreateStudyButton>
        </StudyContainerHeader>
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
      </DashboardContainer>
    </Wapper>
  );
};

export default DashboardPage;
