import styled from "styled-components";
import { useAuthStore } from "../../../stores/authStore";
import { calculateTier } from "../../../shared/utils/tier";
import type { BaekjoonTierType } from "../../../types/problemType";
import { TIER_GRADIENT } from "../../../shared/styles/palette";
import TierProgressHover, { ProgressCard } from "./TierProgressHover";

interface ProfileProps {
  src?: string;
}

interface TierContainerProps {
  tier: BaekjoonTierType;
}

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  background: #fff;
  width: 100%;
  /* height: 80%; */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

const ProfileImg = styled.div<ProfileProps>`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const ProfileName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #2d3436;
`;

const ProfileRepo = styled.div`
  flex: 1;
  font-size: 17px;
  color: #866e72;
  margin-bottom: 15px;
`;

const TierContainer = styled.div<TierContainerProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 40px;
  background: ${({ tier }) => TIER_GRADIENT[tier] || TIER_GRADIENT.bronze};
  border-radius: 10px;
  font-size: 19px;
  font-weight: 500;
  color: white;

  &:hover ${ProgressCard} {
    display: block;
  }
`;

const ProfileCard = () => {
  const user = useAuthStore((s) => s.user);
  const tier = calculateTier(user?.score || 0);

  return (
    <ProfileCardContainer>
      <ProfileImg src={user?.avatarUrl} />
      <ProfileName>{user?.name}</ProfileName>
      <ProfileRepo>{user?.repo}</ProfileRepo>
      <TierContainer tier={tier}>
        {tier}
        <TierProgressHover score={user?.score || 0} />
      </TierContainer>
    </ProfileCardContainer>
  );
};

export default ProfileCard;
