const brevo = require('@getbrevo/brevo');

// Configuração da API Key
const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  throw new Error('Variável de ambiente BREVO_API_KEY não definida');
}

const enviarEmailRecuperacao = async (to, subject, htmlContent) => {
  const apiKey = process.env.BREVO_API_KEY;
  const url = 'https://api.brevo.com/v3/smtp/email';

  const payload = {
    sender: { email: process.env.EMAIL_USER, name: 'Sistema' },
    to: [{ email: to }],
    subject: subject,
    htmlContent: htmlContent
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro Brevo: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('E-mail enviado. ID:', data.messageId);
    return { success: true };
  } catch (error) {
    console.error('Falha no envio:', error.message);
    throw error;
  }
};



module.exports = { enviarEmailRecuperacao };
