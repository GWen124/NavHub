// 自动获取网站图标的工具函数

/**
 * 使用 Google Favicon 服务获取网站图标
 * @param url 网站URL
 * @param size 图标大小 (16, 32, 64, 128, 256)
 * @param shape 图标形状 (square, round, any)
 * @param quality 图标质量 (hd, normal, any)
 * @returns 图标URL
 */
export const getGoogleFavicon = async (url: string, size: number = 64, shape: string = 'any', quality: string = 'any'): Promise<string | null> => {
  try {
    const domain = new URL(url).hostname;
    let shapeParam = '';
    let qualityParam = '';
    
    if (shape === 'square') {
      shapeParam = '&sz=64'; // Google 默认返回方形图标
    } else if (shape === 'round') {
      shapeParam = '&sz=64&type=round';
    }
    
    if (quality === 'hd') {
      qualityParam = '&sz=128'; // 高清版本使用更大尺寸
    }
    
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}${shapeParam}${qualityParam}`;
    
    // 检查图标是否可用
    const response = await fetch(faviconUrl, { method: 'HEAD' });
    if (response.ok && response.headers.get('content-type')?.includes('image')) {
      return faviconUrl;
    }
    return null;
  } catch (error) {
    console.error('获取 Google Favicon 失败:', error);
    return null;
  }
}

/**
 * 使用 DuckDuckGo Favicon 服务获取网站图标
 * @param url 网站URL
 * @param quality 图标质量 (hd, normal, any)
 * @returns 图标URL
 */
export const getDuckDuckGoFavicon = (url: string, quality: string = 'any'): string => {
  try {
    const domain = new URL(url).hostname;
    // DuckDuckGo 不支持高清参数，始终使用 ICO 格式
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  } catch (error) {
    console.error('获取 DuckDuckGo Favicon 失败:', error);
    return '';
  }
}

/**
 * 使用 Favicon.io 服务获取网站图标
 * @param url 网站URL
 * @param quality 图标质量 (hd, normal, any)
 * @returns 图标URL
 */
export const getFaviconIo = (url: string, quality: string = 'any'): string => {
  try {
    const domain = new URL(url).hostname;
    if (quality === 'hd') {
      return `https://favicons.io/t/${domain}?size=128`; // 高清版本使用更大尺寸
    }
    return `https://favicons.io/t/${domain}`;
  } catch (error) {
    console.error('获取 Favicon.io 失败:', error);
    return '';
  }
}

/**
 * 使用 iconfont 服务获取网站图标
 * @param url 网站URL
 * @returns 图标URL
 */
export const getIconfontFavicon = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    // iconfont 的图标服务，支持多种格式
    return `https://at.alicdn.com/t/font_${domain}.woff2`;
  } catch (error) {
    console.error('获取 iconfont Favicon 失败:', error);
    return '';
  }
}

/**
 * 获取 Icon Horse 图标
 * @param url 网站URL
 * @returns 图标URL
 */
export const getIconHorseFavicon = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return `https://icon.horse/icon/${domain}`;
  } catch (error) {
    console.error('获取 Icon Horse Favicon 失败:', error);
    return '';
  }
}

/**
 * 使用 iconfont 图标库搜索图标
 * @param siteName 网站名称
 * @returns 图标URL
 */
export const getIconfontIcon = async (siteName: string): Promise<string> => {
  try {
    // 这里可以调用 iconfont 的 API 搜索图标
    // 由于 iconfont 没有公开的 API，我们使用一个通用的图标
    const iconName = siteName.toLowerCase().replace(/\s+/g, '-');
    return `https://at.alicdn.com/t/font_${iconName}.woff2`;
  } catch (error) {
    console.error('获取 iconfont 图标失败:', error);
    return '';
  }
}

/**
 * 使用 Clearbit Logo API 获取网站图标
 * @param url 网站URL
 * @param quality 图标质量 (hd, normal, any)
 * @returns 图标URL
 */
export const getClearbitLogo = async (url: string, quality: string = 'any'): Promise<string | null> => {
  try {
    const domain = new URL(url).hostname;
    const logoUrl = `https://logo.clearbit.com/${domain}`;
    
    // 检查图标是否可用
    const response = await fetch(logoUrl, { method: 'HEAD' });
    if (response.ok && response.headers.get('content-type')?.includes('image')) {
      return logoUrl;
    }
    return null;
  } catch (error) {
    console.error('获取 Clearbit Logo 失败:', error);
    return null;
  }
}

/**
 * 使用 Brandfetch API 获取网站图标
 * @param url 网站URL
 * @returns 图标URL
 */
export const getBrandfetchLogo = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return `https://api.brandfetch.io/v2/brands/${domain}/logo`;
  } catch (error) {
    console.error('获取 Brandfetch Logo 失败:', error);
    return '';
  }
}

/**
 * 使用 Logo.dev 服务获取网站图标
 * @param url 网站URL
 * @returns 图标URL
 */
