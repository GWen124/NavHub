# 分组隐藏功能使用指南

## 功能说明

现在可以通过在分组配置中添加 `hidden` 属性来控制分组的显示和隐藏。

- `hidden: true` - 隐藏该分组，不在页面上显示
- `hidden: false` 或不设置 - 显示该分组（默认行为）

## 使用方法

### 在 Website.json 中使用

```json
[
  {
    "name": "常用网站",
    "sites": [
      {
        "name": "Google",
        "url": "https://www.google.com",
        "icon": ""
      }
    ]
  },
  {
    "name": "临时隐藏的分组",
    "hidden": true,
    "sites": [
      {
        "name": "测试网站",
        "url": "https://test.com",
        "icon": ""
      }
    ]
  }
]
```

### 在 src/config.ts 中使用

```typescript
export const config: Category[] = [
  {
    name: "开发工具",
    sites: [
      {
        name: "GitHub",
        url: "https://github.com",
        icon: ""
      }
    ]
  },
  {
    name: "测试分组",
    hidden: true,  // 隐藏此分组
    sites: [
      {
        name: "测试站点",
        url: "https://test.example.com",
        icon: ""
      }
    ]
  }
]
```

## 使用场景

1. **临时隐藏**: 暂时不想显示某些分组，但又不想删除配置
2. **分阶段上线**: 准备好配置但还不想公开显示
3. **测试环境**: 隐藏测试用的分组
4. **季节性内容**: 根据需要临时显示或隐藏特定分组

## 注意事项

1. 隐藏的分组完全不会出现在页面上
2. 隐藏的分组不会出现在侧边栏中
3. 隐藏的分组不影响其他分组的排序
4. 可以随时通过移除 `hidden` 属性或设置为 `false` 来重新显示分组

## 示例

假设你有一个正在准备的新分组，但还不想让用户看到：

```json
{
  "name": "即将推出 - 新功能",
  "hidden": true,
  "sites": [
    {
      "name": "新站点1",
      "url": "https://new1.com",
      "icon": ""
    },
    {
      "name": "新站点2", 
      "url": "https://new2.com",
      "icon": ""
    }
  ]
}
```

当准备好展示时，只需要：
1. 删除 `"hidden": true` 这行
2. 或者改为 `"hidden": false`
3. 重新构建和部署

就这么简单！

