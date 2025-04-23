const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function isValidDate(dateString) {
  // Check format: DD/MM/YYYY
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return (
    date instanceof Date &&
    !isNaN(date) &&
    date.toISOString().slice(0, 10) === dateString
  );
}

app.post('/validate-date', (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ error: 'Date is required in the request body.' });
  }

  const valid = isValidDate(date);
  res.json({ date, valid });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