export const getLogoDev = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return `https://img.logo.dev/${domain}?token=public`;
  } catch (error) {
    console.error('获取 Logo.dev 失败:', error);
    return '';
  }
}

/**
 * 使用通用 API 图标服务
 * @param url 网站URL
 * @returns 图标URL
 */
export const getApiIcon = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return `https://api.statvoo.com/favicon/?url=${domain}`;
  } catch (error) {
    console.error('获取 API 图标失败:', error);
    return '';
  }
}

/**
 * 使用 Simple Icons 获取图标
 * @param siteName 网站名称
 * @returns 图标URL
 */
export const getSimpleIcon = (siteName: string): string => {
  try {
    const iconName = siteName.toLowerCase().replace(/\s+/g, '');
    return `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${iconName}.svg`;
  } catch (error) {
    console.error('获取 Simple Icon 失败:', error);
    return '';
  }
}

/**
 * 使用 Iconify 获取图标
 * @param siteName 网站名称
 * @returns 图标URL
 */
export const getIconifyIcon = (siteName: string): string => {
  try {
    const iconName = siteName.toLowerCase().replace(/\s+/g, '');
    return `https://api.iconify.design/logos:${iconName}.svg`;
  } catch (error) {
    console.error('获取 Iconify 图标失败:', error);
    return '';
  }
}

/**
 * 尝试从网站直接获取 favicon
 * @param url 网站URL
 * @returns Promise<string | null>
 */
export const getWebsiteFavicon = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      mode: 'cors',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    // 尝试获取 favicon.ico
    const faviconUrl = new URL('/favicon.ico', url).href;
    const faviconResponse = await fetch(faviconUrl, { method: 'HEAD' });
    
    if (faviconResponse.ok) {
      return faviconUrl;
    }
    
    return null;
  } catch (error) {
    console.error('获取网站 Favicon 失败:', error);
    return null;
  }
}

/**
 * 智能获取网站图标 - 按优先级尝试多种方法
 * @param url 网站URL
 * @param services 服务优先级列表
 * @param shapePriority 形状优先级列表
 * @param qualityPriority 质量优先级列表
 * @returns Promise<string>
 */
export const getSmartFavicon = async (url: string, services: string[] = ['direct', 'clearbit', 'google', 'duckduckgo', 'iconhorse', 'simple', 'iconify', 'iconfont'], shapePriority: string[] = ['square', 'round', 'any'], qualityPriority: string[] = ['hd', 'normal', 'any']): Promise<string | null> => {
  const domain = new URL(url).hostname;
  
  // 1. 检查缓存
  if (commonSitesCache.has(domain)) {
    const cachedIcon = commonSitesCache.get(domain)!;
    return cachedIcon;
  }
  
  // 2. 优先匹配上图标 - 检查可用性，确保返回有效图标
  const allServices = ['clearbit', 'iconhorse', 'duckduckgo', 'favicon', 'simple', 'iconify', 'google', 'iconfont'];
  
  for (const service of allServices) {
    if (!services.includes(service)) continue;
    
    let iconUrl = '';
    switch (service) {
      case 'clearbit':
        iconUrl = `https://logo.clearbit.com/${domain}`;
        break;
      case 'google':
        iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        break;
      case 'iconhorse':
        iconUrl = `https://icon.horse/icon/${domain}`;
        break;
      case 'duckduckgo':
        iconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
        break;
      case 'favicon':
        iconUrl = `https://favicon.io/icon/${domain}`;
        break;
      case 'simple':
        iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${domain}.svg`;
        break;
      case 'iconify':
        iconUrl = `https://api.iconify.design/logos/${domain}.svg`;
        break;
      case 'iconfont':
        iconUrl = `https://at.alicdn.com/t/font_${domain}.svg`;
        break;
    }
    
    if (iconUrl) {
      // 检查图标是否可用
      try {
        const isAvailable = await checkIconAvailability(iconUrl);
        if (isAvailable) {
          // 缓存结果
          commonSitesCache.set(domain, iconUrl);
          
          // 后台继续优化（不阻塞用户界面）
          setTimeout(async () => {
            try {
              const betterIcon = await getBetterIcon(url, domain);
              if (betterIcon && betterIcon !== iconUrl) {
                // 更新缓存
                commonSitesCache.set(domain, betterIcon);
                // 这里可以触发图标更新事件
              }
            } catch (error) {
              // 静默处理后台优化失败
            }
          }, 100);
          
          return iconUrl;
        }
      } catch (error) {
        // 静默处理检查失败
      }
    }
  }
  
  // 3. 如果都失败，尝试网站直接图标（跳过SSL错误）
  try {
    const directIcon = await getWebsiteFavicon(url);
    if (directIcon) {
      commonSitesCache.set(domain, directIcon);
      return directIcon;
    }
  } catch (error) {
    // 跳过SSL证书错误，直接进入回退
    if (error instanceof Error && error.message.includes('CERT')) {
      // 静默处理SSL证书错误
    }
  }
  
  // 4. 如果网站直接图标也失败，返回null让上层处理回退
  return null;
}

