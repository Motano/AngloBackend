import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validation.js";
//Controllers
import { login } from "../controllers/auth-controllers.js";

const router = Router();

//POST
router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria, de más de 5 carácteres")
      .isLength({ min: 5 })
      .not()
      .isEmpty(),
    validarCampos,
  ],
  login
);

export default router;
