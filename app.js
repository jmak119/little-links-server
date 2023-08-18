require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");

const studentRoutes = require('./routes/student-routes');
const teacherRoutes = require('./routes/teacher-routes');
const dailyLogRoutes = require('./routes/dailyLog-routes');
const commentsRoutes = require('./routes/comments-routes');

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user-routes');

// Basic home route
app.get('/', (_req, res) => {
    res.send('Welcome!');
});

// User routes
app.use('/users', userRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/dailyLogs', dailyLogRoutes);
app.use('/comments', commentsRoutes);

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
});

