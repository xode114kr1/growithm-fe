import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../shared/api/auth";

const CallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const url = new URLSearchParams(location.search);
  const code = url.get("code");

  useEffect(() => {
    const handleLogin = async () => {
      if (!code) {
        console.error("인가 코드가 없습니다");
        navigate("/");
        return;
      }
      try {
        await login(code);
        navigate("/main");
      } catch (error: unknown) {
        console.error("로그인 실페 : ", error);
        navigate("/");
      }
    };

    handleLogin();
  }, [code, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default CallbackPage;
