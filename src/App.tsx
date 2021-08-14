import React, { useState} from 'react';
import { GlobalStyle, Wrapper } from './App.styles';
import Questions from './components/Questions';
import { QuestionsState, Difficulty, fetchQuizQuestions } from './data/API';
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const totalQuestions = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const start = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      totalQuestions,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  const check = (e: React.MouseEvent<HTMLButtonElement>)=>{
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }
  const next = async () => {
    const nextQ = number + 1;

    if (nextQ === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  }
  return (
    <>
      <GlobalStyle/>
      <Wrapper>
      <h1>Quick Quiz</h1>
      {gameOver || userAnswers.length === totalQuestions ? (
          <button className='start' onClick={start}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <Questions 
          questionNo={number + 1} 
          totalQuestion={totalQuestions}
          questions = {questions[number].question}
          answers = {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number] : undefined }
          callback = {check}/>
        )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== totalQuestions - 1 ? (
          <button className='next' onClick={next}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
