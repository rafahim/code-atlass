import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION, BASE_PATH } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — বাংলায় Programming শেখো`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: `${BASE_PATH}/`,
    scope: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#fbfbfd",
    theme_color: "#101629",
    lang: "bn",
    icons: [
      { src: `${BASE_PATH}/icon.svg`, sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: `${BASE_PATH}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}
