import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const getCategory = async (req:Request, res:Response): Promise<void> => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {name: 'asc'}
        })

        res.status(200).json(categories)
    } catch (error) {
        console.log('Erro ao buscar categorias:', error)
        res.status(500).json({error: 'Erro ao buscar categorias'})
    }
}