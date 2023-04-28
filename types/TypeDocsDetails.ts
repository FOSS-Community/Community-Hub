import { TypeDocsMetaData } from "./TypeDocsMetadata";

export interface TypeDocsDetails {
  path: string;
  name: string;
  children: any[];
  type: "file" | "directory";
  custom: {
    content: string;
    data: TypeDocsMetaData;
    slug: string;
    path: string;
  };
}
