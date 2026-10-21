import Timeline from "@mui/lab/Timeline"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import { GridCheckCircleIcon } from "@mui/x-data-grid"



import EmailIcon from '@mui/icons-material/Email';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { formatDateTimeZone, formatDateTimeZoneComplete } from "../../../Utils/Date"

export const UrsTimeLine = ({data,TimeZone}) => {
    return (
        <Timeline sx={{
            [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
            },
            '.MuiTimeline-root MuiTimeline-positionRight, .css-uxg07t-MuiTimeline-root': {
                flex: 0,
                padding: 0,
            }
        }}>
            {/*['Solicitado','REVISION CPLOCAL', 'REVISION SMTS ', 'EN ESCANEO ', 'EMBARCADA']*/}
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot sx={{
                        backgroundColor: "blue"
                    }}>
                        <EmailIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <div>
                        <p className="font-bold">
                            Solicitado
                        </p>
                        <p>
                            {
                                formatDateTimeZoneComplete(data?.createdAt,TimeZone)
                                

                            }
                        </p>
                        <p className="text-sm text-gray-400">
                            Solicitado por {data?.RequestUser?.Name}
                        </p>
                    </div>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot sx={{
                        backgroundColor: data?.FinishUser ? "blue" : "#bdbdbd"
                    }}>
                        <GridCheckCircleIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <div>
                        <p className="font-bold">
                            REVISION CPLOCAL
                        </p>
                        {data?.DeliveryDay && <><p>
                            {
                                formatDateTimeZoneComplete(data?.DeliveryDay,TimeZone)
                                

                            }
                        </p>
                        </>
                        }
                        {data?.FinishUser && <>

                            <p className="text-sm text-gray-400">
                                Verificado por {data?.FinishUser?.Name}
                            </p>
                        </>}
                    </div>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot sx={{
                        backgroundColor: data?.FinishUserSMTSDate ? "blue" : "#bdbdbd"
                    }}>
                        <LocalShippingIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <div>
                        <p className="font-bold">
                            REVISION SMTS
                        </p>
                        {data?.FinishUserSMTSDate && <><p>
                            {
                                formatDateTimeZoneComplete(data?.FinishUserSMTSDate,TimeZone)
                            }
                        </p>
                        </>
                        }
                        {data?.FinishUserSMTS && <>

                            <p className="text-sm text-gray-400">
                                Verificado por {data?.FinishUserSMTS?.Name}
                            </p>
                        </>}
                    </div>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot sx={{
                        backgroundColor: data?.LastProcessDay ? "blue" : "#bdbdbd"
                    }}>
                        <FlightTakeoffIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                    <div>
                        <p className="font-bold">
                            EN ESCANEO
                        </p>
                        {data?.LastProcessDay && <><p>
                            {
                                formatDateTimeZoneComplete(data?.LastProcessDay,TimeZone)

                            }
                        </p>
                        </>}
                    </div>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot sx={{
                        backgroundColor: data?.ClosedDay ? "blue" : "#bdbdbd"
                    }}>
                        <StorefrontIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                    <div>
                        <p className="font-bold">
                            EMBARCADA
                        </p>
                        {data?.ClosedDay && <><p>
                            {
                                formatDateTimeZoneComplete(data?.ClosedDay,TimeZone)

                            }
                        </p>
                        </>}
                    </div>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    )
}
