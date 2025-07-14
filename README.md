# Nikash Portfolio Website

A modern, responsive portfolio website built with HTML, CSS (Tailwind), and JavaScript, featuring a working contact form powered by Node.js backend for Vercel deployment.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Interactive Gallery**: Click on project images to view them in a modal gallery
- **Working Contact Form**: Send emails directly through the website
- **Dark/Light Theme Toggle**: Sticky theme switcher
- **Modern UI**: Clean, professional design using Tailwind CSS

## Setup and Deployment

### Prerequisites

- Node.js 18+ installed
- A Gmail account for sending emails (or another email provider)
- Vercel account for deployment

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nikash-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Update the email configuration:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Run locally with Vercel**
   ```bash
   npx vercel dev
   ```

### Email Configuration (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_PASS`

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables in Vercel**
   - Go to your project dashboard on Vercel
   - Settings → Environment Variables
   - Add:
     - `EMAIL_USER`: your-email@gmail.com
     - `EMAIL_PASS`: your-app-password

4. **Redeploy** after setting environment variables

### Alternative Email Providers

If you don't want to use Gmail, you can configure other email providers in `api/contact.js`:

```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.yourdomain.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## File Structure

```
/
├── index.html              # Main HTML file
├── src/
│   ├── index.css          # Custom CSS
│   └── assets/            # Images and assets
├── api/
│   └── contact.js         # Contact form API endpoint
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── README.md             # This file
```

## Contact Form API

The contact form uses a serverless API endpoint (`/api/contact`) that:

- Validates form data
- Sends formatted emails using Nodemailer
- Returns JSON responses
- Handles errors gracefully

## Gallery Functionality

The gallery modal includes:

- Click any project image to open in modal
- Navigation arrows (previous/next)
- Keyboard navigation (arrow keys, ESC)
- Image counter
- Responsive design

## Theme Toggle

The sticky theme toggle:

- Switches between light and dark modes
- Saves preference to localStorage
- Hides automatically when footer is visible
- Positioned responsively on all screen sizes

## Customization

### Adding New Projects

1. Add image to `src/assets/`
2. Update the `images` array in the gallery JavaScript
3. Add new gallery item HTML in the Projects section

### Changing Contact Email

Update the `to` field in `api/contact.js`:

```javascript
to: 'your-new-email@example.com'
```

### Styling

The website uses Tailwind CSS. You can customize:

- Colors in `tailwind.config.js`
- Custom CSS in the `<style>` section of `index.html`
- Component styling by modifying Tailwind classes

## Troubleshooting

### Contact Form Not Working

1. **Check Environment Variables**: Ensure `EMAIL_USER` and `EMAIL_PASS` are set in Vercel
2. **Check Email Credentials**: Verify Gmail app password is correct
3. **Check Console**: Look for JavaScript errors in browser dev tools
4. **Check Vercel Logs**: View function logs in Vercel dashboard

### Gallery Not Opening

1. **Check Image Paths**: Ensure all images exist in `src/assets/`
2. **Check Console**: Look for JavaScript errors
3. **Check CSS**: Ensure modal styles are loaded

### Theme Toggle Issues

1. **Check JavaScript**: Ensure theme toggle JavaScript is loaded
2. **Check LocalStorage**: Clear browser storage and try again

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check Vercel deployment logs

For additional help, contact: memahadirahman@gmail.com
