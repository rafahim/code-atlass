import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generates a fully static website in /out for GitHub Pages.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // The GitHub Actions workflow sets BASE_PATH for project repositories.
  // Leave it empty when using a custom domain or username.github.io repository.
  basePath: process.env.BASE_PATH || "",
  // Expose the same prefix to static HTML/PDF download links.
  env: { NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH || "" },
};

export default nextConfig;
