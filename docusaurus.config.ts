import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Tempest Rift Wiki',
  tagline: 'Where atmospheres become oceans, and storms forge the paths between worlds',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://lighthouse.ked.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'KyleEdwardDonaldson', // Usually your GitHub org/user name.
  projectName: 'Lighthouse', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false, // Disable blog feature
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/tempest-rift-social.jpg',
    navbar: {
      title: 'Tempest Rift',
      logo: {
        alt: 'Tempest Rift Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Wiki',
        },
        {
          to: 'overview',
          label: 'World',
          position: 'left',
        },
        {
          to: 'story-hooks',
          label: 'Adventures',
          position: 'left',
        },
        {
          to: 'locations/beacon-station-prime',
          label: 'Locations',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'World',
          items: [
            {
              label: 'Overview',
              href: '/overview',
            },
            {
              label: 'Environment',
              href: '/environment',
            },
            {
              label: 'Civilizations',
              href: '/civilization',
            },
          ],
        },
        {
          title: 'Lore',
          items: [
            {
              label: 'Culture & Belief',
              href: '/culture-belief',
            },
            {
              label: 'Themes',
              href: '/themes',
            },
            {
              label: 'Story Hooks',
              href: '/story-hooks',
            },
          ],
        },
      ],
      copyright: `⚡ The storms remember. The rivers know. © ${new Date().getFullYear()} Tempest Rift Wiki`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
