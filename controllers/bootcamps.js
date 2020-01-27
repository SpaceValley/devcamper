//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: 'get all bootcamps', hello: req.hello})
};

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access public
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `get bootcamp ${req.params.id}`})
};


//@desc Create new bootcamp
//@route POST /api/v1/bootcamps/:id
//@access private
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: 'create a bootcamp'})
};


//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `update bootcamp ${req.params.id}`})
};


//@desc Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `delete bootcamp ${req.params.id}`})
};
