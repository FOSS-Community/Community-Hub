import type { NextApiRequest, NextApiResponse } from "next";
import { getPostSlugs } from ".";

export const getCertainPost = async (query: string) => {
  const slugs = await getPostSlugs(query);
  return slugs;
};

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { slug },
  } = req;
  res.status(200).json(await getCertainPost((slug as string[]).join("/")));
}