/**
 * 后台优化图标（检查回退选项）
 */
const getBetterIcon = async (url: string, domain: string): Promise<string | null> => {
  // 1. 尝试回退图标
  try {
    const siteName = domain.split('.')[0] || domain;
    const xiconIcon = await getXiconFallback(siteName);
    if (xiconIcon) {
      return xiconIcon;
    }
  } catch (error) {
    // 静默处理xicon优化失败
  }
  
  return null;
}


/**
 * 从自定义图标源获取图标
 * @param siteName 网站名称
 * @param customSources 自定义图标源列表
 * @returns Promise<string | null>
 */
/**
 * 厂家映射 - 同一厂家的网站使用不同的图标
 */
const companyMapping: Record<string, string[]> = {
  'Microsoft': ['Microsoft', 'Office', 'Outlook', 'Teams', 'Skype', 'Azure', 'Xbox', 'Bing', 'LinkedIn'],
  'Google': ['Google', 'Gmail', 'YouTube', 'Drive', 'Maps', 'Photos', 'Calendar', 'Meet', 'Chrome', 'Android', 'Play'],
  'Meta': ['Facebook', 'Instagram', 'WhatsApp', 'Messenger', 'Oculus', 'Portal'],
  'Apple': ['Apple', 'iPhone', 'iPad', 'Mac', 'iTunes', 'App Store', 'Safari', 'iCloud', 'AirPods'],
  'Amazon': ['Amazon', 'AWS', 'Prime', 'Alexa', 'Kindle', 'Twitch', 'Audible'],
  'Alibaba': ['Alibaba', 'Taobao', 'Tmall', 'Alipay', 'Aliyun', '钉钉', '飞书'],
  'Tencent': ['QQ', '微信', '企业微信', '腾讯会议', '腾讯云', 'WeChat', 'WeCom'],
  'ByteDance': ['TikTok', '抖音', '今日头条', '飞书', 'Lark'],
  'Adobe': ['Adobe', 'Photoshop', 'Illustrator', 'Premiere', 'After Effects', 'Acrobat', 'Creative Cloud'],
  'Atlassian': ['Jira', 'Confluence', 'Bitbucket', 'Trello', 'Bamboo'],
  'GitHub': ['GitHub', 'GitHub Actions', 'GitHub Pages', 'GitHub Copilot'],
  'JetBrains': ['IntelliJ', 'WebStorm', 'PyCharm', 'PhpStorm', 'Rider', 'DataGrip'],
  'VMware': ['VMware', 'vSphere', 'vCenter', 'ESXi'],
  'Docker': ['Docker', 'Docker Hub', 'Docker Desktop'],
  'MongoDB': ['MongoDB', 'Atlas', 'Compass', 'Charts'],
  'Elastic': ['Elasticsearch', 'Kibana', 'Logstash', 'Beats'],
  'Splunk': ['Splunk', 'Splunk Enterprise', 'Splunk Cloud'],
  'Datadog': ['Datadog', 'APM', 'Logs', 'Infrastructure'],
  'New Relic': ['New Relic', 'APM', 'Infrastructure', 'Browser'],
  'Sentry': ['Sentry', 'Error Tracking', 'Performance Monitoring'],
  'Zendesk': ['Zendesk', 'Support', 'Chat', 'Talk', 'Sell'],
  'Intercom': ['Intercom', 'Messenger', 'Help Desk', 'Academy'],
  'HubSpot': ['HubSpot', 'Marketing', 'Sales', 'Service', 'CMS'],
  'Mailchimp': ['Mailchimp', 'Email Marketing', 'Automation', 'Landing Pages'],
  'Twilio': ['Twilio', 'SMS', 'Voice', 'Video', 'Email'],
  'SendGrid': ['SendGrid', 'Email API', 'Marketing Campaigns']
}

/**
 * 网站名称到图标名称的映射
 */
