import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);  // Set loading to true when the request starts
    try {
      const result = await axios.post('https://gpt-flask-backend.onrender.com/api/chat', { question });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false);  // Set loading to false after the request finishes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center">Ask GPT</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700 text-lg font-medium">Question:</span>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your question here..."
            />
          </label>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          >
            Submit
          </button>
        </form>
        {loading && (
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        )}
        {response && (
          <div className="bg-indigo-50 p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Response:</h2>
            <p className="text-gray-600 mt-2">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
