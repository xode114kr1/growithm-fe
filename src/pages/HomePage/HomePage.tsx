import styled from "styled-components";
import banner from "../../assets/banner_image.png";
import studyImg from "../../assets/study_poster_img.png";
import githubImg from "../../assets/github_poster_img.png";
import formImg from "../../assets/form_poster_img.png";

const { VITE_GITHUB_CLIENT_ID, VITE_GITHUB_REDIRECT_URI, VITE_GITHUB_SCOPE } = import.meta.env;
const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}&redirect_uri=${VITE_GITHUB_REDIRECT_URI}&response_type=code&scope=${VITE_GITHUB_SCOPE}`;

interface ExplainBoxProps {
  direction: "left" | "right";
}

const HomePageContainer = styled.div`
  width: 100%;
`;

const HomeBanner = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
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
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255, 0.8);
  }
`;

const BannerInfoContainer = styled.div`
  position: absolute;
  left: 20%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  z-index: 1;
`;

const TitleInfo = styled.div`
  font-size: 4rem;
  color: #2d3436;
`;

const SubInfo = styled.div`
  font-size: 1.2rem;
  color: #866e72;
  padding-left: 10px;
`;

const StartButton = styled.button`
  margin-top: 10px;
  margin-left: 2%;
  border: none;
  background-color: #191d23;
  width: 100px;
  height: 40px;
  border-radius: 15px;
  font-size: 16px;
  color: #f0f0f0;
  cursor: pointer;
  transition: 0.3s ease-in;
  &:hover {
    opacity: 0.8;
    transform: translateY(-5px);
  }
`;

const ExplainContainer = styled.section`
  margin: 0 auto;
  margin-top: 80px;
  width: 65%;
`;

const ExplainBox = styled.section<ExplainBoxProps>`
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
`;

const ExplainImg = styled.img`
  width: 370px;
  height: 370px;
  object-fit: contain;
`;
const ExplainTextContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 20px;
`;
const ExplainTitle = styled.span`
  color: #6c5ce7;
  font-size: 25px;
  font-weight: 500;
`;
const ExplainSub = styled.span`
  font-size: 16px;
  color: #866e72;
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
          <ExplainTextContainer>
            <ExplainTitle>Github 자동 연동</ExplainTitle>
            <ExplainSub>
              특정 깃허브 Repository에 commit이 발생하면, 자동으로 기록이 저장됩니다. 번거로운 입력
              없이 풀이 내용을 모아두고 효율적으로 관리해보세요.
            </ExplainSub>
          </ExplainTextContainer>
          <ExplainImg src={githubImg} />
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
    </HomePageContainer>
  );
};

export default HomePage;
