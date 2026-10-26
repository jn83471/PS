import { sendEmail } from "../../Utils/Emails";


export const UrsSendNewRequest = ({ data, folio, title, to }) => {

    sendEmail('URS', 'Urs', to, `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>SMTS - Solicitud de Envío Urgente</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px;">
<tr>
<td align="center">

<table width="900" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td style="
            background:linear-gradient(90deg,#0f2d69,#0d5bdd);
            padding:25px;
            color:white;
        ">
            <h1 style="margin:0;font-size:38px;">SMTS</h1>
            <div style="font-size:18px;opacity:.9;">
                Urgent Request for Shipment
            </div>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:30px;">
            <table width="100%">
                <tr>
                    <td width="70%">
                        <div style="
                            color:#dc2626;
                            font-weight:bold;
                            font-size:18px;
                        ">
                            ${title.toUpperCase()}
                        </div>

                        <div style="
                            font-size:42px;
                            font-weight:700;
                            color:#0f2d69;
                            margin-top:10px;
                        ">
                            Se ha generado una nueva solicitud de envío
                            urgente en el sistema SMTS.
                        </div>

                        
                    </td>

                    <td align="center">
                    <a
href="http://172.30.190.47:5703/"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 24px;
border-radius:8px;
font-family:Arial, Helvetica, sans-serif;
font-size:14px;
font-weight:bold;
"
>
🚀 Abrir Sistema
</a>
                        <div style="
                            background:#fff1f2;
                            border:1px solid #fecdd3;
                            border-radius:12px;
                            padding:20px;
                        ">
                            <div style="
                                color:#dc2626;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                PRIORIDAD
                            </div>

                            <div style="
                                margin-top:10px;
                                background:#ef4444;
                                color:white;
                                padding:10px;
                                border-radius:8px;
                                font-size:24px;
                                font-weight:bold;
                            ">
                                URGENTE
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Información -->
    <tr>
        <td style="padding:0 30px 20px;">
            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Información General
            </div>

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Folio</b><br>
                        ${folio.id.toString().padStart(10, '0')}
                    </td>

                    <td style="
                        background:#f0fdf4;
                        border:1px solid #86efac;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Método</b><br>
                        ${folio.UrsPriority.name}
                    </td>

                </tr>

                <tr>

                    <td style="
                        background:#fffbeb;
                        border:1px solid #fcd34d;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Fecha propuesta</b><br>
                        ${new Date(folio.ProposedDate).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })}
</td>

    <td colspan = "2" style = "
background: #eff6ff;
border: 1px solid #93c5fd;
border - radius: 10px;
padding: 20px;
">
    <b> Solicitado por </b><br>
                        ${folio.RequestUser.Name}
</td>

    </tr>
    </table>
    </td>
    </tr>

    <!--Material -->
        <tr>
        <td style="padding:0 30px 20px;">

            <div style="
font - size: 22px;
font - weight: 600;
color:#0f2d69;
margin - bottom: 15px;
">
                Detalle de Material
    </div>

    <table width = "100%" cellspacing = "0" cellpadding = "12" style = "
border: 1px solid #dbe2ea;
border - collapse: collapse;
">
    <thead>
    <tr style="
background:#0d5bdd;
color: white;
">
    <th> MFG </th>
    <th> SEWS Part No </th>
        <th> Customer Part No </th>
            <th> Cliente </th>
            <th> Cantidad </th>
            </tr>
            </thead>

            <tbody>
                    ${data.map(elm => (
        `
                        <tr>
                            <td align="center">0966</td>
                        <td align="center">${elm.PartNumber}</td>
                        <td align="center">${elm.CustomerPartNumber}</td>
                        <td align="center">${elm.Customer}</td>
                        <td align="center"><b>${elm.Qty}</b></td>
                        </tr>
                        `
    ))
        }
</tbody>
    </table>

    </td>
    </tr>

    <!--Resumen -->
        <tr>
        <td style="padding:0 30px 20px;">

            <table width="100%" cellspacing = "10">

                <tr>

                <td style="
background: #faf5ff;
padding: 20px;
border - radius: 10px;
text - align: center;
">
    <div style = "color:#64748b;"> Productos </div>
        <div style = "font-size:32px;font-weight:bold;"> ${data.length} </div>
            </td>

            <td style = "
background: #f0fdf4;
padding: 20px;
border - radius: 10px;
text - align: center;
">
    <div style = "color:#64748b;"> Cantidad Total </div>
        <div style = "font-size:32px;font-weight:bold;"> ${data.reduce((acc, item) => acc + item.Qty, 0)} </div>
            </td>

            <td style = "
background: #fff1f2;
padding: 20px;
border - radius: 10px;
text - align: center;
">
    <div style = "color:#64748b;"> Prioridad </div>
        <div style = "
color: #dc2626;
font - size: 32px;
font - weight: bold;
">
URGENTE
    </div>
    </td>

    </tr>

    </table>

    </td>
    </tr>

    <!--Acción -->
        <tr>
        <td style="padding:0 30px 30px;">

            <table width="100%">
                <tr>
                <td style="
background: #eef6ff;
border: 1px solid #cbd5e1;
border - radius: 12px;
padding: 25px;
">
    <strong> Acción requerida </strong>
        <br> <br>

        Esta solicitud fue creada debido a un incremento
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body>
            </html>`)
}


