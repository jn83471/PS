export type DailyStatus =
    | "complete"
    | "progress"
    | "delayed"
    | "pending"

export type PlanViewRow = {
    id: number
    machine: string
    Capacity?: number
    Line?: string
    Program?: string
    Shift?: string | number
    PartNumber?: string
    Customer?: string
    LevenDesign?: string
    Shortpart?: string
    Kmh?: number
    qty?: number

    [key: string]: any
}
