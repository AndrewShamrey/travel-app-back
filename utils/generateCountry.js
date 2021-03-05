function generateCountry(req) {
  const body = req.body;
  const name = body.name;
  const lang = body.lang;
  const shortName = body.shortName;
  
  if (!name || typeof name !== "string") {
    return {message: `Param 'name' is required and should be 'String'`};
  }
  
  if (!lang || typeof lang !== "string") {
    return {message: `Param 'lang' is required and should be 'String'`};
  }

  if (!shortName || typeof shortName !== "string") {
    return {message: `Param 'shortName' is required and should be 'String'`};
  }

  if (body.id) {
    delete body.id;
  }
  
  delete body.name;
  delete body.lang;
  delete body.shortName;
  return { name, shortName, lang, body };
}

module.exports = { generateCountry };
