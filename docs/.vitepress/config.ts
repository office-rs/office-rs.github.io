import { defineConfig } from 'vitepress';

// 共用 socialLinks + footer，避免每个 locale 重复
const socialLinks = [{ icon: 'github', link: 'https://github.com/office-rs' }] as const;
const footer = { message: 'Released under the Apache 2.0 License.' };

export default defineConfig({
  title: 'office-rs',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3aa675' }]
  ],
  locales: {
    // 默认中文 → 站点根路径
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: 'Rust 高性能 Office 组件库 - rword 与 rofd',
      themeConfig: {
        siteTitle: 'office-rs',
        nav: [
          { text: '首页', link: '/' },
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
        socialLinks: [...socialLinks],
        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: { noResults: '无匹配结果', resetButtonTitle: '清除查询' }
            }
          }
        },
        footer
      }
    },
    // 英文 → /en/ 子路径
    en: {
      label: 'English',
      lang: 'en-US',
      description: 'Rust high-performance Office component libraries - rword and rofd',
      themeConfig: {
        siteTitle: 'office-rs',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'rword', link: '/en/rword/intro', activeMatch: '/en/rword/' },
          { text: 'rofd', link: '/en/rofd/intro', activeMatch: '/en/rofd/' },
          { text: 'GitHub', link: 'https://github.com/office-rs' }
        ],
        sidebar: {
          '/en/rword/': [
            {
              text: 'rword',
              items: [
                { text: 'Introduction', link: '/en/rword/intro' },
                { text: 'JS SDK', link: '/en/rword/sdk' },
                { text: 'xilem-view', link: '/en/rword/xilem-view' },
                { text: 'Live Demo ↗', link: 'https://office-rs.github.io/rword/' }
              ]
            }
          ],
          '/en/rofd/': [
            {
              text: 'rofd',
              items: [
                { text: 'Introduction', link: '/en/rofd/intro' },
                { text: 'JS SDK', link: '/en/rofd/sdk' },
                { text: 'xilem-view', link: '/en/rofd/xilem-view' },
                { text: 'Live Demo ↗', link: 'https://office-rs.github.io/rofd/' }
              ]
            }
          ]
        },
        socialLinks: [...socialLinks],
        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
              modal: { noResults: 'No results', resetButtonTitle: 'Reset query' }
            }
          }
        },
        footer
      }
    }
  }
});
