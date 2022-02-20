function createErrorMessage(error) {
    let arr;

    if (error.name === 'ValidationError') {
        arr = Object.values(error.errors).map(val => {return {errorMessage: val.message}});
      }
    else if (error.name === 'Error'){
          arr = [{errorMessage: error.message}]
      }
    
    else {
        arr = [{errorMessage: 'Something went wrong. Try again.'}]
    }

    return arr;
}

module.exports = createErrorMessage;