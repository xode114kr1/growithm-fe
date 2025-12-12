import { useState } from "react";
import styled from "styled-components";

type Props = {
  onClose: () => void;
};

type StudyItem = {
  id: string;
  name: string;
  explanation: string;
  membersCount: number;
};

export default function StudyShareModal({ onClose }: Props) {
  const dummyStudies: StudyItem[] = [
    {
      id: "1",
      name: "알고리즘 스터디",
      explanation: "백준 / 프로그래머스 문제 풀이",
      membersCount: 8,
    },
    {
      id: "2",
      name: "Growithm 개발 스터디",
      explanation: "프론트엔드 & 백엔드 협업",
      membersCount: 4,
    },
    {
      id: "3",
      name: "CS 면접 대비",
      explanation: "네트워크, OS, DB 정리",
      membersCount: 6,
    },
  ];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleStudy = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  return (
    <Overlay onClick={onClose}>
      <Modal
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Header>
          <TitleBox>
            <Title>스터디에 공유</Title>
            <SubTitle>공유할 스터디를 선택하세요</SubTitle>
          </TitleBox>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <Divider />

        <Body>
          <List>
            {dummyStudies.map((study) => {
              const checked = selectedIds.includes(study.id);

              return (
                <Row key={study.id} onClick={() => toggleStudy(study.id)}>
                  <Check type="checkbox" checked={checked} readOnly />
                  <RowMain>
                    <RowTop>
                      <RowTitle>{study.name}</RowTitle>
                      <Pill>멤버 {study.membersCount}</Pill>
                    </RowTop>
                    <RowDesc>{study.explanation}</RowDesc>
                  </RowMain>
                </Row>
              );
            })}
          </List>
        </Body>

        <Divider />

        <Footer>
          <GhostButton onClick={onClose}>취소</GhostButton>
          <PrimaryButton>공유하기</PrimaryButton>
        </Footer>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Modal = styled.div`
  width: 680px;
  max-height: 80vh;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const SubTitle = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

const CloseButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
`;

const Body = styled.div`
  padding: 16px 18px;
  overflow-y: auto;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`;

const Check = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #6c5ce7;
  margin-top: 2px;
`;

const RowMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const RowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RowTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

const Pill = styled.div`
  font-size: 12px;
  padding: 6px 8px;
  border-radius: 999px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #374151;
`;

const RowDesc = styled.div`
  font-size: 13px;
  color: #4b5563;
`;

const Footer = styled.div`
  padding: 14px 18px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const GhostButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
`;

const PrimaryButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  background: #6c5ce7;
  color: #ffffff;
  cursor: pointer;
`;
