import { body, param } from "express-validator";
import { publicationsExits } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
/*import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";*/
import { handleErrors } from "./handle-errors.js";

export const createPublicationsValidator = [
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("category").notEmpty().withMessage("La categoría es requerida"),
    body("mainText").notEmpty().withMessage("El texto principal es requerida"),
    validarCampos,
    handleErrors
]

export const updatePublicationsValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(publicationsExits),
    validarCampos,
    handleErrors
]

export const deletePublicationsValidator = [
    param("id").isMongoId().withMessage("No es un ID válido"),
    param("id").custom(publicationsExits),
    validarCampos,
    handleErrors
]