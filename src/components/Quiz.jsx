import { useEffect, useState } from "react";
import Question from "./Question.jsx";

const APIUrl = "https://opentdb.com/api.php?amount=1&category=18&type=multiple";

function Quiz() {
    const [questions, setQuestions] = useState({});
    const [rating, setRating] = useState(0);
    const [renderedQuestion, setRenderedQuestion] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const storedRating = JSON.parse(localStorage.getItem("rating"));
        console.log(storedRating);
        setRating((prev) => storedRating || prev);
    }, []);

    useEffect(() => {
        localStorage.setItem("rating", JSON.stringify(rating));
    }, [rating]);

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
        const currPoints = Math.floor(Math.random() * 100) + 1;
        setRating((prevScore) => prevScore + currPoints);
        setPoints(currPoints);
        setIsCorrect(true);
        nextQuestion();
    }

    function handleIncorrect() {
        const currPoints = Math.floor(Math.random() * 50) + 1;
        setRating((prevScore) => prevScore - currPoints);
        setPoints(currPoints);
        setIsCorrect(false);
        nextQuestion();
    }

    async function nextQuestion() {
        await getQuestion();
        setDisabled(false);
        setIsCorrect(null);
    }

    useEffect(() => {
        getQuestion();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-8 text-center text-white select-none">
            <h1 className="text-5xl font-bold">
                The Computer Quiz Of All Time
            </h1>
            <p className="text-2xl">
                Your Rating:{" "}
                <span
                    className={`font-bold ${
                        isCorrect === true
                            ? "text-green-500"
                            : isCorrect === false
                            ? "text-red-500"
                            : ""
                    } transition-colors duration-[600ms]`}
                >
                    {rating}{" "}
                </span>
                {isCorrect !== null
                    ? isCorrect === true
                        ? `( +${points} )`
                        : `( -${points} )`
                    : ""}
            </p>
            <p>Correct = Your Rating + Random rating between 1 - 100</p>
            <p>Incorrect = Your Rating - Random rating between 1 - 50</p>
            {renderedQuestion ? (
                <div>{renderedQuestion}</div>
            ) : (
                <p>Loading...</p>
            )}
            <p>
                Question by{" "}
                <a
                    href="https://opentdb.com/"
                    target="_blank"
                    className="text-blue-200"
                >
                    Open Trivia Database
                </a>
            </p>
        </div>
    );
}

export default Quiz;
