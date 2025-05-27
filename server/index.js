import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'
import { authRouter } from './routes/router.js';
import { errorHandler} from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', authRouter);
app.use(errorHandler)



app.listen(PORT, async () => {

  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

export default app;