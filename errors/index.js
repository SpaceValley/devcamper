const errors = {
  BOOTCAMP_NOT_FOUND: { statusCode: 404, message: 'Bootcamp with provided id not found' },
  COURSE_NOT_FOUND: { statusCode: 404, message: 'Course with provided id not found' },
  FILE_NOT_FOUND: {statusCode: 400, message: 'Please upload a file'},
  FILE_NOT_VALID: {statusCode: 400, message: 'Please upload an image file'},
  FILE_UPLOAD_ERROR: {statusCode: 500, message: 'Problem with file upload'},
  FILE_SIZE_NOT_VALID: {
    statusCode: 400,
    message: `Please upload file less than ${process.env.MAX_FILE_UPLOAD}`
  },
  LOGIN_INVALID: {statusCode: 400, message: 'Please provide email and password'},
  USER_NOT_FOUND: {statusCode: 401, message: 'Invalid credentials'},
  NO_ACCESS_TO_ROUTE: {statusCode: 401, message: 'Not authorize to access this route'}
};

module.exports = errors;
