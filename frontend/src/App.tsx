import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './views/Welcome/Dashboard'
import Login from './views/Welcome/Login'
import { Layout } from './views/Templates/Layout'
import { MachinesTable } from './views/machines/MachinesTable'
import { Production } from './views/Reports/Production/Production'
import { GnrProduction } from './views/Reports/Production/GnrProduction'
import { CodeTable } from './views/Code/CodeTable'
import { ClientTable } from './views/Client/ClientTable'
import { PlantTable } from './views/plants/PlantTable'
import { PlanTable } from './views/Plan/PlanTable'
import { Dash } from './views/Reports/Production/Dash'
import { Apps } from './views/Aplications/Apps'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='Home' element={<Dashboard />} />
          <Route path='Machine' element={<MachinesTable />} />
          <Route path='Apps' element={<Apps />} />
          <Route path='Code' element={<CodeTable />} />
          <Route path='Plant' element={<PlantTable />} />
          <Route path='Client' element={<ClientTable />} />
          <Route path='Plan' element={<PlanTable />} />
          <Route path='reports' element={<Dash />}></Route>
          <Route path='production' element={<Production />}>
            <Route index element={<GnrProduction />} />
          </Route>
        </Route>
        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
/*
          <Route path='Home' element={<Home/>}/>
          <Route path='Plants' element={<Plants/>}/>
          <Route path='Plane' element={<Home/>}/>
          <Route path='Cars' element={<Cars/>}/>
          <Route path='Suppliers' element={<Suppliers/>}/>
          <Route path='Parking' element={<Home/>}/>
          <Route path='Employment' element={<Home/>}/>
          <Route path='Parking' element={<Home/>}/>
          <Route path='Departures' element={<Home/>}/>
          <Route path='Staff' element={<Home/>}/>
      </Route>*/
export default App
