function validatePass(body) {
  const { pass, photo } = body;
  if (pass && (pass.length < 8 || pass.length > 20)) {
    return { message: 'Invalid length of parameter pass' };
  }
  return { pass, photo };
}

module.exports = { validatePass };