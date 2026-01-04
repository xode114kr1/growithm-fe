import styled from "styled-components";
import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
  useGetReceiveFriendRequests,
  useGetSendFriendRequests,
  useRejectFriendRequestMutation,
} from "../../../shared/hooks/useFriendRequest";

const FriendRequestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RequestCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 12px 14px;
  border-radius: 14px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03);

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

interface AvatarProps {
  src?: string;
}

const Avatar = styled.img<AvatarProps>`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  object-fit: cover;
  background-color: #e5e7eb;
  flex-shrink: 0;
`;

const RequestInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const RequestName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    margin-top: 4px;
  }
`;

const AcceptButton = styled.button`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #4f46e5;
  background: #4f46e5;
  font-size: 14px;
  font-weight: 500;
  color: #f9fafb;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    transform 0.05s ease-in-out,
    box-shadow 0.1s ease-in-out;

  &:hover {
    background: #4338ca;
    border-color: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const RejectButton = styled.button`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    transform 0.05s ease-in-out;

  &:hover {
    background: #fee2e2;
    border-color: #fecaca;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FriendRequestList = ({ state }: { state: "receive" | "send" }) => {
  const { mutate: acceptFriendRequest } = useAcceptFriendRequestMutation();
  const { mutate: rejectFriendRequest } = useRejectFriendRequestMutation();
  const { mutate: cancelFriendRequest } = useCancelFriendRequestMutation();

  const { data: receiveFriendRequest } = useGetReceiveFriendRequests();
  const { data: sendFriendRequest } = useGetSendFriendRequests();
  const friendRequests = state == "receive" ? receiveFriendRequest : sendFriendRequest;

  if (!(state === "receive") && !(state === "send")) {
    return null;
  }

  if (state === "receive") {
    return (
      <FriendRequestListContainer>
        {friendRequests?.map((item) => (
          <RequestCard key={item._id}>
            <Avatar src={item?.from?.avatarUrl} />
            <RequestInfo>
              <RequestName>{item?.from?.name}</RequestName>
            </RequestInfo>
            <Actions>
              <AcceptButton
                type="button"
                onClick={() => acceptFriendRequest({ requestId: item?._id })}
              >
                수락
              </AcceptButton>
              <RejectButton
                type="button"
                onClick={() => rejectFriendRequest({ requestId: item?._id })}
              >
                삭제
              </RejectButton>
            </Actions>
          </RequestCard>
        ))}
      </FriendRequestListContainer>
    );
  }

  return (
    <FriendRequestListContainer>
      {friendRequests?.map((item) => (
        <RequestCard key={item._id}>
          <Avatar src={item?.to?.avatarUrl} />
          <RequestInfo>
            <RequestName>{item?.to?.name}</RequestName>
          </RequestInfo>
          <Actions>
            <RejectButton
              type="button"
              onClick={() => cancelFriendRequest({ requestId: item?._id })}
            >
              삭제
            </RejectButton>
          </Actions>
        </RequestCard>
      ))}
    </FriendRequestListContainer>
  );
};

export default FriendRequestList;
