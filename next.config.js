/** @type {import('next').NextConfig} */
const basePath = process.env.GITHUB_PAGES === "true" ? "/NextTimeUseSlack" : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

module.exports = nextConfig;
