// ============================================
// server-free.js — COMPLETELY FREE VERSION
// No dependencies, no API keys, just templates!
// ============================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// ============================================
// FREE EMAIL TEMPLATES (No AI required!)
// ============================================
const emailTemplates = {
  Professional: {
    greeting: (senderName) => senderName ? `Dear ${senderName},` : "Dear Sir/Madam,",
    body: (context) => context ?
      `Thank you for your email. ${context} I appreciate your attention to this matter.` :
      "Thank you for your email. I have received your message and will respond accordingly.",
    closing: (senderName) => `Best regards,\n${senderName || "Your Name"}`
  },
  Casual: {
    greeting: (senderName) => senderName ? `Hi ${senderName},` : "Hi there,",
    body: (context) => context ?
      `Thanks for reaching out! ${context} Looking forward to hearing from you.` :
      "Thanks for your email! I'll get back to you soon.",
    closing: (senderName) => `Cheers,\n${senderName || "Your Name"}`
  },
  Friendly: {
    greeting: (senderName) => senderName ? `Hello ${senderName},` : "Hello,",
    body: (context) => context ?
      `I hope this email finds you well. ${context} I'm happy to help with this.` :
      "Thank you for your message. I appreciate you getting in touch.",
    closing: (senderName) => `Warm regards,\n${senderName || "Your Name"}`
  },
  Formal: {
    greeting: (senderName) => senderName ? `Dear ${senderName},` : "Dear Sir/Madam,",
    body: (context) => context ?
      `I acknowledge receipt of your correspondence. ${context} I shall attend to this matter promptly.` :
      "I acknowledge receipt of your correspondence and will respond in due course.",
    closing: (senderName) => `Yours sincerely,\n${senderName || "Your Name"}`
  },
  Enthusiastic: {
    greeting: (senderName) => senderName ? `Hi ${senderName}!` : "Hello!",
    body: (context) => context ?
      `Wow, thanks for your email! ${context} I'm really excited to work on this with you!` :
      "Thanks so much for reaching out! I can't wait to help!",
    closing: (senderName) => `Best,\n${senderName || "Your Name"}`
  },
  Empathetic: {
    greeting: (senderName) => senderName ? `Dear ${senderName},` : "Hello,",
    body: (context) => context ?
      `Thank you for your email. ${context} I understand this is important to you.` :
      "Thank you for reaching out. I appreciate you sharing this with me.",
    closing: (senderName) => `With understanding,\n${senderName || "Your Name"}`
  }
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Serve static files
  if (pathname === '/' || pathname === '/index.html') {
    const filePath = path.join(__dirname, 'public', 'index.html');
    console.log(`[DEBUG] Serving index.html from: ${filePath}`);
    console.log(`[DEBUG] File exists: ${fs.existsSync(filePath)}`);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`[ERROR] Failed to read index.html: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error loading index.html: ${err.message}`);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // API endpoint for generating replies
  if (pathname === '/generate-reply' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { emailContent, tone, senderName, context } = JSON.parse(body);

        // Basic validation
        if (!emailContent || emailContent.trim() === "") {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: "Email content is required." }));
          return;
        }

        console.log(`Generating ${tone} reply using templates...`);

        // Get the template for the selected tone
        const template = emailTemplates[tone] || emailTemplates.Professional;

        // Generate reply using template
        const reply = `${template.greeting(senderName)}

${template.body(context)}

${template.closing(senderName)}`;

        console.log("Reply generated successfully using templates!");

        // Send the reply back
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));

      } catch (error) {
        console.error("Error generating reply:", error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Something went wrong. Please try again." }));
      }
    });
    return;
  }

  // Health check
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: "Server is running! (COMPLETELY FREE - No dependencies!)",
      port: PORT
    }));
    return;
  }

  // 404 for unknown routes
  res.writeHead(404);
  res.end('Not found');
});

// Start the server
server.listen(PORT, () => {
  console.log("========================================");
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📧 Gmail Reply Generator is ready!`);
  console.log(`🆓 COMPLETELY FREE - No API keys or dependencies!`);
  console.log("========================================");
});