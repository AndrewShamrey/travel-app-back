const returnWarning = (key, currentType) => {
  return { message: `Param ${key} is required and should be '${currentType}'` }
};

function generateItem(type, body) {
  let currentBody;
  switch (type) {
    case 'country':
      currentBody = ["shortName", "timeDifference", "latlng", "currency", "mainPlace", "video", "info"];
      break;
    case "place":
      currentBody = ["country", "image", "rating", "personsId", "info"];
      break;
    case "person":
      currentBody = ["nickname", "pass", "photo"];
      break;
    default:
      currentBody = [];
  }

  for (let index in currentBody) {
    const key = currentBody[index];
    let currentType;
    switch (key) {
      case "rating":
      case 'timeDifference':
        currentType = 'Number'
        break;
      case "latlng":
      case "places":
      case "personsId":
        currentType = "Array";
        break;
      case "mainPlace":
      case "currency":
      case "info":
        currentType = "Object";
        break;
      default:
        currentType = 'String'
    }

    if (key === "places" || key === "latlng" || key === "personsId") {
      if (body[key] && !Array.isArray(body[key])) {
        return returnWarning(key, currentType);
      }
    } else if (key === "rating" || key === "photo") {
      if (body[key] && typeof body[key] !== currentType.toLowerCase()) {
        return returnWarning(key, currentType);
      }
    } else {
      if (!body[key] || typeof body[key] !== currentType.toLowerCase()) {
        return returnWarning(key, currentType);
      }
    }
  }

  if (body._id) {
    delete body._id;
  }
  
  return body;
}

module.exports = { generateItem };
