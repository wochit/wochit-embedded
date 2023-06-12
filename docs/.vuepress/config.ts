export default {
  // base: '/wochit-embedded/',
  themeConfig: {
    displayAllHeaders: true, // Default: false
    sidebar: [
      '/',
      ['/authentication', 'User Authentication'],
      ['/embed', 'Embed Your Video Editor'],
      ['/webhook', 'Listen to A Webhook'],
      ['/api', 'API Reference'],
    ],
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'wochit/wochit-embedded',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
  },
  lang: 'en-US',
  title: 'Wochit Documentation',
};
