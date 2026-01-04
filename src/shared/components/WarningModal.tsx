import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from { transform: translateY(8px) scale(0.98); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.15s ease-out;
`;

const Modal = styled.div`
  width: 420px;
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.25);
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: ${popIn} 0.15s ease-out;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 19px;
  font-weight: 900;
  color: #0f172a;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Message = styled.p`
  margin: 0;
  font-size: 15px;
  color: #334155;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const BaseButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  font-weight: 900;
  border: 1px solid transparent;
  cursor: pointer;
`;

const GhostButton = styled(BaseButton)`
  background: white;
  border-color: #e5e7eb;
`;

const DangerButton = styled(BaseButton)`
  background: #ef4444;
  color: white;
`;

interface WarningModalProps {
  title?: string;
  message?: string;
  onClose: () => void;
  handleDeleteButton: () => void;
}

export default function WarningModal({
  onClose,
  handleDeleteButton,
  title = "정말 삭제하시겠어요?",
  message = "이 작업은 되돌릴 수 없으며 즉시 적용됩니다.",
}: WarningModalProps) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={stop}>
        <Header>
          <Title>{title}</Title>
        </Header>

        <Body>
          <Message>{message}</Message>
        </Body>

        <Footer>
          <GhostButton onClick={onClose}>취소</GhostButton>
          <DangerButton onClick={handleDeleteButton}>삭제</DangerButton>
        </Footer>
      </Modal>
    </Overlay>
  );
}
