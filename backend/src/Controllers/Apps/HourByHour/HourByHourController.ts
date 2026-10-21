/*Private tiempo As Integer =  'turno A
Private tiempoB As Integer = 26700*/
import type { Request, Response } from "express";
import { formatDateNow, withTimeout } from "../../../Utils/Gnr";
import { QueryTypes, Sequelize } from "sequelize";
import { Machine } from "../../../Models/Machine";
import { DBConfig, TenantConnection } from "../../../config/TenantConnection";
import { decrypt } from "../../../Utils/crypto";
import { Codes } from "../../../Models/Codes";

export class HourByHourController {

    static TimeA: number = 28500
    static TimeB: number = 26700
    static TurnInfo = {
        ShiftA: [
            {
                hour: 7,
                minutes: 50,
                byHour: 0
            },
            {
                hour: 8,
                minutes: 40,
                byHour: 0
            },
            {
                hour: 9,
                minutes: 55,
                byHour: 0
            },
            {
                hour: 10,
                minutes: 55,
                byHour: 0
            },
            {
                hour: 11,
                minutes: 55,
                byHour: 0
            },
            {
                hour: 12,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 13,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 14,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 15,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 16,
                minutes: 30,
                byHour: 0
            }
        ],
        ShiftB: [
            {
                hour: 17,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 18,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 19,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 20,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 21,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 22,
                minutes: 60,
                byHour: 0
            },
            {
                hour: 23,
                minutes: 60
            },
            {
                hour: 0,
                minutes: 60
            },
            {
                hour: 1,
                minutes: 30
            }
        ]
    }
    static Details: any = async (req: Request, res: Response) => {
        const { Plan, Shift, Machine: MachineId } = req.body
        let tCicle = 0
        let rciclo = 0

        const MachineDetails = await Machine.findOne({
            where: [
                {
                    id: MachineId
                }
            ],
            include: [
                {
                    model: Codes, as: "Codes"

                }
            ]
        })
        if (!MachineDetails) {
            const error = new Error('Linea no encontrada.')
            return res.status(401).json({ error: error.message })
        }

        const actualHour = new Date().toLocaleString('en-US', {
            timeZone: 'America/Mazatlan',
            hour: 'numeric',
            hour12: false
        })
        if (Shift == 1) {
            rciclo = this.TimeA % Plan
            tCicle = Math.round(this.TimeA / Plan)
        }
        else {
            rciclo = this.TimeB % Plan
            tCicle = Math.round(this.TimeB / Plan)
        }
        if (rciclo >= 50) {
            tCicle += 1
        }
        let info = Shift == 1 ? this.TurnInfo.ShiftA : this.TurnInfo.ShiftB

        for (let index = 0; index < info.length; index++) {
            info[index].byHour = this.calculate(info[index].minutes, tCicle)

        }
        const ShiftConfig = Shift == 1 ? process.env.HOURSTA.split('|') : process.env.HOURSTB.split('|')
        let start: Date = new Date()
        let end: Date = new Date()

        if (ShiftConfig[2] == "1") {
            console.log("paso")
            const [year, month, day] = new Date().toLocaleString('en-US', {
                timeZone: 'America/Mazatlan',
                year: 'numeric',
                month: "2-digit",
                day: '2-digit'
            }).split('/')
            start = new Date(`${year}-${month}-${day} ${ShiftConfig[0]}:00`)
            end = new Date(`${year}-${month}-${day} ${ShiftConfig[1]}:00`)
            end.setDate(end.getDate() + 1)
            console.log(`${year}-${month}-${day} ${ShiftConfig[1]}:00`)
            if (parseInt(ShiftConfig[0]) > parseInt(actualHour)) {
                console.log("quitar un dia")
                start.setDate(start.getDate() - 1)
                end.setDate(end.getDate() - 1)
            }
            console.log("poner un dia")

        }
        else {
            const [year, month, day] = new Date().toLocaleString('en-US', {
                timeZone: 'America/Mazatlan',
                year: 'numeric',
                month: "2-digit",
                day: '2-digit'
            }).split('/')
            start = new Date(`${year}-${month}-${day} ${ShiftConfig[0]}:00`)
            end = new Date(`${year}-${month}-${day} ${ShiftConfig[1]}:00`)
            console.log(`${year}-${month}-${day} ${ShiftConfig[1]}:00`)
        }

        const serversTentant: DBConfig[] = [];

        const cry = decrypt(MachineDetails.Codes.cryServer)

        const tenantsGACS: DBConfig = {
            name: "HXH" + cry.split('|')[0],
            host: cry.split('|')[0],
            database: cry.split('|')[1],
            username: "tepicsa",
            password: "tepsa59$"
        }

        //return res.json(cry)
        const conn = await TenantConnection(tenantsGACS);
        const promises = withTimeout(
            this.GetProd(conn, MachineDetails.machineCode, start, end),
            10000 // 3 segundos max
        );
        const results = await promises

        /*Dim rciclo = IIf(Me.cbShift.SelectedIndex.Equals(1), tiempoB, tiempo) Mod ciclo
If rciclo >= 50 Then
    tciclo = tciclo + 1
End If
Me.tbCiclo.Text = tciclo*/
        return res.json({
            Clicle: tCicle,
            TM: 0,
            info,
            ShiftConfig,
            actualHour,
            Machine,
            data: results,
            start: start.toLocaleString('en-US', {
                timeZone: 'America/Mazatlan',
                hour12: false,
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: 'numeric',
                minute: '2-digit'
            }),
            end: end.toLocaleString('en-US', {
                timeZone: 'America/Mazatlan',
                hour12: false,
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: 'numeric',
                minute: '2-digit'
            })
        })
    }

