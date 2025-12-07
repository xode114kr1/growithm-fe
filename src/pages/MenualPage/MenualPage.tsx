import { useState } from "react";
import styled from "styled-components";
import Wapper from "../../shared/styles/Wapper";
import createRepoImg from "../../assets/create_repo_img.png";
import beakjoonHubImg from "../../assets/beakjoon_hub_img.png";

const MenualPageContainer = styled.section`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 1024px) {
    width: 90%;
    padding: 40px 0 60px;
  }
`;

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const PageDescription = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.6;
`;

const StepCard = styled.article`
  background: #ffffff;
  border-radius: 14px;
  padding: 24px 24px 28px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 24px;
  align-items: stretch;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const StepLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.2;
  min-width: 0;
`;

const StepRight = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
`;

const StepBadge = styled.div`
  width: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: #f3f4ff;
  color: #6c5ce7;
  margin-bottom: 10px;
`;

const StepTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StepText = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.7;
  white-space: pre-line;
`;

const LinkButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 999px;
  border: 1px solid #6c5ce7;
  color: #6c5ce7;
  text-decoration: none;
  transition: all 0.15s ease-in-out;

  &:hover {
    background: #6c5ce7;
    color: #ffffff;
  }
`;

const ImageFrame = styled.div`
  width: 100%;

  aspect-ratio: 12 / 9;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

const ImageLabel = styled.div`
  margin-top: 6px;
  font-size: 11px;
  color: #64748b;
`;

const Form = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

const TextInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 10px;
  font-size: 13px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  outline: none;
  transition:
    border 0.12s ease-in-out,
    box-shadow 0.12s ease-in-out;

  &:focus {
    border-color: #6c5ce7;
    box-shadow: 0 0 0 1px rgba(79, 70, 229, 0.25);
  }
`;

const SubmitButton = styled.button`
  margin-top: 6px;
  align-self: flex-end;
  min-width: 120px;
  height: 38px;
  border-radius: 999px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: #6c5ce7;
  color: #ffffff;
  transition:
    background 0.15s ease-in-out,
    transform 0.05s ease-in-out;

  &:hover {
    background: #4338ca;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #6b7280;
  line-height: 1.6;
  margin-top: 4px;
`;

const MenualPage = () => {
  const [githubId, setGithubId] = useState("");
  const [repo, setRepo] = useState("");

  return (
    <Wapper>
      <MenualPageContainer>
        <header>
          <PageTitle>서비스 연결 가이드</PageTitle>
          <PageDescription>
            아래 순서를 따라 진행하면, 백준 풀이 기록이 GitHub Repo와 이 서비스에 자동으로
            연동됩니다. 1) GitHub Repo 생성 → 2) 백준 허브 설치 → 3) Repo 정보 등록
          </PageDescription>
        </header>

        <StepCard>
          <StepLeft>
            <StepBadge>STEP 1</StepBadge>
            <StepTitle>깃허브 Repo 생성하기</StepTitle>
            <StepText>
              먼저, 본인의 알고리즘 풀이를 저장할 GitHub Repository를 만들어주세요.
              <br />
              <br />- 예시 이름: <b>algorithm-study</b>
              <br />- Public / Private 상관없이 사용 가능합니다.
              <br />
              <br />
              아래 버튼을 눌러 GitHub의 새 Repo 생성 페이지로 이동한 뒤, <b>Repo 이름</b>과{" "}
              <b>설명</b>을 입력하고 생성해 주세요.
            </StepText>

            <LinkButton href="https://github.com/new" target="_blank" rel="noreferrer">
              깃허브 Repo 만들러 가기 →
            </LinkButton>
          </StepLeft>

          <StepRight>
            <ImageFrame>
              <img src={createRepoImg} alt="깃허브 레포 생성 화면 예시" />
              <ImageLabel>이미지: 깃허브 레포 생성 스크린샷</ImageLabel>
            </ImageFrame>
          </StepRight>
        </StepCard>

        <StepCard>
          <StepLeft>
            <StepBadge>STEP 2</StepBadge>
            <StepTitle>백준 허브 확장 프로그램 설치</StepTitle>
            <StepText>
              백준에서 문제를 제출하면, 해당 코드를 자동으로 GitHub Repo에 올려주는{" "}
              <b>&ldquo;BaekjoonHub&rdquo; 브라우저 확장 프로그램</b>을 설치합니다.
              <br />
              <br />
              1) 아래 버튼을 눌러 백준 허브 확장프로그램 페이지로 이동합니다.
              <br />
              2) &ldquo;Chrome에 추가&rdquo; / &ldquo;브라우저에 추가&rdquo;를 클릭하여 설치합니다.
              <br />
              3) 설치 후, 확장 프로그램 옵션에서 방금 만든 GitHub Repo와 연동해 주세요.
            </StepText>

            <LinkButton
              href="https://chromewebstore.google.com/detail/%EB%B0%B1%EC%A4%80%ED%97%88%EB%B8%8Cbaekjoonhub/ccammcjdkpgjmcpijpahlehmapgmphmk"
              target="_blank"
              rel="noreferrer"
            >
              백준 허브 설치하러 가기 →
            </LinkButton>

            <HelperText>※ 크롬 기반 브라우저(Chrome, Edge 등)에서 사용을 권장합니다.</HelperText>
          </StepLeft>

          <StepRight>
            <ImageFrame>
              <img src={beakjoonHubImg} alt="백준 허브 확장프로그램 설치/연동 예시" />
              <ImageLabel>이미지: 백준 허브 설치 및 Repo 연동 과정 (GIF 권장)</ImageLabel>
            </ImageFrame>
          </StepRight>
        </StepCard>
        <StepCard>
          <StepLeft>
            <StepBadge>STEP 3</StepBadge>
            <StepTitle>서비스에 Repo 정보 등록하기</StepTitle>
            <StepText>
              이제 이 서비스가 사용자의 GitHub Repo를 인식할 수 있도록,{" "}
              <b>깃허브 ID와 Repo 주소를 등록</b>합니다.
              <br />
              <br />
              1) 아래 입력칸에 본인의 깃허브 ID와 GitHub Repo URL을 입력합니다.
              <br />
              2) &ldquo;Repo 등록하기&rdquo; 버튼을 클릭하면, 백엔드로 정보가 전송됩니다.
              <br />
              3) 등록이 완료되면, 이후부터 백준 허브가 올린 커밋 정보를 바탕으로{" "}
              <b>풀이 기록과 통계가 자동으로 갱신</b>됩니다.
            </StepText>
          </StepLeft>

          <StepRight>
            <Form>
              <div>
                <FieldLabel htmlFor="gitgub-id">깃허브 ID</FieldLabel>
                <TextInput
                  id="gitgub-id"
                  placeholder="예: github123"
                  value={githubId}
                  onChange={(e) => setGithubId(e.target.value)}
                />
                <HelperText>
                  깃허브 프로필 상단에 표시되는 닉네임(아이디)을 입력해주세요.
                </HelperText>
              </div>

              <div>
                <FieldLabel htmlFor="repo-url">GitHub Repo 주소</FieldLabel>
                <TextInput
                  id="repo-url"
                  placeholder="예: algorithm-solutions"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                />
                <HelperText>백준 허브가 연동되어 있는 Repository의 주소를 입력합니다.</HelperText>
              </div>

              <SubmitButton type="submit">Repo 등록하기</SubmitButton>
            </Form>
          </StepRight>
        </StepCard>
      </MenualPageContainer>
    </Wapper>
  );
};

export default MenualPage;
