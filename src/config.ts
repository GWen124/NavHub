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
    name: "Daily Hub",
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
      },
      {
        name: "Trello",
        url: "https://trello.com",
        icon: ""
      }
    ]
  },
  {
    name: "AI Tools",
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
      }
    ]
  },
  {
    name: "Instant Messaging",
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
      }
    ]
  },
  {
    name: "Media Hub",
    sites: [
      {
        name: "YouTube",
        url: "https://youtube.com",
        icon: ""
      },
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
        name: "Bilibili",
        url: "https://bilibili.com",
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Streaming Service Platform/Bilibili.png"
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
      }
    ]
  },
  {
    name: "Cloud Services",
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
      }
    ]
  },
  {
    name: "Private Tracker",
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
    name: "Dev Tools",
    sites: [
      {
        name: "VS Code",
        url: "https://code.visualstudio.com",
        icon: ""
      },
      {
        name: "GitHub",
        url: "https://github.com",
        icon: ""
      },
      {
        name: "GitLab",
        url: "https://gitlab.com",
        icon: ""
      },
      {
        name: "Stack Overflow",
        url: "https://stackoverflow.com",
        icon: ""
      },
      {
        name: "MDN",
        url: "https://developer.mozilla.org",
        icon: ""
      },
      {
        name: "W3Schools",
        url: "https://w3schools.com",
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
      }
    ]
  },
  {
    name: "Other",
    sites: [
      {
        name: "Google Drive",
        url: "https://drive.google.com",
        icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
      },
      {
        name: "Notion",
        url: "https://notion.so",
        icon: ""
      },
      {
        name: "Canva",
        url: "https://canva.com",
        icon: ""
      },
      {
        name: "Trello",
        url: "https://trello.com",
        icon: ""
      },
      {
        name: "Asana",
        url: "https://asana.com",
        icon: ""
      },
      {
        name: "Monday.com",
        url: "https://monday.com",
        icon: ""
      },
      {
        name: "Airtable",
        url: "https://airtable.com",
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
      },
      {
        name: "Logseq",
        url: "https://logseq.com",
        icon: ""
      }
    ]
  },
  {
    name: "测试分组1 - 大公司网站",
    sites: [
      {
        name: "Apple",
        url: "https://www.apple.com",
        icon: ""
      },
      {
        name: "Microsoft",
        url: "https://www.microsoft.com",
        icon: ""
      },
      {
        name: "Google",
        url: "https://www.google.com",
        icon: ""
      },
      {
        name: "Amazon",
        url: "https://www.amazon.com",
        icon: ""
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com",
        icon: ""
      },
      {
        name: "Twitter",
        url: "https://twitter.com",
        icon: ""
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com",
        icon: ""
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com",
        icon: ""
      }
    ]
  },
  {
    name: "测试分组2 - 技术网站",
    sites: [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: ""
      },
      {
        name: "GitLab",
        url: "https://gitlab.com",
        icon: ""
      },
      {
        name: "Stack Overflow",
        url: "https://stackoverflow.com",
        icon: ""
      },
      {
        name: "Docker",
        url: "https://www.docker.com",
        icon: ""
      },
      {
        name: "Kubernetes",
        url: "https://kubernetes.io",
        icon: ""
      },
      {
        name: "AWS",
        url: "https://aws.amazon.com",
        icon: ""
      },
      {
        name: "Azure",
        url: "https://azure.microsoft.com",
        icon: ""
      },
      {
        name: "Vercel",
        url: "https://vercel.com",
        icon: ""
      }
    ]
  },
  {
    name: "测试分组3 - 中文网站",
    sites: [
      {
        name: "百度",
        url: "https://www.baidu.com",
        icon: ""
      },
      {
        name: "腾讯",
        url: "https://www.tencent.com",
        icon: ""
      },
      {
        name: "阿里巴巴",
        url: "https://www.alibaba.com",
        icon: ""
      },
      {
        name: "字节跳动",
        url: "https://www.bytedance.com",
        icon: ""
      },
      {
        name: "美团",
        url: "https://www.meituan.com",
        icon: ""
      },
      {
        name: "滴滴",
        url: "https://www.didi.com",
        icon: ""
      },
      {
        name: "京东",
        url: "https://www.jd.com",
        icon: ""
      },
      {
        name: "拼多多",
        url: "https://www.pinduoduo.com",
        icon: ""
      }
    ]
  },
  {
    name: "测试分组4 - 小众网站",
    sites: [
      {
        name: "Hacker News",
        url: "https://news.ycombinator.com",
        icon: ""
      },
      {
        name: "Reddit",
        url: "https://www.reddit.com",
        icon: ""
      },
      {
        name: "Product Hunt",
        url: "https://www.producthunt.com",
        icon: ""
      },
      {
        name: "Dribbble",
        url: "https://dribbble.com",
        icon: ""
      },
      {
        name: "Behance",
        url: "https://www.behance.net",
        icon: ""
      },
      {
        name: "Figma",
        url: "https://www.figma.com",
        icon: ""
      },
      {
        name: "Notion",
        url: "https://www.notion.so",
        icon: ""
      },
      {
        name: "Airtable",
        url: "https://airtable.com",
        icon: ""
      }
    ]
  }
]
