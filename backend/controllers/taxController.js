// Import the TaxRecord model (if using the database)
const TaxRecord = require('../models/taxRecord');

exports.calculateTax = async (req, res) => {
  try {
    const { annualIncome, investments, otherDeductions, incomeFromOtherSources } = req.body;

    // Validate required fields
    if (
      annualIncome == null ||
      investments == null ||
      otherDeductions == null ||
      incomeFromOtherSources == null
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Convert inputs to numbers
    const income = parseFloat(annualIncome);
    const invest = parseFloat(investments);
    const deductions = parseFloat(otherDeductions);
    const otherIncome = parseFloat(incomeFromOtherSources);

    // Calculate total income and deductions
    const totalIncome = income + otherIncome;
    const totalDeductions = invest + deductions;
    let taxableIncome = totalIncome - totalDeductions;
    if (taxableIncome < 0) taxableIncome = 0;

    // Calculate tax based on slabs for FY 2024-25:
    // - Up to ₹2,50,000: No tax
    // - ₹2,50,001 to ₹5,00,000: 5%
    // - ₹5,00,001 to ₹10,00,000: 20%
    // - Above ₹10,00,000: 30%
    let tax = 0;
    let remainingIncome = taxableIncome;

    // Slab 1: Up to ₹2,50,000 (No tax)
    if (remainingIncome <= 250000) {
      tax = 0;
    } else {
      remainingIncome -= 250000;

      // Slab 2: Next ₹2,50,000 at 5%
      if (remainingIncome <= 250000) {
        tax += remainingIncome * 0.05;
        remainingIncome = 0;
      } else {
        tax += 250000 * 0.05;
        remainingIncome -= 250000;
      }

      // Slab 3: Next ₹5,00,000 at 20%
      if (remainingIncome > 0) {
        if (remainingIncome <= 500000) {
          tax += remainingIncome * 0.20;
          remainingIncome = 0;
        } else {
          tax += 500000 * 0.20;
          remainingIncome -= 500000;
        }
      }

      // Slab 4: Above ₹10,00,000 at 30%
      if (remainingIncome > 0) {
        tax += remainingIncome * 0.30;
      }
    }

    // Add Health & Education Cess of 4%
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    // Optional Tax Savings Suggestions
    let suggestions = [];
    if (totalDeductions < 150000) {
      suggestions.push('Consider investing in tax-saving instruments under Section 80C.');
    }
    if (invest < 25000) {
      suggestions.push('You might consider health insurance for additional tax benefits under Section 80D.');
    }

    const result = {
      totalIncome,
      totalDeductions,
      taxableIncome,
      taxBeforeCess: tax,
      cess,
      totalTax,
      suggestions
    };

    // Optional: Save record to database if TaxRecord model exists
    if (TaxRecord) {
      const record = new TaxRecord({
        annualIncome: income,
        investments: invest,
        otherDeductions: deductions,
        incomeFromOtherSources: otherIncome,
        totalIncome,
        totalDeductions,
        taxableIncome,
        taxBeforeCess: tax,
        cess,
        totalTax,
        suggestions,
        createdAt: new Date()
      });
      await record.save();
    }

    res.json(result);
  } catch (error) {
    console.error('Error in calculateTax:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
