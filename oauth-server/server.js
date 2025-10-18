import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.OAUTH_PORT || 3001;

// CORS 配置
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost', 'http://localhost:80', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // 允许没有 origin 的请求（如 Postman）
    if (!origin) return callback(null, true);
    
    // 检查是否在允许列表中
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed === '*') return true;
      return origin === allowed || origin.startsWith(allowed);
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    service: 'NavHub OAuth Server',
    timestamp: new Date().toISOString()
  });
});

// OAuth 回调处理
app.post('/callback', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
    const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error('Missing GitHub OAuth credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log('Processing OAuth callback for code:', code.substring(0, 10) + '...');

    // 交换 access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error('GitHub OAuth error:', tokenData.error);
      return res.status(400).json({ error: tokenData.error_description || tokenData.error });
    }

    if (!tokenData.access_token) {
      console.error('No access token in response:', tokenData);
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    console.log('Successfully obtained access token');
    
    res.json({
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      scope: tokenData.scope
    });

  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NavHub OAuth Server running on port ${PORT}`);
  console.log('Allowed origins:', allowedOrigins);
  console.log('GitHub Client ID:', process.env.GITHUB_CLIENT_ID ? 'configured' : 'NOT SET');
  console.log('GitHub Client Secret:', process.env.GITHUB_CLIENT_SECRET ? 'configured' : 'NOT SET');
});

