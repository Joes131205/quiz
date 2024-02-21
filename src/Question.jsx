import { decode } from "html-entities";

function Question({
    key,
    question,
    correct,
    incorrect,
    handleAnswer,
    disabled,
}) {
    const allOptions = [correct, ...incorrect];
    const options = allOptions.map((option, index) => (
        <button
            key={index}
            onClick={() => handleAnswer(option === correct)}
            className="px-6 py-3 bg-fern_green-500 hover:bg-fern_green-600 disabled:bg-fern_green-800 transition-colors rounded-xl"
            disabled={disabled}
        >
            {decode(option)}
        </button>
    ));
    return (
        <div className="gap-10 flex flex-col">
            <h2>{decode(question)}</h2>
            <div className="options flex gap-20">{options}</div>
        </div>
    );
}

export default Question;
