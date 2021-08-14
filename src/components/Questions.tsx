import React from 'react';
import { Wrapper, ButtonWrapper } from './Questions.styles';
interface IProps{
  questions: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNo: number;
  totalQuestion: number;
}
const Questions = ({questions, answers,callback,userAnswer,questionNo,totalQuestion}:IProps) => {
  return (
    <Wrapper>
    <p className='number'>
      Question: {questionNo} / {totalQuestion}
    </p>
    <p dangerouslySetInnerHTML={{ __html: questions }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
  );
};

export default Questions;