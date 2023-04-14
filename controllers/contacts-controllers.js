const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers/index.js");

const { Contact } = require("../models/contact.js");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };

  if (favorite) {
    query.favorite = favorite === "true";
  }

  const result = await Contact.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("owner", "email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, `Not found!`);
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found!`);
  }

  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Not found!`);
  }

  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, `Not found!`);
  }

  res.json({ message: "contact deleted" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
  deleteContactById: ctrlWrapper(deleteContactById),
};
