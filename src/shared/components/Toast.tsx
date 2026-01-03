import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useToastStore } from "../../stores/toastStore";

const ToastContainer = styled.div`
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 12px 16px;
  min-width: 240px;
  max-width: 90%;

  background: #fee2e2;
  color: #991b1b;

  border-radius: 12px;
  border: 1px solid #fecaca;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  z-index: 99999;
`;

const Message = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
`;

const Toast = () => {
  const location = useLocation();
  const { message, setCloseToast } = useToastStore();

  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setCloseToast();
  }, [location.key, setCloseToast]);

  return (
    <ToastContainer>
      <Message>{message}</Message>
    </ToastContainer>
  );
};

export default Toast;
