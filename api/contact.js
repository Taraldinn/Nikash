import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Create transporter using environment variables
    // For Gmail, use the simplified service configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // This automatically sets the correct SMTP settings for Gmail
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to the same email address
      subject: subject || `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              📧 New Contact Form Message
            </h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">
              From your portfolio website
            </p>
          </div>

          <!-- Contact Details Section -->
          <div style="background-color: #f8fafc; padding: 25px; border-left: 4px solid #4F46E5;">
            <h2 style="color: #4F46E5; margin-top: 0; margin-bottom: 20px; font-size: 20px;">
              👤 Contact Details
            </h2>
            <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 100px;">
                    <span style="color: #4F46E5;">📝</span> Name:
                  </td>
                  <td style="padding: 12px 0; color: #1f2937;">
                    ${name}
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: bold; color: #374151;">
                    <span style="color: #4F46E5;">📧</span> Email:
                  </td>
                  <td style="padding: 12px 0; color: #1f2937;">
                    <a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 0; font-weight: bold; color: #374151;">
                    <span style="color: #4F46E5;">📅</span> Date:
                  </td>
                  <td style="padding: 12px 0; color: #1f2937;">
                    ${new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-weight: bold; color: #374151;">
                    <span style="color: #4F46E5;">📋</span> Subject:
                  </td>
                  <td style="padding: 12px 0; color: #1f2937;">
                    ${subject || 'No subject provided'}
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <!-- Message Section -->
          <div style="background-color: white; padding: 25px; border-left: 4px solid #10B981;">
            <h2 style="color: #10B981; margin-top: 0; margin-bottom: 20px; font-size: 20px;">
              💬 Message Content
            </h2>
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border: 1px solid #e0f2fe;">
              <p style="line-height: 1.8; color: #1f2937; margin: 0; font-size: 16px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <!-- Quick Actions Section -->
          <div style="background-color: #fef3c7; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h3 style="color: #d97706; margin-top: 0; margin-bottom: 15px; font-size: 18px;">
              ⚡ Quick Actions
            </h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your contact form message')}" 
                 style="background-color: #4F46E5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 5px 0;">
                📧 Reply via Email
              </a>
              <a href="https://www.linkedin.com/in/mdmahadirahman" target="_blank"
                 style="background-color: #0077b5; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 5px 0;">
                💼 View LinkedIn
              </a>
            </div>
          </div>

          <!-- Stats Section -->
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #475569; margin-top: 0; margin-bottom: 15px; font-size: 16px;">
              📊 Message Statistics
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
              <div style="text-align: center; background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="font-size: 24px; color: #4F46E5; font-weight: bold;">${message.length}</div>
                <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Characters</div>
              </div>
              <div style="text-align: center; background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="font-size: 24px; color: #10B981; font-weight: bold;">${message.split(' ').length}</div>
                <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Words</div>
              </div>
              <div style="text-align: center; background-color: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div style="font-size: 24px; color: #f59e0b; font-weight: bold;">${email.includes('@') ? '✓' : '✗'}</div>
                <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Valid Email</div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #1f2937; padding: 25px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 14px;">
              This message was sent from your portfolio website contact form
            </p>
            <p style="color: #6b7280; margin: 0; font-size: 12px;">
              Portfolio: <strong>Md. Mahadi Rahman</strong> | 
              Generated: ${new Date().toISOString()} |
              Message ID: ${Math.random().toString(36).substr(2, 9)}
            </p>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #374151;">
              <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none; margin: 0 10px;">Reply</a>
              <span style="color: #4b5563;">|</span>
              <a href="https://www.linkedin.com/in/mdmahadirahman" style="color: #60a5fa; text-decoration: none; margin: 0 10px;" target="_blank">LinkedIn</a>
              <span style="color: #4b5563;">|</span>
              <a href="mailto:kferdoush617@gmail.com" style="color: #60a5fa; text-decoration: none; margin: 0 10px;">Direct Email</a>
            </div>
          </div>
        </div>
      `,
      text: `
📧 NEW CONTACT FORM MESSAGE
========================================

👤 CONTACT DETAILS:
--------------------
📝 Name: ${name}
📧 Email: ${email}
📅 Date: ${new Date().toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
📋 Subject: ${subject || 'No subject provided'}

💬 MESSAGE CONTENT:
-------------------
${message}

📊 MESSAGE STATISTICS:
----------------------
• Characters: ${message.length}
• Words: ${message.split(' ').length}
• Valid Email: ${email.includes('@') ? 'Yes' : 'No'}

⚡ QUICK ACTIONS:
-----------------
• Reply to: ${email}
• Subject: Re: ${subject || 'Your contact form message'}

📱 CONNECT:
-----------
• LinkedIn: https://www.linkedin.com/in/mdmahadirahman
• Direct Email: kferdoush617@gmail.com

========================================
Generated: ${new Date().toISOString()}
Message ID: ${Math.random().toString(36).substr(2, 9)}
Portfolio: Md. Mahadi Rahman

This message was sent from your portfolio website contact form.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};
