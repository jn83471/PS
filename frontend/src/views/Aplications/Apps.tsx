import { faBarChart, faBox, faClock, faListNumeric, faMobileScreen, faPieChart, faProjectDiagram, faTv } from "@fortawesome/free-solid-svg-icons"
import { CardReport } from "../../components/Reports/CardReport"
import { useAuth } from "../../hook/useAuth"

import { useEffect } from "react"
import i18n from "../../i18n/Index"
import { useTranslation } from "react-i18next"
import { CardReportV2 } from "../../components/Reports/CardReportV2"

export const Apps = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useAuth()
  if (isLoading) return (<></>)
  if (!data) {
    return null;
  }
  {/* */ }

  return (
    <>
      <div className="flex justify-between items-center mb-2 border-b border-b-gray-200 pb-2 text-[var(--color)]">
        <div className="flex flex-col flex-1">
          <h1 className="font-bold text-3xl  py-2">
            {t('Apps.Name')}
          </h1>
          <h2>
            Accede rápidamente a tus herramientas de producción.
          </h2>
        </div>
        <div>
          <div className="border  border-[var(--border)] rounded-lg bg-[var(--page)] text-[var(--color)] shadow hover:scale-105 duration-75 ease-in py-2 px-4 text-right">
            <div className="font-bold text-2xl">
              6
            </div>
            aplicaciones
          </div>
        </div>
      </div>

      <h2 className="font-bold text-2xl text-[var(--color)]">
        {t("Manufacture")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          (data?.Rols.Level == 0 || (data?.UserHasApps?.filter(x => x.Apps.KEY == "LineMonitor").length ?? 0) > 0) &&
          <CardReportV2 title={t("Apps.LM")} description={t("Apps.LMDesc")}
            bg="bg-green-600" url={`/LineMonitor`} icon={faPieChart} section={t("Manufacture")} />
        }
        {/* t("Apps.HXH") */}
        {
          (data?.Rols.Level == 0 || (data?.UserHasApps?.filter(x => x.Apps.KEY == "HXH").length ?? 0) > 0) &&
          <CardReportV2 title={t('Apps.HXH')} description={t("Apps.HXHDesc")}
            bg="bg-green-600" url={`/HourByHour`} icon={faClock} section={t("Manufacture")} />
        }
        <CardReportV2 title={t('Apps.PTS')} description={t('Apps.PTSDesc')}
          bg="bg-green-600" url={`/Screens`} icon={faTv} section={t("Manufacture")}/>
        <CardReportV2 title={t("Apps.RINSP")} description={t("Apps.RINSPDesc")}
          bg="bg-green-600" url={`/Reinspection`} icon={faTv} section={t("Manufacture")}/>
        <CardReportV2 title={'Seguimiento de lineas'} description={t("Apps.RINSPDesc")}
          bg="bg-green-600" url={`/Reinspection`} icon={faTv} section={t("Manufacture")}/>
      </div>
      <h2 className="font-bold text-2xl text-[var(--color)]">
        {t("HarnessStorage")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {
          ((data?.Rols.Level == 0 || (data?.UserHasApps?.filter(x => x.Apps.KEY == "URS").length ?? 0) > 0) || data?.UrsProcessId) &&
          <CardReportV2 title="Urs" description="Urgent Request for Shipment"
            bg="bg-red-600" url={`/Urs`} icon={faListNumeric} section={t("HarnessStorage")} />
        }
      </div>
    </>
  )
}
