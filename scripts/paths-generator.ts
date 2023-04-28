import fs from "fs";
import { join } from "path";

const basePath = join(process.cwd(), "_posts").replace(/\\/g, "/");

export interface FoldersProps {
  params: {
    slug: string[] | string;
  };
}

const paths: FoldersProps[] = [];

async function getDirectoryTree(path: string = "") {
  let items: string[] = [];
  const truePath = join(basePath, path);

  try {
    items = await fs.readdirSync(truePath);
  } catch (err) {
    throw new Error(`Error reading directory at path: ${path}`);
  }

  for (let i = 0; i < items.length; i++) {
    const itemPath = `${path}/${items[i]}`;
    const newPath = itemPath
      .replace(basePath + "/", "")
      .replace(/\\/g, "/")
      .replace(/\.[^\/.]+$/, "")
      .slice(1);

    const splitPath = newPath.includes("/") ? newPath.split("/") : [newPath];

    const stats = fs.statSync(`${truePath}/${items[i]}`);

    if (stats.isFile()) {
      if (!path.includes("/") && items[i].includes("index")) continue;
      if (items[i].includes("define")) continue;
    }

    paths.push({
      params: {
        slug: splitPath,
      },
    });

    if (stats.isDirectory()) {
      await getDirectoryTree(itemPath);
    }
  }
}

export async function getPostSlugs() {
  const path = "";
  await getDirectoryTree(path);

  return paths;
}
