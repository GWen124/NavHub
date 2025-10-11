// 网站配置数据
export interface Site {
  name: string
  url: string
  icon: string
}

export interface Category {
  name: string
  icon: string
  sites: Site[]
}

export const config: Category[] = [
  {
    name: "常用网站",
    icon: "xicon:Briefcase",
    sites: [
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
        name: "Notion",
        url: "https://notion.so",
        icon: "xicon:StickyNote"
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
        name: "Google Drive",
        url: "https://drive.google.com",
        icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
      },
      {
        name: "Trello",
        url: "https://trello.com",
        icon: "T"
      }
    ]
  },
  {
    name: "社交媒体",
    icon: "xicon:Users",
    sites: [
      {
        name: "Twitter",
        url: "https://twitter.com",
        icon: "xicon:Twitter"
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: "xicon:Linkedin"
      },
      {
        name: "Discord",
        url: "https://discord.com",
        icon: "xicon:Discord"
      },
      {
        name: "Reddit",
        url: "https://reddit.com",
        icon: "xicon:Reddit"
      }
    ]
  },
  {
    name: "娱乐休闲",
    icon: "xicon:PlayCircle",
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
        name: "Steam",
        url: "https://steam.com",
        icon: "xicon:Steam"
      }
    ]
  },
  {
    name: "新闻资讯",
    icon: "xicon:Newspaper",
    sites: [
      {
        name: "CNN",
        url: "https://cnn.com",
        icon: "xicon:Globe"
      },
      {
        name: "BBC",
        url: "https://bbc.com",
        icon: "xicon:Tv"
      },
      {
        name: "TechCrunch",
        url: "https://techcrunch.com",
        icon: "xicon:Microchip"
      },
      {
        name: "Hacker News",
        url: "https://news.ycombinator.com",
        icon: "xicon:Code"
      }
    ]
  }
]
