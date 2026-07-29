const enviarEmailRecuperacao = async (to, subject, htmlContent) => {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.EMAIL_USER; // Deve ser b3bad5001@smtp-brevo.com no .env

  if (!apiKey || !senderEmail) {
    throw new Error('Configuração de e-mail incompleta. Verifique BREVO_API_KEY e EMAIL_USER');
  }

  const url = 'https://api.brevo.com/v3/smtp/email';

  const payload = {
    sender: { 
      email: senderEmail, 
      name: 'Sistema de Frotas' 
    },
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
