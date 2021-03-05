function validateQuery(req, res, next) {
  const query = req.query;
  const page = query.page;
  let limit = query.limit;

  if (page) {
    if (Object.is(+page, NaN) || Math.floor(+page) !== +page) {
      return res.status(400).send("The 'page' parameter must be an integer");
    }
  }

  if (limit) {
    if (!page) {
      return res.status(400).send("Enter 'page' to display things");
    }
    if (Object.is(+limit, NaN) || Math.floor(+limit) !== +limit) {
      return res.status(400).send("The 'limit' parameter must be an integer");
    }
  }

  next();
}

module.exports = { validateQuery };
