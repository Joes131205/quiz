import { useEffect, useState } from "react";
import Question from "./Question.jsx";

const APIUrl = "https://opentdb.com/api.php?amount=1&category=18&type=multiple";

function Quiz() {
    const [questions, setQuestions] = useState({});
    const [rating, setRating] = useState(1000);
    const [timeLeft, setTimeLeft] = useState(30);
    const [renderedQuestion, setRenderedQuestion] = useState(null);

    async function getQuestion() {
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
    }

    useEffect(() => {
        getQuestion();
    }, []);

    useEffect(() => {
        if (questions.question) {
            setRenderedQuestion(
                <Question
                    key={1}
                    question={questions.question}
                    correct={questions.correct}
                    incorrect={questions.incorrect}
                />
            );
        }
    }, [questions]);

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

    function nextQuestion() {
        getQuestion();
    }

    return (
        <div>
            <p>Rating: {rating}</p>
            {renderedQuestion ? (
                <div>
                    <p>Question:</p>
                    {renderedQuestion}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Quiz;
