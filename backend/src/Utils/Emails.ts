import nodemailer from 'nodemailer';
import path from 'path';
 
const transporter = nodemailer.createTransport({
  host: '172.30.55.74',
  port: 25,
  secure: false,
  tls: { rejectUnauthorized: false },
  logger: false,
  debug: false,
});
 
export async function sendEmail(asunto,app,to, mensaje//, adjuntoPath
    ) {
  const mailOptions = {
    from: `"${app}" <${app}@sewsus.com.mx>`,
    to: to,
    subject: asunto,
    html: mensaje,
    /*attachments: [
      {
        filename: 'reporte_proyectos.pdf',
        path: adjuntoPath,
      }
    ]*/
  };
 
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Correo enviado:', info.messageId);
  } catch (error) {
    console.error('❌ Error enviando correo:', error);
  }
}
 
 