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
    name: "工作工具",
    icon: "xicon:briefcase",
    sites: [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: "https://cdn.jsdelivr.net/gh/GWen124/MyIcons@Web/icon/Project Management & To-do List/GitHub_A.png"
      },
      {
        name: "Stack Overflow",
        url: "https://stackoverflow.com",
        icon: "xicon:stack-overflow"
      },
      {
        name: "Figma",
        url: "https://figma.com",
        icon: "xicon:figma"
      },
      {
        name: "Notion",
        url: "https://notion.so",
        icon: "xicon:sticky-note"
      },
      {
        name: "VS Code",
        url: "https://code.visualstudio.com",
        icon: "fas fa-code"
      },
      {
        name: "Slack",
        url: "https://slack.com",
        icon: "💬"
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
    icon: "xicon:users",
    sites: [
      {
        name: "Twitter",
        url: "https://twitter.com",
        icon: "xicon:twitter"
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: "xicon:linkedin"
      },
      {
        name: "Discord",
        url: "https://discord.com",
        icon: "xicon:discord"
      },
      {
        name: "Reddit",
        url: "https://reddit.com",
        icon: "xicon:reddit"
      }
    ]
  },
  {
    name: "娱乐休闲",
    icon: "xicon:play-circle",
    sites: [
      {
        name: "YouTube",
        url: "https://youtube.com",
        icon: "xicon:youtube"
      },
      {
        name: "Netflix",
        url: "https://netflix.com",
        icon: "xicon:film"
      },
      {
        name: "Spotify",
        url: "https://spotify.com",
        icon: "xicon:spotify"
      },
      {
        name: "Steam",
        url: "https://steam.com",
        icon: "xicon:steam"
      }
    ]
  },
  {
    name: "新闻资讯",
    icon: "xicon:newspaper",
    sites: [
      {
        name: "CNN",
        url: "https://cnn.com",
        icon: "xicon:globe"
      },
      {
        name: "BBC",
        url: "https://bbc.com",
        icon: "xicon:tv"
      },
      {
        name: "TechCrunch",
        url: "https://techcrunch.com",
        icon: "xicon:microchip"
      },
      {
        name: "Hacker News",
        url: "https://news.ycombinator.com",
        icon: "xicon:code"
      }
    ]
  }
]
