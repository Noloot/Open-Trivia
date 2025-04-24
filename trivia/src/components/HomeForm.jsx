import { useState } from "react";
import "./Question.css";

export default function HomeForm({ onStartQuiz }) {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        difficulty: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, category, difficulty } = formData;
        if (!name || !category || !difficulty) {
            setError('Please fill out all fields before continuing.');
            return;
        }

        setError('');
        onStartQuiz(formData);
    };

    return(
        <div className="home-form">
            <h1>Trivia Challenge</h1>
            <p>Welcome! Test your knowledge across different topics and difficulties.</p>
            <p>Please enter your name, choose a category and difficulty, and hit Start to begin.</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">First Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label htmlFor="category">Category:</label>
                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}>
                            <option value="">-- Select --</option>
                            <option value="9">General Knowledge</option>
                            <option value="17">Science & Nature</option>
                            <option value="23">History</option>
                            <option value="21">Sports</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="difficulty">Difficulty:</label>
                    <select 
                        name="difficulty" 
                        value={formData.difficulty} 
                        onChange={handleChange}>
                            <option value="">-- Select --</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                    </select>
                </div>

                {error && <p style={{color: "red"}}>{error}</p>}

                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );

}