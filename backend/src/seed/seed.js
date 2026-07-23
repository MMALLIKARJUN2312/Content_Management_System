require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const env = require('../config/env');
const Admin = require('../models/Admin');
const Standard = require('../models/Standard');
const StandardVersion = require('../models/StandardVersion');
const Feedback = require('../models/Feedback');

const SEED_ADMIN = {
  username: 'RenewCred Admin',
  email: 'admin@renewcred.com',
  password: 'Admin@123',
};

const paragraph = (text, order) => ({ type: 'paragraph', order, data: { text } });
const list = (items, order) => ({ type: 'list', order, data: { items } });

const EV_SECTIONS = [
  {
    numbering: [1],
    title: 'Introduction',
    blocks: [
      paragraph(
        'This standard defines the eligibility, monitoring, and verification requirements for electric vehicle (EV) climate credits issued through RenewCred.',
        0,
      ),
    ],
  },
  {
    numbering: [2],
    title: 'Eligibility Criteria',
    blocks: [paragraph('Vehicles must meet the following criteria to qualify for credit issuance.', 0)],
  },
  {
    numbering: [2, 1],
    title: 'Vehicle Requirements',
    blocks: [
      list(
        ['Battery electric or plug-in hybrid drivetrain', 'Registered for on-road use', 'Odometer-verified usage data'],
        0,
      ),
    ],
  },
  {
    numbering: [2, 1, 1],
    title: 'Battery Specifications',
    blocks: [paragraph('Minimum usable battery capacity of 20 kWh, verified against manufacturer specifications.', 0)],
  },
  {
    numbering: [2, 1, 2],
    title: 'Emissions Baseline',
    blocks: [
      {
        type: 'equation',
        order: 0,
        data: { equation: 'C_{avoided} = (E_{grid} - E_{ev}) \\times d', displayMode: true },
      },
    ],
  },
  {
    numbering: [2, 2],
    title: 'Monitoring Requirements',
    blocks: [paragraph('Telematics data must be reported at least quarterly for the credit period.', 0)],
  },
  {
    numbering: [3],
    title: 'Verification Process',
    blocks: [paragraph('Independent verification bodies audit submitted data before certification.', 0)],
  },
  {
    numbering: [3, 1],
    title: 'Data Collection',
    blocks: [
      {
        type: 'table',
        order: 0,
        data: {
          headers: ['Metric', 'Frequency', 'Source'],
          rows: [
            ['Distance travelled', 'Monthly', 'Telematics'],
            ['Grid emissions factor', 'Annual', 'National grid registry'],
          ],
        },
      },
    ],
  },
  {
    numbering: [3, 1, 1],
    title: 'Telematics Standards',
    blocks: [paragraph('Devices must comply with ISO 15118 for data reporting integrity.', 0)],
  },
  {
    numbering: [3, 1, 2],
    title: 'Third-Party Audits',
    blocks: [paragraph('At least one on-site audit is required per certification cycle.', 0)],
  },
  {
    numbering: [3, 2],
    title: 'Reporting Cadence',
    blocks: [paragraph('Verification reports are published quarterly on the public registry.', 0)],
  },
];

const SIMPLE_SECTIONS = (topic) => [
  {
    numbering: [1],
    title: 'Introduction',
    blocks: [paragraph(`This standard defines the requirements for ${topic} climate credits issued through RenewCred.`, 0)],
  },
  {
    numbering: [2],
    title: 'Methodology',
    blocks: [paragraph(`Credit volumes are calculated using the approved ${topic} baseline methodology.`, 0)],
  },
  {
    numbering: [3],
    title: 'Verification',
    blocks: [paragraph('Independent verification bodies audit submitted data before certification.', 0)],
  },
];

const STANDARDS = [
  {
    slug: 'ev',
    title: 'EV',
    icon: 'Zap',
    summary: 'Standard for electric vehicle climate credit eligibility, monitoring, and verification.',
    order: 0,
    sections: EV_SECTIONS,
  },
  {
    slug: 'biochar',
    title: 'Biochar',
    icon: 'Flame',
    summary: 'Standard for biochar-based carbon sequestration credit eligibility and verification.',
    order: 1,
    sections: SIMPLE_SECTIONS('biochar carbon sequestration'),
  },
  {
    slug: 'methane',
    title: 'Methane',
    icon: 'Wind',
    summary: 'Standard for methane capture and avoidance climate credit eligibility.',
    order: 2,
    sections: SIMPLE_SECTIONS('methane capture and avoidance'),
  },
  {
    slug: 'renewable-energy',
    title: 'Renewable Energy',
    icon: 'Sun',
    summary: 'Standard for renewable energy generation climate credit eligibility.',
    order: 3,
    sections: SIMPLE_SECTIONS('renewable energy generation'),
  },
];

async function seed() {
  await mongoose.connect(env.mongoUri);

  const passwordHash = await bcrypt.hash(SEED_ADMIN.password, 10);
  await Admin.findOneAndUpdate(
    { email: SEED_ADMIN.email },
    { username: SEED_ADMIN.username, email: SEED_ADMIN.email, passwordHash },
    { upsert: true, returnDocument: 'after' },
  );

  for (const def of STANDARDS) {
    const standard = await Standard.findOneAndUpdate(
      { slug: def.slug },
      { slug: def.slug, title: def.title, icon: def.icon, summary: def.summary, order: def.order },
      { upsert: true, returnDocument: 'after' },
    );

    const certified = await StandardVersion.findOneAndUpdate(
      { standard: standard._id, versionNumber: 'v1.0.0' },
      {
        standard: standard._id,
        versionNumber: 'v1.0.0',
        status: 'certified',
        certifiedDate: new Date('2026-07-12'),
        sections: def.sections,
      },
      { upsert: true, returnDocument: 'after' },
    );

    if (def.slug === 'ev') {
      const consultation = await StandardVersion.findOneAndUpdate(
        { standard: standard._id, versionNumber: 'v1.1.0' },
        {
          standard: standard._id,
          versionNumber: 'v1.1.0',
          status: 'public_consultation',
          consultationStart: new Date('2026-05-15'),
          consultationEnd: new Date('2026-07-12'),
          sections: def.sections,
        },
        { upsert: true, returnDocument: 'after' },
      );

      await Feedback.findOneAndUpdate(
        { version: consultation._id },
        {
          version: consultation._id,
          averageScore: 4.2,
          totalResponses: 18,
          comments: [
            { author: 'Anonymous reviewer', comment: 'Battery capacity threshold seems reasonable.', score: 5 },
            { author: 'Anonymous reviewer', comment: 'Would like clearer guidance on telematics device certification.', score: 4 },
          ],
        },
        { upsert: true, returnDocument: 'after' },
      );
    }

    void certified;
  }

  console.log('Seeded admin user:');
  console.log(`  email:    ${SEED_ADMIN.email}`);
  console.log(`  password: ${SEED_ADMIN.password}`);
  console.log(`Seeded ${STANDARDS.length} standards with certified v1.0.0 versions.`);

  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[seed] failed:', err);
    process.exit(1);
  });
