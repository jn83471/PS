import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { themes } from "../../Utils/ThemeList"
import { faBars, faCalculator, faCircle, faPieChart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"

export const ThemePage = () => {
    const theme = themes
    const {selectedTheme,selectTheme} = useOutletContext<{selectedTheme:string,selectTheme:(theme:string)=>void}>()
    return (
        <>
            <div className="flex flex-col sm:flex-row gap-2 ">
                <div className="grid grid-cols-1 sm:w-[450px] border border-gray-300 rounded-lg shadow-md p-4 m-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                    {
                        theme.map((item, index) => {
                            return (
                                <button onClick={() => {
                                    selectTheme(item[0])
                                }} key={index} className={`bg-${item[0]}-500 text-[var(--color)] p-4 m-2 rounded-lg shadow-md
                            hover:scale-105 transition-transform duration-300 ease-in-out flex flex-row items-center gap-4`}>
                                    <div>
                                        <span className="w-[50px] h-6 flex overflow-hidden " data-theme={item[0]}>
                                            <span className="min-w-4 min-h-4 rounded-l-full" style={{ backgroundColor: 'var(--primary)' }}></span>
                                            <span className="min-w-4 min-h-4 " style={{ backgroundColor: 'var(--accent)' }}></span>
                                            <span className="min-w-4 min-h-4 rounded-r-full" style={{ backgroundColor: 'var(--sidebar)' }}></span>
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{item[1]}</h2>
                                        <p className="mt-2 text-sm text-gray-600">Tema Global</p>
                                    </div>
                                </button>
                            )
                        })
                    }
                </div>
                <div className="flex-1 sticky top-0 block">
                    <section className="p-5 border border-gray-300 rounded-lg shadow-md m-4 " data-theme={selectedTheme}>
                        <div className="panel-heading">
                            <div>
                                <h2>Vista previa</h2>
                                <p>Así se verán los colores principales de la interfaz.</p>
                            </div>
                        </div>
                        {/*  --sidebarColor: "#ffffff"; --color: "#000000"; */}
                        <div className="overflow-hidden rounded-lg shadow-md mt-4 border-[var(--border)] bg-[var(--surface-soft)] ">
                            <div className="py-2 flex flex-row items-center px-4 gap-2 bg-[var(--primary-strong)] text-[var(--sidebarColor)]">
                                <FontAwesomeIcon icon={faCircle}
                                    className="text-[10px]" />
                                <FontAwesomeIcon icon={faCircle}
                                    className="text-[10px]" />
                                <FontAwesomeIcon icon={faCircle}
                                    className="text-[10px]" />
                                <span className="preview-address">production-system / theme</span>
                            </div>

                            <div className="bg-[var(--page)] p-4 text-[var(--color)] ">
                                <div className="flex flex-row justify-between gap-2 items-center border-b border-b-[var(--border)] py-4">
                                    <div>
                                        <span className="preview-label text-sm font-bold">PRODUCTION SYSTEM</span>
                                        <h3 className="text-4xl font-bold">Teal</h3>
                                    </div>
                                    <button className="rounded-lg overflow-hidden bg-[var(--accent)] text-[var(--accentColor)] p-2">Aplicar</button>
                                </div>


                                <div className="border-gray-200 flex flex-row gap-2 flex-1 border border-[var(--border)] bg-[var(--surface)] rounded-lg overflow-hidden h-62 shadow">
                                    <div className="w-[200px] flex flex-col gap-2 bg-[var(--primary-strong)] p-4 text-[var(--sidebarColor)]">
                                        <span className="text-center ">PS</span>
                                        <span className="flex flex-row items-center gap-2 p-2 bg-[var(--accent)] text-[var(--accentColor)] rounded-lg">
                                            <FontAwesomeIcon icon={faCalculator} className="text-[var(--sidebarColor)] text-xl" />
                                            Aplicaciones
                                        </span>
                                        <span className="flex flex-row items-center gap-2 p-2 py-1">
                                            <FontAwesomeIcon icon={faBars} className="text-[var(--sidebarColor)] text-xl" />
                                            Producción
                                        </span>
                                        <span className="flex flex-row items-center gap-2 p-2 py-1">
                                            <FontAwesomeIcon icon={faPieChart} className="text-[var(--sidebarColor)] text-xl" />
                                            Reportes
                                        </span>
                                    </div>
                                    <div className="bg-[var(--surface)] flex-1 p-4">
                                        <span className="py-5 text-sm font-bold">VISTA GENERAL</span>
                                        <h4>Interfaz de ejemplo</h4>
                                        <p>Los colores cambian globalmente al seleccionar otro tema.</p>
                                        <button className="bg-[var(--accent)] text-[var(--accentColor)] p-2 rounded-lg">Acción principal</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-[var(--color)] my-4">
                            <FontAwesomeIcon icon={faCircle} className="text-[var(--primary)] text-[10px]" />
                            <span id="themeStatus">Tema Teal activo. Se guarda automáticamente en este navegador.</span>
                        </div>
                    </section>
                </div>

            </div>

        </>
    )
}
