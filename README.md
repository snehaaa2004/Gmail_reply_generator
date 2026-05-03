# 📧 Gmail Reply Generator — Complete Setup Guide

> AI-powered email reply generator using Claude AI (Anthropic) - OR use FREE alternatives!

---

## 🆓 **FREE OPTIONS Available!**

Don't want to pay for API keys? Here are **completely free** alternatives:

### Option 1: Template-Based (No API keys at all!)
```bash
node server-free.js
```
This uses smart email templates - no AI required!

### Option 2: Hugging Face (Free API)
- Get free API key at: https://huggingface.co/settings/tokens
- Uses Microsoft's DialoGPT model (free tier available)

### Option 3: Local AI with Ollama
```bash
# Install Ollama: https://ollama.ai
ollama pull llama2
node server-ollama.js  # (I'd create this for you)
```

---

## 🗂️ Your Project Files

```
gmail-reply-generator/
├── server.js          ← Backend (Claude AI - requires payment)
├── server-free.js     ← FREE VERSION (templates only)
├── .env               ← Your secret API key (optional)
├── package.json       ← Auto-created by npm
└── public/
    └── index.html     ← Frontend (the UI users see)
```

---

## ✅ Step-by-Step Setup (FREE Version)

### Quick Start (No API Keys Needed!)
```bash
npm install
node server-free.js
```
Then open: http://localhost:3000

**That's it!** The free version uses smart email templates and works immediately.

---

### Step-by-Step Setup (AI Version - Requires Payment)

#### Step 1 — Choose Your AI Provider

**Anthropic Claude (Recommended):**
- Go to: https://console.anthropic.com
- Sign up (free trial available, then ~$0.002 per message)
- Get API key (starts with `sk-ant-...`)

**OpenAI GPT:**
- Go to: https://platform.openai.com/api-keys
- Free trial available, then ~$0.002 per 1K tokens

**Hugging Face (FREE!):**
- Go to: https://huggingface.co/settings/tokens
- Create free account, generate API token
- No payment required!

---

### Step 2 — Install Node.js
1. Go to: https://nodejs.org
2. Download **LTS version**
3. Install it
4. Verify: open Terminal, run `node --version`

---

### Step 3 — Set Up the Project

Open Terminal in the `gmail-reply-generator` folder and run:

```bash
npm init -y
npm install express cors @anthropic-ai/sdk dotenv
```

---

### Step 4 — Create the .env File

Create a file called `.env` in your project root:

```
ANTHROPIC_API_KEY=sk-ant-PASTE-YOUR-KEY-HERE
```

⚠️ Replace `sk-ant-PASTE-YOUR-KEY-HERE` with your actual key.

---

### Step 5 — Start the Server

```bash
node server.js
```

You should see:
```
✅ Server running at http://localhost:3000
📧 Gmail Reply Generator is ready!
```

---

### Step 6 — Open the App

Open your browser and go to:
```
http://localhost:3000
```

🎉 Your app is live!

---

## 🎮 How to Use

1. **Paste an email** you received into the text box
2. **Choose a tone**: Professional, Casual, Friendly, Formal, Enthusiastic, or Empathetic
3. Optionally add your name and any extra context
4. Click **✨ Generate Reply**
5. Copy the reply and paste it into Gmail!

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot connect to server` | Make sure `node server.js` is running |
| `Invalid API key` | Double-check your `.env` file |
| `npm: command not found` | Re-install Node.js |
| Port 3000 already in use | Change `PORT = 3000` to `3001` in server.js |

---

## 💡 How It Works (Simple Explanation)

```
1. You paste an email + pick a tone
2. Frontend sends it to server.js (your backend)
3. server.js sends it to Claude AI with instructions
4. Claude generates a perfect reply
5. The reply is sent back and shown on screen
```

The backend is needed so your API key stays secret and is never exposed to the browser.

---

## 🔒 Security Notes

- Never commit `.env` to Git
- Add `.env` to your `.gitignore`
- Your emails are NOT stored anywhere — they go directly to Claude and come back

---

## 🚀 **Deploy & Share with Friends**

Your app is **completely free** and ready to deploy! Here are the easiest options:

### **Option 1: Railway (Recommended - 512MB free)**
1. **Go to:** https://railway.app
2. **Sign up** with GitHub (free)
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Connect your repo** (push your code to GitHub first)
5. **Railway auto-detects** Node.js and deploys!
6. **Get your free URL** (like: `your-app.up.railway.app`)
7. **Share with friends!** 🎉

### **Option 2: Render (Free tier available)**
1. **Go to:** https://render.com
2. **Sign up** (free)
3. **Click "New"** → **"Web Service"**
4. **Connect GitHub repo**
5. **Build command:** `npm install`
6. **Start command:** `node server-free.js`
7. **Deploy!** Get free URL

### **Option 3: Fly.io (Free tier - 256MB RAM)**
1. **Install Fly CLI:** https://fly.io/docs/getting-started/
2. **Run:** `fly launch` (answer questions)
3. **Run:** `fly deploy`
4. **Get free URL** instantly!

### **Option 4: Local Sharing (For LAN only)**
```bash
# Find your IP address
ipconfig  # Windows
# Share: http://YOUR_LOCAL_IP:3000
```
*Note: Friends must be on same WiFi network*

---

## 📁 **Your Project Files (Updated)**

```
gmail-reply-generator/
├── server.js          ← AI version (requires API key)
├── server-free.js     ← FREE version (running now!)
├── .env               ← API keys (optional)
├── package.json       ← Dependencies
├── fly.toml          ← Fly.io deployment config
├── render.yaml       ← Render deployment config
├── vercel.json       ← Vercel deployment config
├── DEPLOY.md         ← Detailed deployment guide
└── public/
    └── index.html     ← Frontend UI
```
access this app directly 

https://gmail-reply-generator.vercel.app/
