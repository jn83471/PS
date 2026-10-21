import { useQuery } from "@tanstack/react-query";
import { getUser, getUserApps } from "../api/AuthApis";



export const useAuth=()=>{
    const {data,isError,isLoading}=useQuery({
        queryKey:['user'],
        queryFn: getUser,
        retry:false,
        refetchOnWindowFocus:false
    })
    return {data,isError,isLoading}
}
export const useAuthWithApps=()=>{
    const {data,isError,isLoading}=useQuery({
        queryKey:['userApps'],
        queryFn: getUserApps,
        retry:false,
        refetchOnWindowFocus:false
    })
    return {data,isError,isLoading}
}
