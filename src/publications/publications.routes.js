import { Router } from "express";
import { createPublicationsValidator, deletePublicationsValidator, updatePublicationsValidator } from "../middlewares/publications-validator.js";
import { deletePublications, updatePublications, savePublications } from "./publications.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router()

router.post("/addPublications", createPublicationsValidator, savePublications);

router.put("/updatePublications", updatePublicationsValidator, updatePublications);

router.delete("/deletePublications", deletePublicationsValidator, deletePublications);

export default router;