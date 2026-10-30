import { faBarChart, faBox, faProjectDiagram, faCalendar,faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { CardReport } from "../../../components/Reports/CardReport"

export const Dash = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <CardReport title="Reporte de producción" description="reporte de piezas producidas por planta"
                    bg="bg-green-600" url={`/production`} icon={faBox} />
                <CardReport title="Producidas" description="reporte de piezas por valor de arnés"
                    bg="bg-red-600" url={`/productionkmh`} icon={faProjectDiagram} />
                <CardReport title="PlanView" description="Comparativa de piezas producida con el plan de producción"
                    bg="bg-blue-600" url={`/PlanView`} icon={faBarChart} />
                <CardReport title="Plan por horas" description="Nuevo módulo para plan de producción (horas)"
                    bg="bg-purple-600" url={`/PlanView`} icon={faClock} />
            </div>



        </>
    )
}
