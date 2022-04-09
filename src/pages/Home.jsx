import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCircle from '../constants/icon/buttonCircle';
import UnderlineIcon from '../constants/icon/underlineIcon';
import { useMathGame } from '../contexts/mathgameContext';

function Home() {
    const navigate = useNavigate();

    const { totalPointInStorage, totalQuestionsInStorage, correctAnswersInStorage } = useMathGame();

    return (
        <div className='home'>
            <h1>Mathematics Game</h1>
            <UnderlineIcon />

            <div className='totalPoint'>Total Point: {totalPointInStorage}</div>
            <div>Total Questions: {totalQuestionsInStorage}</div>
            <div>Correct Answers: {correctAnswersInStorage}</div>

            <div className='startButton' onClick={() => navigate("/game")}>
                <ButtonCircle text={"Start"} />
            </div>
        </div>
    )
}

export default Home