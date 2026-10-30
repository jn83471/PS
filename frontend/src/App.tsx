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
import { Dash } from './views/Reports/Production/Dash'
import { Apps } from './views/Aplications/Apps'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PlanView } from './views/Reports/PlanView/PlanView'
import { LineMonitor } from './views/Apps/LineMonitor/LineMonitor'
import { UrsLayout } from './views/Templates/UrsLayout'
import { Urs } from './views/Apps/Urs/Welcome/Urs'
import { UrsNewRequest } from './views/Apps/Urs/Requests/UrsNewRequest'
import { UrsRequests } from './views/Apps/Urs/Requests/UrsRequests'
import { UrsAddProducts } from './views/Apps/Urs/Requests/UrsAddProducts'
import { UrsVerfication } from './views/Apps/Urs/Requests/UrsVerfication'
import { ScreensPlantView } from './views/Apps/Screens/ScreensPlantView'
import { ScreensLines } from './views/Apps/Screens/ScreensLines'
import { ScreensLineInfo } from './views/Apps/Screens/ScreensLineInfo'
import { HourXHour } from './views/Apps/HourXHour/HourXHour'
import { UrsScann } from './views/Apps/Urs/Scann/UrsScann'
import { UrsVerificateFolio } from './views/Apps/Urs/Requests/UrsVerificateFolio'
import { UrsVerficationsmts } from './views/Apps/Urs/Requests/UrsVerficationsmts'
import { UrsVerificateFolioSMTS } from './views/Apps/Urs/Requests/UrsVerificateFolioSMTS'
import { UrsScannProducts } from './views/Apps/Urs/Scann/UrsScannProducts'
import { ReinspectionLayout } from './views/Templates/ReinspectionLayout'
import { ReinspectionHome } from './views/Apps/Reinspection/ReinspectionHome'
import { SocketProvider } from './Providers/SocketProvider'
import { UrsVerficationEmb } from './views/Apps/Urs/Requests/UrsVerficationEmb'
import { UrsVerificateFoliosEmb } from './views/Apps/Urs/Requests/UrsVerificateFoliosEmb'
import { FollowScann } from './views/Apps/Urs/Scann/FollowScann'
import { FollowScannDetails } from './views/Apps/Urs/Scann/FollowScannDetails'
import { UrsVerificateRes } from './views/Apps/Urs/Requests/UrsVerificateRes'
import { UrsVerificateFoliosRes } from './views/Apps/Urs/Requests/UrsVerificateFoliosRes'
import { EmptyView } from './views/Templates/EmptyView'
import { ReinspectionDefects } from './views/Apps/Reinspection/ReinspectionDefects'
import { HXHLayout } from './views/Templates/HXHLayout'
import { HXHLine } from './Page/Apps/Urs/HourByHour/HXHLine'
import React from 'react'
import { UrsDetail } from './Page/Apps/Urs/Details/UrsDetail'
import { UrsVerificatePictures } from './views/Apps/Urs/Requests/UrsVerificatePictures'
import { PlanPage } from './Page/Plan/PlanPage'

function App() {

  return (
    <React.StrictMode>
      <SocketProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <Routes>

              <Route path='urs' element={<UrsLayout />}>
                <Route index element={<Urs />} />
                <Route path='RequestDetails/:id' element={<UrsDetail />} />
                <Route path='request' element={<UrsRequests />} />
                <Route path='newrequest' element={<UrsNewRequest />} />
                <Route path='verifications' element={<UrsVerfication />} />
                <Route path='verifications/:id' element={<UrsVerificateFolio />} />
                <Route path='verificationssmts' element={<UrsVerficationsmts />} />
                <Route path='verificationssmts/:id' element={<UrsVerificateFolioSMTS />} />
                <Route path='request/:id' element={<UrsAddProducts />} />
                <Route path='scann' element={<UrsScann />} />
                <Route path='scann/:id' element={<UrsScannProducts />} />
                <Route path='FollowScann' element={<FollowScann />} />
                <Route path='FollowScann/:id' element={<FollowScannDetails />} />
                <Route path='Evidence' element={<UrsVerificatePictures />} />
                <Route path='verificationsEmb' element={<UrsVerficationEmb />} />
                <Route path='verificationsEmb/:id' element={<UrsVerificateFoliosEmb />} />
                <Route path='verificationsRes' element={<UrsVerificateRes />} />
                <Route path='verificationsRes/:id' element={<UrsVerificateFoliosRes />} />
              </Route>
              {/*Reinspection */}
              <Route path='Reinspection' element={<ReinspectionLayout />}>
                <Route index element={<ReinspectionHome />} />
                <Route path='Defects' element={<ReinspectionDefects />} />
                <Route path='ReleaseDefect' element={<EmptyView />} />
                <Route path='RecordCount' element={<EmptyView />} />
                <Route path='RepInsp' element={<EmptyView />} />
                <Route path='RepDefect' element={<EmptyView />} />
              </Route>
              {/* Pantallas */}
              <Route path='Screens' element={<ScreensPlantView />} />
              <Route path='Screens/:plantId' element={<ScreensLines />} />
              <Route path='Screens/Code/:code' element={<ScreensLineInfo />} />
              <Route path='Screens/Line/:line' element={<ScreensLineInfo />} />

              {/*Hour By Hour */}

              <Route path='HourByHour' element={<HourXHour />} />
              <Route path='HourByHour' element={<HXHLayout />}>
                <Route path='Home' element={<HourXHour />} />
                <Route path='Line' element={<HXHLine />} />
              </Route>


              <Route element={<Layout />}>
                <Route path='LineMonitor' element={<LineMonitor />} />

                <Route path='Home' element={<Dashboard />} />
                <Route path='Machine' element={<MachinesTable />} />
                <Route path='Apps' element={<Apps />} />
                <Route path='Code' element={<CodeTable />} />
                <Route path='Plant' element={<PlantTable />} />
                <Route path='Client' element={<ClientTable />} />
                <Route path='Plan' element={<PlanPage />} />
                <Route path='reports' element={<Dash />}></Route>
                <Route path='production' element={<Production />}>
                  <Route index element={<GnrProduction />} />
                </Route>
                <Route path='productionkmh' element={<Production />} />
                <Route path='PlanView' element={<PlanView />} />
              </Route>
              <Route index element={<Login />} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </SocketProvider>
    </React.StrictMode>
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