    static Events: any = async (req: Request, res: Response) => {
        return res.json(req.body)
    }

    static calculate(cantidad, tciclo) {
        const total = cantidad * 60;
        let entero = Math.floor(total / tciclo);

        const resultado = total / tciclo;
        const decimal = resultado - Math.floor(resultado);

        if (decimal >= 0.5) {
            entero += 1;
        }

        return entero;
    }

    static GetProd = async (sequelize: Sequelize, machineName: string, start: Date, end: Date) => {
        const query = `
            SELECT DATEPART(HH,insp_dt) AS hour,COUNT(insp_dt) AS Qty,ISNULL(Def.Qty,0) AS Def
            from insp_res
            LEFT JOIN (select DATEPART(HH,insp_dt) Hour,COUNT(insp_dt) AS Qty
                from defect_res
                where insp_dt>= :START AND insp_dt< :ENDS AND line_c= :MACHINE
                GROUP BY DATEPART(HH,insp_dt)
                ) Def ON Def.Hour=DATEPART(HH,insp_dt)
            where insp_dt>= :START AND insp_dt< :ENDS AND line_c= :MACHINE and wrkproc_c='P2'
            GROUP BY DATEPART(HH,insp_dt),Def.Qty
        `;
        const dt = {
            START: new Intl.DateTimeFormat('sv-SE', {
                timeZone: 'America/Mazatlan',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(start),
            ENDS: new Intl.DateTimeFormat('sv-SE', {
                timeZone: 'America/Mazatlan',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).format(end),
            MACHINE: machineName
        }

        console.log({
            START: dt.START,
            ENDS: dt.ENDS,
            MACHINE: dt.MACHINE
        })

        const result = await sequelize.query<{
            Hour: number;
            Qty: number;
            Def: number;
        }>(query, {
            replacements: {
                START: dt.START,
                ENDS: dt.ENDS,
                MACHINE: dt.MACHINE
            },
            type: QueryTypes.SELECT,
        });

        console.log({
            START: dt.START,
            ENDS: dt.ENDS,
            MACHINE: dt.MACHINE
        })


        //console.log(result)
        return result
    }
}