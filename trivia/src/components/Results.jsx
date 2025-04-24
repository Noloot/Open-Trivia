import "./Question.css";

export default function ResultSection({ userName, isCorrect, correctAnswer, onRestart }) {
    return (
        <div className="result-section">
        {isCorrect ? (
            <p> Great job, {userName}! You got it right!</p>
        ) : (
            <>
                <p>Sorry, {userName}, that's not correct.</p>
                <p>The correct answer was; <strong dangerouslySetInnerHTML={{ __html: correctAnswer }} /></p>
            </>
        )}

        <button onClick={onRestart}>Try Another Question</button>
        </div>
    )
}
