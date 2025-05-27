import 'dotenv/config';

const client = process.env.CLIENT

export const corsOptions = {
  origin:[`${client}`],
  methods: ['GET', 'PATCH'],
  credentials: true
}