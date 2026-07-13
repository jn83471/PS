import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";


type MenuItemProp = {
  label: string,
  link: string,
  events?: (() => void) | null,
  active: boolean,
  icon:any
}
export const MenuItem = ({ label, active, link,icon, events }: MenuItemProp) => {
  if (events != null) {
    return (

      <button onClick={() => events()}
        className={`px-4 py-2 rounded-lg cursor-pointer block
      ${active ? "bg-purple-600" : "hover:bg-zinc-800"}`}
      >
        {label}
      </button>
    );
  }
  else {

    return (

      <NavLink to={link}
        className={({isActive })=> (isActive ?"bg-purple-600 hover:bg-purple-500 ":"" )+" px-4 py-3 rounded-lg cursor-pointer block hover:bg-purple-400 text-sm"}
      >
        <FontAwesomeIcon className="pr-2 text-xl" icon={icon}/>
        {label}
      </NavLink>
    );
  }

}
