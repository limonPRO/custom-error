const express = require('express');

// Custom Error class
class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

// Express app
const app = express();

// Example route handler

app.get('/',(req,res,next)=>{
    res.send("working")
})

app.get('/api/user/:id', (req, res, next) => {
  const userId = req.params.id;

  // Simulating an error condition
  if (userId !== '123') {
    const error = new CustomError(404, 'User not found');
    return next(error);
  }

  // Successful response
  res.json({ userId, username: 'Limon Shah' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
