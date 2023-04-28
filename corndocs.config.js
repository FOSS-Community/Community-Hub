/** @type {import('./types/ConfigType').Config} */

module.exports = {
  darkMode: true,
  search: {
    algolia_admin_key: process.env.ALGOLIA_SEARCH_ADMIN_KEY,
    algolia_app_id: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    algolia_search_api_key: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
    algolia_index: "dev_corndocs",
  },
  project: {
    name: "CornDocs",
    url: "https://www.corndocs.com",
    github: {
      repo: "https://github.com/dishwasher-detergent/CornDocs",
      usesMain: false,
    },
    logo: {
      src: "/static/logo.svg",
      alt: "CornDocs Logo",
      size: [80, 40],
    },
    mainScreen: {
      showSearch: true,
      showSelection: true,
      homePage: {
        custom: {
          path: "index",
        },
        title: "Build documentation that will impress your friends and family.",
        tagLine:
          "CornDocs lets you easily create documentation to show off your projects!",
      },
    },
  },
};
