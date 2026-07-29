const brevo = require('@getbrevo/brevo');

let defaultClient = brevo.ApiClient.instance;

// Configure a chave de API
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; // Adicione esta variável no Render

const transactionalApi = new brevo.TransactionalEmailsApi();

const sendEmail = async (to, subject, htmlContent, senderEmail, senderName) => {
  const emailData = new brevo.SendSmtpEmail();
  emailData.sender = { email: senderEmail, name: senderName };
  emailData.to = [{ email: to }];
  emailData.subject = subject;
  emailData.htmlContent = htmlContent;

  try {
    const { response, body } = await transactionalApi.sendTransacEmail(emailData);
    console.log('E-mail enviado via API Brevo. ID:', body.messageId);
    return { success: true, messageId: body.messageId };
  } catch (error) {
    console.error('Erro Brevo API:', error.response ? error.response.text : error.message);
    throw new Error('Falha no envio de e-mail');
  }
};

module.exports = { sendEmail };
