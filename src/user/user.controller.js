import { hash } from "argon2";
import User from "./user.model.js"
import fs from "fs/promises"
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

export const updateUser = async (req, res) => {
    try{
        const { _id } = req.usuario
        const data = req.body

        const user = await User.findByIdAndUpdate(_id, data, { new: true});

        res.status(200).json({
            success: true,
            message: 'Usuario Actualizado',
            user,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar al usuario",
            error: err.message
        })
    }
}

export const updateProfilePicture = async (req, res) => {
    try{
        const { _id } = req.usuario
        let newProfilePicture = req.file ? req.file.filename : null

        if(!newProfilePicture){
            return res.status(400).json({
                success: false,
                message: "No hay archivo en la petición"
            })
        }

        const user = await User.findById(_id)

        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Error al actualizar la foto",
            error: err.message
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la foto",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { _id } = req.usuario
        const { newPassword, oldPassword } = req.body
        
        const user = await User.findById(_id)

        const matchNewPassword = await verify(user.password, newPassword)

        if(matchNewPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contaseña no puede ser igual a la anterior contrseña que tenias"
            })
        }

        const matchOldPassword = await verify(user.password, oldPassword)

        if(!matchOldPassword){
            return res.status(400).json({
                success: false,
                message: "Pot favor ingresa tu contraseña actual"
            })
        }

        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(_id, {password: encryptedPassword}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}