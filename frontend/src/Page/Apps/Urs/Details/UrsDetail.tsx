import { useParams } from "react-router-dom"
import {  GetUrsRequestDetails } from "../../../../api/Apps/Urs/UrsRequestApi"
import { useQuery } from "@tanstack/react-query"
import { GetTimeZone } from "../../../../hook/GetTimeZone"
import { useAuthWithApps } from "../../../../hook/useAuth"
import { UrsDownloadASN } from "../../../../api/DownloadApis"
import { isMobile, isTabletOnly } from "../../../../Utils/Media"
import { UrsDetailDesktop } from "../../../../views/Apps/Urs/Details/UrsDetailDesktop"

export const UrsDetail = () => {
  const { id } = useParams()
  const User = useAuthWithApps()

  const { data } = useQuery({
    queryKey: ['UrsRequests', id],
    queryFn: () => GetUrsRequestDetails(Number(id)),
    //enabled: !fecha,
    retry: false
  })
  const progress = [{
    name: 'Solicitado',
    column: 'data.createdAt',
    type: "UTC"
  }, {
    name: 'REVISION CPLOCAL',
    column: 'data.DeliveryDay',
    type: "UTC"
  }, {
    name: 'REVISION SMTS ',
    column: 'data.LastProcessDay',
    type: "UTC"
  }, {
    name: 'EN ESCANEO ',
    column: 'data.FinishUserSMTSDate',
    type: "UTC"
  }, {
    name: 'Verificado',
    column: 'data.ClosedDay',
    type: "UTC"
  },
  {
    name: 'ASN',
    column: 'ACCT_DATE',
    type: "STATIC",
    Alert:"Horario FGSS"
  }, {
    name: 'Enviado',
    column: 'data.SMTSLastVerification',
    type: "UTC"
  }];
  const TimeZone = GetTimeZone(User?.data?.TimeZone)
  const porcentaje = ((data?.data?.Verify+(data?.results?.length>0?1:0)+(data?.data?.Verify==5?1:0) ) / (progress.length - 1) * 100) + 1

  

  const HandleDownloadFile = () => {
    UrsDownloadASN(Number(id))
  }

  return (
    isMobile && !isTabletOnly?
    <></>
    :
    <UrsDetailDesktop id={id} data={data} porcentaje={porcentaje} progress={progress} HandleDownloadFile={HandleDownloadFile} TimeZone={TimeZone} />
    
  )
}
