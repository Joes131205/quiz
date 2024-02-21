import { useEffect, useState } from "react";
import Question from "./Question.jsx";

const APIUrl = "https://opentdb.com/api.php?amount=1&category=18&type=multiple";

function Quiz() {
    const [questions, setQuestions] = useState({});
    const [rating, setRating] = useState(1000);
    const [renderedQuestion, setRenderedQuestion] = useState(null);
    const [disabled, setDisabled] = useState(false);

    async function getQuestion() {
        try {
            const response = await fetch(APIUrl);
            const data = await response.json();
            const {
                question,
                correct_answer: correct,
                incorrect_answers: incorrect,
            } = data.results[0];
            setQuestions({
                question,
                correct,
                incorrect,
            });
        } catch (error) {
            await new Promise((resolve) => setTimeout(resolve, 4000));
            await getQuestion();
        }
    }

    useEffect(() => {
        if (questions.question) {
            setRenderedQuestion(
                <Question
                    key={1}
                    question={questions.question}
                    correct={questions.correct}
                    incorrect={questions.incorrect}
                    handleAnswer={handleAnswer}
                    disabled={disabled}
                />
            );
        }
    }, [questions, disabled]);

    function handleAnswer(isCorrect) {
        setDisabled(!disabled);
        if (isCorrect) {
            handleCorrect();
        } else {
            handleIncorrect();
        }
    }

    function handleCorrect() {
        setRating(
            (prevScore) => prevScore + Math.floor(Math.random() * 100) + 1
        );
        nextQuestion();
    }

    function handleIncorrect() {
        setRating(
            (prevScore) => prevScore - Math.floor(Math.random() * 100) + 1
        );
        nextQuestion();
    }

    async function nextQuestion() {
        await getQuestion();
        setDisabled(false);
    }
    useEffect(() => {
        getQuestion();
    }, []);
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-10 text-center text-white">
            <h1 className="text-2xl font-bold">Quiz App</h1>
            <p>Rating: {rating}</p>
            {renderedQuestion ? (
                <div>{renderedQuestion}</div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Quiz;
