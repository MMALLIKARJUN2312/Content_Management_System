const Standard = require('../models/Standard');
const StandardVersion = require('../models/StandardVersion');
const Feedback = require('../models/Feedback');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const listVersionsAdmin = asyncHandler(async (req, res) => {
  const standard = await Standard.findById(req.params.id);
  if (!standard) throw new ApiError(404, 'Standard not found');

  const versions = await StandardVersion.find({ standard: standard._id })
    .select('-sections')
    .sort({ createdAt: -1 });

  return ApiResponse(res, 200, { standard, versions });
});

const createVersion = asyncHandler(async (req, res) => {
  const standard = await Standard.findById(req.params.id);
  if (!standard) throw new ApiError(404, 'Standard not found');

  const version = await StandardVersion.create({
    standard: standard._id,
    versionNumber: req.body.versionNumber,
    status: 'draft',
    sections: [],
  });

  return ApiResponse(res, 201, { version }, 'Version created');
});

const getVersionAdmin = asyncHandler(async (req, res) => {
  const version = await StandardVersion.findById(req.params.versionId).populate(
    'standard',
    'slug title',
  );
  if (!version) throw new ApiError(404, 'Version not found');
  return ApiResponse(res, 200, { version });
});

const updateSections = asyncHandler(async (req, res) => {
  const version = await StandardVersion.findByIdAndUpdate(
    req.params.versionId,
    { sections: req.body.sections },
    { returnDocument: 'after', runValidators: true },
  );
  if (!version) throw new ApiError(404, 'Version not found');
  return ApiResponse(res, 200, { version }, 'Sections saved');
});

const transitionVersion = asyncHandler(async (req, res) => {
  const version = await StandardVersion.findById(req.params.versionId);
  if (!version) throw new ApiError(404, 'Version not found');

  const { status, consultationStart, consultationEnd, certifiedDate } = req.body;

  version.status = status;
  if (status === 'public_consultation') {
    version.consultationStart = consultationStart ? new Date(consultationStart) : new Date();
    version.consultationEnd = consultationEnd ? new Date(consultationEnd) : undefined;
  }
  if (status === 'certified') {
    version.certifiedDate = certifiedDate ? new Date(certifiedDate) : new Date();
  }

  await version.save();
  return ApiResponse(res, 200, { version }, 'Version status updated');
});

const deleteVersion = asyncHandler(async (req, res) => {
  const version = await StandardVersion.findById(req.params.versionId);
  if (!version) throw new ApiError(404, 'Version not found');

  await Feedback.deleteOne({ version: version._id });
  await version.deleteOne();

  return ApiResponse(res, 200, null, 'Version deleted');
});

module.exports = {
  listVersionsAdmin,
  createVersion,
  getVersionAdmin,
  updateSections,
  transitionVersion,
  deleteVersion,
};
