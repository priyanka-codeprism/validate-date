const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getSpecificPastDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
}

function isValidDate(dateString) {
  // Check format: DD/MM/YYYY
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) return false;
  const [day, month, year] = dateString.split('/').map(Number);

  const date = new Date(`${year}-${month}-${day}`);
  return (
    date instanceof Date &&
    !isNaN(date) &&
    date.getDate() === day &&
    date.getMonth() + 1 === month &&
    date.getFullYear() === year
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

// Get today's date
app.get('/today', (req, res) => {
  res.json({ date: getSpecificPastDate(0) });
});

// Get yesterday's date
app.get('/yesterday', (req, res) => {
  res.json({ date: getSpecificPastDate(1) });
});

// Get 2 days ago date
app.get('/last-two-days', (req, res) => {
  res.json({ date: getSpecificPastDate(2) });
});

// Get 3 days ago date
app.get('/last-three-days', (req, res) => {
  res.json({ date: getSpecificPastDate(3) });
});
// Get 4 days ago date
app.get('/last-four-days', (req, res) => {
  res.json({ date: getSpecificPastDate(4) });
});

// Get 5 days ago date
app.get('/last-five-days', (req, res) => {
  res.json({ date: getSpecificPastDate(5) });
});

// Get 6 days ago date
app.get('/last-six-days', (req, res) => {
  res.json({ date: getSpecificPastDate(6) });
});

// Get 7 days ago date
app.get('/last-seven-days', (req, res) => {
  res.json({ date: getSpecificPastDate(7) });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
