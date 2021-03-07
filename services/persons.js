const Person = require('../models/person');

exports.getPersons = async function (query) {
  const page = +query.page;
  let limit = +query.limit;
  if (page && !limit) {
    limit = 5;
  }
  const skip = limit * (page - 1);
  let allPeoples = [];
  const cursor = Person.find({}).skip(skip).limit(limit).cursor();
  for (let doc = await cursor.next(); ; doc = await cursor.next()) {
    if (doc == null) {
      return allPeoples;
    }
    allPeoples.push(doc);
  }
}

exports.getPersonByName = async function (name) {
  const currentPerson = await Person.find({ nickname: name });
  return currentPerson;
}

exports.createPerson = async function (body = {}) {
  const person = new Person(body);
  return person.save();
}

exports.updatePerson = async function (id, body) {
  const newObject = Object.keys(body).reduce((R, k) => {
    if (body[k] !== undefined) {
      R[k] = body[k];
    }
    return R;
  }, {});
  return await Person.updateOne({ _id: id }, newObject);
}

exports.deletePerson = async function (id) {
  return await Person.deleteOne({ _id: id });
};