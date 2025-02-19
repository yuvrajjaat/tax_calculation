import React, { useState } from 'react';
import axios from 'axios';

function TaxForm({ onResult }) {
  const [formData, setFormData] = useState({
    annualIncome: '',
    investments: '',
    otherDeductions: '',
    incomeFromOtherSources: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Adjust the URL if your backend is hosted elsewhere.
      const response = await axios.post('http://localhost:5000/api/calculate-tax', formData);
      onResult(response.data);
    } catch (err) {
      setError('Error calculating tax. Please try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700">Annual Income</label>
        <input
          type="number"
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleChange}
          className="mt-1 w-full border rounded p-2"
          placeholder="e.g., 800000"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Investments (80C, 80D, etc.)</label>
        <input
          type="number"
          name="investments"
          value={formData.investments}
          onChange={handleChange}
          className="mt-1 w-full border rounded p-2"
          placeholder="e.g., 150000"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Other Deductions (HRA, LTA, etc.)</label>
        <input
          type="number"
          name="otherDeductions"
          value={formData.otherDeductions}
          onChange={handleChange}
          className="mt-1 w-full border rounded p-2"
          placeholder="e.g., 50000"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Income from Other Sources</label>
        <input
          type="number"
          name="incomeFromOtherSources"
          value={formData.incomeFromOtherSources}
          onChange={handleChange}
          className="mt-1 w-full border rounded p-2"
          placeholder="e.g., 100000"
          required
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Calculate Tax
      </button>
    </form>
  );
}

export default TaxForm;