const siteNameMapping: Record<string, string[]> = {
  'Google': ['Google', 'google'],
  'GitHub': ['GitHub', 'github', 'Github'],
  'YouTube': ['YouTube', 'youtube', 'Youtube'],
  'Facebook': ['Facebook', 'facebook'],
  'Twitter': ['Twitter', 'twitter', 'X'],
  'Instagram': ['Instagram', 'instagram'],
  'LinkedIn': ['LinkedIn', 'linkedin', 'Linkedin'],
  'Discord': ['Discord', 'discord'],
  'Telegram': ['Telegram', 'telegram'],
  'WhatsApp': ['WhatsApp', 'whatsapp'],
  'Spotify': ['Spotify', 'spotify'],
  'Netflix': ['Netflix', 'netflix'],
  'Amazon': ['Amazon', 'amazon'],
  'Microsoft': ['Microsoft', 'microsoft'],
  'Apple': ['Apple', 'apple'],
  'Adobe': ['Adobe', 'adobe'],
  'Figma': ['Figma', 'figma'],
  'Notion': ['Notion', 'notion'],
  'Slack': ['Slack', 'slack'],
  'Zoom': ['Zoom', 'zoom'],
  'Trello': ['Trello', 'trello'],
  'Dropbox': ['Dropbox', 'dropbox'],
  'OneDrive': ['OneDrive', 'onedrive'],
  'Google Drive': ['GoogleDrive', 'google-drive', 'Google_Drive'],
  'Gmail': ['Gmail', 'gmail'],
  'Outlook': ['Outlook', 'outlook'],
  'Chrome': ['Chrome', 'chrome'],
  'Firefox': ['Firefox', 'firefox'],
  'Safari': ['Safari', 'safari'],
  'Edge': ['Edge', 'edge'],
  'Vue.js': ['Vue', 'vue', 'VueJS', 'vuejs'],
  'React': ['React', 'react'],
  'Angular': ['Angular', 'angular'],
  'Node.js': ['Node', 'node', 'NodeJS', 'nodejs'],
  'Python': ['Python', 'python'],
  'JavaScript': ['JavaScript', 'javascript', 'JS', 'js'],
  'TypeScript': ['TypeScript', 'typescript', 'TS', 'ts'],
  'HTML': ['HTML', 'html'],
  'CSS': ['CSS', 'css'],
  'Bootstrap': ['Bootstrap', 'bootstrap'],
  'Tailwind': ['Tailwind', 'tailwind'],
  'Docker': ['Docker', 'docker'],
  'Kubernetes': ['Kubernetes', 'kubernetes', 'K8s', 'k8s'],
  'Redis': ['Redis', 'redis'],
  'MongoDB': ['MongoDB', 'mongodb', 'Mongo'],
  'MySQL': ['MySQL', 'mysql'],
  'PostgreSQL': ['PostgreSQL', 'postgresql', 'Postgres'],
  'Nginx': ['Nginx', 'nginx'],
  'Apache': ['Apache', 'apache'],
  'Linux': ['Linux', 'linux'],
  'Ubuntu': ['Ubuntu', 'ubuntu'],
  'CentOS': ['CentOS', 'centos'],
  'Debian': ['Debian', 'debian'],
  'Windows': ['Windows', 'windows'],
  'macOS': ['macOS', 'macos', 'Mac'],
  'Android': ['Android', 'android'],
  'iOS': ['iOS', 'ios'],
  'Steam': ['Steam', 'steam'],
  'Epic Games': ['EpicGames', 'epic-games', 'Epic_Games'],
  'Battle.net': ['BattleNet', 'battle-net', 'Battle_Net'],
  'Origin': ['Origin', 'origin'],
  'Uplay': ['Uplay', 'uplay'],
  'GOG': ['GOG', 'gog'],
  'Humble Bundle': ['HumbleBundle', 'humble-bundle', 'Humble_Bundle'],
  'itch.io': ['Itch', 'itch', 'ItchIO'],
  'Twitch': ['Twitch', 'twitch'],
  'Reddit': ['Reddit', 'reddit'],
  'Pinterest': ['Pinterest', 'pinterest'],
  'TikTok': ['TikTok', 'tiktok'],
  'Snapchat': ['Snapchat', 'snapchat'],
  'Medium': ['Medium', 'medium'],
  'Dev.to': ['Dev', 'dev', 'DevTo', 'devto'],
  'Stack Overflow': ['StackOverflow', 'stack-overflow', 'Stack_Overflow'],
  'GitLab': ['GitLab', 'gitlab', 'Gitlab'],
  'Bitbucket': ['Bitbucket', 'bitbucket'],
  'Jira': ['Jira', 'jira'],
  'Confluence': ['Confluence', 'confluence'],
  'Jenkins': ['Jenkins', 'jenkins'],
  'Travis CI': ['TravisCI', 'travis-ci', 'Travis_CI'],
  'CircleCI': ['CircleCI', 'circle-ci', 'Circle_CI'],
  'GitHub Actions': ['GitHubActions', 'github-actions', 'GitHub_Actions'],
  'Vercel': ['Vercel', 'vercel'],
  'Netlify': ['Netlify', 'netlify'],
  'Heroku': ['Heroku', 'heroku'],
  'AWS': ['AWS', 'aws'],
  'Google Cloud': ['GoogleCloud', 'google-cloud', 'Google_Cloud'],
  'Azure': ['Azure', 'azure'],
  'DigitalOcean': ['DigitalOcean', 'digital-ocean', 'Digital_Ocean'],
  'Linode': ['Linode', 'linode'],
  'Vultr': ['Vultr', 'vultr'],
  'Cloudflare': ['Cloudflare', 'cloudflare'],
  'Fastly': ['Fastly', 'fastly'],
  'Akamai': ['Akamai', 'akamai'],
  'MaxCDN': ['MaxCDN', 'max-cdn', 'Max_CDN'],
  'KeyCDN': ['KeyCDN', 'key-cdn', 'Key_CDN'],
  'BunnyCDN': ['BunnyCDN', 'bunny-cdn', 'Bunny_CDN'],
  'jsDelivr': ['jsDelivr', 'js-delivr', 'js_delivr'],
  'unpkg': ['unpkg', 'Unpkg'],
  'cdnjs': ['cdnjs', 'Cdnjs'],
  'Google Fonts': ['GoogleFonts', 'google-fonts', 'Google_Fonts'],
  'Font Awesome': ['FontAwesome', 'font-awesome', 'Font_Awesome'],
  'Material Icons': ['MaterialIcons', 'material-icons', 'Material_Icons'],
  'Feather Icons': ['FeatherIcons', 'feather-icons', 'Feather_Icons'],
  'Heroicons': ['Heroicons', 'heroicons'],
  'Lucide': ['Lucide', 'lucide'],
  'Tabler Icons': ['TablerIcons', 'tabler-icons', 'Tabler_Icons'],
  'Bootstrap Icons': ['BootstrapIcons', 'bootstrap-icons', 'Bootstrap_Icons'],
  'Ant Design': ['AntDesign', 'ant-design', 'Ant_Design'],
  'Element UI': ['ElementUI', 'element-ui', 'Element_UI'],
  'Vuetify': ['Vuetify', 'vuetify'],
  'Quasar': ['Quasar', 'quasar'],
  'PrimeVue': ['PrimeVue', 'prime-vue', 'Prime_Vue'],
  'Naive UI': ['NaiveUI', 'naive-ui', 'Naive_UI'],
  'Arco Design': ['ArcoDesign', 'arco-design', 'Arco_Design'],
  'Semi Design': ['SemiDesign', 'semi-design', 'Semi_Design'],
  'TDesign': ['TDesign', 't-design', 'T_Design'],
  'NutUI': ['NutUI', 'nut-ui', 'Nut_UI'],
  'Varlet': ['Varlet', 'varlet'],
  'Vant': ['Vant', 'vant'],
  'Mint UI': ['MintUI', 'mint-ui', 'Mint_UI'],
  'Cube UI': ['CubeUI', 'cube-ui', 'Cube_UI'],
  'WeUI': ['WeUI', 'we-ui', 'We_UI'],
  'VUX': ['VUX', 'vux'],
  'Mand Mobile': ['MandMobile', 'mand-mobile', 'Mand_Mobile']
}

