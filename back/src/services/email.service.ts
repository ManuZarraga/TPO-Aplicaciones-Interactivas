// back/src/services/email.service.ts
import { mailerTransporter } from '../config/mailer';
import { TurnosModel } from '../models';

export async function sendTurnoReservadoEmail(turno: TurnosModel) {
  if (!turno.email) return;

  await mailerTransporter.sendMail({
    from: `"Consultorio Cardiología" <${process.env.MAIL_USER}>`,
    to: turno.email,
    subject: 'Turno reservado',
    text: `Hola ${turno.nombre_paciente}, tu turno fue reservado para el ${turno.fecha} a las ${turno.hora}.`,
    html: `
      <p>Hola <b>${turno.nombre_paciente}</b>,</p>
      <p>Tu turno fue <b>reservado</b> para el <b>${turno.fecha}</b> a las <b>${turno.hora}</b>.</p>
    `,
  });
}

export async function sendTurnoConfirmadoEmail(turno: TurnosModel) {
  if (!turno.email) return;

  await mailerTransporter.sendMail({
    from: `"Consultorio Cardiología" <${process.env.MAIL_USER}>`,
    to: turno.email,
    subject: 'Turno confirmado',
    text: `Hola ${turno.nombre_paciente}, tu turno fue confirmado para el ${turno.fecha} a las ${turno.hora}.`,
    html: `
      <p>Hola <b>${turno.nombre_paciente}</b>,</p>
      <p>Tu turno fue <b>confirmado</b> para el <b>${turno.fecha}</b> a las <b>${turno.hora}</b>.</p>
      <p>Te esperamos.</p>
    `,
  });
}

export async function sendTurnoCanceladoEmail(turno: TurnosModel) {
  if (!turno.email) return;

  await mailerTransporter.sendMail({
    from: `"Consultorio Cardiología" <${process.env.MAIL_USER}>`,
    to: turno.email,
    subject: 'Turno cancelado',
    text: `Hola ${turno.nombre_paciente}, lamentamos informar tu turno con fecha ${turno.fecha} a las ${turno.hora} fue cancelado. Te invitamos a visitar nuestro sitio web para reservar un nuevo turno en otra fecha.`,
    html: `
      <p>Hola <b>${turno.nombre_paciente}</b>,</p>
      <p>Lamentamos informar que tu turno con fecha <b>${turno.fecha}</b> a las <b>${turno.hora}</b> fue <b>cancelado</b>.</p>
      <p>Te invitamos a visitar nuestro sitio web para reservar un nuevo turno en otra fecha.</p>
    `,
  });
}
