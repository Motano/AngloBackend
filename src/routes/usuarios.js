import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validation.js";
import { isEmailValid, existUserForId } from "../helpers/db-validation.js";
import validateJWT from "../middlewares/validate-jwt.js";
//Controllers
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/usuario-controllers.js";

const router = Router();

//POST
router.post(
  "/create",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña es obligatoria, de más de 5 carácteres"
    ).isLength({ min: 5 }),
    check("correo", "El correo no es valido").isEmail(),
    validarCampos,
  ],
  createUser
);
//GET
router.get(
  "/get/:id",
  [check("id").custom(existUserForId), validarCampos],
  getUser
);
//PUT
router.put(
  "/update/:id",
  [validateJWT, check("id").custom(existUserForId), validarCampos],
  updateUser
);
//DELETE
router.delete(
  "/delete/:id",
  [validateJWT, check("id").custom(existUserForId), validarCampos],
  deleteUser
);

export default router;
