import styled from 'styled-components';

interface todoListButtonProps {
  content: string;
  onClick: () => void;
}

const Button = styled.button<{ content: string }>`
  background-color: ${(props) =>
    props.content === '완료'
      ? 'green'
      : props.content === '삭제'
        ? 'red'
        : 'grey'};
  color: white;
  border: none;
  border-radius: 5px;
  margin: 0px 5px;
  cursor: pointer;
`;

export default function TodoListButton({
  content,
  onClick,
}: todoListButtonProps) {
  return (
    <Button content={content} onClick={onClick}>
      {content}
    </Button>
  );
}
