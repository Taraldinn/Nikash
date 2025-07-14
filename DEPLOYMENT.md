# 🚀 Quick Deployment Guide

## 1. Prepare for Deployment

### Gmail Setup (for contact form)
1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - **Save this password** - you'll need it for Vercel

## 2. Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the project settings
5. Click "Deploy"

### Option B: Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 3. Configure Environment Variables

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add these variables:

| Variable | Value | Example |
|----------|--------|---------|
| `EMAIL_USER` | Your Gmail address | `your-email@gmail.com` |
| `EMAIL_PASS` | Your Gmail app password | `abcd efgh ijkl mnop` |

4. **Redeploy** the project after adding environment variables

## 4. Test Your Website

1. Visit your deployed URL
2. Test the contact form by sending yourself a message
3. Check the gallery by clicking on project images
4. Test the dark/light theme toggle

## 5. Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS settings as instructed by Vercel

## ⚠️ Important Notes

- **Environment Variables**: Contact form won't work without proper Gmail setup
- **Redeploy**: Always redeploy after changing environment variables
- **Gmail Security**: Use app-specific password, not your regular Gmail password
- **Images**: Ensure all images in `src/assets/` are optimized for web

## 🛠️ Troubleshooting

### Contact Form Issues
- Check environment variables are set correctly
- Verify Gmail app password is valid
- Check Vercel function logs for errors

### Gallery Issues
- Ensure all images exist in `src/assets/`
- Check browser console for JavaScript errors

### Theme Toggle Issues
- Clear browser cache and try again
- Check browser console for errors

## 📧 Support

If you need help: memahadirahman@gmail.com
