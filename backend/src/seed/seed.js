require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const env = require('../config/env');
const Admin = require('../models/Admin');

const SEED_ADMIN = {
  username: 'RenewCred Admin',
  email: 'admin@renewcred.com',
  password: 'Admin@123',
};

async function seed() {
  await mongoose.connect(env.mongoUri);

  const passwordHash = await bcrypt.hash(SEED_ADMIN.password, 10);
  await Admin.findOneAndUpdate(
    { email: SEED_ADMIN.email },
    { username: SEED_ADMIN.username, email: SEED_ADMIN.email, passwordHash },
    { upsert: true, returnDocument: 'after' },
  );

  console.log('Seeded admin user:');
  console.log(`  email:    ${SEED_ADMIN.email}`);
  console.log(`  password: ${SEED_ADMIN.password}`);

  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[seed] failed:', err);
    process.exit(1);
  });
