const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

router.delete("/:contactId", ctrl.deleteContactById);

module.exports = router;
