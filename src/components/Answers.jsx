import React, { useEffect, useState } from 'react'
import AnswerCircle from '../constants/icon/answerCircle'
import useWindowSize from '../hooks/useWindowSize';

function Answers({ answers, isClick, answerIsCorrect, handleAnswer }) {

    const [newAnswerArr, setNewAnswerArr] = useState([])
    const [clickedButton, setClickedButton] = useState(false)

    const [width,] = useWindowSize();


    useEffect(() => {
        //random sort in array
        setNewAnswerArr(answers.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value))
        setClickedButton(false);
    }, [answers])

    return (
        <div className='answers'>
            <div className='firstAnswer' >
                <button className='answerContainer' disabled={isClick && true} onClick={() => { handleAnswer(newAnswerArr[0]); setClickedButton(true) }}>
                    <AnswerCircle data={newAnswerArr[0]?.answer} width={width === 1440 ? "150" : width === 1024 ? "130" : ""} color={clickedButton && newAnswerArr[0]?.isTrue && 'black'} />
                </button>
            </div>
            <div className='secondAnswer' >
                <button className="answerContainer" disabled={isClick && true} onClick={() => { handleAnswer(newAnswerArr[1]); setClickedButton(true) }}>
                    <AnswerCircle data={newAnswerArr[1]?.answer} width={width === 1440 ? "150" : width === 1024 ? "130" : ""} color={clickedButton && newAnswerArr[1]?.isTrue && 'black'} />
                </button>
            </div>
            <div className='thirdAnswer' >
                <button className="answerContainer" disabled={isClick && true} onClick={() => { handleAnswer(newAnswerArr[2]); setClickedButton(true) }}>
                    <AnswerCircle data={newAnswerArr[2]?.answer} width={width === 1440 ? "150" : width === 1024 ? "130" : ""} color={clickedButton && newAnswerArr[2]?.isTrue && 'black'} />
                </button>
            </div>
        </div>
    )
}

export default Answers