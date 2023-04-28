/**
 * The remark plugin for supporting custom image width and height
 * @author dishwasher-detergent
 */

import { visit } from "unist-util-visit";

export default function setImageDimensions() {
  return function (node: any) {
    visit(node, "image", (node) => {
      let matched = node.alt.match(
        /(width: (\d+|auto), height: (\d+|auto)(, object-fit: (cover|contain))?)/
      );
      node.alt = node.alt.replace(/\(([^)]+)\)/, "").trim();

      if (matched) {
        let dimensions = matched[1];
        if (!!dimensions.length) {
          if (!node.data) {
            node.data = {};
          }
          if (!node.data.hProperties) {
            node.data.hProperties = {};
          }

          dimensions.replace("/[()]/g");

          let dims = "";

          dimensions.split(",").forEach((dimension: string) => {
            let [key, value] = dimension.replace(/ /g, "").split(":");
            dims += `${key}:${!isNaN(Number(value)) ? value + "px" : value};`;
          });

          node.data.style = node.data.hProperties.style = dims;
        }
      }
    });
  };
}
