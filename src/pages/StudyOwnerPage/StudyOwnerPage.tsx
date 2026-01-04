import { useState } from "react";
import styled from "styled-components";
import type { Study } from "../../types/studyType";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  useGetSendStudyRequest,
  useSendStudyRequestMutation,
} from "../../shared/hooks/useStudyRequest";
import StudyOwnerMemberItem from "./components/StudyOwnerMemberItem";
import StudyOwnerSendItem from "./components/StudyOwnerSendItem";
import { useDeleteStudyMutation } from "../../shared/hooks/useStudy";
import WarningModal from "../../shared/components/WarningModal";
import { useOpenToast } from "../../shared/hooks/useToast";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 21px;
  font-weight: 800;
  color: #111827;
`;

const Card = styled.section`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05);
  padding: 16px 18px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  color: #111827;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TextInput = styled.input`
  flex: 1;
  min-width: 240px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  font-size: 15px;
  padding: 0 14px;
  color: #111827;
  background: #ffffff;
  outline: none;

  &::placeholder {
    color: #b2bec3;
  }

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.12);
  }

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
  }
`;

const Button = styled.button`
  height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    border-color: #c7d2fe;
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.12);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  border: 1px solid rgba(79, 70, 229, 0.25);
  background: rgba(79, 70, 229, 0.08);
  color: #4f46e5;

  &:hover {
    background: rgba(79, 70, 229, 0.12);
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.14);
  }
`;

const DangerButton = styled(Button)`
  border: 1px solid rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;

  &:hover {
    background: rgba(239, 68, 68, 0.12);
    box-shadow: 0 6px 16px rgba(239, 68, 68, 0.14);
  }
`;

const Helper = styled.p`
  margin: 0;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
`;

const Divider = styled.div`
  height: 1px;
  background: #eef2f7;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 520px;
  overflow: auto;
`;

const PendingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DangerZone = styled(Card)`
  border-color: rgba(239, 68, 68, 0.35);
`;

const DangerTitle = styled(CardTitle)`
  color: #ef4444;
`;

interface StudyOutletContext {
  study: Study;
}

const StudyOwnerPage = () => {
  const navigate = useNavigate();
  const { study } = useOutletContext<StudyOutletContext>();
  const [inviteUserName, setInviteUserName] = useState<string>("");
  const [deleteStudyName, setDeleteStudyModal] = useState<string>("");
  const openToast = useOpenToast();

  const [warningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const { mutate: sendStudyRequest } = useSendStudyRequestMutation();
  const { mutate: deleteStudy } = useDeleteStudyMutation();
  const { data: sendStudyRequestList } = useGetSendStudyRequest({ studyId: study?._id });

  const handleInviteButton = async () => {
    sendStudyRequest(
      { studyId: study?._id, inviteUserName },
      {
        onSuccess: () => setInviteUserName(""),
      }
    );
  };

  const handleDeleteButton = () => {
    if (deleteStudyName !== study.title) {
      openToast({ message: "스터디 이름이 일치하지 않습니다" });
      return;
    }
    setWarningModalOpen(true);
  };

  const handleDeleteStudy = async () => {
    await deleteStudy(
      { studyId: study?._id },
      {
        onSuccess: () => navigate("/study"),
      }
    );
  };

  return (
    <Container>
      <Header>
        <Title>Owner</Title>
      </Header>
      <Card>
        <CardTitle>멤버 초대</CardTitle>
        <Helper>이메일 또는 닉네임으로 초대 요청 전송.</Helper>

        <Row>
          <TextInput
            placeholder="예) gildong"
            value={inviteUserName}
            onChange={(e) => setInviteUserName(e.target.value)}
          />
          <PrimaryButton type="button" onClick={handleInviteButton}>
            초대 보내기
          </PrimaryButton>
        </Row>
        <PendingList>
          {sendStudyRequestList &&
            sendStudyRequestList?.map((item) => (
              <StudyOwnerSendItem key={item?._id} studyRequest={item} />
            ))}
        </PendingList>
      </Card>

      <Card>
        <CardTitle>멤버 관리</CardTitle>
        <Helper>권한 변경, 강퇴/삭제 등 관리 기능 영역.</Helper>

        <Divider />

        <MemberList>
          {study?.members &&
            study?.members?.map((item) => {
              if (item._id !== study?.owner?._id) {
                return <StudyOwnerMemberItem member={item} study={study} key={item._id} />;
              }
            })}
        </MemberList>
      </Card>

      <DangerZone>
        <DangerTitle>Danger Zone</DangerTitle>
        <Helper>
          아래 작업은 되돌릴 수 없음. 실수 방지를 위해 확인 모달(스터디명 입력)을 붙이는 걸 권장.
        </Helper>

        <Row>
          <TextInput
            placeholder='확인을 위해 스터디 이름 입력 (예: "Growithm Study")'
            value={deleteStudyName}
            onChange={(e) => setDeleteStudyModal(e.target.value)}
          />
          <DangerButton type="button" onClick={handleDeleteButton}>
            스터디 삭제
          </DangerButton>
        </Row>
      </DangerZone>
      {warningModalOpen && (
        <WarningModal
          onClose={() => setWarningModalOpen(false)}
          handleDeleteButton={handleDeleteStudy}
          title="스터디를 삭제하시겠습니까?"
        />
      )}
    </Container>
  );
};

export default StudyOwnerPage;
