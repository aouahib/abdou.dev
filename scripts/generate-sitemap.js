const globby = require("globby");
const {writeFileSync} = require("fs");
const prettier = require("prettier");

const tags = {
  typescript: {
    name: "typescript",
    color: "#ffffff",
    bgColor: "#234A84",
  },
  javascript: {
    name: "javascript",
    color: "#000000",
    bgColor: "#F7DF1E",
  },
  react: {
    name: "react",
    color: "#61DAF6",
    bgColor: "#222222",
  },
  redux: {
    name: "redux",
    color: "#ffffff",
    bgColor: "#764ABC",
  },
  nextjs: {
    name: "nextjs",
    color: "#ffffff",
    bgColor: "#000000",
  },
  graphql: {
    name: "graphql",
    color: "#ff5bc8",
    bgColor: "#171e26",
  },
  testing: {
    name: "testing",
    color: "#ffffff",
    bgColor: "#019b65",
  },
  flutter: {
    name: "flutter",
    color: "#2B3A48",
    bgColor: "#56C5F6",
  },
  dart: {
    name: "dart",
    color: "#03589C",
    bgColor: "#41C4FF",
  }
};

const baseUrl = "https://abdou.dev";

const wrap = (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
      </url>
`;

const generateSitemap = async () => {
  const pages = await globby([
    "src/pages/**/*.tsx",
    "!src/pages/**/_*.tsx",
    "!src/pages/**/[*.tsx",
    "data/blog",
    "data/projects"
  ]);
  let urls = pages.map(page => {
    let path = page
      .replace(".tsx", "")
      .replace(".md", "");
    if (path.startsWith("src/pages/")) {
      path = path.replace("src/pages", "");
    } else if (path.startsWith("data/blog/")) {
      path = path.replace("data/blog", "/blog");
    } else if (path.startsWith("data/projects/")) {
      path = path.replace("data/blog", "/projects");
    }
    if (path.endsWith("/index"))
      path = path.replace("/index", "");
    return wrap(path);
  });
  urls = [
    ...urls,
    ...Object.keys(tags).map(tag => wrap(`/tags/${tag}`))
  ];
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("")}    
    </urlset>
    `;
  const formatted = prettier.format(sitemap, {parser: "html"});
  writeFileSync("public/sitemap.xml", formatted);
};

void generateSitemap();