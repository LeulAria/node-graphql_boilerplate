import { config } from 'dotenv'

const { parsed } = config();

export const {
  DB,
  PORT,
  MODE,
  IN_PROD = MODE === 'prod'
} = parsed;