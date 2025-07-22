import { useState } from 'react';

function Input({ gender, setGender }) {
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [convertedSizes, setConvertedSizes] = useState(null);

  const handleConvert = () => {
    const inputSize = parseFloat(size);
    if (isNaN(inputSize)) {
      setConvertedSizes({ error: 'Please enter a valid numeric size' });
      return;
    }

    const inputType = type.toLowerCase();
    const inputGender = gender.toLowerCase();
    if (inputGender !== 'men' && inputGender !== 'women') {
      setConvertedSizes({ error: "Invalid gender provided" });
      return;
    }

    let usSize, euSize, ukSize, footLength;

    if (inputGender === 'men') {
      if (inputType === 'foot length') {
        ukSize = (inputSize - 23) / 0.667; // Men: Foot Length to UK
        usSize = ukSize + 1; // Men's UK to US
        euSize = ukSize + 33; // Men's UK to EU
        footLength = inputSize;
      } else if (inputType === 'uk') {
        ukSize = inputSize;
        usSize = inputSize + 1; // Men's UK to US
        euSize = inputSize + 33; // Men's UK to EU
        footLength = (inputSize * 0.667) + 23; // Men's UK to Foot Length
      } else if (inputType === 'us') {
        usSize = inputSize;
        ukSize = inputSize - 1; // Men's US to UK
        euSize = ukSize + 33; // Convert to UK first, then to EU
        footLength = (inputSize * 0.667) + 22; // Men's US to Foot Length
      } else if (inputType === 'eu') {
        euSize = inputSize;
        ukSize = inputSize - 33; // Men's EU to UK
        usSize = ukSize + 1; // Convert to UK first, then to US
        footLength = inputSize / 1.5; // EU to Foot Length
      } else {
        setConvertedSizes({ error: "Please enter 'US', 'EU', 'UK', or 'Foot Length' as the type" });
        return;
      }
    } else if (inputGender === 'women') {
      if (inputType === 'foot length') {
        ukSize = (inputSize - 21.5) / 0.667; // Women: Foot Length to UK
        usSize = ukSize + 2; // Women's UK to US
        euSize = ukSize + 33.5; // Women's UK to EU
        footLength = inputSize;
      } else if (inputType === 'uk') {
        ukSize = inputSize;
        usSize = inputSize + 2; // Women's UK to US
        euSize = inputSize + 33.5; // Women's UK to EU
        footLength = (inputSize * 0.667) + 21.5; // Women's UK to Foot Length
      } else if (inputType === 'us') {
        usSize = inputSize;
        ukSize = inputSize - 2; // Women's US to UK
        euSize = ukSize + 33.5; // Convert to UK first, then to EU
        footLength = (inputSize * 0.667) + 20.5; // Women's US to Foot Length
      } else if (inputType === 'eu') {
        euSize = inputSize;
        ukSize = inputSize - 33.5; // Women's EU to UK
        usSize = ukSize + 2; // Convert to UK first, then to US
        footLength = inputSize / 1.5; // EU to Foot Length
      } else {
        setConvertedSizes({ error: "Please enter 'US', 'EU', 'UK', or 'Foot Length' as the type" });
        return;
      }
    }

    setConvertedSizes({
      us: Math.round(usSize * 10) / 10,
      eu: Math.round(euSize * 2) / 2,
      uk: Math.round(ukSize * 10) / 10,
      footLength: Math.round(footLength * 10) / 10,
      inputType,
      inputGender,
      inputSize
    });

    setType('');
    setSize('');
    setGender('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-4 w-full">
        <input
          type="text"
          list="sizeTypes"
          placeholder="Enter Type (US/EU/UK/Foot Length)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          onKeyDown={handleKeyDown}
          required
          className="w-full bg-white border-2 border-gray-300 text-gray-900 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-opacity duration-300"
        />
        <datalist id="sizeTypes">
          <option value="US" />
          <option value="EU" />
          <option value="UK" />
          <option value="Foot Length" />
        </datalist>
      </div>
      <div className="mt-4 w-full">
        <input
          type="number"
          placeholder="Enter Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          onKeyDown={handleKeyDown}
          required
          step="0.1"
          className="w-full bg-white border-2 border-gray-300 text-gray-900 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-opacity duration-300"
        />
      </div>
      <div className="mt-4 w-full">
        <button
          onClick={handleConvert}
          className="w-full bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-sky-400 hover:scale-105 transition-transform duration-200"
        >
          Convert
        </button>
      </div>
      {convertedSizes && convertedSizes.error && (
        <div className="mt-4 text-center text-red-500 text-lg animate-shake">
          <p>{convertedSizes.error}</p>
        </div>
      )}
      {convertedSizes && !convertedSizes.error && (
        <div className="mt-4 w-full animate-slide-in-up">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="border border-gray-300 p-2">Size Type</th>
                <th className="border border-gray-300 p-2">Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border border-gray-300 p-2 text-gray-900">Foot Length (cm)</td>
                <td className="border border-gray-300 p-2 text-gray-900">{convertedSizes.footLength}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-2 text-gray-900">US</td>
                <td className="border border-gray-300 p-2 text-gray-900">{convertedSizes.us}</td>
              </tr>
              <tr className="bg-white">
                <td className="border border-gray-300 p-2 text-gray-900">EU</td>
                <td className="border border-gray-300 p-2 text-gray-900">{convertedSizes.eu}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-300 p-2 text-gray-900">UK</td>
                <td className="border border-gray-300 p-2 text-gray-900">{convertedSizes.uk}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Input;