export const UrsSendNewRequestVerification2 = ({ data, folio, title, to }) => {

    sendEmail('URS', 'Urs', to, `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>SMTS - Solicitud de Envío Urgente</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px;">
<tr>
<td align="center">

<table width="900" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td style="
            background:linear-gradient(90deg,#0f2d69,#0d5bdd);
            padding:25px;
            color:white;
        ">
            <h1 style="margin:0;font-size:38px;">SMTS</h1>
            <div style="font-size:18px;opacity:.9;">
                Urgent Request for Shipment
            </div>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:30px;">
            <table width="100%">
                <tr>
                    <td width="70%">
                        <div style="
                            color:#dc2626;
                            font-weight:bold;
                            font-size:18px;
                        ">
                            ${title.toUpperCase()}
                        </div>

                        <div style="
                            font-size:42px;
                            font-weight:700;
                            color:#0f2d69;
                            margin-top:10px;
                        ">
                            ${data.filter(elm=>elm.ProposedDate!=null).length==0?
                                "La solicitud ha sido aprobada. Ya puede proceder con la revisión del producto"
                                :
                                "Se han realizado modificaciones a la solicitud. Ya puede proceder con la revisión del producto."
                            }
                        </div>

                        
                    </td>

                    <td align="center">
                    <a
href="http://172.30.190.47:5703/"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 24px;
border-radius:8px;
font-family:Arial, Helvetica, sans-serif;
font-size:14px;
font-weight:bold;
"
>
🚀 Abrir Sistema
</a>
                        <div style="
                            background:#fff1f2;
                            border:1px solid #fecdd3;
                            border-radius:12px;
                            padding:20px;
                        ">
                            <div style="
                                color:#dc2626;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                PRIORIDAD
                            </div>

                            <div style="
                                margin-top:10px;
                                background:#ef4444;
                                color:white;
                                padding:10px;
                                border-radius:8px;
                                font-size:24px;
                                font-weight:bold;
                            ">
                                URGENTE
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Información -->
    <tr>
        <td style="padding:0 30px 20px;">
            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Información General
            </div>

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Folio</b><br>
                        ${folio.id.toString().padStart(10, '0')}
                    </td>

                    <td style="
                        background:#f0fdf4;
                        border:1px solid #86efac;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Método</b><br>
                        ${folio.UrsPriority.name}
                    </td>

                </tr>

                <tr>

                    <td style="
                        background:#fffbeb;
                        border:1px solid #fcd34d;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Fecha propuesta</b><br>
    ${new Date(folio.ProposedDate).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })}
                    </td>

                    <td colspan="2" style="
                        background:#eff6ff;
                        border:1px solid #93c5fd;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Solicitado por</b><br>
                        ${folio.RequestUser.Name}
                    </td>

                </tr>
            </table>
        </td>
    </tr>

    <!-- Material -->
    <tr>
        <td style="padding:0 30px 20px;">

            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Detalle de Material
            </div>

            <table width="100%" cellspacing="0" cellpadding="12" style="
                border:1px solid #dbe2ea;
                border-collapse:collapse;
            ">
                <thead>
                    <tr style="
                        background:#0d5bdd;
                        color:white;
                    ">
                        <th>MFG</th>
                        <th>Fecha</th>
                        <th>SEWS Part No</th>
                        <th>Customer Part No</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>

                <tbody>
                    ${data.map(elm => (
        `
                        <tr>
                            <td align="center">0966</td>
                    <td align="center">${new Date(elm.ProposedDate ?? folio.ProposedDate).toLocaleDateString('es-MX', {
            timeZone: "UTC",
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })}</td>
                        <td align="center">${elm.PartNumber}</td>
                        <td align="center">${elm.CustomerPartNumber}</td>
                        <td align="center">${elm.Customer}</td>
                        <td align="center"><b>${elm.Qty}</b></td>
                        <td align="center"><b>${elm.Process == 99 ? `<span style="
display:inline-block;
padding:6px 12px;
background-color:#FEF2F2;
border:1px solid #FECACA;
border-radius:8px;
color:#DC2626;
font-family:Arial, Helvetica, sans-serif;
font-size:11px;
font-weight:bold;
text-transform:uppercase;
line-height:18px;
">
● Cancelado
</span>` :
            elm.ProposedDate != null ?
                `<span style="
display:inline-block;
padding:6px 12px;
background-color:#d7d7fc;
border:1px solid #1717ad;
border-radius:8px;
color:#2727d6;
font-family:Arial, Helvetica, sans-serif;
font-size:11px;
font-weight:bold;
text-transform:uppercase;
line-height:18px;
">
● Modificado
</span>`
                :
                `<span style="
display:inline-block;
padding:6px 12px;
background-color:#F0FDF4;
border:1px solid #BBF7D0;
border-radius:8px;
color:#16A34A;
font-family:Arial, Helvetica, sans-serif;
font-size:11px;
font-weight:bold;
text-transform:uppercase;
line-height:18px;
">
● Aceptada
</span>`}</b></td>
                        </tr>
                        `
    ))}
                </tbody>
            </table>

        </td>
    </tr>

    <!-- Resumen -->
    <tr>
        <td style="padding:0 30px 20px;">

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#faf5ff;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Productos</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).length}</div>
                    </td>

                    <td style="
                        background:#f0fdf4;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Cantidad Total</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).reduce((acc, item) => acc + item.Qty, 0)}</div>
                    </td>

                    <td style="
                        background:#fff1f2;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Prioridad</div>
                        <div style="
                            color:#dc2626;
                            font-size:32px;
                            font-weight:bold;
                        ">
                            URGENTE
                        </div>
                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Acción -->
    <tr>
        <td style="padding:0 30px 30px;">

            <table width="100%">
                <tr>
                    <td style="
                        background:#eef6ff;
                        border:1px solid #cbd5e1;
                        border-radius:12px;
                        padding:25px;
                    ">
                        <strong>Acción requerida</strong>
                        <br><br>

                        Esta solicitud fue creada debido a un incremento
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</td>
</tr>
</table>
</body>
</html>`)
}

