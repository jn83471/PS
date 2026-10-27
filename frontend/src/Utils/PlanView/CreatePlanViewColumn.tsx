import type { GridColDef } from "@mui/x-data-grid"
import { useMemo } from "react"

export const createPlanviewColumns = (
) => {
  const columns: GridColDef[] = [
    { field: 'machine', headerName: 'Linea', maxWidth: 300, pinnable: true, width: 45 },
    //{ field: 'Capacity', headerName: 'Capacidad', maxWidth: 300, width: 65 },
    { field: 'Line', headerName: 'Linea', maxWidth: 300, width: 150 },
    { field: 'Program', headerName: 'Program', maxWidth: 300, width: 85 },
    //{ field: 'Shift', headerName: 'Shift', maxWidth: 300, width: 40 },
    { field: 'PartNumber', headerName: 'numero de parte', maxWidth: 300, width: 110 },
    { field: 'Customer', headerName: 'Cliente', maxWidth: 300, width: 100 },
    { field: 'LevenDesign', headerName: 'Nivel de diseño', maxWidth: 300, width: 90 },
    { field: 'Shortpart', headerName: 'Shortpart', maxWidth: 300, width: 60 },
    /*{
      field: 'Kmh', headerName: 'Kmh', maxWidth: 300, width: 60,
      renderCell: (params) => parseFloat(params.row.Kmh).toFixed(3)
    },*/
    {
      field: "d1",
      headerName: "d1",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d1_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : status === "delayed"
                    ? "#facc15"
                    : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : status === "delayed"
                    ? "black"
                    : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : status === "delayed"
                    ? "2px solid #ca8a04"
                    : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d1}
          </div>
        )
      }
    },
    {
      field: "d2",
      headerName: "d2",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d2_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d2}
          </div>
        )
      }
    },
    {
      field: "d3",
      headerName: "d3",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d3_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d3}
          </div>
        )
      }
    },
    {
      field: "d4",
      headerName: "d4",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d4_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d4}
          </div>
        )
      }
    },
    {
      field: "d5",
      headerName: "d5",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d5_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d5}
          </div>
        )
      }
    },
    {
      field: "d6",
      headerName: "d6",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d6_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d6}
          </div>
        )
      }
    },
    {
      field: "d7",
      headerName: "d7",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d7_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d7}
          </div>
        )
      }
    },
    {
      field: "d8",
      headerName: "d8",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d8_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d8}
          </div>
        )
      }
    },
    {
      field: "d9",
      headerName: "d9",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d9_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d9}
          </div>
        )
      }
    },
    {
      field: "d10",
      headerName: "d10",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d10_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d10}
          </div>
        )
      }
    },
    {
      field: "d11",
      headerName: "d11",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d11_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d11}
          </div>
        )
      }
    },
    {
      field: "d12",
      headerName: "d12",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d12_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d12}
          </div>
        )
      }
    },
    {
      field: "d13",
      headerName: "d13",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d13_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d13}
          </div>
        )
      }
    },
    {
      field: "d14",
      headerName: "d14",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d14_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d14}
          </div>
        )
      }
    },
    {
      field: "d15",
      headerName: "d15",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d15_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d15}
          </div>
        )
      }
    },
    {
      field: "d16",
      headerName: "d16",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d16_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d16}
          </div>
        )
      }
    },
    {
      field: "d17",
      headerName: "d17",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d17_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d17}
          </div>
        )
      }
    },
    {
      field: "d18",
      headerName: "d18",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d18_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d18}
          </div>
        )
      }
    },
    {
      field: "d19",
      headerName: "d19",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d19_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d19}
          </div>
        )
      }
    },
    {
      field: "d20",
      headerName: "d20",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d20_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d20}
          </div>
        )
      }
    },
    {
      field: "d21",
      headerName: "d21",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d21_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d21}
          </div>
        )
      }
    },
    {
      field: "d22",
      headerName: "d22",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d22_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d22}
          </div>
        )
      }
    },
    {
      field: "d23",
      headerName: "d23",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d23_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d23}
          </div>
        )
      }
    },
    {
      field: "d24",
      headerName: "d24",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d24_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d24}
          </div>
        )
      }
    },
    {
      field: "d25",
      headerName: "d25",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d25_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d25}
          </div>
        )
      }
    },
    {
      field: "d26",
      headerName: "d26",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d26_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d26}
          </div>
        )
      }
    },
    {
      field: "d27",
      headerName: "d27",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d27_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d27}
          </div>
        )
      }
    },
    {
      field: "d28",
      headerName: "d28",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d28_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d28}
          </div>
        )
      }
    },
    {
      field: "d29",
      headerName: "d29",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d29_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d29}
          </div>
        )
      }
    },
    {
      field: "d30",
      headerName: "d30",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d30_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d30}
          </div>
        )
      }
    },
    {
      field: "d31",
      headerName: "d31",
      width: 100,
      renderCell: (params) => {

        const status = params.row.d31_status

        return (
          <div
            className="px-2 w-full text-center"
            style={{
              backgroundColor:
                status === "complete"
                  ? "#16a34a"
                  : "transparent",

              color:
                status === "complete"
                  ? "white"
                  : "black",

              border:
                status === "progress"
                  ? "2px solid #2563eb"
                  : "none",

              borderRadius: "4px",
              fontWeight: 600
            }}
          >
            {params.row.d31}
          </div>
        )
      }
    }
    /*
    ,
    {
      field: 'acumulate',
      headerName: 'Acumulado',
      width: 80,
      renderCell: (params) => (
        <div>
          {params.row.d1 + params.row.d2 + params.row.d3 + params.row.d4 + params.row.d5 +
            params.row.d6 + params.row.d7 + params.row.d8 + params.row.d9 + params.row.d10 +
            params.row.d11 + params.row.d12 + params.row.d13 + params.row.d14 + params.row.d15 +
            params.row.d16 + params.row.d17 + params.row.d18 + params.row.d19 + params.row.d20 +
            params.row.d21 + params.row.d22 + params.row.d23 + params.row.d24 + params.row.d25 +
            params.row.d26 + params.row.d27 + params.row.d28 + params.row.d29 + params.row.d30 +
            params.row.d31}
        </div>
      ),
    },
     */

    /*
    ,{
      field: 'qty', headerName: 'Total', maxWidth: 300, width: 60,
      renderCell: (params) => (
        <div className='px-2' style={{
          backgroundColor: ((params.row.d1 + params.row.d2 + params.row.d3 + params.row.d4 + params.row.d5 +
            params.row.d6 + params.row.d7 + params.row.d8 + params.row.d9 + params.row.d10 +
            params.row.d11 + params.row.d12 + params.row.d13 + params.row.d14 + params.row.d15 +
            params.row.d16 + params.row.d17 + params.row.d18 + params.row.d19 + params.row.d20 +
            params.row.d21 + params.row.d22 + params.row.d23 + params.row.d24 + params.row.d25 +
            params.row.d26 + params.row.d27 + params.row.d28 + params.row.d29 + params.row.d30 +
            params.row.d31) < params.row.qty ? " " : ""),
        }}>
          {params.row.qty}
        </div>
      ),
    },
   */

  ]
  return columns
}