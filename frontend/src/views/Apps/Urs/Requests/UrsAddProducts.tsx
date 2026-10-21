import { useEffect, useMemo, useState } from "react"
import { FirstVerify, ursCancelFolio, UrsGetFolioById } from "../../../../api/Apps/Urs/UrsPriorityApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { UrsVerificateFolio } from "../../../../types/Urs/UrsRequestFolio"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { GetUrsRequest } from "../../../../api/Apps/Urs/UrsRequestApi"
import { GetTimeZone } from "../../../../hook/GetTimeZone"
import { useAuthWithApps } from "../../../../hook/useAuth"
import { UrsAddProductsDesktop } from "../../../../components/Apps/Urs/UrsAddProducts/UrsAddProductsDesktop"
import { isMobile, isTabletOnly } from "../../../../Utils/Media"
import { UrsAddProductsMobile } from "../../../../components/Apps/Urs/UrsAddProducts/UrsAddProductsMobile"
import { CreateUrsProductColumns } from "../../../../Utils/Urs/CreateUrsColumns"

export const UrsAddProducts = () => {
    const User = useAuthWithApps()

    const Navigates = useNavigate()
    const [modal, setModal] = useState(false)
    const { id } = useParams()

    const TimeZone = GetTimeZone(User?.data?.TimeZone)


    const { data, isError, isLoading, error, refetch } = useQuery({
        queryKey: ['UrsFolio', id],
        queryFn: () => UrsGetFolioById(id),
        retry: false
    })

    const Requests = useQuery({
        queryKey: ['UrsRequests', id],
        queryFn: () => GetUrsRequest(id),
        retry: false
    })

    console.log(Requests?.data)

    const { mutate } = useMutation({
        mutationFn: FirstVerify,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            Navigates('/urs/request')
        }
    })

    const FolioActions = useMutation({
        mutationFn: ursCancelFolio,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            Navigates('/urs/request')
        }
    })
    const HandleVeryfyFolio = (e) => {
        e.preventDefault()
        const dt: UrsVerificateFolio = {
            Verify: 1,
        }
        console.log(dt)

        mutate({ formData: dt, idFolio: id })
    }
    const HandleCancelFolio = () => {
        const dt: UrsVerificateFolio = {
            Verify: 1,
        }
        console.log(dt)

        FolioActions.mutate({ idFolio: id })
    }


    useEffect(() => {
        const loadData = async () => {
            console.log(data?.id)
            //await setPlant(data[0].id.toString());
            //console.log(plant)
            if (data?.Process == 99) {
                Navigates('/urs/request')
            }
        }
        //if (data?.length > 0) {
        loadData()
        //}
    }, [data]);

    const column = useMemo(
        () => {
            /*const column: GridColDef = {
                field: 'acciones',
                headerName: 'Ver',
                width: 70,
                renderCell: (params) => (
                    <>
                        <Button
                            variant="contained"
                            size="small"

                            onClick={() => {
                                if (params.row.id == detailsId.id) {
                                    setDetailsId({
                                        id: 0,
                                        Verify: 0
                                    })
                                }
                                else {
                                    setDetailsId(params.row)
                                }

                            }}
                            style={{
                                marginRight: 8,
                                paddingLeft: 5,
                                paddingRight: 5,
                                backgroundColor: "transparent",
                                color: "black",
                                border: "0 !important",
                                boxShadow: "none",
                                width: "100%"
                            }}
                        >
                            <FontAwesomeIcon icon={faEye} className='pr-1' />
                        </Button>
                    </>
                ),
            }*/
            const cols = CreateUrsProductColumns(
                TimeZone,
                null
            )
            console.log(cols);
            return cols
        }, [TimeZone, data]);

    return (

        (isMobile && !isTabletOnly) ?
            <UrsAddProductsMobile id={id} data={data} TimeZone={TimeZone} Requests={Requests}
                HandleCancelFolio={HandleCancelFolio} HandleVeryfyFolio={HandleVeryfyFolio} modal={modal} setModal={setModal} refetch={refetch} />
            :
            <UrsAddProductsDesktop id={id} data={data} TimeZone={TimeZone} Requests={Requests} column={column}
                HandleCancelFolio={HandleCancelFolio} HandleVeryfyFolio={HandleVeryfyFolio} modal={modal} setModal={setModal} refetch={refetch} />



    )
}
