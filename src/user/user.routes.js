import { Router } from "express";
import { updateProfilePicture, updatePassword, updateUser } from "./user.controller.js";
import { updateUserValidator, updatePasswordValidator, updateProfilePictureValidator} from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router()

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, updateUser)

router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router

