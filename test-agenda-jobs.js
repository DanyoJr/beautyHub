import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.NUXT_MONGO_URI;

mongoose.connect(uri).then(async () => {
  const jobs = await mongoose.connection.db.collection('agendaJobs').find({}).toArray();
  console.log("Total jobs:", jobs.length);
  jobs.forEach(j => {
    console.log("Job:", j.name, "Next Run At:", j.nextRunAt, "FailedAt:", j.failedAt, "FailReason:", j.failReason);
  });
  process.exit(0);
});
