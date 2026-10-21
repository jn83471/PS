import { faBarChart, faBox, faClock, faListNumeric, faMobileScreen, faPieChart, faProjectDiagram, faTv } from "@fortawesome/free-solid-svg-icons"
import { CardReport } from "../../components/Reports/CardReport"
import { useAuth } from "../../hook/useAuth"

import { useEffect } from "react"
import i18n from "../../i18n/Index"
import { useTranslation } from "react-i18next"

export const Apps = () => {
  const { t } = useTranslation();
  const { data, isError, isLoading } = useAuth()
  if (isLoading) return (<></>)
  if (!data) {
    return null;
  }
  {/* */ }

  return (
    <>
      <h1 className="font-bold text-3xl border-b border-b-gray-200 py-2">
        {t('Apps.Name')}
      </h1>
      <h2 className="font-bold text-2xl">
        {t("Manufacture")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          (data?.Rols.Level == 0 || (data?.UserHasApps?.filter(x => x.Apps.KEY == "LineMonitor").length ?? 0) > 0) &&
          <CardReport title={t("Apps.LM")} description={t("Apps.LMDesc")}
            bg="bg-green-600" url={`/LineMonitor`} icon={faPieChart} />
        }
        {/* t("Apps.HXH") */}
        {
          (data?.Rols.Level == 0 || (data?.UserHasApps?.filter(x => x.Apps.KEY == "HXH").length ?? 0) > 0) &&
          <CardReport title={t('Apps.HXH')} description={t("Apps.HXHDesc")}
            bg="bg-green-600" url={`/HourByHour`} icon={faClock} />
        }
        <CardReport title={t('Apps.PTS')} description={t('Apps.PTSDesc')}
          bg="bg-green-600" url={`/Screens`} icon={faTv} />
        <CardReport title={t("Apps.RINSP")} description={t("Apps.RINSPDesc")}
          bg="bg-green-600" url={`/Reinspection`} icon={faTv} />
        <CardReport title={'Seguimiento de lineas'} description={t("Apps.RINSPDesc")}
          bg="bg-green-600" url={`/Reinspection`} icon={faTv} />
      </div>
      <h2 className="font-bold text-2xl">
        {t("HarnessStorage")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          ((data?.Rols.Level == 0 || (data?.UserHasApps?.filter(x => x.Apps.KEY == "URS").length ?? 0) > 0) || data?.UrsProcessId) &&
          <CardReport title="Urs" description="Urgent Request for Shipment"
            bg="bg-red-600" url={`/Urs`} icon={faListNumeric} />
        }
      </div>
    </>
  )
}