export const UrsSendNewRequestVerification3 = ({ data, folio, title, to }) => {

    sendEmail('URS', 'Urs', to, `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>SMTS - Solicitud de Envío Urgente</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px;">
<tr>
<td align="center">

<table width="900" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td style="
            background:linear-gradient(90deg,#0f2d69,#0d5bdd);
            padding:25px;
            color:white;
        ">
            <h1 style="margin:0;font-size:38px;">SMTS</h1>
            <div style="font-size:18px;opacity:.9;">
                Urgent Request for Shipment
            </div>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:30px;">
            <table width="100%">
                <tr>
                    <td width="70%">
                        <div style="
                            color:#dc2626;
                            font-weight:bold;
                            font-size:18px;
                        ">
                            ${title.toUpperCase()}
                        </div>

                        <div style="
                            font-size:42px;
                            font-weight:700;
                            color:#0f2d69;
                            margin-top:10px;
                        ">
                            Se ha generado una nueva orden pendiente de escaneo.
                        </div>

                    </td>

                    <td align="center">
                    <a
href="http://172.30.190.47:5703/"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 24px;
border-radius:8px;
font-family:Arial, Helvetica, sans-serif;
font-size:14px;
font-weight:bold;
"
>
🚀 Abrir Sistema
</a>
                        <div style="
                            background:#fff1f2;
                            border:1px solid #fecdd3;
                            border-radius:12px;
                            padding:20px;
                        ">
                            <div style="
                                color:#dc2626;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                PRIORIDAD
                            </div>

                            <div style="
                                margin-top:10px;
                                background:#ef4444;
                                color:white;
                                padding:10px;
                                border-radius:8px;
                                font-size:24px;
                                font-weight:bold;
                            ">
                                URGENTE
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Información -->
    <tr>
        <td style="padding:0 30px 20px;">
            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Información General
            </div>

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Folio</b><br>
                        ${folio.id.toString().padStart(10, '0')}
                    </td>

                    <td style="
                        background:#f0fdf4;
                        border:1px solid #86efac;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Método</b><br>
                        ${folio.UrsPriority.name}
                    </td>

                </tr>

                <tr>

                    <td style="
                        background:#fffbeb;
                        border:1px solid #fcd34d;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Fecha propuesta</b><br>
    ${new Date(folio.ProposedDate).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })}
                    </td>

                    <td colspan="2" style="
                        background:#eff6ff;
                        border:1px solid #93c5fd;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Solicitado por</b><br>
                        ${folio.RequestUser.Name}
                    </td>

                </tr>
            </table>
        </td>
    </tr>

    <!-- Material -->
    <tr>
        <td style="padding:0 30px 20px;">

            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Detalle de Material
            </div>

            <table width="100%" cellspacing="0" cellpadding="12" style="
                border:1px solid #dbe2ea;
                border-collapse:collapse;
            ">
                <thead>
                    <tr style="
                        background:#0d5bdd;
                        color:white;
                    ">
                        <th>MFG</th>
                        <th>Fecha</th>
                        <th>SEWS Part No</th>
                        <th>Customer Part No</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>

                <tbody>
                    ${data.map(elm => (
        `
                        <tr>
                            <td align="center">0966</td>
                    <td align="center">${new Date(elm.ProposedDate ?? folio.ProposedDate).toLocaleDateString('es-MX', {
            timeZone: "UTC",
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })}</td>
                        <td align="center">${elm.PartNumber}</td>
                        <td align="center">${elm.CustomerPartNumber}</td>
                        <td align="center">${elm.Customer}</td>
                        <td align="center"><b>${elm.Qty}</b></td>
                        </tr>
                        `
    ))}
                </tbody>
            </table>

        </td>
    </tr>

    <!-- Resumen -->
    <tr>
        <td style="padding:0 30px 20px;">

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#faf5ff;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Productos</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).length}</div>
                    </td>

                    <td style="
                        background:#f0fdf4;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Cantidad Total</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).reduce((acc, item) => acc + item.Qty, 0)}</div>
                    </td>

                    <td style="
                        background:#fff1f2;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Prioridad</div>
                        <div style="
                            color:#dc2626;
                            font-size:32px;
                            font-weight:bold;
                        ">
                            URGENTE
                        </div>
                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Acción -->
    <tr>
        <td style="padding:0 30px 30px;">

            <table width="100%">
                <tr>
                    <td style="
                        background:#eef6ff;
                        border:1px solid #cbd5e1;
                        border-radius:12px;
                        padding:25px;
                    ">
                        <strong>Acción requerida</strong>
                        <br><br>

                        Esta solicitud fue creada debido a un incremento
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</td>
</tr>
</table>
</body>
</html>`)
}
export const UrsSendNewRequestVerification32 = ({ data, folio, title, to }) => {

    sendEmail('URS', 'Urs', to, `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>SMTS - Solicitud de Envío Urgente</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px;">
<tr>
<td align="center">

<table width="900" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td style="
            background:linear-gradient(90deg,#0f2d69,#0d5bdd);
            padding:25px;
            color:white;
        ">
            <h1 style="margin:0;font-size:38px;">SMTS</h1>
            <div style="font-size:18px;opacity:.9;">
                Urgent Request for Shipment
            </div>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:30px;">
            <table width="100%">
                <tr>
                    <td width="70%">
                        <div style="
                            color:#dc2626;
                            font-weight:bold;
                            font-size:18px;
                        ">
                            ${title.toUpperCase()}
                        </div>

                        <div style="
                            font-size:42px;
                            font-weight:700;
                            color:#0f2d69;
                            margin-top:10px;
                        ">
                           Se ha completado una nueva orden pendiente de escaneo. 
                        </div>

                    </td>

                    <td align="center">
                    <a
href="http://172.30.190.47:5703/"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 24px;
border-radius:8px;
font-family:Arial, Helvetica, sans-serif;
font-size:14px;
font-weight:bold;
"
>
🚀 Abrir Sistema
</a>
                        <div style="
                            background:#fff1f2;
                            border:1px solid #fecdd3;
                            border-radius:12px;
                            padding:20px;
                        ">
                            <div style="
                                color:#dc2626;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                PRIORIDAD
                            </div>

                            <div style="
                                margin-top:10px;
                                background:#ef4444;
                                color:white;
                                padding:10px;
                                border-radius:8px;
                                font-size:24px;
                                font-weight:bold;
                            ">
                                URGENTE
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Información -->
    <tr>
        <td style="padding:0 30px 20px;">
            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Información General
            </div>

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Folio</b><br>
                        ${folio.id.toString().padStart(10, '0')}
                    </td>

                    <td style="
                        background:#f0fdf4;
                        border:1px solid #86efac;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Método</b><br>
                        ${folio.UrsPriority.name}
                    </td>

                </tr>

                <tr>

                    <td style="
                        background:#fffbeb;
                        border:1px solid #fcd34d;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Fecha propuesta</b><br>
    ${new Date(folio.ProposedDate).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })}
                    </td>

                    <td colspan="2" style="
                        background:#eff6ff;
                        border:1px solid #93c5fd;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Solicitado por</b><br>
                        ${folio.RequestUser.Name}
                    </td>

                </tr>
            </table>
        </td>
    </tr>

    <!-- Material -->
    <tr>
        <td style="padding:0 30px 20px;">

            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Detalle de Material
            </div>

            <table width="100%" cellspacing="0" cellpadding="12" style="
                border:1px solid #dbe2ea;
                border-collapse:collapse;
            ">
                <thead>
                    <tr style="
                        background:#0d5bdd;
                        color:white;
                    ">
                        <th>MFG</th>
                        <th>Fecha</th>
                        <th>SEWS Part No</th>
                        <th>Customer Part No</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>

                <tbody>
                    ${data.map(elm => (
        `
                        <tr>
                            <td align="center">0966</td>
                    <td align="center">${new Date(elm.ProposedDate ?? folio.ProposedDate).toLocaleDateString('es-MX', {
            timeZone: "UTC",
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })}</td>
                        <td align="center">${elm.PartNumber}</td>
                        <td align="center">${elm.CustomerPartNumber}</td>
                        <td align="center">${elm.Customer}</td>
                        <td align="center"><b>${elm.Qty}</b></td>
                        </tr>
                        `
    ))}
                </tbody>
            </table>

        </td>
    </tr>

    <!-- Resumen -->
    <tr>
        <td style="padding:0 30px 20px;">

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#faf5ff;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Productos</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).length}</div>
                    </td>

                    <td style="
                        background:#f0fdf4;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Cantidad Total</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).reduce((acc, item) => acc + item.Qty, 0)}</div>
                    </td>

                    <td style="
                        background:#fff1f2;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Prioridad</div>
                        <div style="
                            color:#dc2626;
                            font-size:32px;
                            font-weight:bold;
                        ">
                            URGENTE
                        </div>
                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Acción -->
    <tr>
        <td style="padding:0 30px 30px;">

            <table width="100%">
                <tr>
                    <td style="
                        background:#eef6ff;
                        border:1px solid #cbd5e1;
                        border-radius:12px;
                        padding:25px;
                    ">
                        <strong>Acción requerida</strong>
                        <br><br>

                        Esta solicitud fue creada debido a un incremento
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</td>
</tr>
</table>
</body>
</html>`)
}

