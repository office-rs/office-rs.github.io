import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'office-rs',
  description: 'Rust 文档处理库集合 - rword 与 rofd',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3aa675' }]
  ],
  themeConfig: {
    siteTitle: 'office-rs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'rword', link: '/rword/intro', activeMatch: '/rword/' },
      { text: 'rofd', link: '/rofd/intro', activeMatch: '/rofd/' },
      { text: 'GitHub', link: 'https://github.com/office-rs' }
    ],
    sidebar: {
      '/rword/': [
        {
          text: 'rword',
          items: [
            { text: '简介', link: '/rword/intro' },
            { text: 'JS SDK', link: '/rword/sdk' },
            { text: 'xilem-view', link: '/rword/xilem-view' },
            { text: '在线 Demo ↗', link: 'https://office-rs.github.io/rword/' }
          ]
        }
      ],
      '/rofd/': [
        {
          text: 'rofd',
          items: [
            { text: '简介', link: '/rofd/intro' },
            { text: 'JS SDK', link: '/rofd/sdk' },
            { text: 'xilem-view', link: '/rofd/xilem-view' },
            { text: '在线 Demo ↗', link: 'https://office-rs.github.io/rofd/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/office-rs' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: { noResults: '无匹配结果', resetButtonTitle: '清除查询' }
        }
      }
    },
    footer: {
      message: 'Released under the Apache 2.0 License.'
    }
  }
});
