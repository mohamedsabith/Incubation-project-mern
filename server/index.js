import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express()

import api from './routes/api.js'

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(helmet())
app.use(cors())

app.use('/api',api);

const PORT = process.env.PORT || 5000

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((_) => {
    app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
