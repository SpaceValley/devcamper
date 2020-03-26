const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middleware/async');
const errors = require('../errors');
const geocoder = require('../utils/geocoder');

//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
 });

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) return next(errors.BOOTCAMP_NOT_FOUND);

    res.status(200).json({success: true, data: bootcamp})
});


//@desc Create new bootcamp
//@route POST /api/v1/bootcamps/:id
//@access private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
      const bootcamp = await Bootcamp.create(req.body);

      res.status(201).json({
          success: true,
          data: bootcamp
      });
});


//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bootcamp) return next(errors.BOOTCAMP_NOT_FOUND);


    res.status(201).json({
      success: true,
      data: bootcamp
    });
});


//@desc Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) return next(errors.BOOTCAMP_NOT_FOUND);

    bootcamp.remove();

    res.status(201).json({
      success: true,
      data: {}
    });
});


//@desc Get Bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
 const {zipcode, distance} = req.params;

 //Get geocoder lng/lat
const loc = await geocoder.geocode(zipcode);
const lat = loc[0].latitude;
const lng = loc[0].longitude;

//Calc radius using radians
//Divide dist by radius of the Earth
const radius = distance / 3963;

const bootcamps = await Bootcamp.find({
  location: {$geoWithin: {$centerSphere: [[lng, lat], radius] }}
});

res.status(200).json({
  success: true,
  count: bootcamps.length,
  data: bootcamps
});

});


//@desc Upload photo to bbotcamp
//@route PUT /api/v1/bootcamp/:id/photo
//@access private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) return next(errors.BOOTCAMP_NOT_FOUND);

  if (!req.files) return next(errors.FILE_NOT_FOUND);

  const file = req.files.file;

  if (!file.mimetype.startsWith('image')) return next(errors.FILE_NOT_VALID);

  if(file.size > process.env.MAX_FILE_UPLOAD) return next(errors.FILE_SIZE_NOT_VALID);

  //Create custom file name
  file.name = `photo_${bootcamp.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    console.log(err);
    if(err) return next(errors.FILE_UPLOAD_ERROR)

    await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});
    res.status(200).json({
      success: true,
      data: file.name
    })
  });
});
