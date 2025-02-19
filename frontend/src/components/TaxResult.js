import React from 'react';

function TaxResult({ result }) {
  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Tax Calculation Result</h2>
      <p><strong>Total Income:</strong> ₹{result.totalIncome.toFixed(2)}</p>
      <p><strong>Total Deductions:</strong> ₹{result.totalDeductions.toFixed(2)}</p>
      <p><strong>Taxable Income:</strong> ₹{result.taxableIncome.toFixed(2)}</p>
      <p><strong>Tax Before Cess:</strong> ₹{result.taxBeforeCess.toFixed(2)}</p>
      <p><strong>Health & Education Cess (4%):</strong> ₹{result.cess.toFixed(2)}</p>
      <p className="mt-2 font-bold"><strong>Total Tax Payable:</strong> ₹{result.totalTax.toFixed(2)}</p>
      {result.suggestions && result.suggestions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Tax Savings Suggestions:</h3>
          <ul className="list-disc list-inside">
            {result.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TaxResult;
