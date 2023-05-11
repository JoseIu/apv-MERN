import nodemailer from 'nodemailer';

const sendResetPWD = async data => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  //enviamos email olvide-password/:token
  console.log(data);
  const { name, email, token } = data;
  const info = await transporter.sendMail({
    from: 'APV - Administrador de pacientes',
    to: email,
    subject: 'Comprueba tu cuenta en PAV',
    text: 'Comprueba tu cuenta en PAV',
    html: `<p>Hola ${name}!, solicitaste el cambio de tu contraseña.</p>
      <p>Sigue los siguientes pasos para cambiarlo:
      <a href="${process.env.FRONT_URL_RESET_PWD}/olvide-password/${token}">Cambiar contraseña</a>
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
      `
  });
  console.log('Mensaje enviado:%s,', info.messageId);
};

export default sendResetPWD;
