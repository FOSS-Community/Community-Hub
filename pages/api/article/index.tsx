import { TypeDocsMetaData } from "#/types/TypeDocsMetadata";
import fs from "fs";
import glob from "glob-promise";
import matter from "gray-matter";
import { join } from "path";

interface HeadingsProps {
  text: string;
  level: number;
  id: string;
}

export interface FoldersProps {
  name?: string;
  filename?: string;
  type?: "directory" | "file";
  path?: string;
  truePath?: string;
  extension?: string;
  children?: object[] | object;
  headings?: HeadingsProps[];
  metadata?: any;
  content?: string;
}

const basePath = join(process.cwd(), "_posts");

function replaceDuplicates(names: string[]) {
  // Store the frequency of strings
  var hash = new Map();

  // Iterate over the array
  for (var i = 0; i < names.length; i++) {
    // For the first occurrence,
    // update the frequency count
    if (!hash.has(names[i])) hash.set(names[i], 1);
    // Otherwise
    else {
      var count = hash.get(names[i]);
      hash.set(names[i], hash.get(names[i]) + 1);
      // Append frequency count
      // to end of the string
      names[i] += "-" + count.toString();
    }
  }

  // Print the modified array
  return names;
}

async function getHeadings(source: any) {
  const headingLines = source.split("\n").filter((line: any) => {
    return line.match(/#{1,6}\s/);
  });

  let idArray = headingLines.map((raw: any) => {
    const text = raw.replace(/#{1,3}\s/, "");
    const id = text
      .toLowerCase()
      .trim()
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "");

    return id;
  });

  idArray = await replaceDuplicates(idArray);

  return headingLines.map((raw: any, index: number) => {
    const text = raw.replace(/#{1,3}\s/, "");
    const level = raw.split(" ")[0].lastIndexOf("#") + 1;
    const id = idArray[index];

    return { text, level, id };
  });
}

async function getFile(path: string): Promise<string> {
  const files: string[] = [];

  await glob(join(basePath, path).replace(/\\/g, "/")).then((matches) => {
    files.push(...matches);
  });

  return files[0];
}

async function getFileContent(path: string): Promise<FoldersProps> {
  const fileContents = fs.readFileSync(path, "utf8");
  const { data, content } = matter(fileContents);

  let name = path.split("/");
  let name_string = name[name.length - 1].replace(/\.[^\/.]+$/, "");

  return {
    name: name_string,
    headings: await getHeadings(content),
    truePath: path,
    path: path
      .replace(basePath.replace(/\\/g, "/"), "")
      .replace(/\.[^\/.]+$/, ""),
    extension: path.split(".").pop(),
    content: content,
    metadata: data as TypeDocsMetaData,
  };
}

async function getDirectoryTree(
  path: string,
  meta: boolean = true
): Promise<FoldersProps[] | FoldersProps> {
  const tree: FoldersProps[] = [];
  let items: string[] = [];
  const truePath = join(basePath, path);

  try {
    items = await fs.readdirSync(truePath);
  } catch (err) {
    console.log(truePath);
    return [];
  }

  for (let i = 0; i < items.length; i++) {
    const itemPath = `${path}/${items[i]}`;
    const stats = fs.statSync(`${truePath}/${items[i]}`);
    const newPath = itemPath
      .replace(basePath + "/", "")
      .replace(/\\/g, "/")
      .replace(/\.[^\/.]+$/, "");

    const newTruePath = itemPath
      .replace(basePath + "/", "")
      .replace(/\\/g, "/");

    if (stats.isDirectory()) {
      let data;

      try {
        let temp = fs.readFileSync(
          `${truePath}/${items[i]}/define.json`,
          "utf8"
        );
        data = JSON.parse(temp);
      } catch (err) {
        data = {};
      }

      tree.push({
        name: items[i].replace(/\.[^\/.]+$/, ""),
        filename: items[i],
        type: "directory",
        path: newPath[0] == "/" ? newPath : `/${newPath}`,
        truePath: newTruePath[0] == "/" ? newTruePath : `/${newTruePath}`,
        metadata: data,
        children: await getDirectoryTree(itemPath, false),
      });
    } else if (stats.isFile()) {
      if (!path.includes("/") && items[i].includes("index")) continue;
      if (items[i].includes("define")) continue;
      const fileContents = fs.readFileSync(`${truePath}/${items[i]}`, "utf8");
      const { data, content } = matter(fileContents);

      tree.push({
        name: items[i].replace(/\.[^\/.]+$/, ""),
        filename: items[i],
        type: "file",
        path: newPath[0] == "/" ? newPath : `/${newPath}`,
        truePath: newTruePath[0] == "/" ? newTruePath : `/${newTruePath}`,
        extension: path.split(".").pop(),
        headings: await getHeadings(content),
        metadata: data as TypeDocsMetaData,
      });
    }
  }

  if (meta && path) {
    let data;

    try {
      let temp = fs.readFileSync(`${truePath}/define.json`, "utf8");
      data = JSON.parse(temp);
    } catch (err) {
      data = {};
    }

    const treeParent: FoldersProps = {
      name: path.substring(path.lastIndexOf("/") + 1),
      filename: path.substring(path.lastIndexOf("/") + 1),
      type: "directory",
      path: path[0] == "/" ? path : `/${path}`,
      truePath: truePath
        .replace(basePath + "/", "")
        .replace(/\\/g, "/")
        .replace(/\.[^\/.]+$/, ""),
      metadata: data,
      children: tree,
    };

    return treeParent;
  }

  return tree;
}

export async function getPostSlugs(path: string = "") {
  let file = "";

  if (path) {
    file = await getFile(`${path}.*`);
    if (file && file.includes(".md")) {
      return await getFileContent(file);
    }
  }

  return getDirectoryTree(path);
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  return slugs;
}

export default async function handler(req: any, res: any) {
  res.status(200).json(await getAllPosts());
}
