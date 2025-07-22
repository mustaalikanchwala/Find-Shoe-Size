import { useState } from 'react';
import Input from './components/Input.jsx';

function App() {
  const [gender, setGender] = useState('');
  const [submittedGender, setSubmittedGender] = useState('');

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    setSubmittedGender(selectedGender.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-cyan-300 p-8 rounded-2xl shadow-lg hover:shadow-lg transition-shadow duration-300 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6 animate-fade-in">
          Find Your Shoe Size?
        </h1>
        <div className="mb-6">
          <p className="text-gray-500 text-lg text-center mb-4">Select Gender</p>
          <div className="flex justify-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={gender === 'Men'}
                onChange={() => handleGenderChange(gender === 'Men' ? '' : 'Men')}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-gray-900">Men</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={gender === 'Women'}
                onChange={() => handleGenderChange(gender === 'Women' ? '' : 'Women')}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-gray-900">Women</span>
            </label>
          </div>
        </div>
        {submittedGender === 'men' && (
          <div className="mt-6 animate-slide-in-up">
            <p className="text-gray-900 text-xl text-center mb-4">Men's Shoe Size</p>
            <Input gender={submittedGender} setGender={setGender} />
          </div>
        )}
        {submittedGender === 'women' && (
          <div className="mt-6 animate-slide-in-up">
            <p className="text-gray-900 text-xl text-center mb-4">Women's Shoe Size</p>
            <Input gender={submittedGender} setGender={setGender} />
          </div>
        )}
        {submittedGender && submittedGender !== 'men' && submittedGender !== 'women' && (
          <div className="mt-6 text-center text-red-500 text-lg animate-shake">
            <p>Please select 'Men' or 'Women'</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;