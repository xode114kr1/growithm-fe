import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 50px;
  border: 1px solid red;
`;

const Toast = () => {
  return <ToastContainer>asd</ToastContainer>;
};

export default Toast;
