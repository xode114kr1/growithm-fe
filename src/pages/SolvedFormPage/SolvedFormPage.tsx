import { useLocation } from "react-router-dom";
import Wapper from "../../shared/styles/Wapper";
import { useState } from "react";
import styled from "styled-components";
import type { Problem } from "../../types/problemType";
import { createSolved } from "../../shared/api/problem";

type FormMode = "fromPending" | "fromSolved";

interface LocationState {
  mode?: FormMode;
  problem?: Problem;
}

const SolvedFormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 60px 10%;
  min-height: 100vh;
  background-color: #fff;
`;

const TitleText = styled.div`
  font-size: 40px;
  border-bottom: 1px solid #d1d5db;
  width: 100%;
  color: #111827;
  font-weight: 600;
  padding-bottom: 12px;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border-bottom: 2px solid #e5e7eb;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  background: #f9fafb;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
`;

const Tfoot = styled.tfoot`
  background: #f9fafb;

  td {
    padding: 12px;
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
  margin-top: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
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
  white-space: pre-wrap;
`;

const CodeBlock = styled.pre`
  width: 100%;
  max-height: 400px;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #111827;
  color: #e5e7eb;
  font-size: 13px;
  line-height: 1.6;
  overflow: auto;
  font-family:
    "Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  white-space: pre;
`;

const MemoTextarea = styled.textarea`
  width: 100%;
  min-height: 240px;
  padding: 12px 14px;
  border-radius: 8px;
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

const ButtonContanier = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
`;

const SaveButton = styled.button`
  background-color: #6c5ce7;
  border: none;
  color: white;
  border-radius: 8px;
  height: 40px;
  font-size: 16px;
  font-weight: 400;
  transition: 200ms ease-in;

  &:hover {
    opacity: 0.8;
  }
`;

const SolvedFormPage = () => {
  const location = useLocation();
  const { mode, problem } = (location.state || {}) as LocationState;

  const [form, setForm] = useState<Problem | undefined>(() => {
    if (mode == "fromPending" && problem) {
      return { ...problem, memo: "" };
    } else if (mode == "fromSolved" && problem) {
      return { ...problem };
    }
  });

  return (
    <Wapper>
      <SolvedFormContainer>
        <TitleText>{form?.title}</TitleText>
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
              <Td>{form?.tier}</Td>
              <Td>{form?.memory}</Td>
              <Td>{form?.time}</Td>
              <Td>{form?.timestamp}</Td>
            </tr>
          </tbody>
          <Tfoot>
            <tr>
              <td colSpan={4}>
                문제 링크 :{" "}
                <a href={form?.link} target="_blank" rel="noopener noreferrer">
                  {form?.link}
                </a>
              </td>
            </tr>
          </Tfoot>
        </InfoTable>

        <Section>
          <SectionTitle>문제 내용</SectionTitle>
          <ProblemBody>{form?.description}</ProblemBody>
        </Section>

        <Section>
          <SectionTitle>내 풀이 코드</SectionTitle>
          <CodeBlock>{form?.code}</CodeBlock>
        </Section>
        <Section>
          <SectionTitle>풀이 메모</SectionTitle>
          <MemoTextarea
            placeholder="어떤 아이디어로 접근했는지, 실수했던 부분, 다시 풀 때 주의할 점 등을 자유롭게 적어보세요."
            value={form?.memo ?? ""}
            onChange={(e) => setForm((prev) => (prev ? { ...prev, memo: e.target.value } : prev))}
          />
        </Section>
        <ButtonContanier>
          <SaveButton onClick={async () => await createSolved(form as Problem)}>
            저장하기
          </SaveButton>
        </ButtonContanier>
      </SolvedFormContainer>
    </Wapper>
  );
};

export default SolvedFormPage;
