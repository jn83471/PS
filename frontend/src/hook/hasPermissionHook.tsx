export const hasPermission = (
    app: string,
    user: any,
    permissionKey: string,
    useLevel:boolean=true
): boolean => {

    /*const hasScann = user.UserHasApps.some(app => {
        if (app.Apps.KEY == app) {
            app.Apps.AppsPermision.some(
                permission => permission.KEY === "SCANN"
            )
        }
    })*/
    const hasScann = true
    const appSelected=user.UserHasApps.find(x=>x.Apps.KEY==app)?.Apps?.AppsPermision?.find(x=>x.KEY==permissionKey)?.UserHasPermisions?.length
    ??0
    const level=user?.Rols?.Level??1
    
    return (appSelected>0) || (level==0 && useLevel)
};