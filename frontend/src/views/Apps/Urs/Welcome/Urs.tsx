import { useAuthWithApps } from "../../../../hook/useAuth";
import { UrsGetFolios } from "../../../../api/Apps/Urs/UrsPriorityApi";
import { useQuery } from "@tanstack/react-query";
import { GetTimeZone } from "../../../../hook/GetTimeZone";
import { WelcomeDesktop } from "./WelcomeDesktop";
import { isMobile, isTabletOnly } from "../../../../Utils/Media";
import { WelcomeMobile } from "./WelcomeMobile";
import { useMemo } from "react";
import { createUrsColumns } from "../../../../Utils/Urs/CreateUrsColumns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import type { GridColDef } from "@mui/x-data-grid";

export const Urs = () => {
    const { data } = useAuthWithApps()

    const Requests = useQuery({
        queryKey: ['UrsPriority'],
        queryFn: UrsGetFolios,
        //enabled: !fecha,
        retry: false
    })
    const navigate=useNavigate()

    const TimeZone = GetTimeZone(data?.TimeZone)

    const column = useMemo(
        () => {
            const column: GridColDef = {
                field: 'acciones',
                headerName: 'Ver',
                width: 70,
                renderCell: (params) => (
                    <>
                        <Button
                            variant="contained"
                            size="small"

                            onClick={() => {
                                navigate(`/urs/RequestDetails/${params.row.id}`)

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
                            <FontAwesomeIcon icon={faEye} className='pr-1' />
                        </Button>
                    </>
                ),
            }
            const cols = createUrsColumns(
                TimeZone,
                column
            )
            console.log(cols);
            return cols
        }, [TimeZone]);

    //const rows = Requests?.data?.filter(x => x.Verify >= 1 && x.Process != 99)
    const rows = useMemo(
        () =>
            Requests.data?.filter(
                x => x.Verify >= 1 && x.Process !== 99
            ) ?? [],
        [Requests.data]
    );
    return (
        <>
            {isMobile && !isTabletOnly ?
                <WelcomeMobile data={data} Requests={Requests} TimeZone={TimeZone} />
                :
                <WelcomeDesktop data={data} Requests={Requests} rows={rows} column={column} />
            }
        </>



    )
}
