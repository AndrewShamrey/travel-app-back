const returnWarning = () => {
  return { message: `Param ${key} is required and should be '${currentType}'` }
};

function generatePerson(body = { nickname, pass, photo, places }) {
  valuesToValidate = Object.keys(body);

  valuesToValidate.forEach((key) => {
    let currentType;
    switch (key) {
      case "places":
        currentType = "Array";
        break;
      default:
        currentType = "String";
    }

    if (key === "places") {
      if (body[key] && !Array.isArray(body[key])) {
        return returnWarning();
      }
    } else if (key === "photo") {
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

module.exports = { generatePerson };
