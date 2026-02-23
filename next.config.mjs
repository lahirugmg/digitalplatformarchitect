import createMDX from '@next/mdx';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Avoid build failures due to slow static generation on content-heavy pages
  staticPageGenerationTimeout: 120,
  // Enable Turbopack (default in Next.js 16)
  turbopack: {},
  async redirects() {
    return [
      {
        source: '/tools/apim-capacity-planner',
        destination: '/tools/capacity-planner',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight, rehypeSlug],
  },
});

export default withMDX(nextConfig);
