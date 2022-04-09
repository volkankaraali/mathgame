import { createContext, useContext, useEffect, useState } from "react";

const MathGameContext = createContext();

const MathGameProvider = ({ children }) => {

    const [gameTour, setGameTour] = useState(1);
    const [allQuestions, setAllQuestions] = useState([]);

    const [questionNumber, setQuestionNumber] = useState(1);
    const [correctQuestionNumber, setCorrectQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);

    const [totalScoreInStorage, setTotalScoreInStorage] = useState();
    const [totalQuestionsInStorage, setTotalQuestionsInStorage] = useState();
    const [correctAnswersInStorage, setCorrectAnswersInStorage] = useState();

    useEffect(() => {
        setTotalScoreInStorage(JSON.parse(localStorage.getItem('totalScore')) || 0);
        setTotalQuestionsInStorage(JSON.parse(localStorage.getItem('totalQuestions')) || 0);
        setCorrectAnswersInStorage(JSON.parse(localStorage.getItem('correctAnswers')) || 0);
    }, [])


    const values = {
        allQuestions,
        setAllQuestions,
        gameTour,
        setGameTour,
        totalPointInStorage: totalScoreInStorage,
        totalQuestionsInStorage,
        correctAnswersInStorage,

        questionNumber,
        setQuestionNumber,
        correctQuestionNumber,
        setCorrectQuestionNumber,
        score,
        setScore,
    }

    return <MathGameContext.Provider value={values} >{children}</MathGameContext.Provider>
}

function useMathGame() {
    return useContext(MathGameContext);
}

export { MathGameProvider, useMathGame }