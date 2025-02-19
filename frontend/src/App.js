import React, { useState } from 'react';
import TaxForm from './components/TaxForm';
import TaxResult from './components/TaxResult';

function App() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Tax Calculator Portal</h1>
        <TaxForm onResult={handleResult} />
        {result && <TaxResult result={result} />}
      </div>
    </div>
  );
}

export default App;
