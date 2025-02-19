const mongoose = require('mongoose');

const TaxRecordSchema = new mongoose.Schema({
  annualIncome: { type: Number, required: true },
  investments: { type: Number, required: true },
  otherDeductions: { type: Number, required: true },
  incomeFromOtherSources: { type: Number, required: true },
  totalIncome: { type: Number, required: true },
  totalDeductions: { type: Number, required: true },
  taxableIncome: { type: Number, required: true },
  taxBeforeCess: { type: Number, required: true },
  cess: { type: Number, required: true },
  totalTax: { type: Number, required: true },
  suggestions: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TaxRecord', TaxRecordSchema);
