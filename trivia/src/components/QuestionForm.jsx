import { useState } from "react";
import "./Question.css";



export default function QuestionForm({ userData, questionData, onAnswerSubmit }) {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');
    

    if (!questionData) return <p>Loading question...</p>;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!selectedAnswer) {
            setError("Please select an answer before submitting.");
            return;
        }

        setError('');
        onAnswerSubmit(selectedAnswer);
    };

    return (
        <div className="question-form">
            <h2>hey {userData.name}, here's your question:</h2>
            <p dangerouslySetInnerHTML={{__html: questionData.question}} />
            
            <form onSubmit={handleSubmit}>
                {questionData.incorrect_answers.concat(questionData.correct_answer)
                .sort(() => Math.random() - 0.5)
                .map((answer, index) => (
                    <div key={index}>
                            <input 
                                type="radio"
                                id={`answer-${index}`}
                                name="answer"
                                value={answer}
                                checked={selectedAnswer === answer}
                                onChange={(e) => setSelectedAnswer(e.target.value)} 
                            />
                            <label htmlFor={`answer-${index}`}>
                                <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                            </label>
                    </div>
                ))}

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button type="submit">Submit Answer</button>
            </form>
        </div>
    )
}