import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGithubLoginMatation } from "../../shared/hooks/useAuth";

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
          navigate("/");
        },
        onError: () => {
          navigate("/");
        },
      });
    };

    handleLogin();
  }, [code, navigate, login]);

  return <div>로그인 처리 중... {isPending && "..."}</div>;
};

export default CallbackPage;
