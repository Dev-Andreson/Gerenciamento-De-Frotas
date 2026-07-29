const brevo = require('@getbrevo/brevo');

// Configuração da API Key
const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  throw new Error('Variável de ambiente BREVO_API_KEY não definida');
}

const enviarEmailRecuperacao = async (to, subject, htmlContent) => {
  // Criação da instância da API de E-mail Transacional
  const apiInstance = new brevo.TransactionalEmailsApi();
  
  // Configura a chave de segurança
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

  const emailData = new brevo.SendSmtpEmail();
  
  emailData.sender = { 
    email: process.env.EMAIL_USER || 'seuemail@dominio.com', 
    name: 'Suporte Frota' 
  };
  
  emailData.to = [{ email: to }];
  emailData.subject = subject;
  emailData.htmlContent = htmlContent;

  try {
    const response = await apiInstance.sendTransacEmail(emailData);
    console.log('E-mail enviado via Brevo API. ID:', response.body ? response.body.messageId : 'OK');
    return { success: true };
  } catch (error) {
    console.error('Erro Brevo:', error.response ? error.response.text : error.message);
    throw new Error('Falha no envio de e-mail');
  }
};

module.exports = { enviarEmailRecuperacao };