export const UrsSendNewRequestVerification4 = ({ data, folio, title, to }) => {

    sendEmail('URS', 'Urs', to, `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>SMTS - Solicitud de Envío Urgente</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px;">
<tr>
<td align="center">

<table width="900" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td style="
            background:linear-gradient(90deg,#0f2d69,#0d5bdd);
            padding:25px;
            color:white;
        ">
            <h1 style="margin:0;font-size:38px;">SMTS</h1>
            <div style="font-size:18px;opacity:.9;">
                Urgent Request for Shipment
            </div>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:30px;">
            <table width="100%">
                <tr>
                    <td width="70%">
                        <div style="
                            color:#dc2626;
                            font-weight:bold;
                            font-size:18px;
                        ">
                            ${title.toUpperCase()}
                        </div>

                        <div style="
                            font-size:42px;
                            font-weight:700;
                            color:#0f2d69;
                            margin-top:10px;
                        ">
                            El pedido ha sido escaneado y está pendiente de verificación.
                        </div>
                    </td>

                    <td align="center">
                    <a
href="http://172.30.190.47:5703/"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 24px;
border-radius:8px;
font-family:Arial, Helvetica, sans-serif;
font-size:14px;
font-weight:bold;
"
>
🚀 Abrir Sistema
</a>
                        <div style="
                            background:#fff1f2;
                            border:1px solid #fecdd3;
                            border-radius:12px;
                            padding:20px;
                        ">
                            <div style="
                                color:#dc2626;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                PRIORIDAD
                            </div>

                            <div style="
                                margin-top:10px;
                                background:#ef4444;
                                color:white;
                                padding:10px;
                                border-radius:8px;
                                font-size:24px;
                                font-weight:bold;
                            ">
                                URGENTE
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Información -->
    <tr>
        <td style="padding:0 30px 20px;">
            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Información General
            </div>

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Folio</b><br>
                        ${folio.id.toString().padStart(10, '0')}
                    </td>

                    <td style="
                        background:#f0fdf4;
                        border:1px solid #86efac;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Método</b><br>
                        ${folio.UrsPriority.name}
                    </td>

                </tr>

                <tr>

                    <td style="
                        background:#fffbeb;
                        border:1px solid #fcd34d;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Fecha propuesta</b><br>
    ${new Date(folio.ProposedDate).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })}
                    </td>

                    <td colspan="2" style="
                        background:#eff6ff;
                        border:1px solid #93c5fd;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Solicitado por</b><br>
                        ${folio.RequestUser.Name}
                    </td>

                </tr>
            </table>
        </td>
    </tr>

    <!-- Material -->
    <tr>
        <td style="padding:0 30px 20px;">

            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Detalle de Material
            </div>

            <table width="100%" cellspacing="0" cellpadding="12" style="
                border:1px solid #dbe2ea;
                border-collapse:collapse;
            ">
                <thead>
                    <tr style="
                        background:#0d5bdd;
                        color:white;
                    ">
                        <th>MFG</th>
                        <th>Fecha</th>
                        <th>SEWS Part No</th>
                        <th>Customer Part No</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>

                <tbody>
                    ${data.map(elm => (
        `
                        <tr>
                            <td align="center">0966</td>
                    <td align="center">${new Date(elm.ProposedDate ?? folio.ProposedDate).toLocaleDateString('es-MX', {
            timeZone: "UTC",
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })}</td>
                        <td align="center">${elm.PartNumber}</td>
                        <td align="center">${elm.CustomerPartNumber}</td>
                        <td align="center">${elm.Customer}</td>
                        <td align="center"><b>${elm.Qty}</b></td>
                        </tr>
                        `
    ))}
                </tbody>
            </table>

        </td>
    </tr>

    <!-- Resumen -->
    <tr>
        <td style="padding:0 30px 20px;">

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#faf5ff;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Productos</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).length}</div>
                    </td>

                    <td style="
                        background:#f0fdf4;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Cantidad Total</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).reduce((acc, item) => acc + item.Qty, 0)}</div>
                    </td>

                    <td style="
                        background:#fff1f2;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Prioridad</div>
                        <div style="
                            color:#dc2626;
                            font-size:32px;
                            font-weight:bold;
                        ">
                            URGENTE
                        </div>
                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Acción -->
    <tr>
        <td style="padding:0 30px 30px;">

            <table width="100%">
                <tr>
                    <td style="
                        background:#eef6ff;
                        border:1px solid #cbd5e1;
                        border-radius:12px;
                        padding:25px;
                    ">
                        <strong>Acción requerida</strong>
                        <br><br>

                        Esta solicitud fue creada debido a un incremento
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</td>
</tr>
</table>
</body>
</html>`)
}

