import { Link } from "react-router-dom";
import { MenuItem } from "../../components/Gnr/MenuItem";

export default function Dashboard() {
  
  return (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPI title="Plantas" value="6" />
        <KPI title="Clientes" value="3" />
        <KPI title="Cumplimiento" value="90.4%" positive />
        <KPI title="Scrap" value="1.8%" warning />
      </div>

      {/* PRODUCTION STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TABLE */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
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
              <LineRow line="L-01" plan={3000} real={2800} />
              <LineRow line="L-02" plan={3000} real={3100} ok />
              <LineRow line="L-03" plan={3000} real={2500} />
            </tbody>
          </table>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold mb-4">Acciones rápidas</h2>
            <p className="text-sm text-gray-400 mb-6">
              Acceso directo para captura y ajustes de producción.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ActionButton label="Capturar Producción" />
            <Link className="bg-purple-600 hover:bg-purple-500 rounded-lg font-bold flex justify-center items-center" to={'/plan'} >
              Editar Plan
            </Link>
            <ActionButton label="Registrar Paro" />
             <Link className="bg-purple-600 hover:bg-purple-500 rounded-lg font-bold flex justify-center items-center" to={'/production'} >
              Plan de produccion
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- COMPONENTS ---------- */



function KPI({ title, value, positive, warning }) {
  let color = "text-white";
  if (positive) color = "text-green-400";
  if (warning) color = "text-yellow-400";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}

function LineRow({ line, plan, real, ok }) {
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

function ActionButton({ label }) {
  return (
    <button className="bg-purple-600 hover:bg-purple-500 transition rounded-lg py-2 text-sm font-medium">
      {label}
    </button>
  );
}