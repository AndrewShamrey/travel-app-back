const returnWarning = () => {
  return { message: `Param ${key} is required and should be '${currentType}'` }
};

function generateCountry(body = { shortName, timeDifference, info } ) {
  valuesToValidate = Object.keys(body);

  valuesToValidate.forEach(key => {
    let currentType;
    switch (key) {
      case 'timeDifference':
        currentType = 'Number'
        break;
      case "info":
        currentType = "Object";
        break;
      default:
        currentType = 'String'
    }

    if (!body[key] || typeof body[key] !== currentType.toLowerCase()) {
      return returnWarning();
    }
  });

  if (body._id) {
    delete body._id;
  }
  
  return body;
}

module.exports = { generateCountry };