export const getCustomSourceIcon = async (
  siteName: string, 
  customSources: string[]
): Promise<string | null> => {
  for (const source of customSources) {
    try {
      // 只尝试直接匹配，不进行文件夹匹配（HD-Icons仓库图标都在根目录）
      const directIcon = await tryDirectMatch(source, siteName)
      if (directIcon) {
        return directIcon
      }
    } catch (error) {
      console.warn(`⚠️ 自定义源 ${source} 获取失败:`, error)
    }
  }
  
  return null
}

/**
 * 尝试直接匹配图标（无子文件夹）
 */
const tryDirectMatch = async (source: string, siteName: string): Promise<string | null> => {
  const possibleNames = getPossibleIconNames(siteName)
  
  // 获取厂家信息
  const company = getCompanyForSite(siteName)
  const usedIcons = company ? companyIconUsage.get(company) || new Set<string>() : new Set<string>()
  
  for (const name of possibleNames) {
    const possibleExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico']
    
    for (const ext of possibleExtensions) {
      const iconUrl = `${source}${name}${ext}`
      const isAvailable = await checkIconAvailability(iconUrl)
      if (isAvailable) {
        // 如果是同一厂家的网站，检查是否已使用过该图标
        if (company && usedIcons.has(iconUrl)) {
          console.log(`⏭️ 跳过已使用的图标: ${iconUrl} (厂家: ${company})`)
          continue
        }
        
        console.log('🎯 直接匹配成功:', iconUrl)
        
        // 记录已使用的图标
        if (company) {
          usedIcons.add(iconUrl)
          companyIconUsage.set(company, usedIcons)
        }
        
        return iconUrl
      }
    }
  }
  
  return null
}

/**
 * 获取网站所属的厂家
 */
const getCompanyForSite = (siteName: string): string | null => {
  for (const [company, sites] of Object.entries(companyMapping)) {
    if (sites.includes(siteName)) {
      return company
    }
  }
  return null
}

/**
 * 尝试通过文件夹匹配图标
 */
const tryFolderMatch = async (source: string, siteName: string): Promise<string | null> => {
  try {
    // 获取可能的文件夹名称
    const possibleFolderNames = getPossibleIconNames(siteName)
    
    for (const folderName of possibleFolderNames) {
      // 尝试列出文件夹内容
      const folderUrl = `${source}${folderName}/`
      const folderContents = await listFolderContents(folderUrl)
      
      if (folderContents && folderContents.length > 0) {
        // 在文件夹中查找图标文件
        for (const fileName of folderContents) {
          const iconUrl = `${folderUrl}${fileName}`
          const isAvailable = await checkIconAvailability(iconUrl)
          if (isAvailable) {
            console.log('🎯 文件夹匹配成功:', iconUrl)
            return iconUrl
          }
        }
      }
    }
    
    // 如果按网站名称匹配失败，尝试按域名匹配
    const domainBasedFolders = await tryDomainBasedMatch(source, siteName)
    if (domainBasedFolders) {
      return domainBasedFolders
    }
  } catch (error) {
    console.warn(`⚠️ 文件夹匹配失败:`, error)
  }
  
  return null
}

