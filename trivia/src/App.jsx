import { useEffect, useState } from 'react'
import HomeForm from './components/HomeForm'
import QuestionForm from './components/QuestionForm'
import ResultSection from './components/Results';


export default function App() {
  const [formData, setFormData] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      try{
        const res = await fetch('https://opentdb.com/api_token.php?command=request');
        const data = await res.json();
        if (data.token) {
          setToken(data.token);
        }
      }catch (err) {
        console.error("Error fetching token:", err);
      }
    };

    getToken();
  }, []);

  const fetchQuestion = async (userData) => {
    const { category, difficulty } = userData;
    const url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple&token=${token}`;

    try{
      const res = await fetch(url);
      const data = await res.json();

      if (data.response_code === 0 && data.results.length > 0) {
        setQuestionData(data.results[0]);
        setError('');
      } else if (data.response_code === 4) {
        await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`);
        fetchQuestion(userData);
      } else {
        setError('No question found. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('something went wrong fetching the question.');
    }
  };

  const handleStart = (userData) => {
    setFormData(userData);
    fetchQuestion(userData);
  };

  const handleSubmitAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === questionData.correct_answer);
  };

  const handleRestart = () => {
    setFormData(null);
    setQuestionData(null);
    setSelectedAnswer('');
    setIsCorrect(null);
    setError('');
  };


  console.log('formData:', formData);
  console.log('questionData:', questionData);
  console.log('isCorrect', isCorrect);
  return (
    <>
      <div className='App'>
        {formData === null && (
          <HomeForm onStartQuiz={handleStart} />
        )}

        {formData && questionData && isCorrect === null && (
          <QuestionForm
            userData={formData}
            questionData={questionData}
            onAnswerSubmit={handleSubmitAnswer}
          />
        )}

        {isCorrect !== null && (
          <ResultSection
            userName={formData.name}
            isCorrect={isCorrect}
            correctAnswer={questionData.correct_answer}
            onRestart={handleRestart} 
          />
        )}

        {error && <p className='error'>{error}</p>}
      </div>
    </>
  );
}
