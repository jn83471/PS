import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UrsCardComponent } from "../../../../components/Apps/Urs/UrsCardComponent"
import { Link, Navigate } from "react-router-dom"

import { useMemo, useState } from "react";
import { UrsGetFolios } from "../../../../api/Apps/Urs/UrsPriorityApi";
import { useQuery } from "@tanstack/react-query";
import { type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useAuthWithApps } from "../../../../hook/useAuth";
import { hasPermission } from "../../../../hook/hasPermissionHook";
import { GetTimeZone } from "../../../../hook/GetTimeZone";
import { UrsChangeHrs } from "./UrsChangeHrs";
import { UrsDetailsFolio } from "../../../../components/Apps/Urs/UrsDetailsFolio";
import { faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { createUrsColumns } from "../../../../Utils/Urs/CreateUrsColumns";
import { UrsTables } from "../../../../components/Apps/Urs/UrsTables";
import { UrsRequestDesktop } from "../../../../components/Apps/Urs/UrsRequest/UrsRequestDesktop";
import { isMobile, isTabletOnly } from "../../../../Utils/Media";
import  {UrsRequestMobile}  from "../../../../components/Apps/Urs/UrsRequest/UrsRequestMobile";


export const UrsRequests = () => {
  const User = useAuthWithApps()

  if (!User.isLoading && !hasPermission("URS", User.data, "Request")) return (<Navigate to="/urs" />)


  const [detailsId, setDetailsId] = useState({
    id: 0,
    Verify: 0
  })

  const { data, refetch } = useQuery({
    queryKey: ['UrsPriority'],
    queryFn: UrsGetFolios,
    //enabled: !fecha,
    retry: false
  })
  const TimeZone = GetTimeZone(User?.data?.TimeZone)
  const [setUpHrs, setSetUpHrs] = useState({ id: 0 })


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
                if (params.row.id == detailsId.id) {
                  setDetailsId({
                    id: 0,
                    Verify: 0
                  })
                }
                else {
                  setDetailsId(params.row)
                }

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
    }, [TimeZone, detailsId.id]);

  const stats = useMemo(() => ({
    open:
      data?.filter(
        x => x.Verify <= 3 && x.Process !== 99
      ).length ?? 0,

    closed:
      data?.filter(
        x => x.Verify === 4 && x.Process !== 99
      ).length ?? 0
  }), [data]);




  return (
    <>
    { (isMobile && !isTabletOnly)?
      <UrsRequestMobile refetch={refetch} setSetUpHrs={setSetUpHrs} refetch={refetch} User={User.data} stats={stats} detailsId={detailsId } data={data} column={column} setDetailsId={setDetailsId} TimeZone={TimeZone} setUpHrs={setUpHrs}/>
      :
      <UrsRequestDesktop refetch={refetch} setSetUpHrs={setSetUpHrs} User={User.data} stats={stats} detailsId={detailsId } data={data} column={column} setDetailsId={setDetailsId} TimeZone={TimeZone} setUpHrs={setUpHrs}/>
    }
    </>
  )
}
