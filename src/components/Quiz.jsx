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
        setRating((prevScore) => prevScore + 5);
        setIsCorrect(true);
        nextQuestion();
    }

    function handleIncorrect() {
        setRating((prevScore) => prevScore - 5);
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
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-2 md:gap-8 text-center text-white select-none ">
            <h1 className="text-2xl md:text-5xl font-bold px-2">
                The Computer Quiz Of All Time
            </h1>
            <p className="text-2xl px-2">
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
                        ? `( + 5 )`
                        : `( - 5 )`
                    : ""}
            </p>
            <p className="text-xs md:text-lg px-2">Correct = Your Rating + 5</p>
            <p className="text-xs md:text-lg px-2">
                Incorrect = Your Rating - 5
            </p>
            {renderedQuestion ? (
                <div className="flex flex-col items-center justify-center">
                    {renderedQuestion}
                </div>
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
