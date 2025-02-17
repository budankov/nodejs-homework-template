const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");

const { isValidId, authenticate } = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

module.exports = router;
