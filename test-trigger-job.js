import { getAgenda } from './server/utils/agenda.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

// Mongoose already connecting is not strictly required since we pass mongoUri
// but getAgenda reads from useRuntimeConfig, so we must mock it or use Agenda directly