export const UrsSendNewRequestVerification5 = ({ data, folio, title, to }) => {

    sendEmail('URS', 'Urs', to, `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>SMTS - Solicitud de Envío Urgente</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px;">
<tr>
<td align="center">

<table width="900" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td style="
            background:linear-gradient(90deg,#0f2d69,#0d5bdd);
            padding:25px;
            color:white;
        ">
            <h1 style="margin:0;font-size:38px;">SMTS</h1>
            <div style="font-size:18px;opacity:.9;">
                Urgent Request for Shipment
            </div>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:30px;">
            <table width="100%">
                <tr>
                    <td width="70%">
                        <div style="
                            color:#dc2626;
                            font-weight:bold;
                            font-size:18px;
                        ">
                            ${title.toUpperCase()}
                        </div>

                        <div style="
                            font-size:42px;
                            font-weight:700;
                            color:#0f2d69;
                            margin-top:10px;
                        ">
                            Orden embarcada en ASN
                        </div>

                    </td>

                    <td align="center">
                    <a
href="http://172.30.190.47:5703/"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 24px;
border-radius:8px;
font-family:Arial, Helvetica, sans-serif;
font-size:14px;
font-weight:bold;
"
>
🚀 Abrir Sistema
</a>
                        <div style="
                            background:#fff1f2;
                            border:1px solid #fecdd3;
                            border-radius:12px;
                            padding:20px;
                        ">
                            <div style="
                                color:#dc2626;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                PRIORIDAD
                            </div>

                            <div style="
                                margin-top:10px;
                                background:#ef4444;
                                color:white;
                                padding:10px;
                                border-radius:8px;
                                font-size:24px;
                                font-weight:bold;
                            ">
                                URGENTE
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Información -->
    <tr>
        <td style="padding:0 30px 20px;">
            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Información General
            </div>

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Folio</b><br>
                        ${folio.id.toString().padStart(10, '0')}
                    </td>

                    <td style="
                        background:#f0fdf4;
                        border:1px solid #86efac;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Método</b><br>
                        ${folio.UrsPriority.name}
                    </td>

                </tr>

                <tr>

                    <td style="
                        background:#fffbeb;
                        border:1px solid #fcd34d;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Fecha propuesta</b><br>
    ${new Date(folio.ProposedDate).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })}
                    </td>

                    <td colspan="2" style="
                        background:#eff6ff;
                        border:1px solid #93c5fd;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Solicitado por</b><br>
                        ${folio.RequestUser.Name}
                    </td>

                </tr>
            </table>
        </td>
    </tr>

    <!-- Material -->
    <tr>
        <td style="padding:0 30px 20px;">

            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Detalle de Material
            </div>

            <table width="100%" cellspacing="0" cellpadding="12" style="
                border:1px solid #dbe2ea;
                border-collapse:collapse;
            ">
                <thead>
                    <tr style="
                        background:#0d5bdd;
                        color:white;
                    ">
                        <th>MFG</th>
                        <th>Fecha</th>
                        <th>SEWS Part No</th>
                        <th>Customer Part No</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>

                <tbody>
                    ${data.map(elm => (
        `
                        <tr>
                            <td align="center">0966</td>
                    <td align="center">${new Date(elm.ProposedDate ?? folio.ProposedDate).toLocaleDateString('es-MX', {
            timeZone: "UTC",
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })}</td>
                        <td align="center">${elm.PartNumber}</td>
                        <td align="center">${elm.CustomerPartNumber}</td>
                        <td align="center">${elm.Customer}</td>
                        <td align="center"><b>${elm.Qty}</b></td>
                        </tr>
                        `
    ))}
                </tbody>
            </table>

        </td>
    </tr>

    <!-- Resumen -->
    <tr>
        <td style="padding:0 30px 20px;">

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#faf5ff;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Productos</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).length}</div>
                    </td>

                    <td style="
                        background:#f0fdf4;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Cantidad Total</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).reduce((acc, item) => acc + item.Qty, 0)}</div>
                    </td>

                    <td style="
                        background:#fff1f2;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Prioridad</div>
                        <div style="
                            color:#dc2626;
                            font-size:32px;
                            font-weight:bold;
                        ">
                            URGENTE
                        </div>
                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Acción -->
    <tr>
        <td style="padding:0 30px 30px;">

            <table width="100%">
                <tr>
                    <td style="
                        background:#eef6ff;
                        border:1px solid #cbd5e1;
                        border-radius:12px;
                        padding:25px;
                    ">
                        <strong>Acción requerida</strong>
                        <br><br>

                        Esta solicitud fue creada debido a un incremento
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</td>
</tr>
</table>
</body>
</html>`)
}

