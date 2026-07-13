import { DownloadPlan } from "../../api/DownloadApis"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const PlanTable = () => {
  const DownloadFile = () => {
    DownloadPlan()
  }

  return (
    <>
      <div className="flex-1 min-w-0 p-4">

        <div className='bg-[#1a1d25] rounded-xl py-5 px-2 w-full min-h-[75vh]'>
          <section className="flex justify-between">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Years in descending order"
                openTo="year"
                views={['year', 'month']}
                yearsOrder="desc"
                sx={{
                  '& .MuiInputBase-input': {

                    color: '#fff',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#ccc',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#fff',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#fff',
                  },

                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#fff',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                  {
                    borderColor: '#fff',
                  },

                  '& .MuiSvgIcon-root': {

                    color: '#fff',
                  },
                  '& input::placeholder': {
                    color: '#ccc',
                    opacity: 1,
                  },
                }}

              />
            </LocalizationProvider>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
              onClick={DownloadFile}>Descargar</button>
          </section>
        </div>
      </div>
    </>
  )
}
