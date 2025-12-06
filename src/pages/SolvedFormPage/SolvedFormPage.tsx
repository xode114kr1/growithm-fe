import { useParams } from "react-router-dom";
import Wapper from "../../shared/styles/Wapper";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useGetProblemById, useSaveSolvedProblem } from "../../shared/hooks/useProblem";

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
  display: flex;
  justify-content: space-between;
  font-size: 40px;
  border-bottom: 1px solid #d1d5db;
  width: 100%;
  color: #111827;
  font-weight: 600;
  padding-bottom: 12px;
`;

const TitleButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
`;

const TitleButton = styled.button`
  background-color: #191d23;
  border: none;
  color: white;
  border-radius: 8px;
  width: 70px;
  height: 40px;
  font-size: 16px;
  transition: 200ms ease-in;

  &:hover {
    opacity: 0.8;
  }
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
`;

const CodeBlock = styled.pre`
  width: 100%;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: #111827;
  color: #e5e7eb;
  font-size: 15px;
  line-height: 1.3;
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
  const { id: problemId } = useParams();

  const { mutate: saveSolvedProblemMutation } = useSaveSolvedProblem(problemId as string);
  const { data: problem } = useGetProblemById(problemId as string);

  const [memoInput, setMemoInput] = useState<string>("");
  const MemoTextareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const isFirstRender = useRef(true);

  const handleSaveButtonClick = async () => {
    saveSolvedProblemMutation(
      { problemId, memo: memoInput },
      {
        onSuccess: () => {
          setIsEdit(false);
        },
        onError: (error) => {
          console.error("문제 풀이 저장 실패 : ", error);
        },
      }
    );
  };

  useEffect(() => {
    if (!problem) return;

    if (problem.state === "pending") {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }

    setMemoInput(problem.memo ?? "");
  }, [problem]);

  return (
    <Wapper>
      <SolvedFormContainer>
        <TitleText>
          <span>{problem?.title}</span>
          <TitleButtonContainer>
            {isEdit ? (
              <SaveButton onClick={handleSaveButtonClick}>저장하기</SaveButton>
            ) : (
              <>
                <TitleButton
                  onClick={() => {
                    setMemoInput(problem?.memo ?? "");
                    setIsEdit(true);
                    requestAnimationFrame(() => {
                      MemoTextareaRef.current?.focus();
                    });
                  }}
                >
                  수정
                </TitleButton>
                <TitleButton>공유</TitleButton>
              </>
            )}
          </TitleButtonContainer>
        </TitleText>
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
                <a href={problem?.link} target="_blank" rel="noopener noreferrer">
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
          <MemoTextarea
            ref={MemoTextareaRef}
            placeholder="어떤 아이디어로 접근했는지, 실수했던 부분, 다시 풀 때 주의할 점 등을 자유롭게 적어보세요."
            value={isEdit ? memoInput : (problem?.memo ?? "")}
            onChange={(e) => setMemoInput(e.target.value)}
            disabled={!isEdit}
          />
        </Section>
        <ButtonContanier style={{ display: isEdit ? "flex" : "none" }}>
          <SaveButton onClick={handleSaveButtonClick}>저장하기</SaveButton>
        </ButtonContanier>
      </SolvedFormContainer>
    </Wapper>
  );
};

export default SolvedFormPage;
