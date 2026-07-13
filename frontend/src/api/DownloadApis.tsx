import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { MachineForm } from "../types/MachineForm"


export const DownloadPlan = async () => {
    try {
        const url = `/download/plan`
        const response = await api.get(url, {
            responseType: 'blob'
        });

        // Crear archivo descargable
        const urls = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urls;
        link.setAttribute('download', 'PlanFormat.xlsx'); // nombre archivo
        document.body.appendChild(link);
        link.click();

        // limpieza
        link.remove();
        window.URL.revokeObjectURL(urls);

    } catch (error) {
        console.error('Error descargando archivo:', error);
    }
};
