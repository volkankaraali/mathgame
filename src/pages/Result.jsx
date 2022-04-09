import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonCircle from '../constants/icon/buttonCircle';
import TrueIcon from '../constants/icon/trueIcon';
import UnderlineIcon from '../constants/icon/underlineIcon';
import WrongIcon from '../constants/icon/wrongIcon';
import { useMathGame } from '../contexts/mathgameContext';

function Result() {

    const navigate = useNavigate();

    const {
        allQuestions,
        setAllQuestions,
        questionNumber,
        setQuestionNumber,
        correctQuestionNumber,
        setCorrectQuestionNumber,
        score,
        setScore,
        gameTour, setGameTour } = useMathGame();

    console.log(allQuestions)

    useEffect(() => {
        let totalScore = Number(localStorage.getItem('totalScore') || 0);
        totalScore = totalScore + Number(score);
        localStorage.setItem('totalScore', totalScore)

        let totalQuestion = Number(localStorage.getItem('totalQuestions') || 0);
        console.log(questionNumber)
        totalQuestion = totalQuestion + (Number(questionNumber) - 1);
        localStorage.setItem('totalQuestions', totalQuestion);

        let correctAnswer = Number(localStorage.getItem('correctAnswers') || 0);
        correctAnswer = correctAnswer + Number(correctQuestionNumber);
        localStorage.setItem('correctAnswers', correctAnswer);
    }, [])


    const handleRestart = () => {
        setGameTour(gameTour + 1)
        setQuestionNumber(1);
        setAllQuestions([]);
        setCorrectQuestionNumber(0);
        setScore(0);
        return navigate('/game');
    }

    return (
        <div className='result'>
            <div className='leftSide'>
                <h1 className='result-finaltext'>Final</h1>
                <UnderlineIcon width={228} height={8} />

                <div>Score: {score}</div>
                <div>Quesitons: {questionNumber - 1}</div>
                <div>Correct Answers: {correctQuestionNumber}</div>
                <div className='restartButton' onClick={() => handleRestart()}>
                    <ButtonCircle text={"Restart"} />
                </div>
            </div>
            <div className='rightSide'>
                <h1 className='result-allquestiontext'>All Questions</h1>
                <UnderlineIcon width={350} height={8} />
                {
                    allQuestions.map((item, index) => (
                        <div key={index} className='resultAnswer'>
                            <div>{item.question} = {item.trueAnswer}</div>
                            {
                                item.answerIsCorrect ? <TrueIcon /> : <WrongIcon />
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Result