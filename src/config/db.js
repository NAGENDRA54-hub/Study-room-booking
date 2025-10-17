const mongoose = require('mongoose');
const Room = require('../models/Room');

async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/study_room_booking';
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, { autoIndex: true });
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB');
  await seedDefaultRooms();
}

async function seedDefaultRooms() {
  const existingCount = await Room.countDocuments();
  if (existingCount > 0) return;

  const defaultRooms = [
    { roomName: 'Room A', capacity: 4, location: 'First Floor' },
    { roomName: 'Room B', capacity: 6, location: 'First Floor' },
    { roomName: 'Room C', capacity: 8, location: 'Second Floor' },
    { roomName: 'Room D', capacity: 10, location: 'Second Floor' }
  ];

  try {
    await Room.insertMany(defaultRooms);
    // eslint-disable-next-line no-console
    console.log('Seeded default rooms');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to seed default rooms', err);
  }
}

module.exports = { connectToDatabase };


