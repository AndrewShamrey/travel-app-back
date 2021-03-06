function generateCountry(curBody = { name, shortName, lang, capital, timeDifference, description } ) {
  const body = curBody;
  valuesToValidate = Object.keys(curBody);

  valuesToValidate.forEach(key => {
    let currentType;
    switch (key) {
      case 'timeDifference':
        currentType = 'Number'
        break;
      default:
        currentType = 'String'
    }

    if (!body[key] || typeof body[key] !== currentType.toLowerCase()) {
      return {message: `Param ${key} is required and should be '${currentType}'`};
    }
  });

  if (body._id) {
    delete body._id;
  }
  
  return body;
}

module.exports = { generateCountry };
