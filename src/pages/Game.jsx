import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Answers from '../components/Answers';
import ScoreBoard from '../components/ScoreBoard';
import QuestionBoard from '../constants/icon/questionBoard';
import { useMathGame } from '../contexts/mathgameContext';
import useWindowSize from '../hooks/useWindowSize';

function Game() {
    const navigate = useNavigate();

    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [answers, setAnswers] = useState([]);


    const [width,] = useWindowSize();
    console.log(width)
    //when answer button click, answer buttons disabled.
    const [isClick, setIsClick] = useState(false);

    //context
    const { gameTour, questionNumber, setQuestionNumber, correctQuestionNumber, setCorrectQuestionNumber, score, setScore, setAllQuestions } = useMathGame();

    useEffect(() => {
        if (questionNumber === 11) {
            return navigate("/result")
        }
        generateQuestion();


    }, [questionNumber])


    const generateQuestion = () => {
        //sets to empty when new question.
        setAnswers([]);

        let firstNum = Math.floor(Math.random() * 10) + 1;
        let secondNum = Math.floor(Math.random() * 10) + 1;

        setFirstNumber(firstNum);
        setSecondNumber(secondNum);

        //sets true answer
        setAnswers((answers) => [...answers, { answer: firstNum * secondNum, isTrue: true }])

        //generates 2 wrong answers
        generateWrongAnswer(firstNum, secondNum, "minus")
        generateWrongAnswer(firstNum, secondNum, "plus")
    }


    const generateWrongAnswer = (firstNum, secondNum, operation) => {
        let num = Math.floor(Math.random() * 2) + 1
        if (operation === "plus") {
            if (num === 1) {
                setAnswers((answers) => [...answers, { answer: (firstNum + 1) * secondNum, isTrue: false }])
            } else {
                setAnswers((answers) => [...answers, { answer: firstNum * (secondNum + 1), isTrue: false }])
            }
        }
        if (operation === "minus") {
            if (num === 1) {
                setAnswers((answers) => [...answers, { answer: (firstNum - 1) * secondNum, isTrue: false }])
            } else {
                setAnswers((answers) => [...answers, { answer: firstNum * (secondNum - 1), isTrue: false }])
            }
        }
    }


    const handleAnswer = (answer) => {
        setIsClick(true);
        if (answer.isTrue) {
            document.body.style.background = "green";
            setTimeout(() => {
                document.body.style.background = "#2D2D2D";
                let point = Math.round(Math.sqrt(answer.answer));
                setAllQuestions(oldAllQuestions => [...oldAllQuestions, { question: `${firstNumber}x${secondNumber}`, trueAnswer: firstNumber * secondNumber, answerIsCorrect: true }])
                setScore(score + point);
                setCorrectQuestionNumber(correctQuestionNumber + 1);
                setIsClick(false)
                setQuestionNumber(questionNumber + 1);
            }, 3000);

        } else {

            document.body.style.background = "red";
            setTimeout(() => {
                document.body.style.background = "#2D2D2D";
                setAllQuestions(oldAllQuestions => [...oldAllQuestions, { question: `${firstNumber}x${secondNumber}`, trueAnswer: firstNumber * secondNumber, answerIsCorrect: false }])
                setIsClick(false)
                setQuestionNumber(questionNumber + 1)
            }, 3000);

        }
    }



    return (
        <div className='game'>
            <div className='gameLeftSide'>
                <QuestionBoard width={width === 1440 ? "610" : width === 1024 ? "500" : ""} />
                <div className='question'>{firstNumber} x {secondNumber}</div>
            </div>

            <div className='gameRightSide'>
                <ScoreBoard score={score} gameTour={gameTour} questionNumber={questionNumber} correctQuestionNumber={correctQuestionNumber} />
                <Answers answers={answers} isClick={isClick} handleAnswer={handleAnswer} />
            </div>

        </div>
    )
}

export default Game