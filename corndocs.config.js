/** @type {import('./types/ConfigType').Config} */

module.exports = {
  darkMode: true,
  search: {
    algolia_admin_key: process.env.ALGOLIA_SEARCH_ADMIN_KEY,
    algolia_app_id: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    algolia_search_api_key: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    algolia_index: "dev_fosscu",
  },
  project: {
    name: "FOSSCU",
    url: "https://docs.fosscu.org",
    github: {
      repo: "https://github.com/foss-community/community-hub/",
      usesMain: false,
    },
    logo: {
      src: "/static/logo.svg",
      alt: "FOSSCU Logo",
      size: [30, 30],
    },
    mainScreen: {
      showSearch: true,
      showSelection: true,
      homePage: {
        custom: {
          path: "index",
        },
        title: "FOSSCU Community Hub",
        tagLine:
          "Collaborate, Learn, Build Together",
      },
    },
  },
};
