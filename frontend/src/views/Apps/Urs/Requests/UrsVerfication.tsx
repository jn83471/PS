import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UrsCardComponent } from "../../../../components/Apps/Urs/UrsCardComponent"
import {  Navigate, useNavigate } from "react-router-dom"
import {  faEye } from "@fortawesome/free-solid-svg-icons"

import { useMemo, useState } from "react";
import { SecondVerify, UrsGetFolios } from "../../../../api/Apps/Urs/UrsPriorityApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useAuthWithApps } from "../../../../hook/useAuth";
import { hasPermission } from "../../../../hook/hasPermissionHook";
import { UrsModalDetails } from "../../../../components/Apps/Urs/UrsModalDetails";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import type { UrsVerificateFolioCpLocal } from "../../../../types/Urs/UrsRequestFolio";
import { GetTimeZone } from "../../../../hook/GetTimeZone";
import { createUrsColumns } from "../../../../Utils/Urs/CreateUrsColumns";
import { UrsTables } from "../../../../components/Apps/Urs/UrsTables";
import { isMobile, isTabletOnly } from "../../../../Utils/Media";
import { UrsVerficationDesktop } from "../../../../components/Apps/Urs/UrsVerfication/UrsVerficationDesktop";
import { UrsVerficationMobile } from "../../../../components/Apps/Urs/UrsVerfication/UrsVerficationMobile";

export const UrsVerfication = () => {
  const User = useAuthWithApps()
  const navigates = useNavigate()

  if (!User.isLoading && !hasPermission("URS", User.data, "Request")) return (<Navigate to="/urs" />)
  console.log(hasPermission("URS", User.data, "Request"))

  const progress = ['Solicitado', 'REVISION CPLOCAL', 'REVISION SMTS ', 'EN ESCANEO ', 'EMBARCADA'];
  const porcentaje = 0

  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
  const [detailsId, setDetailsId] = useState({
    id: 0
  })

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['UrsPriority'],
    queryFn: UrsGetFolios,
    //enabled: !fecha,
    retry: false
  })

  const rows = data?.filter(x => x.Verify == 1 && x.Process != 99)

  const TimeZone = GetTimeZone(User?.data?.TimeZone)

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
              if (params.row.id == detailsId) {
                setDetailsId({
                  id: 0
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


  const { mutate } = useMutation({
    mutationFn: SecondVerify,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      refetch()
      navigates('/urs/verifications')
    }
  })

  const handleSendVerification = () => {
    const dt: UrsVerificateFolioCpLocal = {
      Verify: 2,
      ProposedDate: fecha.format("YYYY-MM-DD")
    }
    console.log(dt)

    mutate({ formData: dt, idFolio: detailsId.id })
    setDetailsId({
      id: 0
    })
    
  }
  return (
    <>
      {
        isMobile && !isTabletOnly ?
        <UrsVerficationMobile data={data} detailsId={detailsId} rows={rows} column={column} handleSendVerification={handleSendVerification} refetch={refetch} setDetailsId={setDetailsId}/>
        :
        <UrsVerficationDesktop data={data} detailsId={detailsId} rows={rows} column={column} handleSendVerification={handleSendVerification} refetch={refetch} setDetailsId={setDetailsId}/>
      }

    </>
  )
}

