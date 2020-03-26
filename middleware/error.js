const errorHandler = (err, req, res, next) => {

  if(err.name === 'CastError'){
    const message = `Resource not found with id of ${err.value}`
    res.status(404).json({
      success: false,
      error: message
    })
  }

  if (err.code === 11000) {
    const message = 'Dublicate field value entered';
    res.status(400).json({
      success: false,
      error: message
    })
  }

  if(err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message)
    res.status(400).json({
      success: false,
      error: message
    })
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  })

};

module.exports = errorHandler;
