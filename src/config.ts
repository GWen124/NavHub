// 网站配置数据
export interface Site {
  name: string
  url: string
  icon: string
  autoIcon?: boolean // 是否启用自动图标
}

export interface Category {
  name: string
  sites: Site[]
}

export const config: Category[] = [
  {
    name: "Favorites - 常用网站",
    sites: [
      {
        name: "Home Page",
        url: "https://gw124.top",
        icon: "https://image.gw124.top/Avatar/imgbin_a1bee513649d120523b69c8584c25695.png"
      },
      {
        name: "Google",
        url: "https://www.google.com/",
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Google/Google.png",
        autoIcon: true
      },
      {
        name: "GitHub",
        url: "https://github.com",
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Project Management & To-do List/GitHub_A.png"
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/",
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Streaming Service Platform/Youtube.png"
      },
      {
        name: "CloudFlare",
        url: "https://www.cloudflare.com",
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Cloud Protection Services/Cloudflare.png"
      },
      {
        name: "Bilibili",
        url: "https://www.bilibili.com/",
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Streaming Service Platform/Bilibili.png"
      },
      {
        name: "知乎",
        url: "https://www.zhihu.com/",
        icon: ""
      }
    ]
  },
  {
    name: "AI Tools - AI工具",
    sites: [
      {
        name: "ChatGPT",
        url: "https://chat.openai.com",
        icon: ""
      },
      {
        name: "Claude",
        url: "https://claude.ai",
        icon: ""
      },
      {
        name: "Gemini",
        url: "https://gemini.google.com",
        icon: ""
      },
      {
        name: "Copilot",
        url: "https://github.com/features/copilot",
        icon: ""
      },
      {
        name: "Midjourney",
        url: "https://midjourney.com",
        icon: ""
      },
      {
        name: "DALL-E",
        url: "https://openai.com/dall-e-2",
        icon: ""
      },
      {
        name: "Stable Diffusion",
        url: "https://stablediffusionweb.com",
        icon: ""
      },
      {
        name: "Runway",
        url: "https://runwayml.com",
        icon: ""
      },
      {
        name: "Notion AI",
        url: "https://notion.so/product/ai",
        icon: ""
      },
      {
        name: "Grammarly",
        url: "https://grammarly.com",
        icon: ""
      },
      {
        name: "Jasper",
        url: "https://jasper.ai",
        icon: ""
      },
      {
        name: "Copy.ai",
        url: "https://copy.ai",
        icon: ""
      },
      {
        name: "Perplexity",
        url: "https://perplexity.ai",
        icon: ""
      },
      {
        name: "Character.AI",
        url: "https://character.ai",
        icon: ""
      },
      {
        name: "Hugging Face",
        url: "https://huggingface.co",
        icon: ""
      },
      {
        name: "Replicate",
        url: "https://replicate.com",
        icon: ""
      },
      {
        name: "Anthropic",
        url: "https://anthropic.com",
        icon: ""
      },
      {
        name: "Cohere",
        url: "https://cohere.ai",
        icon: ""
      },
      {
        name: "ElevenLabs",
        url: "https://elevenlabs.io",
        icon: ""
      },
      {
        name: "Synthesia",
        url: "https://synthesia.io",
        icon: ""
      },
      {
        name: "RunwayML",
        url: "https://runwayml.com",
        icon: ""
      },
      {
        name: "Stable Video Diffusion",
        url: "https://stability.ai",
        icon: ""
      },
      {
        name: "Pika Labs",
        url: "https://pika.art",
        icon: ""
      },
      {
        name: "LeiaPix",
        url: "https://convert.leiapix.com",
        icon: ""
      },
      {
        name: "Kaiber",
        url: "https://kaiber.ai",
        icon: ""
      },
      {
        name: "InVideo",
        url: "https://invideo.io",
        icon: ""
      },
      {
        name: "Luma AI",
        url: "https://lumalabs.ai",
        icon: ""
      },
      {
        name: "HeyGen",
        url: "https://heygen.com",
        icon: ""
      },
      {
        name: "D-ID",
        url: "https://d-id.com",
        icon: ""
      }
    ]
  },
  {
    name: "Media Hub - 媒体中心",
    sites: [
      
      {
        name: "Netflix",
        url: "https://netflix.com",
        icon: ""
      },
      {
        name: "Spotify",
        url: "https://spotify.com",
        icon: ""
      },
      
      {
        name: "Twitch",
        url: "https://twitch.tv",
        icon: ""
      },
      {
        name: "Apple Music",
        url: "https://music.apple.com",
        icon: ""
      },
      {
        name: "Amazon Prime",
        url: "https://primevideo.com",
        icon: ""
      },
      {
        name: "Disney+",
        url: "https://disneyplus.com",
        icon: ""
      },
      {
        name: "HBO Max",
        url: "https://hbomax.com",
        icon: ""
      },
      {
        name: "SoundCloud",
        url: "https://soundcloud.com",
        icon: ""
      },
      {
        name: "Pandora",
        url: "https://pandora.com",
        icon: ""
      },
      {
        name: "Tidal",
        url: "https://tidal.com",
        icon: ""
      },
      {
        name: "Vimeo",
        url: "https://vimeo.com",
        icon: ""
      },
      {
        name: "Dailymotion",
        url: "https://dailymotion.com",
        icon: ""
      },
      {
        name: "TikTok",
        url: "https://tiktok.com",
        icon: ""
      },
      {
        name: "Instagram",
        url: "https://instagram.com",
        icon: ""
      },
      {
        name: "Tumblr",
        url: "https://tumblr.com",
        icon: ""
      },
      {
        name: "Reddit",
        url: "https://reddit.com",
        icon: ""
      },
      {
        name: "Pinterest",
        url: "https://pinterest.com",
        icon: ""
      },
      {
        name: "Flickr",
        url: "https://flickr.com",
        icon: ""
      }]
  },
  {
    name: "Cloud Services - 云服务",
    sites: [
      {
        name: "AWS",
        url: "https://aws.amazon.com",
        icon: ""
      },
      {
        name: "Google Cloud",
        url: "https://cloud.google.com",
        icon: ""
      },
      {
        name: "Azure",
        url: "https://azure.microsoft.com",
        icon: ""
      },
      {
        name: "阿里云",
        url: "https://aliyun.com",
        icon: ""
      },
      {
        name: "腾讯云",
        url: "https://cloud.tencent.com",
        icon: ""
      },
      {
        name: "华为云",
        url: "https://huaweicloud.com",
        icon: ""
      },
      {
        name: "百度云",
        url: "https://cloud.baidu.com",
        icon: ""
      },
      {
        name: "Vercel",
        url: "https://vercel.com",
        icon: ""
      },
      {
        name: "Netlify",
        url: "https://netlify.com",
        icon: ""
      },
      {
        name: "Heroku",
        url: "https://heroku.com",
        icon: ""
      },
      {
        name: "DigitalOcean",
        url: "https://digitalocean.com",
        icon: ""
      },
      {
        name: "Linode",
        url: "https://linode.com",
        icon: ""
      },
      {
        name: "Vultr",
        url: "https://vultr.com",
        icon: ""
      },
      {
        name: "Cloudflare",
        url: "https://cloudflare.com",
        icon: ""
      },
      {
        name: "Fastly",
        url: "https://fastly.com",
        icon: ""
      },
      {
        name: "KeyCDN",
        url: "https://keycdn.com",
        icon: ""
      },
      {
        name: "BunnyCDN",
        url: "https://bunny.net",
        icon: ""
      },
      {
        name: "StackPath",
        url: "https://stackpath.com",
        icon: ""
      },
      {
        name: "MaxCDN",
        url: "https://maxcdn.com",
        icon: ""
      },
      {
        name: "Incapsula",
        url: "https://incapsula.com",
        icon: ""
      }]
  },
  {
    name: "Cloud Storage - 云储存",
    sites: [
      {
        name: "Google Drive",
        url: "https://drive.google.com",
        icon: ""
      },
      {
        name: "Dropbox",
        url: "https://dropbox.com",
        icon: ""
      },
      {
        name: "OneDrive",
        url: "https://onedrive.live.com",
        icon: ""
      },
      {
        name: "iCloud",
        url: "https://icloud.com",
        icon: ""
      },
      {
        name: "Box",
        url: "https://box.com",
        icon: ""
      },
      {
        name: "百度网盘",
        url: "https://pan.baidu.com",
        icon: ""
      },
      {
        name: "阿里云盘",
        url: "https://aliyundrive.com",
        icon: ""
      },
      {
        name: "天翼云盘",
        url: "https://cloud.189.cn",
        icon: ""
      },
      {
        name: "腾讯微云",
        url: "https://weiyun.com",
        icon: ""
      },
      {
        name: "坚果云",
        url: "https://jianguoyun.com",
        icon: ""
      },
      {
        name: "115网盘",
        url: "https://115.com",
        icon: ""
      },
      {
        name: "蓝奏云",
        url: "https://lanzoui.com",
        icon: ""
      },
      {
        name: "MEGA",
        url: "https://mega.nz",
        icon: ""
      },
      {
        name: "pCloud",
        url: "https://pcloud.com",
        icon: ""
      },
      {
        name: "Sync.com",
        url: "https://sync.com",
        icon: ""
      },
      {
        name: "MediaFire",
        url: "https://mediafire.com",
        icon: ""
      },
      {
        name: "4shared",
        url: "https://4shared.com",
        icon: ""
      },
      {
        name: "Degoo",
        url: "https://degoo.com",
        icon: ""
      },
      {
        name: "Internxt",
        url: "https://internxt.com",
        icon: ""
      },
      {
        name: "Tresorit",
        url: "https://tresorit.com",
        icon: ""
      }
    ]
  },
  {
    name: "Instant Messaging - 即时通讯",
    sites: [
      {
        name: "WhatsApp",
        url: "https://web.whatsapp.com",
        icon: ""
      },
      {
        name: "Telegram",
        url: "https://web.telegram.org",
        icon: ""
      },
      {
        name: "Discord",
        url: "https://discord.com/app",
        icon: ""
      },
      {
        name: "Slack",
        url: "https://slack.com",
        icon: ""
      },
      {
        name: "微信",
        url: "https://wx.qq.com",
        icon: ""
      },
      {
        name: "QQ",
        url: "https://im.qq.com",
        icon: ""
      },
      {
        name: "Skype",
        url: "https://web.skype.com",
        icon: ""
      },
      {
        name: "Teams",
        url: "https://teams.microsoft.com",
        icon: ""
      },
      {
        name: "钉钉",
        url: "https://dingtalk.com",
        icon: ""
      },
      {
        name: "企业微信",
        url: "https://work.weixin.qq.com",
        icon: ""
      },
      {
        name: "飞书",
        url: "https://feishu.cn",
        icon: ""
      },
      {
        name: "Zoom",
        url: "https://zoom.us",
        icon: ""
      },
      {
        name: "Signal",
        url: "https://signal.org",
        icon: ""
      },
      {
        name: "Viber",
        url: "https://viber.com",
        icon: ""
      },
      {
        name: "Line",
        url: "https://line.me",
        icon: ""
      },
      {
        name: "KakaoTalk",
        url: "https://www.kakaocorp.com",
        icon: ""
      },
      {
        name: "WeChat Work",
        url: "https://work.weixin.qq.com",
        icon: ""
      },
      {
        name: "Lark",
        url: "https://larksuite.com",
        icon: ""
      },
      {
        name: "Google Meet",
        url: "https://meet.google.com",
        icon: ""
      },
      {
        name: "Jitsi Meet",
        url: "https://meet.jit.si",
        icon: ""
      }]
  },
  {
    name: "E-Commerce - 电商购物",
    sites: [
      {
        name: "Amazon",
        url: "https://amazon.com",
        icon: ""
      },
      {
        name: "淘宝",
        url: "https://taobao.com",
        icon: ""
      },
      {
        name: "天猫",
        url: "https://tmall.com",
        icon: ""
      },
      {
        name: "京东",
        url: "https://jd.com",
        icon: ""
      },
      {
        name: "拼多多",
        url: "https://pinduoduo.com",
        icon: ""
      },
      {
        name: "eBay",
        url: "https://ebay.com",
        icon: ""
      },
      {
        name: "AliExpress",
        url: "https://aliexpress.com",
        icon: ""
      },
      {
        name: "Shopify",
        url: "https://shopify.com",
        icon: ""
      },
      {
        name: "WooCommerce",
        url: "https://woocommerce.com",
        icon: ""
      },
      {
        name: "Magento",
        url: "https://magento.com",
        icon: ""
      },
      {
        name: "Shopee",
        url: "https://shopee.com",
        icon: ""
      },
      {
        name: "Lazada",
        url: "https://lazada.com",
        icon: ""
      },
      {
        name: "Wish",
        url: "https://wish.com",
        icon: ""
      },
      {
        name: "Etsy",
        url: "https://etsy.com",
        icon: ""
      },
      {
        name: "MercadoLibre",
        url: "https://mercadolibre.com",
        icon: ""
      },
      {
        name: "Flipkart",
        url: "https://flipkart.com",
        icon: ""
      },
      {
        name: "Rakuten",
        url: "https://rakuten.com",
        icon: ""
      },
      {
        name: "Zalando",
        url: "https://zalando.com",
        icon: ""
      },
      {
        name: "ASOS",
        url: "https://asos.com",
        icon: ""
      },
      {
        name: "H&M",
        url: "https://hm.com",
        icon: ""
      },
      {
        name: "Zara",
        url: "https://zara.com",
        icon: ""
      },
      {
        name: "Uniqlo",
        url: "https://uniqlo.com",
        icon: ""
      },
      {
        name: "Nike",
        url: "https://nike.com",
        icon: ""
      },
      {
        name: "Adidas",
        url: "https://adidas.com",
        icon: ""
      },
      {
        name: "Puma",
        url: "https://puma.com",
        icon: ""
      },
      {
        name: "Under Armour",
        url: "https://underarmour.com",
        icon: ""
      },
      {
        name: "New Balance",
        url: "https://newbalance.com",
        icon: ""
      },
      {
        name: "Converse",
        url: "https://converse.com",
        icon: ""
      },
      {
        name: "Vans",
        url: "https://vans.com",
        icon: ""
      }
    ]
  },
  {
    name: "Social Media - 社交媒体",
    sites: [
      {
        name: "Facebook",
        url: "https://facebook.com",
        icon: ""
      },
      {
        name: "Twitter",
        url: "https://twitter.com",
        icon: ""
      },
      
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: ""
      },
      
      {
        name: "Snapchat",
        url: "https://snapchat.com",
        icon: ""
      },
      
      
      
      {
        name: "Mastodon",
        url: "https://mastodon.social",
        icon: ""
      },
      {
        name: "微博",
        url: "https://weibo.com",
        icon: ""
      },
      
      {
        name: "豆瓣",
        url: "https://douban.com",
        icon: ""
      },
      {
        name: "小红书",
        url: "https://xiaohongshu.com",
        icon: ""
      },
      {
        name: "B站",
        url: "https://bilibili.com",
        icon: ""
      },
      {
        name: "快手",
        url: "https://kuaishou.com",
        icon: ""
      },
      {
        name: "抖音",
        url: "https://douyin.com",
        icon: ""
      }]
  },
  {
    name: "News & Information - 新闻资讯",
    sites: [
      {
        name: "BBC",
        url: "https://bbc.com",
        icon: ""
      },
      {
        name: "CNN",
        url: "https://cnn.com",
        icon: ""
      },
      {
        name: "Reuters",
        url: "https://reuters.com",
        icon: ""
      },
      {
        name: "The Guardian",
        url: "https://theguardian.com",
        icon: ""
      },
      {
        name: "New York Times",
        url: "https://nytimes.com",
        icon: ""
      },
      {
        name: "Washington Post",
        url: "https://washingtonpost.com",
        icon: ""
      },
      {
        name: "Wall Street Journal",
        url: "https://wsj.com",
        icon: ""
      },
      {
        name: "Financial Times",
        url: "https://ft.com",
        icon: ""
      },
      {
        name: "Bloomberg",
        url: "https://bloomberg.com",
        icon: ""
      },
      {
        name: "Forbes",
        url: "https://forbes.com",
        icon: ""
      },
      {
        name: "TechCrunch",
        url: "https://techcrunch.com",
        icon: ""
      },
      {
        name: "Wired",
        url: "https://wired.com",
        icon: ""
      },
      {
        name: "Ars Technica",
        url: "https://arstechnica.com",
        icon: ""
      },
      {
        name: "The Verge",
        url: "https://theverge.com",
        icon: ""
      },
      {
        name: "Engadget",
        url: "https://engadget.com",
        icon: ""
      },
      {
        name: "Mashable",
        url: "https://mashable.com",
        icon: ""
      },
      {
        name: "Gizmodo",
        url: "https://gizmodo.com",
        icon: ""
      },
      {
        name: "CNET",
        url: "https://cnet.com",
        icon: ""
      },
      {
        name: "ZDNet",
        url: "https://zdnet.com",
        icon: ""
      },
      {
        name: "VentureBeat",
        url: "https://venturebeat.com",
        icon: ""
      }
    ]
  },
  {
    name: "Education - 教育学习",
    sites: [
      {
        name: "Coursera",
        url: "https://coursera.org",
        icon: ""
      },
      {
        name: "edX",
        url: "https://edx.org",
        icon: ""
      },
      {
        name: "Udemy",
        url: "https://udemy.com",
        icon: ""
      },
      {
        name: "Khan Academy",
        url: "https://khanacademy.org",
        icon: ""
      },
      {
        name: "Udacity",
        url: "https://udacity.com",
        icon: ""
      },
      {
        name: "Skillshare",
        url: "https://skillshare.com",
        icon: ""
      },
      {
        name: "MasterClass",
        url: "https://masterclass.com",
        icon: ""
      },
      {
        name: "LinkedIn Learning",
        url: "https://linkedin.com/learning",
        icon: ""
      },
      {
        name: "Pluralsight",
        url: "https://pluralsight.com",
        icon: ""
      },
      {
        name: "Codecademy",
        url: "https://codecademy.com",
        icon: ""
      },
      {
        name: "FreeCodeCamp",
        url: "https://freecodecamp.org",
        icon: ""
      },
      {
        name: "W3Schools",
        url: "https://w3schools.com",
        icon: ""
      },
      {
        name: "MDN",
        url: "https://developer.mozilla.org",
        icon: ""
      },
      {
        name: "Stack Overflow",
        url: "https://stackoverflow.com",
        icon: ""
      },
      
      {
        name: "GitLab",
        url: "https://gitlab.com",
        icon: ""
      },
      {
        name: "Bitbucket",
        url: "https://bitbucket.org",
        icon: ""
      },
      {
        name: "Atlassian",
        url: "https://atlassian.com",
        icon: ""
      },
      {
        name: "JetBrains",
        url: "https://jetbrains.com",
        icon: ""
      },
      {
        name: "Visual Studio",
        url: "https://visualstudio.microsoft.com",
        icon: ""
      }
    ]
  },
  {
    name: "Finance - 金融理财",
    sites: [
      {
        name: "Yahoo Finance",
        url: "https://finance.yahoo.com",
        icon: ""
      },
      {
        name: "Google Finance",
        url: "https://finance.google.com",
        icon: ""
      },
      {
        name: "MarketWatch",
        url: "https://marketwatch.com",
        icon: ""
      },
      {
        name: "Investing.com",
        url: "https://investing.com",
        icon: ""
      },
      {
        name: "TradingView",
        url: "https://tradingview.com",
        icon: ""
      },
      {
        name: "Robinhood",
        url: "https://robinhood.com",
        icon: ""
      },
      {
        name: "E*TRADE",
        url: "https://etrade.com",
        icon: ""
      },
      {
        name: "TD Ameritrade",
        url: "https://tdameritrade.com",
        icon: ""
      },
      {
        name: "Charles Schwab",
        url: "https://schwab.com",
        icon: ""
      },
      {
        name: "Fidelity",
        url: "https://fidelity.com",
        icon: ""
      },
      {
        name: "Vanguard",
        url: "https://vanguard.com",
        icon: ""
      },
      {
        name: "PayPal",
        url: "https://paypal.com",
        icon: ""
      },
      {
        name: "Stripe",
        url: "https://stripe.com",
        icon: ""
      },
      {
        name: "Square",
        url: "https://squareup.com",
        icon: ""
      },
      {
        name: "Venmo",
        url: "https://venmo.com",
        icon: ""
      },
      {
        name: "Cash App",
        url: "https://cash.app",
        icon: ""
      },
      {
        name: "Zelle",
        url: "https://zellepay.com",
        icon: ""
      },
      {
        name: "Apple Pay",
        url: "https://apple.com/apple-pay",
        icon: ""
      },
      {
        name: "Google Pay",
        url: "https://pay.google.com",
        icon: ""
      },
      {
        name: "Samsung Pay",
        url: "https://samsung.com/samsung-pay",
        icon: ""
      }
    ]
  },
  {
    name: "Private Tracker - 私人种子站",
    sites: [
      {
        name: "PT站导航",
        url: "https://pt.sjtu.edu.cn",
        icon: ""
      },
      {
        name: "HDChina",
        url: "https://hdchina.org",
        icon: ""
      },
      {
        name: "CHDBits",
        url: "https://chdbits.co",
        icon: ""
      },
      {
        name: "TTG",
        url: "https://totheglory.im",
        icon: ""
      },
      {
        name: "HDHome",
        url: "https://hdhome.org",
        icon: ""
      },
      {
        name: "HDTime",
        url: "https://hdtime.org",
        icon: ""
      },
      {
        name: "HDArea",
        url: "https://hdarea.co",
        icon: ""
      },
      {
        name: "HDStreet",
        url: "https://hdstreet.club",
        icon: ""
      },
      {
        name: "HDTorrents",
        url: "https://hd-torrents.org",
        icon: ""
      },
      {
        name: "IPTorrents",
        url: "https://iptorrents.com",
        icon: ""
      },
      {
        name: "TorrentLeech",
        url: "https://torrentleech.org",
        icon: ""
      },
      {
        name: "PrivateHD",
        url: "https://privatehd.to",
        icon: ""
      }
    ]
  },
  {
    name: "Dev Tools - 开发工具",
    sites: [
      {
        name: "VS Code",
        url: "https://code.visualstudio.com",
        icon: ""
      },
      
      
      
      
      
      {
        name: "Codepen",
        url: "https://codepen.io",
        icon: ""
      },
      {
        name: "JSFiddle",
        url: "https://jsfiddle.net",
        icon: ""
      },
      {
        name: "Replit",
        url: "https://replit.com",
        icon: ""
      },
      {
        name: "Postman",
        url: "https://postman.com",
        icon: ""
      },
      {
        name: "Docker",
        url: "https://docker.com",
        icon: ""
      },
      {
        name: "Figma",
        url: "https://figma.com",
        icon: ""
      },
      {
        name: "Sketch",
        url: "https://sketch.com",
        icon: ""
      },
      {
        name: "Adobe XD",
        url: "https://adobe.com/products/xd",
        icon: ""
      },
      {
        name: "InVision",
        url: "https://invisionapp.com",
        icon: ""
      },
      {
        name: "Zeplin",
        url: "https://zeplin.io",
        icon: ""
      },
      {
        name: "Framer",
        url: "https://framer.com",
        icon: ""
      },
      {
        name: "Webflow",
        url: "https://webflow.com",
        icon: ""
      },
      {
        name: "Squarespace",
        url: "https://squarespace.com",
        icon: ""
      },
      {
        name: "Wix",
        url: "https://wix.com",
        icon: ""
      },
      {
        name: "WordPress",
        url: "https://wordpress.com",
        icon: ""
      }
    ]
  },
  {
    name: "Gaming - 游戏娱乐",
    sites: [
      {
        name: "Steam",
        url: "https://store.steampowered.com",
        icon: ""
      },
      {
        name: "Epic Games",
        url: "https://epicgames.com",
        icon: ""
      },
      {
        name: "Xbox",
        url: "https://xbox.com",
        icon: ""
      },
      {
        name: "PlayStation",
        url: "https://playstation.com",
        icon: ""
      },
      {
        name: "Nintendo",
        url: "https://nintendo.com",
        icon: ""
      },
      {
        name: "Battle.net",
        url: "https://battle.net",
        icon: ""
      },
      {
        name: "Origin",
        url: "https://origin.com",
        icon: ""
      },
      {
        name: "Uplay",
        url: "https://uplay.ubisoft.com",
        icon: ""
      },
      {
        name: "GOG",
        url: "https://gog.com",
        icon: ""
      },
      {
        name: "itch.io",
        url: "https://itch.io",
        icon: ""
      },
      {
        name: "Humble Bundle",
        url: "https://humblebundle.com",
        icon: ""
      },
      {
        name: "Game Jolt",
        url: "https://gamejolt.com",
        icon: ""
      },
      {
        name: "Kongregate",
        url: "https://kongregate.com",
        icon: ""
      },
      {
        name: "Newgrounds",
        url: "https://newgrounds.com",
        icon: ""
      },
      {
        name: "Armor Games",
        url: "https://armorgames.com",
        icon: ""
      },
      {
        name: "Miniclip",
        url: "https://miniclip.com",
        icon: ""
      },
      {
        name: "Poki",
        url: "https://poki.com",
        icon: ""
      },
      {
        name: "CrazyGames",
        url: "https://crazygames.com",
        icon: ""
      },
      {
        name: "Y8",
        url: "https://y8.com",
        icon: ""
      },
      {
        name: "GameDistribution",
        url: "https://gamedistribution.com",
        icon: ""
      }
    ]
  },
  {
    name: "Health & Fitness - 健康健身",
    sites: [
      {
        name: "MyFitnessPal",
        url: "https://myfitnesspal.com",
        icon: ""
      },
      {
        name: "Fitbit",
        url: "https://fitbit.com",
        icon: ""
      },
      {
        name: "Strava",
        url: "https://strava.com",
        icon: ""
      },
      {
        name: "Nike Training",
        url: "https://nike.com/ntc-app",
        icon: ""
      },
      {
        name: "Adidas Training",
        url: "https://adidas.com/us/apps",
        icon: ""
      },
      {
        name: "Peloton",
        url: "https://onepeloton.com",
        icon: ""
      },
      {
        name: "Apple Fitness+",
        url: "https://apple.com/fitness-plus",
        icon: ""
      },
      {
        name: "Headspace",
        url: "https://headspace.com",
        icon: ""
      },
      {
        name: "Calm",
        url: "https://calm.com",
        icon: ""
      },
      {
        name: "Insight Timer",
        url: "https://insighttimer.com",
        icon: ""
      },
      {
        name: "Meditation Timer",
        url: "https://meditationtimer.com",
        icon: ""
      },
      {
        name: "Sleep Cycle",
        url: "https://sleepcycle.com",
        icon: ""
      },
      {
        name: "Sleep as Android",
        url: "https://sleep.urbandroid.org",
        icon: ""
      },
      {
        name: "Cronometer",
        url: "https://cronometer.com",
        icon: ""
      },
      {
        name: "Lose It!",
        url: "https://loseit.com",
        icon: ""
      },
      {
        name: "Noom",
        url: "https://noom.com",
        icon: ""
      },
      {
        name: "Weight Watchers",
        url: "https://weightwatchers.com",
        icon: ""
      },
      {
        name: "8fit",
        url: "https://8fit.com",
        icon: ""
      },
      {
        name: "Freeletics",
        url: "https://freeletics.com",
        icon: ""
      },
      {
        name: "Seven",
        url: "https://7minuteworkout.com",
        icon: ""
      }
    ]
  },
  {
    name: "Travel - 旅游出行",
    sites: [
      {
        name: "Booking.com",
        url: "https://booking.com",
        icon: ""
      },
      {
        name: "Airbnb",
        url: "https://airbnb.com",
        icon: ""
      },
      {
        name: "Expedia",
        url: "https://expedia.com",
        icon: ""
      },
      {
        name: "Kayak",
        url: "https://kayak.com",
        icon: ""
      },
      {
        name: "Skyscanner",
        url: "https://skyscanner.com",
        icon: ""
      },
      {
        name: "Google Flights",
        url: "https://google.com/travel",
        icon: ""
      },
      {
        name: "TripAdvisor",
        url: "https://tripadvisor.com",
        icon: ""
      },
      {
        name: "Lonely Planet",
        url: "https://lonelyplanet.com",
        icon: ""
      },
      {
        name: "Foursquare",
        url: "https://foursquare.com",
        icon: ""
      },
      {
        name: "Yelp",
        url: "https://yelp.com",
        icon: ""
      },
      {
        name: "Zomato",
        url: "https://zomato.com",
        icon: ""
      },
      {
        name: "OpenTable",
        url: "https://opentable.com",
        icon: ""
      },
      {
        name: "Uber",
        url: "https://uber.com",
        icon: ""
      },
      {
        name: "Lyft",
        url: "https://lyft.com",
        icon: ""
      },
      {
        name: "Grab",
        url: "https://grab.com",
        icon: ""
      },
      {
        name: "Didi",
        url: "https://didi.com",
        icon: ""
      },
      {
        name: "Bolt",
        url: "https://bolt.eu",
        icon: ""
      },
      {
        name: "Ola",
        url: "https://olacabs.com",
        icon: ""
      },
      {
        name: "Gojek",
        url: "https://gojek.com",
        icon: ""
      },
      {
        name: "Careem",
        url: "https://careem.com",
        icon: ""
      }
    ]
  },
  {
    name: "Food & Delivery - 美食外卖",
    sites: [
      {
        name: "DoorDash",
        url: "https://doordash.com",
        icon: ""
      },
      {
        name: "Uber Eats",
        url: "https://ubereats.com",
        icon: ""
      },
      {
        name: "Grubhub",
        url: "https://grubhub.com",
        icon: ""
      },
      {
        name: "Postmates",
        url: "https://postmates.com",
        icon: ""
      },
      {
        name: "Caviar",
        url: "https://caviar.com",
        icon: ""
      },
      {
        name: "Seamless",
        url: "https://seamless.com",
        icon: ""
      },
      {
        name: "Just Eat",
        url: "https://just-eat.co.uk",
        icon: ""
      },
      {
        name: "Deliveroo",
        url: "https://deliveroo.com",
        icon: ""
      },
      {
        name: "Foodpanda",
        url: "https://foodpanda.com",
        icon: ""
      },
      {
        name: "Swiggy",
        url: "https://swiggy.com",
        icon: ""
      },
      
      {
        name: "美团",
        url: "https://meituan.com",
        icon: ""
      },
      {
        name: "饿了么",
        url: "https://ele.me",
        icon: ""
      },
      {
        name: "百度外卖",
        url: "https://waimai.baidu.com",
        icon: ""
      },
      {
        name: "口碑",
        url: "https://koubei.com",
        icon: ""
      },
      {
        name: "大众点评",
        url: "https://dianping.com",
        icon: ""
      },
      
      {
        name: "Resy",
        url: "https://resy.com",
        icon: ""
      },
      {
        name: "Tock",
        url: "https://tock.com",
        icon: ""
      }]
  },
  {
    name: "Productivity - 生产力工具",
    sites: [
      {
        name: "Notion",
        url: "https://notion.so",
        icon: ""
      },
      {
        name: "Airtable",
        url: "https://airtable.com",
        icon: ""
      },
      {
        name: "Monday.com",
        url: "https://monday.com",
        icon: ""
      },
      {
        name: "Asana",
        url: "https://asana.com",
        icon: ""
      },
      
      {
        name: "Jira",
        url: "https://atlassian.com/software/jira",
        icon: ""
      },
      {
        name: "Confluence",
        url: "https://atlassian.com/software/confluence",
        icon: ""
      },
      {
        name: "Basecamp",
        url: "https://basecamp.com",
        icon: ""
      },
      {
        name: "ClickUp",
        url: "https://clickup.com",
        icon: ""
      },
      {
        name: "Wrike",
        url: "https://wrike.com",
        icon: ""
      },
      {
        name: "Smartsheet",
        url: "https://smartsheet.com",
        icon: ""
      },
      {
        name: "Todoist",
        url: "https://todoist.com",
        icon: ""
      },
      {
        name: "Any.do",
        url: "https://any.do",
        icon: ""
      },
      {
        name: "TickTick",
        url: "https://ticktick.com",
        icon: ""
      },
      {
        name: "Things",
        url: "https://culturedcode.com/things",
        icon: ""
      },
      {
        name: "OmniFocus",
        url: "https://omnigroup.com/omnifocus",
        icon: ""
      },
      {
        name: "Evernote",
        url: "https://evernote.com",
        icon: ""
      },
      {
        name: "OneNote",
        url: "https://onenote.com",
        icon: ""
      },
      {
        name: "Obsidian",
        url: "https://obsidian.md",
        icon: ""
      },
      {
        name: "Roam Research",
        url: "https://roamresearch.com",
        icon: ""
      }
    ]
  },
  {
    name: "Security - 安全工具",
    sites: [
      {
        name: "1Password",
        url: "https://1password.com",
        icon: ""
      },
      {
        name: "LastPass",
        url: "https://lastpass.com",
        icon: ""
      },
      {
        name: "Bitwarden",
        url: "https://bitwarden.com",
        icon: ""
      },
      {
        name: "Dashlane",
        url: "https://dashlane.com",
        icon: ""
      },
      {
        name: "Keeper",
        url: "https://keepersecurity.com",
        icon: ""
      },
      {
        name: "NordPass",
        url: "https://nordpass.com",
        icon: ""
      },
      {
        name: "RoboForm",
        url: "https://roboform.com",
        icon: ""
      },
      {
        name: "Enpass",
        url: "https://enpass.io",
        icon: ""
      },
      {
        name: "ProtonPass",
        url: "https://proton.me/pass",
        icon: ""
      },
      {
        name: "Authy",
        url: "https://authy.com",
        icon: ""
      },
      {
        name: "Google Authenticator",
        url: "https://google.com/landing/2step",
        icon: ""
      },
      {
        name: "Microsoft Authenticator",
        url: "https://microsoft.com/security/authenticator",
        icon: ""
      },
      {
        name: "YubiKey",
        url: "https://yubico.com",
        icon: ""
      },
      {
        name: "FIDO Alliance",
        url: "https://fidoalliance.org",
        icon: ""
      },
      {
        name: "WebAuthn",
        url: "https://webauthn.io",
        icon: ""
      },
      {
        name: "Have I Been Pwned",
        url: "https://haveibeenpwned.com",
        icon: ""
      },
      {
        name: "Troy Hunt",
        url: "https://troyhunt.com",
        icon: ""
      },
      {
        name: "Security Headers",
        url: "https://securityheaders.com",
        icon: ""
      },
      {
        name: "SSL Labs",
        url: "https://ssllabs.com",
        icon: ""
      },
      {
        name: "Mozilla Observatory",
        url: "https://observatory.mozilla.org",
        icon: ""
      }
    ]
  },
  {
    name: "Entertainment - 娱乐休闲",
    sites: [
      
      
      
      
      {
        name: "Hulu",
        url: "https://hulu.com",
        icon: ""
      },
      {
        name: "Apple TV+",
        url: "https://tv.apple.com",
        icon: ""
      },
      {
        name: "Paramount+",
        url: "https://paramountplus.com",
        icon: ""
      },
      {
        name: "Peacock",
        url: "https://peacocktv.com",
        icon: ""
      },
      
      
      
      
      
      {
        name: "Deezer",
        url: "https://deezer.com",
        icon: ""
      },
      {
        name: "Amazon Music",
        url: "https://music.amazon.com",
        icon: ""
      },
      {
        name: "YouTube Music",
        url: "https://music.youtube.com",
        icon: ""
      },
      {
        name: "Audible",
        url: "https://audible.com",
        icon: ""
      },
      {
        name: "Libby",
        url: "https://libbyapp.com",
        icon: ""
      },
      {
        name: "Kindle",
        url: "https://amazon.com/kindle",
        icon: ""
      },
      {
        name: "Goodreads",
        url: "https://goodreads.com",
        icon: ""
      },
      {
        name: "BookBub",
        url: "https://bookbub.com",
        icon: ""
      }
    ]
  },
  {
    name: "Photography - 摄影设计",
    sites: [
      {
        name: "Adobe Creative Cloud",
        url: "https://adobe.com/creativecloud",
        icon: ""
      },
      {
        name: "Photoshop",
        url: "https://adobe.com/products/photoshop",
        icon: ""
      },
      {
        name: "Lightroom",
        url: "https://adobe.com/products/photoshop-lightroom",
        icon: ""
      },
      {
        name: "Illustrator",
        url: "https://adobe.com/products/illustrator",
        icon: ""
      },
      {
        name: "InDesign",
        url: "https://adobe.com/products/indesign",
        icon: ""
      },
      {
        name: "Premiere Pro",
        url: "https://adobe.com/products/premiere",
        icon: ""
      },
      {
        name: "After Effects",
        url: "https://adobe.com/products/aftereffects",
        icon: ""
      },
      
      
      {
        name: "Canva",
        url: "https://canva.com",
        icon: ""
      },
      
      
      
      
      
      
      
      
      {
        name: "Dribbble",
        url: "https://dribbble.com",
        icon: ""
      },
      {
        name: "Behance",
        url: "https://behance.net",
        icon: ""
      }
    ]
  },
  {
    name: "Sports - 体育运动",
    sites: [
      {
        name: "ESPN",
        url: "https://espn.com",
        icon: ""
      },
      {
        name: "NFL",
        url: "https://nfl.com",
        icon: ""
      },
      {
        name: "NBA",
        url: "https://nba.com",
        icon: ""
      },
      {
        name: "MLB",
        url: "https://mlb.com",
        icon: ""
      },
      {
        name: "NHL",
        url: "https://nhl.com",
        icon: ""
      },
      {
        name: "FIFA",
        url: "https://fifa.com",
        icon: ""
      },
      {
        name: "UEFA",
        url: "https://uefa.com",
        icon: ""
      },
      {
        name: "Premier League",
        url: "https://premierleague.com",
        icon: ""
      },
      {
        name: "La Liga",
        url: "https://laliga.com",
        icon: ""
      },
      {
        name: "Serie A",
        url: "https://legaseriea.it",
        icon: ""
      },
      {
        name: "Bundesliga",
        url: "https://bundesliga.com",
        icon: ""
      },
      {
        name: "Ligue 1",
        url: "https://ligue1.com",
        icon: ""
      },
      {
        name: "Olympics",
        url: "https://olympics.com",
        icon: ""
      },
      {
        name: "IOC",
        url: "https://olympic.org",
        icon: ""
      },
      {
        name: "F1",
        url: "https://formula1.com",
        icon: ""
      },
      {
        name: "MotoGP",
        url: "https://motogp.com",
        icon: ""
      },
      {
        name: "WWE",
        url: "https://wwe.com",
        icon: ""
      },
      {
        name: "UFC",
        url: "https://ufc.com",
        icon: ""
      },
      {
        name: "Boxing",
        url: "https://boxing.com",
        icon: ""
      },
      {
        name: "Tennis",
        url: "https://atptour.com",
        icon: ""
      }
    ]
  },
  {
    name: "Weather - 天气气象",
    sites: [
      {
        name: "Weather.com",
        url: "https://weather.com",
        icon: ""
      },
      {
        name: "AccuWeather",
        url: "https://accuweather.com",
        icon: ""
      },
      {
        name: "Weather Underground",
        url: "https://wunderground.com",
        icon: ""
      },
      {
        name: "BBC Weather",
        url: "https://bbc.com/weather",
        icon: ""
      },
      {
        name: "Met Office",
        url: "https://metoffice.gov.uk",
        icon: ""
      },
      {
        name: "Weather Channel",
        url: "https://weather.com",
        icon: ""
      },
      {
        name: "NOAA",
        url: "https://noaa.gov",
        icon: ""
      },
      {
        name: "National Weather Service",
        url: "https://weather.gov",
        icon: ""
      },
      {
        name: "Weather Radar",
        url: "https://weatherradar.com",
        icon: ""
      },
      {
        name: "Windy",
        url: "https://windy.com",
        icon: ""
      },
      {
        name: "Ventusky",
        url: "https://ventusky.com",
        icon: ""
      },
      {
        name: "Weather Spark",
        url: "https://weatherspark.com",
        icon: ""
      },
      {
        name: "Weather Atlas",
        url: "https://weather-atlas.com",
        icon: ""
      },
      {
        name: "Weather API",
        url: "https://openweathermap.org",
        icon: ""
      },
      {
        name: "Weather Underground API",
        url: "https://wunderground.com",
        icon: ""
      },
      {
        name: "Dark Sky",
        url: "https://darksky.net",
        icon: ""
      },
      {
        name: "WeatherBug",
        url: "https://weatherbug.com",
        icon: ""
      },
      {
        name: "Weather Live",
        url: "https://weatherlive.com",
        icon: ""
      },
      {
        name: "Weather Network",
        url: "https://theweathernetwork.com",
        icon: ""
      }]
  },
  {
    name: "Maps & Navigation - 地图导航",
    sites: [
      {
        name: "Google Maps",
        url: "https://maps.google.com",
        icon: ""
      },
      {
        name: "Apple Maps",
        url: "https://maps.apple.com",
        icon: ""
      },
      {
        name: "Bing Maps",
        url: "https://bing.com/maps",
        icon: ""
      },
      {
        name: "MapQuest",
        url: "https://mapquest.com",
        icon: ""
      },
      {
        name: "HERE Maps",
        url: "https://here.com",
        icon: ""
      },
      {
        name: "OpenStreetMap",
        url: "https://openstreetmap.org",
        icon: ""
      },
      {
        name: "Waze",
        url: "https://waze.com",
        icon: ""
      },
      {
        name: "TomTom",
        url: "https://tomtom.com",
        icon: ""
      },
      {
        name: "Garmin",
        url: "https://garmin.com",
        icon: ""
      },
      
      {
        name: "Komoot",
        url: "https://komoot.com",
        icon: ""
      },
      {
        name: "AllTrails",
        url: "https://alltrails.com",
        icon: ""
      },
      {
        name: "Gaia GPS",
        url: "https://gaiagps.com",
        icon: ""
      },
      {
        name: "OnX Hunt",
        url: "https://onxmaps.com",
        icon: ""
      },
      {
        name: "Caltopo",
        url: "https://caltopo.com",
        icon: ""
      },
      {
        name: "Mapbox",
        url: "https://mapbox.com",
        icon: ""
      },
      {
        name: "Leaflet",
        url: "https://leafletjs.com",
        icon: ""
      },
      {
        name: "MapTiler",
        url: "https://maptiler.com",
        icon: ""
      },
      {
        name: "Esri",
        url: "https://esri.com",
        icon: ""
      },
      {
        name: "QGIS",
        url: "https://qgis.org",
        icon: ""
      }
    ]
  },
  {
    name: "Government - 政府机构",
    sites: [
      {
        name: "White House",
        url: "https://whitehouse.gov",
        icon: ""
      },
      {
        name: "Congress",
        url: "https://congress.gov",
        icon: ""
      },
      {
        name: "Supreme Court",
        url: "https://supremecourt.gov",
        icon: ""
      },
      {
        name: "FBI",
        url: "https://fbi.gov",
        icon: ""
      },
      {
        name: "CIA",
        url: "https://cia.gov",
        icon: ""
      },
      {
        name: "NSA",
        url: "https://nsa.gov",
        icon: ""
      },
      {
        name: "NASA",
        url: "https://nasa.gov",
        icon: ""
      },
      {
        name: "CDC",
        url: "https://cdc.gov",
        icon: ""
      },
      {
        name: "FDA",
        url: "https://fda.gov",
        icon: ""
      },
      {
        name: "IRS",
        url: "https://irs.gov",
        icon: ""
      },
      {
        name: "Social Security",
        url: "https://ssa.gov",
        icon: ""
      },
      {
        name: "Medicare",
        url: "https://medicare.gov",
        icon: ""
      },
      {
        name: "Medicaid",
        url: "https://medicaid.gov",
        icon: ""
      },
      {
        name: "Veterans Affairs",
        url: "https://va.gov",
        icon: ""
      },
      {
        name: "Department of State",
        url: "https://state.gov",
        icon: ""
      },
      {
        name: "Department of Defense",
        url: "https://defense.gov",
        icon: ""
      },
      {
        name: "Department of Justice",
        url: "https://justice.gov",
        icon: ""
      },
      {
        name: "Department of Education",
        url: "https://ed.gov",
        icon: ""
      },
      {
        name: "Department of Energy",
        url: "https://energy.gov",
        icon: ""
      },
      {
        name: "Department of Transportation",
        url: "https://transportation.gov",
        icon: ""
      }
    ]
  },
  {
    name: "Science - 科学技术",
    sites: [
      
      {
        name: "NSF",
        url: "https://nsf.gov",
        icon: ""
      },
      {
        name: "NIH",
        url: "https://nih.gov",
        icon: ""
      },
      
      {
        name: "USGS",
        url: "https://usgs.gov",
        icon: ""
      },
      {
        name: "NIST",
        url: "https://nist.gov",
        icon: ""
      },
      {
        name: "DOE",
        url: "https://energy.gov",
        icon: ""
      },
      {
        name: "Argonne National Laboratory",
        url: "https://anl.gov",
        icon: ""
      },
      {
        name: "Lawrence Berkeley National Laboratory",
        url: "https://lbl.gov",
        icon: ""
      },
      {
        name: "Oak Ridge National Laboratory",
        url: "https://ornl.gov",
        icon: ""
      },
      {
        name: "CERN",
        url: "https://cern.ch",
        icon: ""
      },
      {
        name: "ESA",
        url: "https://esa.int",
        icon: ""
      },
      {
        name: "JAXA",
        url: "https://jaxa.jp",
        icon: ""
      },
      {
        name: "ISRO",
        url: "https://isro.gov.in",
        icon: ""
      },
      {
        name: "CNSA",
        url: "https://cnsa.gov.cn",
        icon: ""
      },
      {
        name: "Roscosmos",
        url: "https://roscosmos.ru",
        icon: ""
      },
      {
        name: "SpaceX",
        url: "https://spacex.com",
        icon: ""
      },
      {
        name: "Blue Origin",
        url: "https://blueorigin.com",
        icon: ""
      },
      {
        name: "Virgin Galactic",
        url: "https://virgingalactic.com",
        icon: ""
      },
      {
        name: "Boeing",
        url: "https://boeing.com",
        icon: ""
      }
    ]
  },
  {
    name: "Language Learning - 语言学习",
    sites: [
      {
        name: "Duolingo",
        url: "https://duolingo.com",
        icon: ""
      },
      {
        name: "Babbel",
        url: "https://babbel.com",
        icon: ""
      },
      {
        name: "Rosetta Stone",
        url: "https://rosettastone.com",
        icon: ""
      },
      {
        name: "Busuu",
        url: "https://busuu.com",
        icon: ""
      },
      {
        name: "Memrise",
        url: "https://memrise.com",
        icon: ""
      },
      {
        name: "Lingoda",
        url: "https://lingoda.com",
        icon: ""
      },
      {
        name: "italki",
        url: "https://italki.com",
        icon: ""
      },
      {
        name: "Preply",
        url: "https://preply.com",
        icon: ""
      },
      {
        name: "Verbling",
        url: "https://verbling.com",
        icon: ""
      },
      {
        name: "Cambly",
        url: "https://cambly.com",
        icon: ""
      },
      {
        name: "HelloTalk",
        url: "https://hellotalk.com",
        icon: ""
      },
      {
        name: "Tandem",
        url: "https://tandem.net",
        icon: ""
      },
      {
        name: "Speaky",
        url: "https://speaky.com",
        icon: ""
      },
      {
        name: "LingQ",
        url: "https://lingq.com",
        icon: ""
      },
      {
        name: "FluentU",
        url: "https://fluentu.com",
        icon: ""
      },
      {
        name: "Lingvist",
        url: "https://lingvist.com",
        icon: ""
      },
      {
        name: "Drops",
        url: "https://languagedrops.com",
        icon: ""
      },
      {
        name: "Mondly",
        url: "https://mondly.com",
        icon: ""
      },
      
      {
        name: "Pimsleur",
        url: "https://pimsleur.com",
        icon: ""
      }
    ]
  },
  {
    name: "Real Estate - 房地产",
    sites: [
      {
        name: "Zillow",
        url: "https://zillow.com",
        icon: ""
      },
      {
        name: "Realtor.com",
        url: "https://realtor.com",
        icon: ""
      },
      {
        name: "Redfin",
        url: "https://redfin.com",
        icon: ""
      },
      {
        name: "Trulia",
        url: "https://trulia.com",
        icon: ""
      },
      {
        name: "Apartments.com",
        url: "https://apartments.com",
        icon: ""
      },
      {
        name: "Rent.com",
        url: "https://rent.com",
        icon: ""
      },
      {
        name: "Apartment List",
        url: "https://apartmentlist.com",
        icon: ""
      },
      {
        name: "HotPads",
        url: "https://hotpads.com",
        icon: ""
      },
      {
        name: "Rentberry",
        url: "https://rentberry.com",
        icon: ""
      },
      {
        name: "RentSpree",
        url: "https://rentspree.com",
        icon: ""
      }]
  },
  {
    name: "Other - 其他",
    sites: [
      {
        name: "Google Drive",
        url: "https://drive.google.com",
        icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
      },
      
      
      
      
      
      
      
      
      
      
      {
        name: "Logseq",
        url: "https://logseq.com",
        icon: ""
      },
      {
        name: "Bear",
        url: "https://bear.app",
        icon: ""
      },
      {
        name: "Ulysses",
        url: "https://ulysses.app",
        icon: ""
      },
      {
        name: "Scrivener",
        url: "https://literatureandlatte.com",
        icon: ""
      },
      {
        name: "Typora",
        url: "https://typora.io",
        icon: ""
      },
      {
        name: "Mark Text",
        url: "https://marktext.app",
        icon: ""
      },
      {
        name: "Zettlr",
        url: "https://zettlr.com",
        icon: ""
      },
      {
        name: "Joplin",
        url: "https://joplinapp.org",
        icon: ""
      },
      {
        name: "Standard Notes",
        url: "https://standardnotes.com",
        icon: ""
      },
      {
        name: "Simplenote",
        url: "https://simplenote.com",
        icon: ""
      }
    ]
  },
  {
    name: "Automotive - 汽车交通",
    sites: [
      {
        name: "Tesla",
        url: "https://tesla.com",
        icon: ""
      },
      {
        name: "BMW",
        url: "https://bmw.com",
        icon: ""
      },
      {
        name: "Mercedes-Benz",
        url: "https://mercedes-benz.com",
        icon: ""
      },
      {
        name: "Audi",
        url: "https://audi.com",
        icon: ""
      },
      {
        name: "Toyota",
        url: "https://toyota.com",
        icon: ""
      },
      {
        name: "Honda",
        url: "https://honda.com",
        icon: ""
      },
      {
        name: "Ford",
        url: "https://ford.com",
        icon: ""
      },
      {
        name: "Chevrolet",
        url: "https://chevrolet.com",
        icon: ""
      },
      {
        name: "Nissan",
        url: "https://nissan.com",
        icon: ""
      },
      {
        name: "Hyundai",
        url: "https://hyundai.com",
        icon: ""
      },
      {
        name: "Kia",
        url: "https://kia.com",
        icon: ""
      },
      {
        name: "Volkswagen",
        url: "https://volkswagen.com",
        icon: ""
      },
      {
        name: "Porsche",
        url: "https://porsche.com",
        icon: ""
      },
      {
        name: "Ferrari",
        url: "https://ferrari.com",
        icon: ""
      },
      {
        name: "Lamborghini",
        url: "https://lamborghini.com",
        icon: ""
      },
      {
        name: "Bentley",
        url: "https://bentley.com",
        icon: ""
      },
      {
        name: "Rolls-Royce",
        url: "https://rolls-roycemotorcars.com",
        icon: ""
      },
      {
        name: "Aston Martin",
        url: "https://astonmartin.com",
        icon: ""
      },
      {
        name: "McLaren",
        url: "https://mclaren.com",
        icon: ""
      },
      {
        name: "Maserati",
        url: "https://maserati.com",
        icon: ""
      }
    ]
  },
  {
    name: "Fashion & Beauty - 时尚美容",
    sites: [
      {
        name: "Louis Vuitton",
        url: "https://louisvuitton.com",
        icon: ""
      },
      {
        name: "Chanel",
        url: "https://chanel.com",
        icon: ""
      },
      {
        name: "Gucci",
        url: "https://gucci.com",
        icon: ""
      },
      {
        name: "Prada",
        url: "https://prada.com",
        icon: ""
      },
      {
        name: "Hermès",
        url: "https://hermes.com",
        icon: ""
      },
      {
        name: "Dior",
        url: "https://dior.com",
        icon: ""
      },
      {
        name: "Versace",
        url: "https://versace.com",
        icon: ""
      },
      {
        name: "Armani",
        url: "https://armani.com",
        icon: ""
      },
      {
        name: "Burberry",
        url: "https://burberry.com",
        icon: ""
      },
      {
        name: "Saint Laurent",
        url: "https://ysl.com",
        icon: ""
      },
      {
        name: "Balenciaga",
        url: "https://balenciaga.com",
        icon: ""
      },
      {
        name: "Givenchy",
        url: "https://givenchy.com",
        icon: ""
      },
      {
        name: "Valentino",
        url: "https://valentino.com",
        icon: ""
      },
      {
        name: "Fendi",
        url: "https://fendi.com",
        icon: ""
      },
      {
        name: "Bottega Veneta",
        url: "https://bottegaveneta.com",
        icon: ""
      },
      {
        name: "Celine",
        url: "https://celine.com",
        icon: ""
      },
      {
        name: "Loewe",
        url: "https://loewe.com",
        icon: ""
      },
      
      {
        name: "Off-White",
        url: "https://off---white.com",
        icon: ""
      },
      {
        name: "Vetements",
        url: "https://vetementswebsite.com",
        icon: ""
      }
    ]
  },
  {
    name: "Entertainment - 娱乐影视",
    sites: [
      
      
      
      
      
      
      
      
      {
        name: "Crunchyroll",
        url: "https://crunchyroll.com",
        icon: ""
      },
      {
        name: "Funimation",
        url: "https://funimation.com",
        icon: ""
      },
      
      
      
      
      {
        name: "Bandcamp",
        url: "https://bandcamp.com",
        icon: ""
      },
      
      {
        name: "Mixer",
        url: "https://mixer.com",
        icon: ""
      },
      {
        name: "DLive",
        url: "https://dlive.tv",
        icon: ""
      },
      {
        name: "Caffeine",
        url: "https://caffeine.tv",
        icon: ""
      },
      {
        name: "Facebook Gaming",
        url: "https://gaming.fb.com",
        icon: ""
      }
    ]
  },
  {
    name: "Food & Beverage - 餐饮美食",
    sites: [
      {
        name: "McDonald's",
        url: "https://mcdonalds.com",
        icon: ""
      },
      {
        name: "KFC",
        url: "https://kfc.com",
        icon: ""
      },
      {
        name: "Subway",
        url: "https://subway.com",
        icon: ""
      },
      {
        name: "Starbucks",
        url: "https://starbucks.com",
        icon: ""
      },
      {
        name: "Pizza Hut",
        url: "https://pizzahut.com",
        icon: ""
      },
      {
        name: "Domino's",
        url: "https://dominos.com",
        icon: ""
      },
      {
        name: "Burger King",
        url: "https://burgerking.com",
        icon: ""
      },
      {
        name: "Taco Bell",
        url: "https://tacobell.com",
        icon: ""
      },
      {
        name: "Wendy's",
        url: "https://wendys.com",
        icon: ""
      },
      {
        name: "Chick-fil-A",
        url: "https://chick-fil-a.com",
        icon: ""
      },
      {
        name: "Chipotle",
        url: "https://chipotle.com",
        icon: ""
      },
      {
        name: "Panera Bread",
        url: "https://panerabread.com",
        icon: ""
      },
      {
        name: "Dunkin'",
        url: "https://dunkindonuts.com",
        icon: ""
      },
      {
        name: "Tim Hortons",
        url: "https://timhortons.com",
        icon: ""
      },
      {
        name: "Costa Coffee",
        url: "https://costacoffee.com",
        icon: ""
      },
      {
        name: "Pret A Manger",
        url: "https://pret.com",
        icon: ""
      },
      {
        name: "Five Guys",
        url: "https://fiveguys.com",
        icon: ""
      },
      {
        name: "In-N-Out",
        url: "https://in-n-out.com",
        icon: ""
      },
      {
        name: "Shake Shack",
        url: "https://shakeshack.com",
        icon: ""
      },
      {
        name: "Culver's",
        url: "https://culvers.com",
        icon: ""
      }
    ]
  },
  {
    name: "Home & Garden - 家居园艺",
    sites: [
      {
        name: "IKEA",
        url: "https://ikea.com",
        icon: ""
      },
      {
        name: "Home Depot",
        url: "https://homedepot.com",
        icon: ""
      },
      {
        name: "Lowe's",
        url: "https://lowes.com",
        icon: ""
      },
      {
        name: "Wayfair",
        url: "https://wayfair.com",
        icon: ""
      },
      {
        name: "West Elm",
        url: "https://westelm.com",
        icon: ""
      },
      {
        name: "Pottery Barn",
        url: "https://potterybarn.com",
        icon: ""
      },
      {
        name: "Crate & Barrel",
        url: "https://crateandbarrel.com",
        icon: ""
      },
      {
        name: "Williams Sonoma",
        url: "https://williams-sonoma.com",
        icon: ""
      },
      {
        name: "Bed Bath & Beyond",
        url: "https://bedbathandbeyond.com",
        icon: ""
      },
      {
        name: "Target",
        url: "https://target.com",
        icon: ""
      },
      {
        name: "Walmart",
        url: "https://walmart.com",
        icon: ""
      },
      {
        name: "Costco",
        url: "https://costco.com",
        icon: ""
      },
      {
        name: "Sam's Club",
        url: "https://samsclub.com",
        icon: ""
      },
      {
        name: "BJ's Wholesale",
        url: "https://bjs.com",
        icon: ""
      },
      {
        name: "Macy's",
        url: "https://macys.com",
        icon: ""
      },
      {
        name: "Nordstrom",
        url: "https://nordstrom.com",
        icon: ""
      },
      {
        name: "Bloomingdale's",
        url: "https://bloomingdales.com",
        icon: ""
      },
      {
        name: "Saks Fifth Avenue",
        url: "https://saks.com",
        icon: ""
      },
      {
        name: "Neiman Marcus",
        url: "https://neimanmarcus.com",
        icon: ""
      },
      {
        name: "Bergdorf Goodman",
        url: "https://bergdorfgoodman.com",
        icon: ""
      }
    ]
  },
  {
    name: "Technology - 科技硬件",
    sites: [
      {
        name: "Apple",
        url: "https://apple.com",
        icon: ""
      },
      {
        name: "Samsung",
        url: "https://samsung.com",
        icon: ""
      },
      {
        name: "Microsoft",
        url: "https://microsoft.com",
        icon: ""
      },
      {
        name: "Intel",
        url: "https://intel.com",
        icon: ""
      },
      {
        name: "AMD",
        url: "https://amd.com",
        icon: ""
      },
      {
        name: "NVIDIA",
        url: "https://nvidia.com",
        icon: ""
      },
      {
        name: "ASUS",
        url: "https://asus.com",
        icon: ""
      },
      {
        name: "Dell",
        url: "https://dell.com",
        icon: ""
      },
      {
        name: "HP",
        url: "https://hp.com",
        icon: ""
      },
      {
        name: "Lenovo",
        url: "https://lenovo.com",
        icon: ""
      },
      {
        name: "Acer",
        url: "https://acer.com",
        icon: ""
      },
      {
        name: "MSI",
        url: "https://msi.com",
        icon: ""
      },
      {
        name: "Gigabyte",
        url: "https://gigabyte.com",
        icon: ""
      },
      {
        name: "Corsair",
        url: "https://corsair.com",
        icon: ""
      },
      {
        name: "Razer",
        url: "https://razer.com",
        icon: ""
      },
      {
        name: "Logitech",
        url: "https://logitech.com",
        icon: ""
      },
      {
        name: "SteelSeries",
        url: "https://steelseries.com",
        icon: ""
      },
      {
        name: "HyperX",
        url: "https://hyperxgaming.com",
        icon: ""
      },
      {
        name: "Alienware",
        url: "https://alienware.com",
        icon: ""
      }
    ]
  },
  {
    name: "Healthcare - 医疗健康",
    sites: [
      {
        name: "Mayo Clinic",
        url: "https://mayoclinic.org",
        icon: ""
      },
      {
        name: "Cleveland Clinic",
        url: "https://clevelandclinic.org",
        icon: ""
      },
      {
        name: "Johns Hopkins",
        url: "https://hopkinsmedicine.org",
        icon: ""
      },
      {
        name: "Mass General",
        url: "https://massgeneral.org",
        icon: ""
      },
      {
        name: "UCLA Health",
        url: "https://uclahealth.org",
        icon: ""
      },
      {
        name: "Cedars-Sinai",
        url: "https://cedars-sinai.org",
        icon: ""
      },
      {
        name: "Mount Sinai",
        url: "https://mountsinai.org",
        icon: ""
      },
      {
        name: "NYU Langone",
        url: "https://nyulangone.org",
        icon: ""
      },
      {
        name: "Stanford Health",
        url: "https://stanfordhealthcare.org",
        icon: ""
      },
      {
        name: "UCSF Health",
        url: "https://ucsfhealth.org",
        icon: ""
      },
      {
        name: "WebMD",
        url: "https://webmd.com",
        icon: ""
      },
      {
        name: "Healthline",
        url: "https://healthline.com",
        icon: ""
      },
      {
        name: "MedlinePlus",
        url: "https://medlineplus.gov",
        icon: ""
      },
      
      
      {
        name: "WHO",
        url: "https://who.int",
        icon: ""
      },
      
      {
        name: "AMA",
        url: "https://ama-assn.org",
        icon: ""
      },
      {
        name: "AHA",
        url: "https://heart.org",
        icon: ""
      },
      {
        name: "ACS",
        url: "https://cancer.org",
        icon: ""
      }
    ]
  },
  {
    name: "Education - 教育培训",
    sites: [
      {
        name: "Harvard",
        url: "https://harvard.edu",
        icon: ""
      },
      {
        name: "MIT",
        url: "https://mit.edu",
        icon: ""
      },
      {
        name: "Stanford",
        url: "https://stanford.edu",
        icon: ""
      },
      {
        name: "Yale",
        url: "https://yale.edu",
        icon: ""
      },
      {
        name: "Princeton",
        url: "https://princeton.edu",
        icon: ""
      },
      {
        name: "Columbia",
        url: "https://columbia.edu",
        icon: ""
      },
      {
        name: "University of Chicago",
        url: "https://uchicago.edu",
        icon: ""
      },
      {
        name: "Caltech",
        url: "https://caltech.edu",
        icon: ""
      },
      
      {
        name: "Northwestern",
        url: "https://northwestern.edu",
        icon: ""
      },
      {
        name: "Duke",
        url: "https://duke.edu",
        icon: ""
      },
      {
        name: "Dartmouth",
        url: "https://dartmouth.edu",
        icon: ""
      },
      {
        name: "Brown",
        url: "https://brown.edu",
        icon: ""
      },
      {
        name: "Cornell",
        url: "https://cornell.edu",
        icon: ""
      },
      {
        name: "Rice",
        url: "https://rice.edu",
        icon: ""
      },
      {
        name: "Vanderbilt",
        url: "https://vanderbilt.edu",
        icon: ""
      },
      {
        name: "WashU",
        url: "https://wustl.edu",
        icon: ""
      },
      {
        name: "Emory",
        url: "https://emory.edu",
        icon: ""
      },
      {
        name: "Georgetown",
        url: "https://georgetown.edu",
        icon: ""
      },
      {
        name: "Carnegie Mellon",
        url: "https://cmu.edu",
        icon: ""
      }
    ]
  },
  {
    name: "Legal - 法律司法",
    sites: [
      
      {
        name: "SCOTUS",
        url: "https://scotus.gov",
        icon: ""
      },
      {
        name: "Federal Courts",
        url: "https://uscourts.gov",
        icon: ""
      },
      {
        name: "DOJ",
        url: "https://justice.gov",
        icon: ""
      },
      
      {
        name: "DEA",
        url: "https://dea.gov",
        icon: ""
      },
      {
        name: "ATF",
        url: "https://atf.gov",
        icon: ""
      },
      {
        name: "ICE",
        url: "https://ice.gov",
        icon: ""
      },
      {
        name: "CBP",
        url: "https://cbp.gov",
        icon: ""
      },
      {
        name: "TSA",
        url: "https://tsa.gov",
        icon: ""
      },
      {
        name: "US Marshals",
        url: "https://usmarshals.gov",
        icon: ""
      },
      {
        name: "Bureau of Prisons",
        url: "https://bop.gov",
        icon: ""
      },
      {
        name: "Legal Aid",
        url: "https://legalaid.org",
        icon: ""
      },
      {
        name: "ACLU",
        url: "https://aclu.org",
        icon: ""
      },
      {
        name: "ABA",
        url: "https://americanbar.org",
        icon: ""
      },
      {
        name: "NALA",
        url: "https://nala.org",
        icon: ""
      },
      {
        name: "NALP",
        url: "https://nalp.org",
        icon: ""
      }]
  },
  {
    name: "Energy & Utilities - 能源公用",
    sites: [
      {
        name: "ExxonMobil",
        url: "https://exxonmobil.com",
        icon: ""
      },
      {
        name: "Chevron",
        url: "https://chevron.com",
        icon: ""
      },
      {
        name: "BP",
        url: "https://bp.com",
        icon: ""
      },
      {
        name: "Shell",
        url: "https://shell.com",
        icon: ""
      },
      {
        name: "TotalEnergies",
        url: "https://totalenergies.com",
        icon: ""
      },
      {
        name: "ConocoPhillips",
        url: "https://conocophillips.com",
        icon: ""
      },
      {
        name: "Eni",
        url: "https://eni.com",
        icon: ""
      },
      {
        name: "Equinor",
        url: "https://equinor.com",
        icon: ""
      },
      {
        name: "Repsol",
        url: "https://repsol.com",
        icon: ""
      },
      {
        name: "Gazprom",
        url: "https://gazprom.com",
        icon: ""
      },
      {
        name: "Saudi Aramco",
        url: "https://aramco.com",
        icon: ""
      },
      {
        name: "Petrobras",
        url: "https://petrobras.com.br",
        icon: ""
      },
      {
        name: "Pemex",
        url: "https://pemex.com",
        icon: ""
      },
      {
        name: "Rosneft",
        url: "https://rosneft.com",
        icon: ""
      },
      {
        name: "Lukoil",
        url: "https://lukoil.com",
        icon: ""
      },
      {
        name: "Tatneft",
        url: "https://tatneft.ru",
        icon: ""
      },
      {
        name: "Surgutneftegas",
        url: "https://surgutneftegas.ru",
        icon: ""
      },
      {
        name: "Gazprom Neft",
        url: "https://gazprom-neft.com",
        icon: ""
      },
      {
        name: "Novatek",
        url: "https://novatek.ru",
        icon: ""
      },
      {
        name: "Transneft",
        url: "https://transneft.ru",
        icon: ""
      }
    ]
  },
  {
    name: "Manufacturing - 制造业",
    sites: [
      {
        name: "General Electric",
        url: "https://ge.com",
        icon: ""
      },
      {
        name: "Siemens",
        url: "https://siemens.com",
        icon: ""
      },
      {
        name: "Caterpillar",
        url: "https://caterpillar.com",
        icon: ""
      },
      
      {
        name: "Lockheed Martin",
        url: "https://lockheedmartin.com",
        icon: ""
      },
      {
        name: "Raytheon",
        url: "https://raytheon.com",
        icon: ""
      },
      {
        name: "Northrop Grumman",
        url: "https://northropgrumman.com",
        icon: ""
      },
      {
        name: "General Dynamics",
        url: "https://gd.com",
        icon: ""
      },
      {
        name: "L3Harris",
        url: "https://l3harris.com",
        icon: ""
      },
      {
        name: "Honeywell",
        url: "https://honeywell.com",
        icon: ""
      },
      {
        name: "3M",
        url: "https://3m.com",
        icon: ""
      },
      {
        name: "Johnson & Johnson",
        url: "https://jnj.com",
        icon: ""
      },
      {
        name: "Procter & Gamble",
        url: "https://pg.com",
        icon: ""
      },
      {
        name: "Unilever",
        url: "https://unilever.com",
        icon: ""
      },
      {
        name: "Nestlé",
        url: "https://nestle.com",
        icon: ""
      },
      {
        name: "Coca-Cola",
        url: "https://coca-cola.com",
        icon: ""
      },
      {
        name: "PepsiCo",
        url: "https://pepsico.com",
        icon: ""
      },
      {
        name: "Kraft Heinz",
        url: "https://kraftheinzcompany.com",
        icon: ""
      },
      {
        name: "General Mills",
        url: "https://generalmills.com",
        icon: ""
      },
      {
        name: "Kellogg's",
        url: "https://kelloggcompany.com",
        icon: ""
      }
    ]
  },
  {
    name: "Aerospace - 航空航天",
    sites: [
      
      
      
      
      {
        name: "Rocket Lab",
        url: "https://rocketlabusa.com",
        icon: ""
      },
      {
        name: "Arianespace",
        url: "https://arianespace.com",
        icon: ""
      },
      
      
      
      
      
      {
        name: "Airbus",
        url: "https://airbus.com",
        icon: ""
      },
      {
        name: "Embraer",
        url: "https://embraer.com",
        icon: ""
      },
      {
        name: "Bombardier",
        url: "https://bombardier.com",
        icon: ""
      },
      {
        name: "Gulfstream",
        url: "https://gulfstream.com",
        icon: ""
      },
      {
        name: "Cessna",
        url: "https://cessna.com",
        icon: ""
      },
      {
        name: "Piper",
        url: "https://piper.com",
        icon: ""
      },
      {
        name: "Beechcraft",
        url: "https://beechcraft.com",
        icon: ""
      },
      {
        name: "Cirrus",
        url: "https://cirrusaircraft.com",
        icon: ""
      },
      {
        name: "Diamond",
        url: "https://diamondaircraft.com",
        icon: ""
      }
    ]
  },
  {
    name: "Agriculture - 农业食品",
    sites: [
      {
        name: "Cargill",
        url: "https://cargill.com",
        icon: ""
      },
      {
        name: "ADM",
        url: "https://adm.com",
        icon: ""
      },
      {
        name: "Bunge",
        url: "https://bunge.com",
        icon: ""
      },
      {
        name: "Louis Dreyfus",
        url: "https://ldc.com",
        icon: ""
      },
      {
        name: "Tyson Foods",
        url: "https://tysonfoods.com",
        icon: ""
      },
      {
        name: "JBS",
        url: "https://jbs.com.br",
        icon: ""
      },
      {
        name: "Smithfield",
        url: "https://smithfieldfoods.com",
        icon: ""
      },
      {
        name: "Pilgrim's Pride",
        url: "https://pilgrims.com",
        icon: ""
      },
      {
        name: "Sanderson Farms",
        url: "https://sandersonfarms.com",
        icon: ""
      },
      {
        name: "Perdue Farms",
        url: "https://perdue.com",
        icon: ""
      },
      {
        name: "Foster Farms",
        url: "https://fosterfarms.com",
        icon: ""
      },
      {
        name: "Butterball",
        url: "https://butterball.com",
        icon: ""
      },
      {
        name: "Hormel",
        url: "https://hormel.com",
        icon: ""
      },
      {
        name: "ConAgra",
        url: "https://conagrabrands.com",
        icon: ""
      },
      
      
      {
        name: "Post Holdings",
        url: "https://postholdings.com",
        icon: ""
      },
      {
        name: "Campbell Soup",
        url: "https://campbellsoupcompany.com",
        icon: ""
      },
      {
        name: "Hershey",
        url: "https://hersheys.com",
        icon: ""
      },
      {
        name: "Mars",
        url: "https://mars.com",
        icon: ""
      }
    ]
  },
  {
    name: "Construction - 建筑建设",
    sites: [
      
      {
        name: "Komatsu",
        url: "https://komatsu.com",
        icon: ""
      },
      {
        name: "Volvo Construction",
        url: "https://volvoce.com",
        icon: ""
      },
      {
        name: "John Deere",
        url: "https://deere.com",
        icon: ""
      },
      {
        name: "Hitachi Construction",
        url: "https://hitachicm.com",
        icon: ""
      },
      {
        name: "Liebherr",
        url: "https://liebherr.com",
        icon: ""
      },
      {
        name: "JCB",
        url: "https://jcb.com",
        icon: ""
      },
      {
        name: "Case Construction",
        url: "https://casece.com",
        icon: ""
      },
      {
        name: "New Holland",
        url: "https://newholland.com",
        icon: ""
      },
      {
        name: "Kubota",
        url: "https://kubota.com",
        icon: ""
      },
      {
        name: "Yanmar",
        url: "https://yanmar.com",
        icon: ""
      },
      {
        name: "Doosan",
        url: "https://doosan.com",
        icon: ""
      },
      {
        name: "Hyundai Construction",
        url: "https://hce.co.kr",
        icon: ""
      },
      {
        name: "Sany",
        url: "https://sany.com",
        icon: ""
      },
      {
        name: "XCMG",
        url: "https://xcmg.com",
        icon: ""
      },
      {
        name: "Zoomlion",
        url: "https://zoomlion.com",
        icon: ""
      },
      {
        name: "Lonking",
        url: "https://lonking.com",
        icon: ""
      },
      {
        name: "Shantui",
        url: "https://shantui.com",
        icon: ""
      },
      {
        name: "LiuGong",
        url: "https://liugong.com",
        icon: ""
      },
      {
        name: "Terex",
        url: "https://terex.com",
        icon: ""
      }
    ]
  },
  {
    name: "Transportation - 交通运输",
    sites: [
      
      
      
      
      
      
      
      
      {
        name: "BlaBlaCar",
        url: "https://blablacar.com",
        icon: ""
      },
      {
        name: "Zipcar",
        url: "https://zipcar.com",
        icon: ""
      },
      {
        name: "Turo",
        url: "https://turo.com",
        icon: ""
      },
      {
        name: "Getaround",
        url: "https://getaround.com",
        icon: ""
      },
      {
        name: "Hertz",
        url: "https://hertz.com",
        icon: ""
      },
      {
        name: "Enterprise",
        url: "https://enterprise.com",
        icon: ""
      },
      {
        name: "Avis",
        url: "https://avis.com",
        icon: ""
      },
      {
        name: "Budget",
        url: "https://budget.com",
        icon: ""
      },
      {
        name: "Alamo",
        url: "https://alamo.com",
        icon: ""
      },
      {
        name: "National",
        url: "https://nationalcar.com",
        icon: ""
      },
      {
        name: "Sixt",
        url: "https://sixt.com",
        icon: ""
      },
      {
        name: "Europcar",
        url: "https://europcar.com",
        icon: ""
      }
    ]
  },
  {
    name: "Logistics - 物流运输",
    sites: [
      {
        name: "FedEx",
        url: "https://fedex.com",
        icon: ""
      },
      {
        name: "UPS",
        url: "https://ups.com",
        icon: ""
      },
      {
        name: "DHL",
        url: "https://dhl.com",
        icon: ""
      },
      {
        name: "USPS",
        url: "https://usps.com",
        icon: ""
      },
      {
        name: "Amazon Logistics",
        url: "https://logistics.amazon.com",
        icon: ""
      },
      {
        name: "Maersk",
        url: "https://maersk.com",
        icon: ""
      },
      {
        name: "MSC",
        url: "https://msc.com",
        icon: ""
      },
      {
        name: "CMA CGM",
        url: "https://cmacgm.com",
        icon: ""
      },
      {
        name: "Hapag-Lloyd",
        url: "https://hapag-lloyd.com",
        icon: ""
      },
      {
        name: "COSCO",
        url: "https://cosco.com",
        icon: ""
      },
      {
        name: "Evergreen",
        url: "https://evergreen-line.com",
        icon: ""
      },
      {
        name: "Yang Ming",
        url: "https://yangming.com",
        icon: ""
      },
      {
        name: "HMM",
        url: "https://hmm21.com",
        icon: ""
      },
      {
        name: "ONE",
        url: "https://one-line.com",
        icon: ""
      },
      {
        name: "ZIM",
        url: "https://zim.com",
        icon: ""
      },
      {
        name: "OOCL",
        url: "https://oocl.com",
        icon: ""
      },
      {
        name: "PIL",
        url: "https://pil.com.sg",
        icon: ""
      },
      {
        name: "Wan Hai",
        url: "https://wanhai.com",
        icon: ""
      }]
  },
  {
    name: "Mining - 矿业资源",
    sites: [
      {
        name: "BHP",
        url: "https://bhp.com",
        icon: ""
      },
      {
        name: "Rio Tinto",
        url: "https://riotinto.com",
        icon: ""
      },
      {
        name: "Vale",
        url: "https://vale.com",
        icon: ""
      },
      {
        name: "Glencore",
        url: "https://glencore.com",
        icon: ""
      },
      {
        name: "Anglo American",
        url: "https://angloamerican.com",
        icon: ""
      },
      {
        name: "Freeport-McMoRan",
        url: "https://fcx.com",
        icon: ""
      },
      {
        name: "Newmont",
        url: "https://newmont.com",
        icon: ""
      },
      {
        name: "Barrick Gold",
        url: "https://barrick.com",
        icon: ""
      },
      {
        name: "Goldcorp",
        url: "https://goldcorp.com",
        icon: ""
      },
      {
        name: "Kinross Gold",
        url: "https://kinross.com",
        icon: ""
      },
      {
        name: "Agnico Eagle",
        url: "https://agnicoeagle.com",
        icon: ""
      },
      {
        name: "Yamana Gold",
        url: "https://yamanagold.com",
        icon: ""
      },
      {
        name: "Eldorado Gold",
        url: "https://eldoradogold.com",
        icon: ""
      },
      {
        name: "Iamgold",
        url: "https://iamgold.com",
        icon: ""
      },
      {
        name: "Detour Gold",
        url: "https://detourgold.com",
        icon: ""
      },
      {
        name: "Osisko Gold",
        url: "https://osiskogold.com",
        icon: ""
      },
      {
        name: "Franco-Nevada",
        url: "https://franco-nevada.com",
        icon: ""
      },
      {
        name: "Wheaton Precious",
        url: "https://wheatonpm.com",
        icon: ""
      },
      {
        name: "Royal Gold",
        url: "https://royalgold.com",
        icon: ""
      },
      {
        name: "Sandstorm Gold",
        url: "https://sandstormgold.com",
        icon: ""
      }
    ]
  },
  {
    name: "Banking & Finance - 银行金融",
    sites: [
      {
        name: "中国工商银行",
        url: "https://icbc.com.cn",
        icon: ""
      },
      {
        name: "中国建设银行",
        url: "https://ccb.com",
        icon: ""
      },
      {
        name: "中国农业银行",
        url: "https://abchina.com",
        icon: ""
      },
      {
        name: "中国银行",
        url: "https://boc.cn",
        icon: ""
      },
      {
        name: "交通银行",
        url: "https://bankcomm.com",
        icon: ""
      },
      {
        name: "招商银行",
        url: "https://cmbchina.com",
        icon: ""
      },
      {
        name: "中国邮政储蓄银行",
        url: "https://psbc.com",
        icon: ""
      },
      {
        name: "中信银行",
        url: "https://citicbank.com",
        icon: ""
      },
      {
        name: "中国光大银行",
        url: "https://cebbank.com",
        icon: ""
      },
      {
        name: "中国民生银行",
        url: "https://cmbc.com.cn",
        icon: ""
      },
      {
        name: "平安银行",
        url: "https://bank.pingan.com",
        icon: ""
      },
      {
        name: "华夏银行",
        url: "https://hxb.com.cn",
        icon: ""
      },
      {
        name: "广发银行",
        url: "https://cgbchina.com.cn",
        icon: ""
      },
      {
        name: "兴业银行",
        url: "https://cib.com.cn",
        icon: ""
      },
      {
        name: "浦发银行",
        url: "https://spdb.com.cn",
        icon: ""
      },
      {
        name: "北京银行",
        url: "https://bankofbeijing.com.cn",
        icon: ""
      },
      {
        name: "上海银行",
        url: "https://bankofshanghai.com",
        icon: ""
      },
      {
        name: "江苏银行",
        url: "https://jsbchina.cn",
        icon: ""
      },
      {
        name: "南京银行",
        url: "https://njcb.com.cn",
        icon: ""
      },
      {
        name: "宁波银行",
        url: "https://nbcb.com.cn",
        icon: ""
      },
      {
        name: "支付宝",
        url: "https://alipay.com",
        icon: ""
      },
      {
        name: "微信支付",
        url: "https://pay.weixin.qq.com",
        icon: ""
      },
      {
        name: "网商银行",
        url: "https://mybank.cn",
        icon: ""
      },
      {
        name: "微众银行",
        url: "https://webank.com",
        icon: ""
      },
      {
        name: "京东钱包",
        url: "https://jr.jd.com",
        icon: ""
      },
      {
        name: "云闪付",
        url: "https://unionpay.com",
        icon: ""
      },
      {
        name: "度小满金融",
        url: "https://duxiaoman.com",
        icon: ""
      },
      {
        name: "蚂蚁财富",
        url: "https://fund.ant.group",
        icon: ""
      },
      {
        name: "天弘基金",
        url: "https://thfund.com.cn",
        icon: ""
      },
      {
        name: "理财通",
        url: "https://licaitong.qq.com",
        icon: ""
      }
    ]
  },
  {
    name: "Insurance - 保险服务",
    sites: [
      
      {
        name: "UnitedHealth Group",
        url: "https://unitedhealthgroup.com",
        icon: ""
      },
      {
        name: "Anthem",
        url: "https://anthem.com",
        icon: ""
      },
      {
        name: "Aetna",
        url: "https://aetna.com",
        icon: ""
      },
      {
        name: "Cigna",
        url: "https://cigna.com",
        icon: ""
      },
      {
        name: "Humana",
        url: "https://humana.com",
        icon: ""
      },
      {
        name: "Kaiser Permanente",
        url: "https://kp.org",
        icon: ""
      },
      {
        name: "Blue Cross Blue Shield",
        url: "https://bcbs.com",
        icon: ""
      },
      {
        name: "Allstate",
        url: "https://allstate.com",
        icon: ""
      },
      {
        name: "State Farm",
        url: "https://statefarm.com",
        icon: ""
      },
      {
        name: "Progressive",
        url: "https://progressive.com",
        icon: ""
      },
      {
        name: "Geico",
        url: "https://geico.com",
        icon: ""
      },
      {
        name: "Liberty Mutual",
        url: "https://libertymutual.com",
        icon: ""
      },
      {
        name: "Travelers",
        url: "https://travelers.com",
        icon: ""
      },
      {
        name: "Nationwide",
        url: "https://nationwide.com",
        icon: ""
      },
      {
        name: "USAA",
        url: "https://usaa.com",
        icon: ""
      },
      {
        name: "Farmers",
        url: "https://farmers.com",
        icon: ""
      },
      {
        name: "American Family",
        url: "https://amfam.com",
        icon: ""
      },
      {
        name: "Erie Insurance",
        url: "https://erieinsurance.com",
        icon: ""
      },
      {
        name: "Auto-Owners",
        url: "https://auto-owners.com",
        icon: ""
      }
    ]
  },
  {
    name: "Retail - 零售商业",
    sites: [
      
      
      
      
      
      
      {
        name: "Best Buy",
        url: "https://bestbuy.com",
        icon: ""
      },
      
      {
        name: "Kohl's",
        url: "https://kohls.com",
        icon: ""
      },
      
      {
        name: "TJ Maxx",
        url: "https://tjmaxx.com",
        icon: ""
      },
      {
        name: "Ross Stores",
        url: "https://rossstores.com",
        icon: ""
      },
      {
        name: "Burlington",
        url: "https://burlington.com",
        icon: ""
      },
      {
        name: "Marshalls",
        url: "https://marshalls.com",
        icon: ""
      },
      {
        name: "Dollar General",
        url: "https://dollargeneral.com",
        icon: ""
      },
      {
        name: "Dollar Tree",
        url: "https://dollartree.com",
        icon: ""
      },
      {
        name: "Family Dollar",
        url: "https://familydollar.com",
        icon: ""
      },
      {
        name: "CVS",
        url: "https://cvs.com",
        icon: ""
      },
      {
        name: "Walgreens",
        url: "https://walgreens.com",
        icon: ""
      },
      {
        name: "Rite Aid",
        url: "https://riteaid.com",
        icon: ""
      }
    ]
  },
  {
    name: "Telecommunications - 电信通信",
    sites: [
      {
        name: "Verizon",
        url: "https://verizon.com",
        icon: ""
      },
      {
        name: "AT&T",
        url: "https://att.com",
        icon: ""
      },
      {
        name: "T-Mobile",
        url: "https://t-mobile.com",
        icon: ""
      },
      {
        name: "Sprint",
        url: "https://sprint.com",
        icon: ""
      },
      {
        name: "Comcast",
        url: "https://comcast.com",
        icon: ""
      },
      {
        name: "Charter",
        url: "https://charter.com",
        icon: ""
      },
      {
        name: "Cox",
        url: "https://cox.com",
        icon: ""
      },
      {
        name: "Dish Network",
        url: "https://dish.com",
        icon: ""
      },
      {
        name: "DirecTV",
        url: "https://directv.com",
        icon: ""
      },
      {
        name: "Vodafone",
        url: "https://vodafone.com",
        icon: ""
      },
      {
        name: "Orange",
        url: "https://orange.com",
        icon: ""
      },
      {
        name: "Deutsche Telekom",
        url: "https://telekom.com",
        icon: ""
      },
      {
        name: "BT",
        url: "https://bt.com",
        icon: ""
      }]
  },
  {
    name: "Media & Publishing - 媒体出版",
    sites: [
      {
        name: "Disney",
        url: "https://disney.com",
        icon: ""
      },
      {
        name: "Warner Bros",
        url: "https://warnerbros.com",
        icon: ""
      },
      {
        name: "Universal",
        url: "https://universal.com",
        icon: ""
      },
      {
        name: "Sony Pictures",
        url: "https://sonypictures.com",
        icon: ""
      },
      {
        name: "Paramount",
        url: "https://paramount.com",
        icon: ""
      },
      {
        name: "20th Century Fox",
        url: "https://20thcenturystudios.com",
        icon: ""
      },
      {
        name: "Lionsgate",
        url: "https://lionsgate.com",
        icon: ""
      },
      {
        name: "MGM",
        url: "https://mgm.com",
        icon: ""
      },
      {
        name: "A24",
        url: "https://a24films.com",
        icon: ""
      },
      
      {
        name: "HBO",
        url: "https://hbo.com",
        icon: ""
      },
      {
        name: "Showtime",
        url: "https://showtime.com",
        icon: ""
      },
      {
        name: "Starz",
        url: "https://starz.com",
        icon: ""
      },
      {
        name: "AMC",
        url: "https://amc.com",
        icon: ""
      },
      {
        name: "FX",
        url: "https://fxnetworks.com",
        icon: ""
      },
      {
        name: "TNT",
        url: "https://tntdrama.com",
        icon: ""
      },
      {
        name: "TBS",
        url: "https://tbs.com",
        icon: ""
      },
      
      {
        name: "Fox News",
        url: "https://foxnews.com",
        icon: ""
      },
      {
        name: "MSNBC",
        url: "https://msnbc.com",
        icon: ""
      }
    ]
  },
  {
    name: "Pharmaceuticals - 制药医药",
    sites: [
      
      {
        name: "Pfizer",
        url: "https://pfizer.com",
        icon: ""
      },
      {
        name: "Roche",
        url: "https://roche.com",
        icon: ""
      },
      {
        name: "Novartis",
        url: "https://novartis.com",
        icon: ""
      },
      {
        name: "Merck",
        url: "https://merck.com",
        icon: ""
      },
      {
        name: "AbbVie",
        url: "https://abbvie.com",
        icon: ""
      },
      {
        name: "Bristol Myers Squibb",
        url: "https://bms.com",
        icon: ""
      },
      {
        name: "Gilead Sciences",
        url: "https://gilead.com",
        icon: ""
      },
      {
        name: "Amgen",
        url: "https://amgen.com",
        icon: ""
      },
      {
        name: "Biogen",
        url: "https://biogen.com",
        icon: ""
      },
      {
        name: "Regeneron",
        url: "https://regeneron.com",
        icon: ""
      },
      {
        name: "Moderna",
        url: "https://moderna.com",
        icon: ""
      },
      {
        name: "BioNTech",
        url: "https://biontech.com",
        icon: ""
      },
      {
        name: "AstraZeneca",
        url: "https://astrazeneca.com",
        icon: ""
      },
      {
        name: "GlaxoSmithKline",
        url: "https://gsk.com",
        icon: ""
      },
      {
        name: "Sanofi",
        url: "https://sanofi.com",
        icon: ""
      },
      {
        name: "Bayer",
        url: "https://bayer.com",
        icon: ""
      },
      {
        name: "Boehringer Ingelheim",
        url: "https://boehringer-ingelheim.com",
        icon: ""
      },
      {
        name: "Takeda",
        url: "https://takeda.com",
        icon: ""
      },
      {
        name: "Daiichi Sankyo",
        url: "https://daiichisankyo.com",
        icon: ""
      }
    ]
  },
  {
    name: "Consulting - 咨询顾问",
    sites: [
      {
        name: "McKinsey",
        url: "https://mckinsey.com",
        icon: ""
      },
      {
        name: "Bain & Company",
        url: "https://bain.com",
        icon: ""
      },
      {
        name: "Boston Consulting Group",
        url: "https://bcg.com",
        icon: ""
      },
      {
        name: "Deloitte",
        url: "https://deloitte.com",
        icon: ""
      },
      {
        name: "PwC",
        url: "https://pwc.com",
        icon: ""
      },
      {
        name: "EY",
        url: "https://ey.com",
        icon: ""
      },
      {
        name: "KPMG",
        url: "https://kpmg.com",
        icon: ""
      },
      {
        name: "Accenture",
        url: "https://accenture.com",
        icon: ""
      },
      {
        name: "IBM Consulting",
        url: "https://ibm.com/consulting",
        icon: ""
      },
      {
        name: "Capgemini",
        url: "https://capgemini.com",
        icon: ""
      },
      {
        name: "Cognizant",
        url: "https://cognizant.com",
        icon: ""
      },
      {
        name: "Infosys",
        url: "https://infosys.com",
        icon: ""
      },
      {
        name: "TCS",
        url: "https://tcs.com",
        icon: ""
      },
      {
        name: "Wipro",
        url: "https://wipro.com",
        icon: ""
      },
      {
        name: "HCL",
        url: "https://hcl.com",
        icon: ""
      },
      {
        name: "Atos",
        url: "https://atos.net",
        icon: ""
      },
      {
        name: "DXC Technology",
        url: "https://dxc.com",
        icon: ""
      },
      {
        name: "NTT Data",
        url: "https://nttdata.com",
        icon: ""
      },
      {
        name: "Fujitsu",
        url: "https://fujitsu.com",
        icon: ""
      },
      {
        name: "NEC",
        url: "https://nec.com",
        icon: ""
      }
    ]
  }
]
