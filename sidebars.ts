import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Sidebar configuration for Tempest Rift Wiki
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome to the Rift',
    },
    {
      type: 'category',
      label: 'Universe Mechanics',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'universe/storm-rivers',
          label: 'Storm-Rivers',
        },
        {
          type: 'doc',
          id: 'universe/gravitational-shear',
          label: 'Gravitational Shear',
        },
        {
          type: 'doc',
          id: 'universe/the-drift',
          label: 'The Drift',
        },
        {
          type: 'doc',
          id: 'universe/trade-and-commerce',
          label: 'Trade & Commerce',
        },
        {
          type: 'doc',
          id: 'universe/life-on-the-planets',
          label: 'Planetary Life',
        },
      ],
    },
    {
      type: 'category',
      label: 'The World',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'overview',
          label: 'Overview of the Rift',
        },
        {
          type: 'doc',
          id: 'environment',
          label: 'Environment',
        },
        {
          type: 'doc',
          id: 'civilization',
          label: 'Civilizations',
        },
      ],
    },
    {
      type: 'category',
      label: 'Culture & Lore',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'culture-belief',
          label: 'Culture & Belief Systems',
        },
        {
          type: 'doc',
          id: 'themes',
          label: 'Themes & Philosophy',
        },
      ],
    },
    {
      type: 'category',
      label: 'Locations',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'locations/beacon-station-prime',
          label: 'Beacon Station Prime',
        },
      ],
    },
    {
      type: 'category',
      label: 'Adventures',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'story-hooks',
          label: 'Story Hooks & Adventures',
        },
      ],
    },
  ],
};

export default sidebars;