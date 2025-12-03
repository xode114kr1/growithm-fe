import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGithubLoginMatation } from "../../shared/hooks/useAuth";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

const CallbackContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: login, isPending } = useGithubLoginMatation();

  const url = new URLSearchParams(location.search);
  const code = url.get("code");

  useEffect(() => {
    const handleLogin = async () => {
      if (!code) {
        console.error("인가 코드가 없습니다");
        navigate("/");
        return;
      }
      login(code, {
        onSuccess: () => {
          navigate("/dashboard");
        },
        onError: () => {
          navigate("/");
        },
      });
    };

    handleLogin();
  }, [code, navigate, login]);

  return (
    <CallbackContainer>
      <TailSpin
        visible={isPending}
        height={60}
        width={60}
        color="#6c5ce7"
        ariaLabel="github-login-loading"
      />
    </CallbackContainer>
  );
};

export default CallbackPage;
