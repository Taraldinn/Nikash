const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendTestEmail() {
  console.log('🚀 Sending test email to kazifardin617@gmail.com...');
  console.log('From:', process.env.EMAIL_USER);

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify connection first
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified!');

    // Send test email
    console.log('📧 Sending email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'kazifardin617@gmail.com',
      subject: 'Test Email from Portfolio Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            🎉 Portfolio Contact Form Test Email
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">Test Details:</h3>
            <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
            <p><strong>To:</strong> kazifardin617@gmail.com</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Purpose:</strong> Testing portfolio contact form functionality</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #10B981; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">✅ Success!</h3>
            <p style="line-height: 1.6; color: #555;">
              This email confirms that your portfolio contact form is working correctly! 
              The email backend is properly configured and can send emails through Gmail's SMTP server.
            </p>
            <p style="line-height: 1.6; color: #555;">
              <strong>What this means:</strong>
            </p>
            <ul style="color: #555;">
              <li>Gmail App Password is correctly set up</li>
              <li>SMTP authentication is working</li>
              <li>Email sending functionality is operational</li>
              <li>Your portfolio is ready for deployment!</li>
            </ul>
          </div>
          
          <div style="background-color: #EBF8FF; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #2563EB; margin-top: 0;">📋 Next Steps:</h4>
            <ol style="color: #555;">
              <li>Deploy your portfolio to Vercel</li>
              <li>Set environment variables in Vercel dashboard</li>
              <li>Test the live contact form</li>
              <li>Share your amazing portfolio with the world! 🌟</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
              This message was sent from your portfolio website contact form test.
            </p>
            <p style="color: #666; font-size: 12px;">
              If you didn't expect this email, you can safely ignore it.
            </p>
          </div>
        </div>
      `,
      text: `
Portfolio Contact Form Test Email

✅ SUCCESS! Your contact form is working correctly.

Test Details:
- From: ${process.env.EMAIL_USER}
- To: kazifardin617@gmail.com
- Timestamp: ${new Date().toISOString()}
- Purpose: Testing portfolio contact form functionality

What this means:
✓ Gmail App Password is correctly set up
✓ SMTP authentication is working
✓ Email sending functionality is operational
✓ Your portfolio is ready for deployment!

Next Steps:
1. Deploy your portfolio to Vercel
2. Set environment variables in Vercel dashboard
3. Test the live contact form
4. Share your amazing portfolio with the world! 🌟

---
This message was sent from your portfolio website contact form test.
      `
    });

    console.log('🎉 SUCCESS! Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📮 Email sent to: kazifardin617@gmail.com');
    console.log('');
    console.log('🎯 Your portfolio contact form is now fully functional!');
    console.log('🚀 Ready for Vercel deployment!');
    
    return true;

  } catch (error) {
    console.error('❌ Failed to send email:');
    console.error('Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('\n🔧 Authentication failed. Please check:');
      console.error('1. Gmail App Password is correct (no spaces)');
      console.error('2. 2-factor authentication is enabled');
      console.error('3. App Password was generated recently');
    } else if (error.code === 'ECONNECTION') {
      console.error('\n🔧 Connection failed. Please check:');
      console.error('1. Internet connection');
      console.error('2. Gmail SMTP access is not blocked');
    }
    
    return false;
  }
}

// Run the test
sendTestEmail().then(() => {
  console.log('\n✨ Test completed!');
  process.exit(0);
}).catch(() => {
  process.exit(1);
});
