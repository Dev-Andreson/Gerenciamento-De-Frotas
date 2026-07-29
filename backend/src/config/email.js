const nodemailer = require("nodemailer");

const dns = require("dns");
dns.lookup("smtp-relay.brevo.com", (err, address, family) => {
  if (err) {
    console.error("FALHA NO DNS:", err.message);
  } else {
    console.log("DNS OK: smtp-relay.brevo.com resolvido para", address);
  }
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true,
  logger: true,
});

module.exports = transporter;

async function enviarEmailRecuperacao(email, token) {
  const link = `${process.env.FRONTEND_URL}/recuperar-senha?token=${token}`;

  const mailOptions = {
    from: `"Locadora de Veículos" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Recuperação de Senha",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #764ba2;">Recuperação de Senha</h2>
        <p>Você solicitou a recuperação de senha. Clique no botão abaixo:</p>
        <a href="${link}" style="background: #764ba2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Redefinir Senha</a>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">Se você não solicitou isso, ignore este e-mail.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`E-mail de recuperação enviado para: ${email}`);
  } catch (error) {
    console.error("Erro CRÍTICO ao enviar e-mail:", error);
    throw error;
  }
}

module.exports = { enviarEmailRecuperacao };
