import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  background-color: #fafafa;
`;

const TitleInfo = styled.span`
  font-weight: 700;
`;

const TextInfo = styled.span`
  text-align: center;
  font-size: 16px;
  color: #866e72;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <TextInfo>
        <TitleInfo>Growithm</TitleInfo>
        <br />
        알고리즘 스터디를 통해 함께 성장하는 개발자 커뮤니티
        <br />
        이메일 : xode114kr1@naver.com | 전화 : 02-1234-5678
      </TextInfo>
    </FooterContainer>
  );
};

export default Footer;