export const UrsSendNewRequestVerification6 = ({ data, folio, title, to }) => {

    sendEmail('URS', 'Urs', to, `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>SMTS - Solicitud de Envío Urgente</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px;">
<tr>
<td align="center">

<table width="900" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td style="
            background:linear-gradient(90deg,#0f2d69,#0d5bdd);
            padding:25px;
            color:white;
        ">
            <h1 style="margin:0;font-size:38px;">SMTS</h1>
            <div style="font-size:18px;opacity:.9;">
                Urgent Request for Shipment
            </div>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:30px;">
            <table width="100%">
                <tr>
                    <td width="70%">
                        <div style="
                            color:#dc2626;
                            font-weight:bold;
                            font-size:18px;
                        ">
                            ${title.toUpperCase()}
                        </div>

                        <div style="
                            font-size:42px;
                            font-weight:700;
                            color:#0f2d69;
                            margin-top:10px;
                        ">
                           El pedido fue entregado y verificado
                        </div>

                    </td>

                    <td align="center">
                    <a
href="http://172.30.190.47:5703/"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 24px;
border-radius:8px;
font-family:Arial, Helvetica, sans-serif;
font-size:14px;
font-weight:bold;
"
>
🚀 Abrir Sistema
</a>
                        <div style="
                            background:#fff1f2;
                            border:1px solid #fecdd3;
                            border-radius:12px;
                            padding:20px;
                        ">
                            <div style="
                                color:#dc2626;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                PRIORIDAD
                            </div>

                            <div style="
                                margin-top:10px;
                                background:#ef4444;
                                color:white;
                                padding:10px;
                                border-radius:8px;
                                font-size:24px;
                                font-weight:bold;
                            ">
                                URGENTE
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Información -->
    <tr>
        <td style="padding:0 30px 20px;">
            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Información General
            </div>

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Folio</b><br>
                        ${folio.id.toString().padStart(10, '0')}
                    </td>

                    <td style="
                        background:#f0fdf4;
                        border:1px solid #86efac;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Método</b><br>
                        ${folio.UrsPriority.name}
                    </td>

                </tr>

                <tr>

                    <td style="
                        background:#fffbeb;
                        border:1px solid #fcd34d;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Fecha propuesta</b><br>
    ${new Date(folio.ProposedDate).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })}
                    </td>

                    <td colspan="2" style="
                        background:#eff6ff;
                        border:1px solid #93c5fd;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Solicitado por</b><br>
                        ${folio.RequestUser.Name}
                    </td>

                </tr>
            </table>
        </td>
    </tr>

    <!-- Material -->
    <tr>
        <td style="padding:0 30px 20px;">

            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Detalle de Material
            </div>

            <table width="100%" cellspacing="0" cellpadding="12" style="
                border:1px solid #dbe2ea;
                border-collapse:collapse;
            ">
                <thead>
                    <tr style="
                        background:#0d5bdd;
                        color:white;
                    ">
                        <th>MFG</th>
                        <th>Fecha</th>
                        <th>SEWS Part No</th>
                        <th>Customer Part No</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>

                <tbody>
                    ${data.map(elm => (
        `
                        <tr>
                            <td align="center">0966</td>
                    <td align="center">${new Date(elm.ProposedDate ?? folio.ProposedDate).toLocaleDateString('es-MX', {
            timeZone: "UTC",
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })}</td>
                        <td align="center">${elm.PartNumber}</td>
                        <td align="center">${elm.CustomerPartNumber}</td>
                        <td align="center">${elm.Customer}</td>
                        <td align="center"><b>${elm.Qty}</b></td>
                        </tr>
                        `
    ))}
                </tbody>
            </table>

        </td>
    </tr>

    <!-- Resumen -->
    <tr>
        <td style="padding:0 30px 20px;">

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#faf5ff;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Productos</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).length}</div>
                    </td>

                    <td style="
                        background:#f0fdf4;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Cantidad Total</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).reduce((acc, item) => acc + item.Qty, 0)}</div>
                    </td>

                    <td style="
                        background:#fff1f2;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Prioridad</div>
                        <div style="
                            color:#dc2626;
                            font-size:32px;
                            font-weight:bold;
                        ">
                            URGENTE
                        </div>
                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Acción -->
    <tr>
        <td style="padding:0 30px 30px;">

            <table width="100%">
                <tr>
                    <td style="
                        background:#eef6ff;
                        border:1px solid #cbd5e1;
                        border-radius:12px;
                        padding:25px;
                    ">
                        <strong>Acción requerida</strong>
                        <br><br>

                        Esta solicitud fue creada debido a un incremento
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</td>
</tr>
</table>
</body>
</html>`)
}

