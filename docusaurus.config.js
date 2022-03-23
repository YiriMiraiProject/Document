const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'YiriMirai',
  tagline: '一个轻量级、低耦合的基于 mirai-api-http 的 Python SDK。',
  url: 'https://yiri-mirai.wybxc.cc',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'YiriMiraiProject',
  projectName: 'YiriMirai',
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
    localeConfigs: {
      'zh-CN': {
        label: '简体中文',
        direction: 'ltr',
      },
    },
  },
  themeConfig: {
    navbar: {
      title: 'YiriMirai',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: '文档',
          position: 'left',
          type: 'doc',
          docId: 'intro',
        },
        {
          label: '教程',
          position: 'left',
          type: 'doc',
          docId: 'intro',
          docsPluginId: 'tutorials',
        },
        {
          to: '/blog',
          label: '博客',
          position: 'left',
        },
        {
          href: 'https://yirimiraiproject.github.io/YiriMirai',
          label: 'API 文档',
          position: 'left',
        },
        {
          href: 'https://github.com/YiriMiraiProject/YiriMirai',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '文档',
              to: '/docs/intro',
            },
            {
              label: '教程',
              to: '/tutorials/intro',
            },
            {
              href: 'https://yirimiraiproject.github.io/YiriMirai',
              label: 'API 文档',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'QQ 群：766952599',
              href: 'https://jq.qq.com/?_wv=1027&k=PXBOuBCI',
            },
            {
              label: 'Github Discussion',
              href: 'https://github.com/YiriMiraiProject/YiriMirai/discussions',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/RaXsHFC3PH',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '博客',
              to: '/blog',
            },
            {
              label: '国内地址',
              href: 'https://yiri-mirai.wybxc.cc',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/YiriMiraiProject/YiriMirai',
            },
          ],
        },
        {
          title: '友情链接',
          items: [
            {
              label: 'Graiax 社区',
              href: 'https://graiax.cn/',
            },
            {
              label: '冰月API',
              href: 'http://by1106.bingyue.xyz',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} YiriMiraiProject，由 Docusaurus 2 构建。`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    algolia: {
      appId: 'YOUR_APP_ID',
      // Public API key: it is safe to commit it
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',
      // Optional: Algolia search parameters
      searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/YiriMiraiProject/YiriMirai/edit/doc/',
          remarkPlugins: [require('mdx-mermaid')],
        },
        blog: {
          blogTitle: '博客',
          blogDescription: 'YiriMirai 的开发笔记，以及其他。',
          blogSidebarCount: 5,
          blogSidebarTitle: '最近的博文',
          showReadingTime: false,
          editUrl: 'https://github.com/YiriMiraiProject/Document/edit/blog/',
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        gtag: {
          trackingID: 'G-L0N9H6KGGW',
          anonymizeIP: true, // Should IPs be anonymized?
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorials',
        path: 'tutorials',
        routeBasePath: 'tutorials',
        editUrl: 'https://github.com/YiriMiraiProject/YiriMirai/edit/doc/',
      },
    ],
  ],
};
