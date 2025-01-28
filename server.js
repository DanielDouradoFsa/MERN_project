import express from 'express';
import connectDB from './config/db.js';

const app = express();

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (_, res) => res.send('API Running'));


//Define routes
import usersRoute from './routes/api/users.js';
import authRoute from './routes/api/auth.js';
import profileRoute from './routes/api/profile.js';
import postsRoute from './routes/api/posts.js';


app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  