export const UrsSendNewRequestVerificationCancel = ({ data, folio, title, to }) => {

    sendEmail('URS', 'Urs', to, `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>SMTS - Solicitud de Envío Urgente</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f9;font-family:Segoe UI,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px;">
<tr>
<td align="center">

<table width="900" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
        <td style="
            background:linear-gradient(90deg,#0f2d69,#0d5bdd);
            padding:25px;
            color:white;
        ">
            <h1 style="margin:0;font-size:38px;">SMTS</h1>
            <div style="font-size:18px;opacity:.9;">
                Urgent Request for Shipment
            </div>
        </td>
    </tr>

    <!-- Title -->
    <tr>
        <td style="padding:30px;">
            <table width="100%">
                <tr>
                    <td width="70%">
                        <div style="
                            color:#dc2626;
                            font-weight:bold;
                            font-size:18px;
                        ">
                            ${title.toUpperCase()}
                        </div>

                        <div style="
                            font-size:42px;
                            font-weight:700;
                            color:#0f2d69;
                            margin-top:10px;
                        ">
                           Pedido cancelado
                        </div>

                    </td>

                    <td align="center">
                    <a
href="http://172.30.190.47:5703/"
target="_blank"
style="
display:inline-block;
background:#2563eb;
color:#ffffff;
text-decoration:none;
padding:12px 24px;
border-radius:8px;
font-family:Arial, Helvetica, sans-serif;
font-size:14px;
font-weight:bold;
"
>
🚀 Abrir Sistema
</a>
                        <div style="
                            background:#fff1f2;
                            border:1px solid #fecdd3;
                            border-radius:12px;
                            padding:20px;
                        ">
                            <div style="
                                color:#dc2626;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                PRIORIDAD
                            </div>

                            <div style="
                                margin-top:10px;
                                background:#ef4444;
                                color:white;
                                padding:10px;
                                border-radius:8px;
                                font-size:24px;
                                font-weight:bold;
                            ">
                                URGENTE
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <!-- Información -->
    <tr>
        <td style="padding:0 30px 20px;">
            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Información General
            </div>

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#eff6ff;
                        border:1px solid #bfdbfe;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Folio</b><br>
                        ${folio.id.toString().padStart(10, '0')}
                    </td>

                    <td style="
                        background:#f0fdf4;
                        border:1px solid #86efac;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Método</b><br>
                        ${folio.UrsPriority.name}
                    </td>

                </tr>

                <tr>

                    <td style="
                        background:#fffbeb;
                        border:1px solid #fcd34d;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Fecha propuesta</b><br>
    ${new Date(folio.ProposedDate).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })}
                    </td>

                    <td colspan="2" style="
                        background:#eff6ff;
                        border:1px solid #93c5fd;
                        border-radius:10px;
                        padding:20px;
                    ">
                        <b>Solicitado por</b><br>
                        ${folio.RequestUser.Name}
                    </td>

                </tr>
            </table>
        </td>
    </tr>

    <!-- Material -->
    <tr>
        <td style="padding:0 30px 20px;">

            <div style="
                font-size:22px;
                font-weight:600;
                color:#0f2d69;
                margin-bottom:15px;
            ">
                Detalle de Material
            </div>

            <table width="100%" cellspacing="0" cellpadding="12" style="
                border:1px solid #dbe2ea;
                border-collapse:collapse;
            ">
                <thead>
                    <tr style="
                        background:#0d5bdd;
                        color:white;
                    ">
                        <th>MFG</th>
                        <th>Fecha</th>
                        <th>SEWS Part No</th>
                        <th>Customer Part No</th>
                        <th>Cliente</th>
                        <th>Cantidad</th>
                        <th>Estatus</th>
                    </tr>
                </thead>

                <tbody>
                    ${data.map(elm => (
        `
                        <tr>
                            <td align="center">0966</td>
                    <td align="center">${new Date(elm.ProposedDate ?? folio.ProposedDate).toLocaleDateString('es-MX', {
            timeZone: "UTC",
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })}</td>
                        <td align="center">${elm.PartNumber}</td>
                        <td align="center">${elm.CustomerPartNumber}</td>
                        <td align="center">${elm.Customer}</td>
                        <td align="center"><b>${elm.Qty}</b></td>
                        </tr>
                        `
    ))}
                </tbody>
            </table>

        </td>
    </tr>

    <!-- Resumen -->
    <tr>
        <td style="padding:0 30px 20px;">

            <table width="100%" cellspacing="10">

                <tr>

                    <td style="
                        background:#faf5ff;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Productos</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).length}</div>
                    </td>

                    <td style="
                        background:#f0fdf4;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Cantidad Total</div>
                        <div style="font-size:32px;font-weight:bold;">${data.filter(x => x.Process != 99).reduce((acc, item) => acc + item.Qty, 0)}</div>
                    </td>

                    <td style="
                        background:#fff1f2;
                        padding:20px;
                        border-radius:10px;
                        text-align:center;
                    ">
                        <div style="color:#64748b;">Prioridad</div>
                        <div style="
                            color:#dc2626;
                            font-size:32px;
                            font-weight:bold;
                        ">
                            URGENTE
                        </div>
                    </td>

                </tr>

            </table>

        </td>
    </tr>

    <!-- Acción -->
    <tr>
        <td style="padding:0 30px 30px;">

            <table width="100%">
                <tr>
                    <td style="
                        background:#eef6ff;
                        border:1px solid #cbd5e1;
                        border-radius:12px;
                        padding:25px;
                    ">
                        <strong>Acción requerida</strong>
                        <br><br>

                        Esta solicitud fue creada debido a un incremento
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</td>
</tr>
</table>
</body>
</html>`)
}