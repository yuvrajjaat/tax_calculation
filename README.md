# 🏦 Simple Tax Calculation Portal  

A simple web-based tax calculator for estimating tax liabilities based on Indian Income Tax laws for FY 2024-25. Users can input their annual income, investments, and deductions, and the system will calculate their taxable income and payable tax.

## 🚀 Features  
✅ User-friendly interface built with **React.js + Tailwind CSS**  
✅ Backend API developed using **Node.js + Express.js**  
✅ Calculates tax liability based on **Indian tax slabs (FY 2024-25)**  
✅ Provides **tax-saving suggestions (bonus feature)**  
✅ **MongoDB Integration** (Optional) for storing user records  
✅ **Deployed on Netlify/Vercel (Frontend) & Render/Railway (Backend)**  

---

## 🏗️ Project Directory Structure  


---

## 🎨 UI Screenshots  
![Home Page]![image](https://github.com/user-attachments/assets/aac10f48-3fd3-4d22-ab6a-c02d15e5946e)

![Tax Calculation]![image](https://github.com/user-attachments/assets/a6c13a19-d41e-432b-ad4c-5dccf1dab232)
 


---

## ⚙️ Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-username/tax-calculator-portal.git
cd tax-calculator-portal
```
### **2️⃣ Frontend Setup** 
```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```
### **3️⃣ Backend Setup** 
```bash
cd backend
npm install
node server.js  # Runs on http://localhost:5000
```
### **4️⃣ MongoDB Setup** 
If using MongoDB, create a .env file in the backend directory and add:
```bash
MONGO_URI=your-mongodb-connection-string
PORT=5000
```
Run:
```bash
node server.js
```
