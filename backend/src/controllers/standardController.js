const Standard = require('../models/Standard');
const StandardVersion = require('../models/StandardVersion');
const Feedback = require('../models/Feedback');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const PUBLIC_STATUSES = ['certified', 'public_consultation'];

async function findStandardBySlug(slug) {
  const standard = await Standard.findOne({ slug });
  if (!standard) throw new ApiError(404, `Standard not found: ${slug}`);
  return standard;
}

function pickDefaultVersion(versions) {
  const certified = versions
    .filter((v) => v.status === 'certified')
    .sort((a, b) => new Date(b.certifiedDate || b.createdAt) - new Date(a.certifiedDate || a.createdAt));
  if (certified[0]) return certified[0];

  const consultation = versions
    .filter((v) => v.status === 'public_consultation')
    .sort((a, b) => new Date(b.consultationStart || b.createdAt) - new Date(a.consultationStart || a.createdAt));
  return consultation[0] || null;
}

// --- Public ---

const listStandardsPublic = asyncHandler(async (req, res) => {
  const standards = await Standard.find().sort({ order: 1, createdAt: 1 });
  return ApiResponse(res, 200, { standards });
});

const getStandardPublic = asyncHandler(async (req, res) => {
  const standard = await findStandardBySlug(req.params.slug);
  const versions = await StandardVersion.find({
    standard: standard._id,
    status: { $in: PUBLIC_STATUSES },
  })
    .select('-sections')
    .sort({ createdAt: -1 });

  const defaultVersion = pickDefaultVersion(versions);

  return ApiResponse(res, 200, {
    standard,
    versions,
    defaultVersionId: defaultVersion?._id || null,
  });
});

const getVersionPublic = asyncHandler(async (req, res) => {
  const standard = await findStandardBySlug(req.params.slug);
  const version = await StandardVersion.findOne({
    _id: req.params.versionId,
    standard: standard._id,
  });

  if (!version || !PUBLIC_STATUSES.includes(version.status)) {
    throw new ApiError(404, 'Version not found');
  }

  return ApiResponse(res, 200, { standard, version });
});

const getVersionFeedbackPublic = asyncHandler(async (req, res) => {
  const standard = await findStandardBySlug(req.params.slug);
  const version = await StandardVersion.findOne({
    _id: req.params.versionId,
    standard: standard._id,
  });

  if (!version || !PUBLIC_STATUSES.includes(version.status)) {
    throw new ApiError(404, 'Version not found');
  }

  const feedback = (await Feedback.findOne({ version: version._id })) || {
    averageScore: 0,
    totalResponses: 0,
    comments: [],
  };

  return ApiResponse(res, 200, { feedback });
});

// --- Admin ---

const listStandardsAdmin = asyncHandler(async (req, res) => {
  const standards = await Standard.find().sort({ order: 1, createdAt: 1 });
  const versionCounts = await StandardVersion.aggregate([
    { $group: { _id: '$standard', count: { $sum: 1 } } },
  ]);
  const countMap = new Map(versionCounts.map((v) => [String(v._id), v.count]));

  const withCounts = standards.map((s) => ({
    ...s.toObject(),
    versionCount: countMap.get(String(s._id)) || 0,
  }));

  return ApiResponse(res, 200, { standards: withCounts });
});

const createStandard = asyncHandler(async (req, res) => {
  const standard = await Standard.create(req.body);
  return ApiResponse(res, 201, { standard }, 'Standard created');
});

const updateStandard = asyncHandler(async (req, res) => {
  const standard = await Standard.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });
  if (!standard) throw new ApiError(404, 'Standard not found');
  return ApiResponse(res, 200, { standard }, 'Standard updated');
});

const deleteStandard = asyncHandler(async (req, res) => {
  const standard = await Standard.findById(req.params.id);
  if (!standard) throw new ApiError(404, 'Standard not found');

  const versions = await StandardVersion.find({ standard: standard._id }).select('_id');
  const versionIds = versions.map((v) => v._id);

  await Feedback.deleteMany({ version: { $in: versionIds } });
  await StandardVersion.deleteMany({ standard: standard._id });
  await standard.deleteOne();

  return ApiResponse(res, 200, null, 'Standard deleted');
});

const getAdminStats = asyncHandler(async (req, res) => {
  const totalStandards = await Standard.countDocuments();
  const statusCounts = await StandardVersion.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  const countMap = Object.fromEntries(statusCounts.map((s) => [s._id, s.count]));

  return ApiResponse(res, 200, {
    totalStandards,
    certified: countMap.certified || 0,
    publicConsultation: countMap.public_consultation || 0,
    draft: countMap.draft || 0,
  });
});

module.exports = {
  listStandardsPublic,
  getStandardPublic,
  getVersionPublic,
  getVersionFeedbackPublic,
  listStandardsAdmin,
  createStandard,
  updateStandard,
  deleteStandard,
  getAdminStats,
};
