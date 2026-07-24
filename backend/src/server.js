const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const env = require('./config/env');
const connectDB = require('./config/db');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: env.corsOrigins.length ? env.corsOrigins : true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
if (env.nodeEnv !== 'test') {
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
}

app.get('/', (req, res) => {
  res.json({ success: true, message: 'RenewCred CMS API', data: { docs: '/api/v1/health' } });
});

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`[server] listening on port ${env.port}`);
  });
}

start().catch((err) => {
  console.error('[server] failed to start:', err);
  process.exit(1);
});

// A crashed process serves nobody — log with full context and exit so the
// process manager (Docker/PM2/etc.) can restart into a clean state, rather
// than continuing to run with potentially corrupted in-memory state.
process.on('unhandledRejection', (reason) => {
  console.error('[server] unhandled promise rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('[server] uncaught exception:', err);
  process.exit(1);
});

module.exports = app;
