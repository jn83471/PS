import type { GridColDef } from "@mui/x-data-grid";
import { formatDateTimeZone, formatDateUTC, formDateHours } from "../Date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { UrsEstatusComponent } from "../../components/Apps/Urs/UrsEstatusComponent";
import { formatFolio } from "../Urs";
import { useMemo } from "react";

export const createUrsColumns = (
    TimeZone: string,
    actionsColumn?: GridColDef
): GridColDef[] => {
    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'Folio', width: 130, minWidth: 130, renderCell: (params) => formatFolio(params.row.id)
        },
        {
            field: 'Method', headerName: 'Método de envió', width: 130
            , valueGetter: (_, row) => row?.UrsRequests?.[0]?.UrsPriority.name ?? ''

        },
        {
            field: 'motive', headerName: 'Motivo', width: 130, valueGetter: (_, row) => row?.UrsRequests?.[0]?.Reason ?? ''
        },
        {
            field: 'pickup', headerName: 'Pickup', width: 130,
            valueGetter: (_, row) => formDateHours(new Date(row?.hrs), TimeZone)

        },
        {
            field: 'Status', headerName: 'Estatus', minWidth: 180, flex: 1
            , valueGetter: (_, row) => row.Process ?? 0
            , renderCell: (params) => (
                <UrsEstatusComponent Process={params.row.Process} Verify={params.row.Verify} />
            )
        },
        {
            field: 'RequestBy', headerName: 'Solicitado por', minWidth: 180, flex: 1
            , valueGetter: (_, row) => row.RequestUser?.Name ?? ''
            , renderCell: (params) => (
                <>

                    <div className="flex items-center text-blue-900 bg-blue-50/30 h-7 mt-2 rounded-lg text-sm border border-blue-100/50 px-2">
                        <FontAwesomeIcon icon={faUser} className="text-blue-400 text-sm pr-1" />
                        {params.row.RequestUser?.Name}
                    </div>
                </>
            )
        },
        {
            field: 'createdAt', headerName: 'fecha Solicitud', width: 120,
            valueFormatter: (value) => {
                if (!value) return '';
                return formatDateTimeZone(value, TimeZone)
            },
        },
        {
            field: 'ProposedDate', headerName: 'Fecha propuesta', width: 150,
            valueFormatter: (value) => {
                if (!value) return '';
                return formatDateUTC(value)

            },
        },
        {
            field: 'ClosedDay', headerName: 'Fecha de embarque', width: 150,
            valueFormatter: (value) => {
                if (!value) return '';
                return formatDateUTC(value)
            },
        },
    ];

    if (actionsColumn) {
        //columns.push(actionsColumn);
        columns.splice(1, 0, actionsColumn);
    }

    return columns;
};

export const CreateUrsProductColumns = (TimeZone: string,
    actionsColumn?: GridColDef) => {
    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'MFG', width: 80, minWidth: 80,
            valueGetter: (_, row) => row.Codes.name
        },
        {
            field: 'SEWS Part No', headerName: 'SEWS Part No', width: 130, flex: 1
            , valueGetter: (_, row) => row.PartNumber ?? ''
        },
        {
            field: 'Customer Part No', headerName: 'Customer Part No', width: 130, flex: 1
            , valueGetter: (_, row) => row.CustomerPartNumber ?? ''
        },
        {
            field: 'Customer', headerName: 'Customer', width: 110
            , valueGetter: (_, row) => row.Customer ?? ''
        },
        {
            field: 'Qty', headerName: 'Qty', width: 80
            , valueGetter: (_, row) => row.Qty ?? ''
        },
        {
            field: 'Reason', headerName: 'Reason', width: 180, flex: 1
            , valueGetter: (_, row) => row.Reason ?? ''
            , renderCell: (params) => (
                <div className="flex items-center text-blue-900 bg-blue-50/30 h-7 mt-2 rounded-lg text-sm border border-blue-100/50 px-2">
                    <FontAwesomeIcon icon={faCircle} className="text-blue-400 font-bold text-sm pr-1" />
                    {params.row.Reason}
                </div>

            )
        },
        {
            field: 'Method', headerName: 'Método', width: 130, flex: 1
            , valueGetter: (_, row) => row.UrsPriority?.name ?? ''
        }/*,
            {
                field: 'acciones',
                headerName: 'acciones',
                width: 70,
                renderCell: (params) => (
                    <>
                        <Button
                            variant="contained"
                            size="small"
    
                            onClick={() => {
                            }}
                            style={{
                                marginRight: 8,
                                paddingLeft: 5,
                                paddingRight: 5,
                                backgroundColor: "transparent",
                                color: "black",
                                border: "0 !important",
                                boxShadow: "none",
                                width: "100%"
                            }}
                        >
                            <FontAwesomeIcon icon={faEdit} className='pr-1' />
                        </Button>
                    </>
                ),
            },*/

    ];
    if (actionsColumn) {
        columns.push(actionsColumn);
    }

    return columns;

}