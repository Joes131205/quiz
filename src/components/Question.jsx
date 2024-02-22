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
            className="px-6 py-3 bg-fern_green-500 hover:bg-fern_green-600 disabled:bg-fern_green-900 disabled:text-fern_green-900 transition-colors rounded-xl "
            disabled={disabled}
        >
            {decode(option)}
        </button>
    ));
    return (
        <div className="gap-10 flex flex-col items-center justify-center bg-fern_green-800 w-[90%] py-10 md:h-auto md:w-auto md:px-10 md:py-10 rounded-2xl font-bold">
            <h2>{decode(question)}</h2>
            <div className="options flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center">
                {options}
            </div>
        </div>
    );
}

export default Question;
