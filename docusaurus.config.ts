import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Claude Code 知识库',
  tagline: '深度整合的 AI 编程最佳实践',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },
  url: 'https://wxitzxg.github.io/',
  baseUrl: '/daily-blog/',

  organizationName: 'clippings',
  projectName: 'daily-blog',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: {
          routeBasePath: '/blog',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '全部文章',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Claude Code 知识库',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'main',
          position: 'left',
          label: '文档',
        },
        {
          to: '/blog',
          label: '精选文章',
          position: 'left',
        },
        {
          href: 'https://github.com/anthropics/claude-code',
          label: 'Claude Code',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Claude Code 知识库`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'claude-code-kb',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;