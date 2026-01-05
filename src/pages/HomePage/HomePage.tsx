import styled from "styled-components";
import banner from "../../assets/banner_image.png";
import studyImg from "../../assets/study_poster_img.png";
import githubImg from "../../assets/github_poster_img.png";
import formImg from "../../assets/form_poster_img.png";
import { GITHUB_AUTH_URL } from "../../shared/api/auth";

interface ExplainBoxProps {
  direction: "left" | "right";
}

const HomePageContainer = styled.div`
  width: 100%;
  background-color: #f8f9fa;
`;

/** breakpoint */
const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "1024px",
};

const HomeBanner = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 640px; /* 너무 낮은 화면 방지 */
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${banner});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  filter: grayscale(100%);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgb(255, 255, 255, 0.8);
  }

  @media (max-width: ${breakpoints.md}) {
    height: 80vh;
    min-height: 520px;
  }

  @media (max-width: ${breakpoints.sm}) {
    height: 75vh;
    min-height: 480px;
  }
`;

const BannerInfoContainer = styled.div`
  position: absolute;
  left: 20%;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  z-index: 1;

  @media (max-width: ${breakpoints.lg}) {
    left: 10%;
    max-width: 520px;
  }

  @media (max-width: ${breakpoints.md}) {
    left: 50%;
    transform: translateX(-50%);
    width: min(92%, 560px);
    text-align: center;
    align-items: center;
  }
`;

const TitleInfo = styled.div`
  font-size: clamp(34px, 5vw, 60px);
  line-height: 1.15;
  color: #2d3436;
`;

const SubInfo = styled.div`
  font-size: clamp(14px, 1.6vw, 18px);
  line-height: 1.6;
  color: #866e72;
  padding-left: 10px;

  @media (max-width: ${breakpoints.md}) {
    padding-left: 0;
  }
`;

const StartButton = styled.button`
  margin-top: 10px;
  margin-left: 2%;
  border: none;
  background-color: #191d23;
  width: 120px;
  height: 44px;
  border-radius: 14px;
  font-size: 17px;
  color: #f0f0f0;
  cursor: pointer;
  transition: 0.3s ease-in;

  &:hover {
    opacity: 0.8;
    transform: translateY(-5px);
  }

  @media (max-width: ${breakpoints.md}) {
    margin-left: 0;
    width: 140px;
  }
`;

const ExplainContainer = styled.section`
  margin: 0 auto;
  padding: 80px 30px 30px;
  width: 65%;
  max-width: 1100px;

  @media (max-width: ${breakpoints.lg}) {
    width: 80%;
  }

  @media (max-width: ${breakpoints.md}) {
    width: 92%;
    padding: 56px 16px 24px;
  }
`;

const ExplainBox = styled.section<ExplainBoxProps>`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 56px;

  flex-direction: ${({ direction }) => (direction === "left" ? "row" : "row-reverse")};

  @media (max-width: ${breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: 18px;
    margin-bottom: 44px;
  }
`;

const ExplainImg = styled.img`
  width: 370px;
  height: 370px;
  object-fit: contain;
  flex: 0 0 auto;

  @media (max-width: ${breakpoints.lg}) {
    width: 320px;
    height: 320px;
  }

  @media (max-width: ${breakpoints.md}) {
    width: min(320px, 80vw);
    height: auto;
  }
`;

const ExplainTextContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;

  @media (max-width: ${breakpoints.md}) {
    padding: 10px 6px;
    align-items: center;
  }
`;

const ExplainTitle = styled.span`
  color: #6c5ce7;
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 600;
`;

const ExplainSub = styled.span`
  font-size: clamp(14px, 1.6vw, 17px);
  line-height: 1.7;
  color: #866e72;

  @media (max-width: ${breakpoints.md}) {
    max-width: 560px;
  }
`;

const RecommendContainer = styled.section`
  width: 100%;
  min-height: 520px;
  padding: 70px 16px;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${breakpoints.md}) {
    min-height: 420px;
    padding: 56px 16px;
  }
`;

const RecommendTitle = styled.span`
  text-align: center;
  font-size: clamp(30px, 5vw, 55px);
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 30px;
  line-height: 1.15;
`;

const RecommedButton = styled.button`
  width: 220px;
  height: 46px;
  border: none;
  border-radius: 10px;
  background-color: #6c5ce7;
  font-size: 18px;
  color: #f0f0f0;
  cursor: pointer;
  transition: 300ms ease-in;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    max-width: 260px;
  }
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <HomeBanner>
        <BannerInfoContainer>
          <TitleInfo>
            Growithm으로
            <br />
            팀원과 함께 성장하세요
          </TitleInfo>
          <SubInfo>
            알고리즘 문제를 풀며 실력을 향상키시고
            <br />
            동료 개발자들과 함께 성장하는 스터디 플랫폼
          </SubInfo>
          <StartButton onClick={() => (window.location.href = GITHUB_AUTH_URL)}>
            시작하기
          </StartButton>
        </BannerInfoContainer>
      </HomeBanner>

      <ExplainContainer>
        <ExplainBox direction="left">
          <ExplainImg src={formImg} />
          <ExplainTextContainer>
            <ExplainTitle>문제 풀이 기록</ExplainTitle>
            <ExplainSub>
              문제 내용과 풀이 기록을 저장할 수 있습니다. 나만의 문제 풀이 방법을 기록하고 공유해
              보세요.
            </ExplainSub>
          </ExplainTextContainer>
        </ExplainBox>

        <ExplainBox direction="right">
          <ExplainImg src={githubImg} />
          <ExplainTextContainer>
            <ExplainTitle>Github 자동 연동</ExplainTitle>
            <ExplainSub>
              특정 깃허브 Repository에 commit이 발생하면, 자동으로 기록이 저장됩니다. 번거로운 입력
              없이 풀이 내용을 모아두고 효율적으로 관리해보세요.
            </ExplainSub>
          </ExplainTextContainer>
        </ExplainBox>

        <ExplainBox direction="left">
          <ExplainImg src={studyImg} />
          <ExplainTextContainer>
            <ExplainTitle>스터디 그룹 관리</ExplainTitle>
            <ExplainSub>
              같이 성장하고 싶은 개발자들과 함께 스터디를 생성하고 관리할 수 있습니다. 팀원들에게
              자신만의 풀이 방법을 공유하고 그룹을 성장시키세요.
            </ExplainSub>
          </ExplainTextContainer>
        </ExplainBox>
      </ExplainContainer>

      <RecommendContainer>
        <RecommendTitle>
          Growithm으로 팀원들과 <br />
          함께 성장해보세요.
        </RecommendTitle>
        <RecommedButton onClick={() => (window.location.href = GITHUB_AUTH_URL)}>
          시작하기
        </RecommedButton>
      </RecommendContainer>
    </HomePageContainer>
  );
};

export default HomePage;
