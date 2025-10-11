// 网站配置数据
export interface Site {
  name: string
  url: string
  icon: string
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
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Google/Google.png"
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
        icon: "xicon:Zhihu"
      },
      {
        name: "Trello",
        url: "https://trello.com",
        icon: "T"
      }
    ]
  },
  {
    name: "AI Tools",
    sites: [
      {
        name: "ChatGPT",
        url: "https://chat.openai.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Claude",
        url: "https://claude.ai",
        icon: "xicon:Microchip"
      },
      {
        name: "Gemini",
        url: "https://gemini.google.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Copilot",
        url: "https://github.com/features/copilot",
        icon: "xicon:Microchip"
      },
      {
        name: "Midjourney",
        url: "https://midjourney.com",
        icon: "xicon:Microchip"
      },
      {
        name: "DALL-E",
        url: "https://openai.com/dall-e-2",
        icon: "xicon:Microchip"
      },
      {
        name: "Stable Diffusion",
        url: "https://stablediffusionweb.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Runway",
        url: "https://runwayml.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Notion AI",
        url: "https://notion.so/product/ai",
        icon: "xicon:Microchip"
      },
      {
        name: "Grammarly",
        url: "https://grammarly.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Jasper",
        url: "https://jasper.ai",
        icon: "xicon:Microchip"
      },
      {
        name: "Copy.ai",
        url: "https://copy.ai",
        icon: "xicon:Microchip"
      }
    ]
  },
  {
    name: "Instant Messaging",
    sites: [
      {
        name: "WhatsApp",
        url: "https://web.whatsapp.com",
        icon: "xicon:Users"
      },
      {
        name: "Telegram",
        url: "https://web.telegram.org",
        icon: "xicon:Users"
      },
      {
        name: "Discord",
        url: "https://discord.com/app",
        icon: "xicon:Discord"
      },
      {
        name: "Slack",
        url: "https://slack.com",
        icon: "xicon:Users"
      },
      {
        name: "微信",
        url: "https://wx.qq.com",
        icon: "xicon:Users"
      },
      {
        name: "QQ",
        url: "https://im.qq.com",
        icon: "xicon:Users"
      },
      {
        name: "Skype",
        url: "https://web.skype.com",
        icon: "xicon:Users"
      },
      {
        name: "Teams",
        url: "https://teams.microsoft.com",
        icon: "xicon:Users"
      },
      {
        name: "钉钉",
        url: "https://dingtalk.com",
        icon: "xicon:Users"
      },
      {
        name: "企业微信",
        url: "https://work.weixin.qq.com",
        icon: "xicon:Users"
      },
      {
        name: "飞书",
        url: "https://feishu.cn",
        icon: "xicon:Users"
      },
      {
        name: "Zoom",
        url: "https://zoom.us",
        icon: "xicon:Tv"
      }
    ]
  },
  {
    name: "Media Hub",
    sites: [
      {
        name: "YouTube",
        url: "https://youtube.com",
        icon: "xicon:Youtube"
      },
      {
        name: "Netflix",
        url: "https://netflix.com",
        icon: "xicon:Film"
      },
      {
        name: "Spotify",
        url: "https://spotify.com",
        icon: "xicon:Spotify"
      },
      {
        name: "Bilibili",
        url: "https://bilibili.com",
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Streaming Service Platform/Bilibili.png"
      },
      {
        name: "Twitch",
        url: "https://twitch.tv",
        icon: "xicon:PlayCircle"
      },
      {
        name: "Apple Music",
        url: "https://music.apple.com",
        icon: "xicon:Spotify"
      },
      {
        name: "Amazon Prime",
        url: "https://primevideo.com",
        icon: "xicon:Film"
      },
      {
        name: "Disney+",
        url: "https://disneyplus.com",
        icon: "xicon:Film"
      },
      {
        name: "HBO Max",
        url: "https://hbomax.com",
        icon: "xicon:Film"
      },
      {
        name: "SoundCloud",
        url: "https://soundcloud.com",
        icon: "xicon:Spotify"
      },
      {
        name: "Pandora",
        url: "https://pandora.com",
        icon: "xicon:Spotify"
      },
      {
        name: "Tidal",
        url: "https://tidal.com",
        icon: "xicon:Spotify"
      }
    ]
  },
  {
    name: "Cloud Services",
    sites: [
      {
        name: "AWS",
        url: "https://aws.amazon.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Google Cloud",
        url: "https://cloud.google.com",
        icon: "xicon:Globe"
      },
      {
        name: "Azure",
        url: "https://azure.microsoft.com",
        icon: "xicon:Code"
      },
      {
        name: "阿里云",
        url: "https://aliyun.com",
        icon: "xicon:Users"
      },
      {
        name: "腾讯云",
        url: "https://cloud.tencent.com",
        icon: "xicon:Users"
      },
      {
        name: "华为云",
        url: "https://huaweicloud.com",
        icon: "xicon:Microchip"
      },
      {
        name: "百度云",
        url: "https://cloud.baidu.com",
        icon: "xicon:Globe"
      },
      {
        name: "Vercel",
        url: "https://vercel.com",
        icon: "xicon:Code"
      },
      {
        name: "Netlify",
        url: "https://netlify.com",
        icon: "xicon:Code"
      },
      {
        name: "Heroku",
        url: "https://heroku.com",
        icon: "xicon:Code"
      },
      {
        name: "DigitalOcean",
        url: "https://digitalocean.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Linode",
        url: "https://linode.com",
        icon: "xicon:Microchip"
      }
    ]
  },
  {
    name: "Private Tracker",
    sites: [
      {
        name: "PT站导航",
        url: "https://pt.sjtu.edu.cn",
        icon: "xicon:Globe"
      },
      {
        name: "HDChina",
        url: "https://hdchina.org",
        icon: "xicon:Globe"
      },
      {
        name: "CHDBits",
        url: "https://chdbits.co",
        icon: "xicon:Globe"
      },
      {
        name: "TTG",
        url: "https://totheglory.im",
        icon: "xicon:Globe"
      },
      {
        name: "HDHome",
        url: "https://hdhome.org",
        icon: "xicon:Globe"
      },
      {
        name: "HDTime",
        url: "https://hdtime.org",
        icon: "xicon:Globe"
      },
      {
        name: "HDArea",
        url: "https://hdarea.co",
        icon: "xicon:Globe"
      },
      {
        name: "HDStreet",
        url: "https://hdstreet.club",
        icon: "xicon:Globe"
      },
      {
        name: "HDTorrents",
        url: "https://hd-torrents.org",
        icon: "xicon:Globe"
      },
      {
        name: "IPTorrents",
        url: "https://iptorrents.com",
        icon: "xicon:Globe"
      },
      {
        name: "TorrentLeech",
        url: "https://torrentleech.org",
        icon: "xicon:Globe"
      },
      {
        name: "PrivateHD",
        url: "https://privatehd.to",
        icon: "xicon:Globe"
      }
    ]
  },
  {
    name: "Dev Tools",
    sites: [
      {
        name: "VS Code",
        url: "https://code.visualstudio.com",
        icon: "xicon:Code"
      },
      {
        name: "GitHub",
        url: "https://github.com",
        icon: "xicon:Github"
      },
      {
        name: "GitLab",
        url: "https://gitlab.com",
        icon: "xicon:Github"
      },
      {
        name: "Stack Overflow",
        url: "https://stackoverflow.com",
        icon: "xicon:StackOverflow"
      },
      {
        name: "MDN",
        url: "https://developer.mozilla.org",
        icon: "xicon:Code"
      },
      {
        name: "W3Schools",
        url: "https://w3schools.com",
        icon: "xicon:Code"
      },
      {
        name: "Codepen",
        url: "https://codepen.io",
        icon: "xicon:Code"
      },
      {
        name: "JSFiddle",
        url: "https://jsfiddle.net",
        icon: "xicon:Code"
      },
      {
        name: "Replit",
        url: "https://replit.com",
        icon: "xicon:Code"
      },
      {
        name: "Postman",
        url: "https://postman.com",
        icon: "xicon:Code"
      },
      {
        name: "Docker",
        url: "https://docker.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Figma",
        url: "https://figma.com",
        icon: "xicon:Figma"
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
        icon: "xicon:StickyNote"
      },
      {
        name: "Canva",
        url: "https://canva.com",
        icon: "xicon:StickyNote"
      },
      {
        name: "Trello",
        url: "https://trello.com",
        icon: "T"
      },
      {
        name: "Asana",
        url: "https://asana.com",
        icon: "xicon:Briefcase"
      },
      {
        name: "Monday.com",
        url: "https://monday.com",
        icon: "xicon:Briefcase"
      },
      {
        name: "Airtable",
        url: "https://airtable.com",
        icon: "xicon:StickyNote"
      },
      {
        name: "Evernote",
        url: "https://evernote.com",
        icon: "xicon:StickyNote"
      },
      {
        name: "OneNote",
        url: "https://onenote.com",
        icon: "xicon:StickyNote"
      },
      {
        name: "Obsidian",
        url: "https://obsidian.md",
        icon: "xicon:StickyNote"
      },
      {
        name: "Roam Research",
        url: "https://roamresearch.com",
        icon: "xicon:StickyNote"
      },
      {
        name: "Logseq",
        url: "https://logseq.com",
        icon: "xicon:StickyNote"
      }
    ]
  }
]
