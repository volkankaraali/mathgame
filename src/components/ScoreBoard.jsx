import React from 'react'

function ScoreBoard({ score, gameTour, correctQuestionNumber, questionNumber }) {
    return (
        <div className='scoreBoard'>
            <div>Score:{score} </div>
            <div> Tour:{gameTour} </div>
            <div> Questions:{correctQuestionNumber}/{questionNumber} </div>
        </div>
    )
}

export default ScoreBoard