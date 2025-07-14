# 🔑 Gmail App Password Setup Guide

## The Issue
Your contact form authentication is failing because you need a Gmail App Password instead of your regular Gmail password.

## What You Need to Do

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" in the left sidebar
3. Under "How you sign in to Google", click "2-Step Verification"
4. Follow the setup process if not already enabled

### Step 2: Generate App Password
1. In the same Security section, look for "App passwords"
2. Click "App passwords" (you may need to enter your password again)
3. In the "Select app" dropdown, choose "Mail"
4. In the "Select device" dropdown, choose "Other (custom name)"
5. Type "Portfolio Website" or similar
6. Click "Generate"

### Step 3: Copy the App Password
- You'll see a 16-character password like: `abcd efgh ijkl mnop`
- **Important**: Copy this password immediately (you won't see it again)

### Step 4: Update Your .env File
1. Open the `.env` file in your project
2. Replace `YOUR_16_CHAR_APP_PASSWORD_HERE` with your actual app password
3. **Remove all spaces** from the password
4. Example: If Gmail shows `abcd efgh ijkl mnop`, use `abcdefghijklmnop`

### Step 5: Test the Configuration
Run this command to test your email setup:
```bash
node test-email.cjs
```

## Example .env Configuration
```
EMAIL_USER=kferdoush617@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

## For Vercel Deployment
When you deploy to Vercel, you'll need to set these same environment variables in your Vercel project dashboard:
- Go to your project → Settings → Environment Variables
- Add `EMAIL_USER` and `EMAIL_PASS` with the same values

## Troubleshooting
- **"Invalid login" error**: Your App Password is incorrect or has spaces
- **"Authentication failed" error**: Make sure 2FA is enabled and you're using an App Password
- **"Application-specific password required"**: You're using your regular Gmail password instead of an App Password

## Security Note
- Never share your App Password
- If compromised, you can revoke it and generate a new one
- App Passwords bypass 2FA, so keep them secure
