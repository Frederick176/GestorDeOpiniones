"use strict"

import Publication from "../publications/publications.model.js";
import User from "../user/user.model.js"

export const savePublications = async (req, res) => {
    try{
        const data = req.body;
        const user = await User.findOne({email: data.email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Publicacion no encontrada'
            });
        }

        const publication = new Publication({
            ...data,
            keep: user._id,
        });

        await publication.save();

        res.status(200).json({
            success: true,
            publication
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al guardar la publicacion ):',
            error: err.message
        })
    }
}

export const updatePublications = async (req, res) => {
    try{

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar la publicacion ):",
            error: err.message
        })
    }
}

export const deletePublications = async (req, res) => {
    try{
        const { id } = req.params;

        await Publication.findByIdDelete(id, {status: false})

        res.status(200).json({
            success: true,
            message: "Publicacion eliminada exitosamente (:"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Erro al eliminar la publicacion ):"
        })
    }
}