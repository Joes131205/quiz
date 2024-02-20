function Question({ question, correct, incorrect }) {
    const allOptions = [correct, ...incorrect];

    const options = allOptions.map((option, index) => (
        <button key={index}>{option}</button>
    ));

    return (
        <div className="question">
            <h2>{question}</h2>
            <div className="options">{options}</div>
        </div>
    );
}

export default Question;
