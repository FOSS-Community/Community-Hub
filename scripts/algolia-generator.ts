import algoliasearch from "algoliasearch/lite.js";
import dotenv from "dotenv";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import corndocsConfig from "../corndocs.config.js";

interface HeadingsProps {
  text: string;
  level: number;
}

export interface FoldersProps {
  objectID?: string;
  type?: "directory" | "file";
  path?: string;
  title?: string;
  headings?: HeadingsProps[];
  slug?: string;
  description?: string;
}

const basePath = join(process.cwd(), "_posts").replace(/\\/g, "/");

const algoliaPosts: FoldersProps[] = [];

async function getHeadings(source: any) {
  const headingLines = source.split("\n").filter((line: any) => {
    return line.match(/^###*\s/);
  });

  return headingLines.map((raw: any) => {
    const text = raw.replace(/^###*\s/, "");
    const level = raw.split(" ")[0].lastIndexOf("#") + 1;

    return { text, level };
  });
}

async function getDirectoryTree(path: string) {
  let items: string[] = [];
  const truePath = join(basePath, path);

  try {
    items = await fs.readdirSync(truePath);
  } catch (err) {
    throw new Error(`Error reading directory at path: ${path}`);
  }

  for (let i = 0; i < items.length; i++) {
    const itemPath = `${path}/${items[i]}`;
    const stats = fs.statSync(`${truePath}/${items[i]}`);
    if (stats.isDirectory()) {
      let data;

      try {
        let temp = fs.readFileSync(
          `${truePath}/${items[i]}/define.json`,
          "utf8"
        );
        data = JSON.parse(temp);
      } catch (err) {
        data = { title: items[i].replace(/\.[^\/.]+$/, "") };
      }

      algoliaPosts.push({
        path: itemPath
          .replace(basePath + "/", "")
          .replace(/\\/g, "/")
          .replace(/\.[^\/.]+$/, ""),
        title: data.title,
      });

      await getDirectoryTree(itemPath);
    } else if (stats.isFile()) {
      if (!path.includes("/") && items[i].includes("index")) continue;
      if (items[i].includes("define")) continue;
      const fileContents = fs.readFileSync(`${truePath}/${items[i]}`, "utf8");
      const { data, content } = matter(fileContents);

      algoliaPosts.push({
        path: itemPath
          .replace(basePath + "/", "")
          .replace(/\\/g, "/")
          .replace(/\.[^\/.]+$/, ""),
        slug: items[i].replace(/\.[^\/.]+$/, ""),
        title: data.title,
        description: data.description,
        headings: await getHeadings(content),
      });
    }
  }
}

export async function getPostSlugs() {
  const path = "";
  return getDirectoryTree(path);
}

(async function () {
  try {
    dotenv.config();

    await getPostSlugs();

    if (
      corndocsConfig.search &&
      corndocsConfig.search.algolia_index &&
      corndocsConfig.search.algolia_app_id &&
      corndocsConfig.search.algolia_admin_key &&
      corndocsConfig.search.algolia_search_api_key
    ) {
      const client = algoliasearch(
        corndocsConfig.search.algolia_app_id,
        corndocsConfig.search.algolia_admin_key
      );

      const index = client.initIndex(corndocsConfig.search.algolia_index);

      // @ts-ignore
      await index.clearObjects();

      console.log("🗑️  Deleting records from Algolia search...");

      // @ts-ignore
      const algoliaResponse = await index.saveObjects(algoliaPosts, {
        autoGenerateObjectIDIfNotExist: true,
      });

      console.log(
        `🎉 Sucessfully added ${
          algoliaResponse.objectIDs.length
        } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
          "\n"
        )}`
      );
    } else {
      console.log(
        "⚠️ Algolia config not found. Please check your corndocs.config.js file."
      );
    }
  } catch (error) {
    console.log(error);
  }
})();
