const returnWarning = () => {
  return { message: `Param ${key} is required and should be '${currentType}'` }
};

function generatePlace(body = { country, image, rating, info }) {
  valuesToValidate = Object.keys(body);

  valuesToValidate.forEach((key) => {
    let currentType;
    switch (key) {
      case "rating":
        currentType = "Number";
        break;
      case "info":
        currentType = "Object";
        break;
      default:
        currentType = "String";
    }

    if (key === "rating") {
      if (body[key] && typeof body[key] !== currentType.toLowerCase()) {
        return returnWarning();
      }
    } else {
      if (!body[key] || typeof body[key] !== currentType.toLowerCase()) {
        return returnWarning();
      }
    }
  });

  if (body._id) {
    delete body._id;
  }

  return body;
}

module.exports = { generatePlace };
