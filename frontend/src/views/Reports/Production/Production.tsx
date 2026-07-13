import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { GetProduction } from '../../../api/ReportApi'
import { useQuery } from '@tanstack/react-query'
import type { Plant } from '../../../types/PlantForms'

export const Production = () => {

    const [dt, setDt] = useState([])
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['Production'],
        queryFn: GetProduction,
        retry: false
    })
    
    const separateData = (x, prod, machines, day) => {
        const result = {
            ta: prod.filter(x => x.DAY == day && x.SHIFT == 1 && machines.includes(x.line_c)).reduce((sum, x) => sum + x.PROD, 0),
            tb: prod.filter(x => x.DAY == day && x.SHIFT == 2 && machines.includes(x.line_c)).reduce((sum, x) => sum + x.PROD, 0),
            tc: prod.filter(x => x.DAY == day && x.SHIFT == 3 && machines.includes(x.line_c)).reduce((sum, x) => sum + x.PROD, 0),
            total: prod.filter(x => x.DAY == day && machines.includes(x.line_c)).reduce((sum, x) => sum + x.PROD, 0)
        };
        return result
    }

    
    useEffect(() => {
        if (data == null) return
        const plant: Plant[] = data?.plant
        const prod = data?.data
        plant.sort((a, b) => a.name.localeCompare(b.name))


        const info = []
        plant.map(x => {
            console.log(prod.filter(y => y.DAY == 6 && y.SHIFT == 1 && y.line_c == 'MC04'))

            const machines = x.Machine.map(x => x.machineCode);
            info.push({
                name: x.name,
                code: x.Codes?.name,
                day1: separateData(x, prod, machines, 1),
                day2: separateData(x, prod, machines, 2),
                day3: separateData(x, prod, machines, 3),
                day4: separateData(x, prod, machines, 4),
                day5: separateData(x, prod, machines, 5),
                day6: separateData(x, prod, machines, 6),
                day7: separateData(x, prod, machines, 7),
                day8: separateData(x, prod, machines, 8),
                day9: separateData(x, prod, machines, 9),
                day10: separateData(x, prod, machines, 10),
                day11: separateData(x, prod, machines, 11),
                day12: separateData(x, prod, machines, 12),
                day13: separateData(x, prod, machines, 13),
                day14: separateData(x, prod, machines, 14),
                day15: separateData(x, prod, machines, 15),
                day16: separateData(x, prod, machines, 16),
                day17: separateData(x, prod, machines, 17),
                day18: separateData(x, prod, machines, 18),
                day19: separateData(x, prod, machines, 19),
                day20: separateData(x, prod, machines, 20),
                day21: separateData(x, prod, machines, 21),
                day22: separateData(x, prod, machines, 22),
                day23: separateData(x, prod, machines, 23),
                day24: separateData(x, prod, machines, 24),
                day25: separateData(x, prod, machines, 25),
                day26: separateData(x, prod, machines, 26),
                day27: separateData(x, prod, machines, 27),
                day28: separateData(x, prod, machines, 28),
                day29: separateData(x, prod, machines, 29),
                day30: separateData(x, prod, machines, 30),
                day31: separateData(x, prod, machines, 31)
            })
        })
        setDt(info)
        console.log(info)

    }, [data])

    
    return (
        <>
            
            <Outlet context={{ dt }}>

            </Outlet>
        </>
    )
}
