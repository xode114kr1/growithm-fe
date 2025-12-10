import styled from "styled-components";

interface StudyCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  max-height: 80vh;
  background: #f9fafb;
  border-radius: 18px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.3);
  padding: 20px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const CloseButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  padding-right: 4px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

const LabelSub = styled.span`
  font-size: 11px;
  color: #9ca3af;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 9px 11px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  background: #ffffff;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.25);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 90px;
  resize: vertical;
  padding: 9px 11px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  background: #ffffff;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.25);
  }
`;

const MemberBox = styled.div`
  margin-top: 4px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 10px 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MemberContent = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchRow = styled.div`
  display: flex;

  gap: 6px;
`;

const SmallInput = styled.input`
  flex: 1;
  padding: 7px 9px;
  border-radius: 9px;
  border: 1px solid #e5e7eb;
  font-size: 12px;
  background: #f9fafb;
  outline: none;

  &:focus {
    border-color: #6366f1;
    background: #ffffff;
  }
`;

const SmallButton = styled.button`
  padding: 7px 10px;
  border-radius: 9px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #f9fafb;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.05);
  }
`;

const UserRow = styled.div`
  display: flex;
  max-height: 300px;
  gap: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
    max-height: 600px;
  }
`;

const MemberList = styled.div`
  flex: 1;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  overflow-y: auto;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FriendList = styled.div`
  flex: 1;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  overflow-y: auto;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 6px;
  border-radius: 9px;

  &:hover {
    background: #ffffff;
  }
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: linear-gradient(135deg, #a855f7, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: #f9fafb;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #111827;
`;

const UserId = styled.div`
  font-size: 11px;
  color: #9ca3af;
`;

const DeleteButton = styled.button<{ selected?: boolean }>`
  border-radius: 999px;
  border: none;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  background: ${({ selected }) => (selected ? "#e5e7eb" : "#eef2ff")};
  color: ${({ selected }) => (selected ? "#634b4f" : "#e5464e")};

  &:hover {
    filter: brightness(0.97);
  }
`;

const AddButton = styled.button<{ selected?: boolean }>`
  border-radius: 999px;
  border: none;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  background: ${({ selected }) => (selected ? "#e5e7eb" : "#eef2ff")};
  color: ${({ selected }) => (selected ? "#4b5563" : "#4f46e5")};

  &:hover {
    filter: brightness(0.97);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid #e5e7eb;
`;

const CancelButton = styled.button`
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  background: #e5e7eb;
  color: #4b5563;
  cursor: pointer;

  &:hover {
    background: #d1d5db;
  }
`;

const PrimaryButton = styled.button`
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  border: none;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #f9fafb;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }
`;

const StudyCreateModal = ({ isOpen, onClose }: StudyCreateModalProps) => {
  const dummyMember = [
    { id: "useruser", name: "유저김" },
    { id: "kim_name", name: "김이름" },
    { id: "gk677", name: "박혁준" },
  ];

  const dummyFriends = [
    { id: "grow_yo01", name: "김유저" },
    { id: "algo_cat", name: "알고캣" },
    { id: "baekjoon_king", name: "백준킹" },
  ];

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader>
          <Title>새 스터디 만들기</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <FieldGroup>
            <LabelRow>
              <Label>스터디 제목</Label>
              <LabelSub>예: 알고리즘 실버~골드 스터디</LabelSub>
            </LabelRow>
            <TextInput placeholder="스터디 이름을 입력하세요" />
          </FieldGroup>

          <FieldGroup>
            <LabelRow>
              <Label>스터디 설명</Label>
              <LabelSub>간단한 목표나 진행 방식을 적어주세요</LabelSub>
            </LabelRow>
            <TextArea placeholder="예: 매주 화/목 2문제, 디스코드로 코드 리뷰 진행" />
          </FieldGroup>

          <FieldGroup>
            <LabelRow>
              <Label>스터디 인원 추가</Label>
              <LabelSub>ID로 검색하거나 친구 목록에서 선택</LabelSub>
            </LabelRow>

            <MemberBox>
              <MemberContent>
                <SearchRow>
                  <SmallInput placeholder="사용자 ID를 입력하세요" />
                  <SmallButton>검색</SmallButton>
                </SearchRow>

                <UserRow>
                  <MemberList>
                    {dummyMember.map((f) => (
                      <UserItem key={f.id}>
                        <Avatar>{f.name[0]}</Avatar>
                        <UserInfo>
                          <UserName>{f.name}</UserName>
                          <UserId>@{f.id}</UserId>
                        </UserInfo>
                        <DeleteButton>삭제</DeleteButton>
                      </UserItem>
                    ))}
                  </MemberList>
                  <FriendList>
                    {dummyFriends.map((f) => (
                      <UserItem key={f.id}>
                        <Avatar>{f.name[0]}</Avatar>
                        <UserInfo>
                          <UserName>{f.name}</UserName>
                          <UserId>@{f.id}</UserId>
                        </UserInfo>
                        <AddButton>추가</AddButton>
                      </UserItem>
                    ))}
                  </FriendList>
                </UserRow>

                <LabelSub>검색 결과는 여기 표시 (추후 기능 연결)</LabelSub>
              </MemberContent>
            </MemberBox>
          </FieldGroup>
        </ModalBody>

        <ModalFooter>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <PrimaryButton>스터디 생성</PrimaryButton>
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
};

export default StudyCreateModal;
