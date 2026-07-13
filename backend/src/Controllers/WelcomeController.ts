import type { Request, Response } from "express";
import { Codes } from "../Models/Codes";
import { Plants } from "../Models/Plants";
import { Departament } from "../Models/Department";
import { Rols } from "../Models/Rols";
import { Users } from "../Models/Users";
import { Machine } from "../Models/Machine";
import { Clients } from "../Models/Client";
import { Plans } from "../Models/Plan";
import { Smhcas } from "../Models/SMHCAS";

export class WelcomeController {
    static Index: any = async (req: Request, res: Response) => {
        try {
            const plants = await Smhcas.findAll()
            return res.json(plants)
        } catch (error) {

            console.error(error);               // full error
            console.error(error.message);       // main message
            console.error(error.original);      // MSSQL error
            res.status(500).json({ error: error.message });

        }

    }
}