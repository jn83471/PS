import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type PlanViewMobileProp = {
    machine, setMachine,
    machines, setMachines,
}
export const PlanViewMobile = ({ machine, setMachine, machines, setMachines }: PlanViewMobileProp) => {
    return (
        machine === "" || machine === null || machine === undefined ?
            <section className="grid grid-cols-1 gap-2">
                {machines.map((element) => (
                    <button onClick={()=>setMachine(element)} className="block border text-left p-2 border-gray-300 rounded-lg">
                        <div className="flex flex-row items-center">
                            <div className="flex-1 font-bold text-2xl">
                                {element}
                            </div>
                        </div>
                    </button>
                ))}
            </section>
            : <>
                {machine}
                <button onClick={() => {
                    setMachine("")
                }}
                    className="border">
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </>

    )
}