/**
 * 尝试基于域名的匹配
 */
const tryDomainBasedMatch = async (source: string, siteName: string): Promise<string | null> => {
  try {
    // 如果 siteName 包含域名信息，提取域名
    let domain = siteName
    if (siteName.includes('.')) {
      const extractedDomain = siteName.split('.')[0]
      if (extractedDomain) {
        domain = extractedDomain
      }
    }
    
    // 尝试域名相关的文件夹名称
    const domainVariants = [
      domain,
      domain.toLowerCase(),
      domain.toUpperCase(),
      domain.replace(/[^a-zA-Z0-9]/g, ''),
      domain.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    ]
    
    for (const folderName of domainVariants) {
      const folderUrl = `${source}${folderName}/`
      const folderContents = await listFolderContents(folderUrl)
      
      if (folderContents && folderContents.length > 0) {
        for (const fileName of folderContents) {
          const iconUrl = `${folderUrl}${fileName}`
          const isAvailable = await checkIconAvailability(iconUrl)
          if (isAvailable) {
            console.log('🎯 域名匹配成功:', iconUrl)
            return iconUrl
          }
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️ 域名匹配失败:`, error)
  }
  
  return null
}

/**
 * 列出文件夹内容（智能检测）
 */
const listFolderContents = async (folderUrl: string): Promise<string[]> => {
  try {
    // 尝试多种常见的图标文件名和格式
    const commonIconNames = [
      // 基础名称
      'icon', 'logo', 'favicon', 'app', 'brand',
      // 带网站名称的变体
      'icon.png', 'logo.png', 'favicon.png', 'app.png',
      'icon.svg', 'logo.svg', 'favicon.svg', 'app.svg',
      // 可能的变体
      'Icon', 'Logo', 'Favicon', 'App',
      'ICON', 'LOGO', 'FAVICON', 'APP'
    ]
    
    // 检查这些文件名是否存在
    const availableFiles: string[] = []
    const extensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico']
    
    for (const baseName of commonIconNames) {
      for (const ext of extensions) {
        const fileName = baseName.endsWith(ext) ? baseName : `${baseName}${ext}`
        const fileUrl = `${folderUrl}${fileName}`
        const isAvailable = await checkIconAvailability(fileUrl)
        if (isAvailable) {
          availableFiles.push(fileName)
          console.log(`✅ 找到图标文件: ${fileUrl}`)
        }
      }
    }
    
    return availableFiles
  } catch (error) {
    console.warn(`⚠️ 无法访问文件夹 ${folderUrl}:`, error)
  }
  
  return []
}

/**
 * 获取可能的图标文件名
 */
const getPossibleIconNames = (siteName: string): string[] => {
  const names = new Set<string>()
  
  // 1. 原始名称的各种变体
  names.add(siteName)
  names.add(siteName.toLowerCase())
  names.add(siteName.toUpperCase())
  names.add(siteName.replace(/\s+/g, ''))
  names.add(siteName.replace(/\s+/g, '').toLowerCase())
  names.add(siteName.replace(/\s+/g, '').toUpperCase())
  names.add(siteName.replace(/\s+/g, '-'))
  names.add(siteName.replace(/\s+/g, '-').toLowerCase())
  names.add(siteName.replace(/\s+/g, '_'))
  names.add(siteName.replace(/\s+/g, '_').toLowerCase())
  
  // 2. 从厂家映射获取可能的名称（智能分配）
  for (const [company, sites] of Object.entries(companyMapping)) {
    if (sites.includes(siteName)) {
      // 如果找到匹配的厂家，添加该厂家的所有网站名称
      sites.forEach(site => {
        names.add(site)
        names.add(site.toLowerCase())
        names.add(site.toUpperCase())
        names.add(site.replace(/\s+/g, ''))
        names.add(site.replace(/\s+/g, '').toLowerCase())
        names.add(site.replace(/\s+/g, '-'))
        names.add(site.replace(/\s+/g, '-').toLowerCase())
        names.add(site.replace(/\s+/g, '_'))
        names.add(site.replace(/\s+/g, '_').toLowerCase())
      })
      // 添加厂家名称
      names.add(company)
      names.add(company.toLowerCase())
      names.add(company.toUpperCase())
    }
  }
  
  // 3. 从映射表获取可能的名称
  if (siteNameMapping[siteName]) {
    siteNameMapping[siteName].forEach(name => {
      names.add(name)
      names.add(name.toLowerCase())
      names.add(name.toUpperCase())
    })
  }
  
  // 3. 特殊处理一些常见情况
  if (siteName.includes('.')) {
    const domain = siteName.split('.')[0]
    if (domain) {
      names.add(domain)
      names.add(domain.toLowerCase())
      names.add(domain.toUpperCase())
    }
  }
  
  return Array.from(names)
}

/**
 * 获取 xicon 回退图标
 * @param siteName 网站名称
 * @returns Promise<string | null>
 */
export const getXiconFallback = async (siteName: string): Promise<string | null> => {
  try {
    // 这里可以根据网站名称映射到对应的 xicon 图标
    // 暂时返回 null，让系统继续到下一个回退选项
    console.log(`🔄 尝试 xicon 回退: ${siteName}`)
    return null
  } catch (error) {
    console.warn('⚠️ xicon 回退失败:', error)
    return null
  }
}

/**
 * 获取 Font Awesome 回退图标
 * @param siteName 网站名称
 * @returns Promise<string | null>
 */
export const getFontAwesomeFallback = async (siteName: string): Promise<string | null> => {
  try {
    // 这里可以根据网站名称映射到对应的 Font Awesome 图标
    // 暂时返回 null，让系统继续到下一个回退选项
    console.log(`🔄 尝试 Font Awesome 回退: ${siteName}`)
    return null
  } catch (error) {
    console.warn('⚠️ Font Awesome 回退失败:', error)
    return null
  }
}

// 防重复调用的缓存
const pendingRequests = new Map<string, Promise<string>>()

// 厂家图标分配缓存 - 跟踪同一厂家已使用的图标
const companyIconUsage = new Map<string, Set<string>>()

// 性能优化：请求队列和并发控制
const requestQueue: Array<() => Promise<void>> = []
const maxConcurrentRequests = 5 // 增加并发数
let activeRequests = 0

// 常用网站快速匹配缓存
const commonSitesCache = new Map<string, string>()
const COMMON_SITES = [
  'Google', 'YouTube', 'Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'GitHub', 'GitLab',
  'Microsoft', 'Apple', 'Amazon', 'Netflix', 'Spotify', 'Discord', 'Slack', 'Zoom',
  'TikTok', 'Pinterest', 'Reddit', 'WhatsApp', 'Telegram', 'Skype', 'Teams',
  'QQ', '微信', '微博', '知乎', 'B站', 'Bilibili', '淘宝', '京东', '支付宝'
]


/**
 * 控制并发请求数量
 */
const executeWithConcurrencyControl = async <T>(fn: () => Promise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    const execute = async () => {
      activeRequests++
      try {
        const result = await fn()
        resolve(result)
      } catch (error) {
        reject(error)
      } finally {
        activeRequests--
        if (requestQueue.length > 0) {
          const next = requestQueue.shift()
          if (next) next()
        }
      }
    }
    
    if (activeRequests < maxConcurrentRequests) {
      execute()
    } else {
      requestQueue.push(execute)
    }
  })
}

/**
 * 增强的智能图标获取 - 支持智能回退机制
 * @param url 网站URL
 * @param originalIcon 原始图标（可能是 xicon、Font Awesome 等）
 * @param siteName 网站名称
 * @returns Promise<string>
 */
export const getEnhancedSmartFavicon = async (url: string, originalIcon: string, siteName: string): Promise<string> => {
  // 检查是否已有进行中的请求
  if (pendingRequests.has(url)) {
    return await pendingRequests.get(url)!
  }
  
  // 第一步：检查缓存
  const cachedIcon = getIconCache(url)
  if (cachedIcon) {
    return cachedIcon
  }
  
  // 创建请求Promise并缓存
  const requestPromise = performIconFetch(url, originalIcon, siteName)
  pendingRequests.set(url, requestPromise)
  
  try {
    const result = await requestPromise
    return result
  } finally {
    // 请求完成后清除缓存
    pendingRequests.delete(url)
  }
}

/**
 * 执行图标获取逻辑
 */
const performIconFetch = async (url: string, originalIcon: string, siteName: string): Promise<string> => {
  // 快速匹配：检查常用网站缓存
  if (COMMON_SITES.includes(siteName) && commonSitesCache.has(siteName)) {
    const cachedIcon = commonSitesCache.get(siteName)!
    setIconCache(url, cachedIcon)
    return cachedIcon
  }
  
  // 第二步：尝试从服务商获取图标（网站自身图标）
  const serviceIcon = await getSmartFavicon(url)
  if (serviceIcon) {
    // 缓存成功获取的图标
    setIconCache(url, serviceIcon)
    return serviceIcon
  }
  
  
  // 第四步：尝试 xicon 图标
  const xiconIcon = await getXiconFallback(siteName)
  if (xiconIcon) {
    setIconCache(url, xiconIcon)
    return xiconIcon
  }
  
  // 第五步：尝试 Font Awesome 图标
  const faIcon = await getFontAwesomeFallback(siteName)
  if (faIcon) {
    setIconCache(url, faIcon)
    return faIcon
  }
  
  // 第六步：生成文字图标
  const fallbackIcon = getFallbackIcon(url, siteName)
  // 缓存文字图标
  setIconCache(url, fallbackIcon)
  return fallbackIcon
}

/**
 * 批量获取多个网站的图标
 * @param urls 网站URL数组
 * @returns Promise<Record<string, string>>
 */
export const getBatchFavicons = async (urls: string[]): Promise<Record<string, string>> => {
  const results: Record<string, string> = {};
  
  // 分批处理，每批最多5个
  const batchSize = 5
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize)
    
    const promises = batch.map(async (url) => {
      try {
        const favicon = await getSmartFavicon(url);
        results[url] = favicon || getFallbackIcon(url);
      } catch (error) {
        console.error(`获取 ${url} 图标失败:`, error);
        results[url] = getFallbackIcon(url);
      }
    });
    
    await Promise.allSettled(promises)
    
    // 批次间添加小延迟，减少CPU压力
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }
  
  return results;
}

/**
 * 检查图标是否可用
 * @param iconUrl 图标URL
 * @returns Promise<boolean>
 */
// 图标可用性缓存
const iconAvailabilityCache = new Map<string, { available: boolean; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5分钟缓存

export const checkIconAvailability = async (iconUrl: string): Promise<boolean> => {
  // 检查缓存
  const cached = iconAvailabilityCache.get(iconUrl)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.available
  }
  
  return executeWithConcurrencyControl(async () => {
    try {
      // 使用 AbortController 设置超时（常用网站更快超时）
      const controller = new AbortController()
      const isCommonSite = COMMON_SITES.some(site => iconUrl.includes(site.toLowerCase()))
      const timeout = isCommonSite ? 1500 : 3000 // 常用网站1.5秒，其他3秒
      const timeoutId = setTimeout(() => controller.abort(), timeout)
      
      const response = await fetch(iconUrl, { 
        method: 'HEAD',
        signal: controller.signal,
        cache: 'no-cache'
      })
      
      clearTimeout(timeoutId)
      const available = response.ok
      
      // 缓存结果
      iconAvailabilityCache.set(iconUrl, { available, timestamp: Date.now() })
      
      return available
    } catch (error) {
      // 缓存失败结果
      iconAvailabilityCache.set(iconUrl, { available: false, timestamp: Date.now() })
      return false
    }
  })
}

/**
 * 获取备用图标（当主要图标不可用时）
 * @param url 网站URL
 * @returns string
 */
export const getFallbackIcon = (url: string, siteName?: string): string => {
  try {
    const domain = new URL(url).hostname;
    // 返回一个通用的网站图标
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64&default=1`;
  } catch (error) {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iIzMzNzNkYyIvPgo8cGF0aCBkPSJNMjQgMjBIMzJWMjRIMjRWMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjQgMjhIMzJWMzJIMjRWMjhaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjQgMzZIMzJWNEEyNEgzNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';
  }
}

/**
 * 图标缓存 - 使用 localStorage 持久化存储
 */
const CACHE_KEY = 'website_icon_cache'
const CACHE_EXPIRY_KEY = 'website_icon_cache_expiry'

/**
 * 获取缓存的图标
 */
export const getIconCache = (url: string): string | null => {
  try {
    const cache = localStorage.getItem(CACHE_KEY)
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY)
    
    if (!cache || !expiry) return null
    
    // 检查缓存是否过期
    const now = Date.now()
    const expiryTime = parseInt(expiry)
    if (now > expiryTime) {
      clearIconCache()
      return null
    }
    
    const cacheData = JSON.parse(cache)
    return cacheData[url] || null
  } catch (error) {
    console.warn('读取图标缓存失败:', error)
    return null
  }
}

/**
 * 设置图标缓存
 */
export const setIconCache = (url: string, iconUrl: string): void => {
  try {
    const cache = localStorage.getItem(CACHE_KEY)
    const cacheData = cache ? JSON.parse(cache) : {}
    
    cacheData[url] = iconUrl
    
    // 设置缓存过期时间（24小时）
    const expiryTime = Date.now() + (24 * 60 * 60 * 1000)
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    localStorage.setItem(CACHE_EXPIRY_KEY, expiryTime.toString())
    
    console.log(`💾 图标已缓存: ${url} -> ${iconUrl}`)
  } catch (error) {
    console.warn('保存图标缓存失败:', error)
  }
}

/**
 * 清除图标缓存
 */
export const clearIconCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(CACHE_EXPIRY_KEY)
    console.log('🗑️ 图标缓存已清除')
  } catch (error) {
    console.warn('清除图标缓存失败:', error)
  }
}

/**
 * 获取缓存统计信息
 */
export const getCacheStats = (): { count: number; size: number } => {
  try {
    const cache = localStorage.getItem(CACHE_KEY)
    if (!cache) return { count: 0, size: 0 }
    
    const cacheData = JSON.parse(cache)
    const count = Object.keys(cacheData).length
    const size = new Blob([cache]).size
    
    return { count, size }
  } catch (error) {
    console.warn('获取缓存统计失败:', error)
    return { count: 0, size: 0 }
  }
}
