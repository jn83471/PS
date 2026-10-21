import { Link } from "react-router-dom";

export default function Dashboard() {

  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPI title="Plantas" value="6" positive={false} warning={false} />
        <KPI title="Clientes" value="3" positive={false} warning={false}/>
        <KPI title="Cumplimiento" value="90.4%" warning={false} positive />
        <KPI title="Scrap" value="1.8%" positive={false} warning />
      </div>

      {/* PRODUCTION STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TABLE */}
        <div className="border border-gray-200 rounded-xl p-4">
          <h2 className="font-semibold mb-4">Estado de Líneas</h2>

          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left py-2">Línea</th>
                <th>Plan</th>
                <th>Real</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <LineRow line="L-01" plan={3000} real={2800} ok={false}/>
              <LineRow line="L-02" plan={3000} real={3100} ok />
              <LineRow line="L-03" plan={3000} real={2500} ok={false}/>
            </tbody>
          </table>
        </div>

        {/* QUICK ACTIONS */}
        <div className=" border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold mb-4">Acciones rápidas</h2>
            <p className="text-sm text-gray-400 mb-6">
              Acceso directo para captura y ajustes de producción.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ActionButton label="Capturar Producción" />
            <Link className="bg-purple-600 hover:bg-purple-500 rounded-lg font-bold flex justify-center items-center text-white" to={'/plan'} >
              Editar Plan
            </Link>
            <ActionButton label="Registrar Paro" />
            <Link className="bg-purple-600 hover:bg-purple-500 rounded-lg font-bold flex justify-center items-center text-white" to={'/production'} >
              Plan de produccion
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- COMPONENTS ---------- */

type KPIProp={
  title:string, 
  value:string, 
  positive:boolean, 
  warning:boolean
}

function KPI({ title, value, positive, warning }:KPIProp) {
  let color = "text-black";
  if (positive) color = "text-green-400";
  if (warning) color = "text-yellow-400";

  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <p className="text-sm text-black">{title}</p>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}
type LineRowProp = {
  line: string,
  plan: number,
  real: number,
  ok: boolean
}
function LineRow({ line, plan, real, ok }: LineRowProp) {
  const status = ok
    ? "bg-green-500"
    : real < plan
      ? "bg-red-500"
      : "bg-yellow-400";

  return (
    <tr className="border-t border-zinc-800">
      <td className="py-2">{line}</td>
      <td className="text-center">{plan}</td>
      <td className="text-center">{real}</td>
      <td className="text-center">
        <span className={`px-2 py-1 text-xs rounded ${status}`}>
          {ok ? "OK" : "Delay"}
        </span>
      </td>
    </tr>
  );
}
type ActionButtonProp = {
  label: string
}
function ActionButton({ label }: ActionButtonProp) {
  return (
    <button className="bg-purple-600 hover:bg-purple-500 transition rounded-lg py-2 text-sm font-medium text-white">
      {label}
    </button>
  );
}