import { Agenda } from 'agenda';
try {
  const agenda = new Agenda({
    db: {
      address: 'mongodb+srv://danielyoneshigejunior_db_user:njDIN5WqdrjqyyAX@beautyhub.av4zy6d.mongodb.net/',
      collection: 'agendaJobs'
    }
  });
  console.log("Success!");
} catch (e) {
  console.log("Error:", e.message, e.stack);
}
