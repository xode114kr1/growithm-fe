import styled from "styled-components";
import type { Problem } from "../../../types/problemType";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type StudyProblemDetailModalProps = {
  problem: Problem;
  onClose: () => void;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  width: min(920px, calc(100vw - 32px));
  max-height: 80vh;
  background: #ffffff;
  border-radius: 20px;
  padding: 22px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
  word-break: break-word;
`;

const Author = styled.div`
  padding-left: 5px;
  font-size: 15px;
  color: #6b7280;
`;

const AuthorUser = styled.span`
  font-weight: 600;
`;

const DarkButton = styled.button`
  background-color: #191d23;
  border: none;
  color: white;
  border-radius: 8px;
  height: 40px;
  padding: 0 14px;
  font-size: 15px;
  font-weight: 500;
  transition: 200ms ease-in;
  cursor: pointer;

  &:hover {
    opacity: 0.86;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    color: #111827;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  overflow: auto;
  padding-right: 4px;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 2px solid #e5e7eb;
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  background: #f9fafb;
  color: #111827;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
`;

const Tfoot = styled.tfoot`
  background: #f9fafb;

  td {
    padding: 10px 12px;
    font-size: 14px;
    color: #374151;
  }

  a {
    color: #3b82f6;
    text-decoration: underline;
    word-break: break-all;
  }
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProblemBody = styled.div`
  width: 100%;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

const CodeBlock = styled.pre`
  width: 100%;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #111827;
  color: #e5e7eb;
  font-size: 14px;
  line-height: 1.35;
  overflow: auto;
  font-family:
    "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  white-space: pre;
`;

const MemoTextarea = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  font-size: 14px;
  color: #111827;
  resize: vertical;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: #6c5ce7;
    box-shadow: 0 0 0 1px rgba(108, 92, 231, 0.3);
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 6px;
`;

const StudyProblemDetailModal = ({ onClose, problem }: StudyProblemDetailModalProps) => {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={stop}>
        <Header>
          <TitleRow>
            <Title>
              [{problem?.platform}] {problem?.problemId} - {problem?.title}
            </Title>
            <Author>
              solved by <AuthorUser>{problem?.userId?.name}</AuthorUser>
            </Author>
          </TitleRow>

          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </Header>

        <Body>
          <InfoTable>
            <thead>
              <tr>
                <Th>티어</Th>
                <Th>메모리</Th>
                <Th>처리 시간</Th>
                <Th>날짜</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>{problem?.tier}</Td>
                <Td>{problem?.memory}</Td>
                <Td>{problem?.time}</Td>
                <Td>{problem?.timestamp}</Td>
              </tr>
            </tbody>

            <Tfoot>
              <tr>
                <td colSpan={4}>
                  <a href={problem?.link} target="_blank" rel="noreferrer">
                    {problem?.link}
                  </a>
                </td>
              </tr>
            </Tfoot>
          </InfoTable>

          <Section>
            <SectionTitle>문제 내용</SectionTitle>
            <ProblemBody>
              <div className="readme-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {problem?.description}
                </ReactMarkdown>
              </div>
            </ProblemBody>
          </Section>

          <Section>
            <SectionTitle>내 풀이 코드</SectionTitle>
            <CodeBlock>{problem?.code}</CodeBlock>
          </Section>

          <Section>
            <SectionTitle>풀이 메모</SectionTitle>
            <MemoTextarea>{problem?.memo}</MemoTextarea>
          </Section>
        </Body>

        <Footer>
          <DarkButton>닫기</DarkButton>
        </Footer>
      </Modal>
    </Overlay>
  );
};
export default StudyProblemDetailModal;
