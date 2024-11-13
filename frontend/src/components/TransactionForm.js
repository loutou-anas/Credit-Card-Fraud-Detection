import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm() {
  const initialState = {
    V1: '',
    V2: '',
    V3: '',
    V4: '',
    V5: '',
    V6: '',
    V7: '',
    V8: '',
    V9: '',
    V10: '',
    V11: '',
    V12: '',
    V13: '',
    V14: '',
    V15: '',
    V16: '',
    V17: '',
    V18: '',
    V19: '',
    V20: '',
    V21: '',
    V22: '',
    V23: '',
    V24: '',
    V25: '',
    V26: '',
    V27: '',
    V28: '',
    Amount: '',
  };

  const [transaction, setTransaction] = useState(initialState);
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/predict/', transaction)
      .then((res) => {
        setResult(res.data.prediction);
      })
      .catch((err) => {
        console.error(err);
        setResult('Error occurred');
      });
  };

  return (
    <div>
      <h2>Credit Card Fraud Detection</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(initialState).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="number"
              name={key}
              value={transaction[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {result && <h3>Result: {result}</h3>}
    </div>
  );
}

export default TransactionForm;
