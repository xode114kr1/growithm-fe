import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
`;

const BaseButton = styled.button`
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const NavButton = styled(BaseButton)`
  font-weight: 600;
`;

const PageButton = styled(BaseButton)<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "#6c5ce7" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#6c5ce7")};
  border-color: ${({ $active }) => ($active ? "#6c5ce7" : "#e5e7eb")};

  &:hover {
    background: ${({ $active }) => ($active ? "#6c5ce7" : "#f3f4f6")};
  }
`;

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const ProblemPagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Container>
      <NavButton disabled={page === 1} onClick={() => onChange(page - 1)}>
        &lt;
      </NavButton>
      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNumber = idx + 1;
        return (
          <PageButton
            key={pageNumber}
            $active={page === pageNumber}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </PageButton>
        );
      })}
      <NavButton disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        &gt;
      </NavButton>
    </Container>
  );
};

export default ProblemPagination;
