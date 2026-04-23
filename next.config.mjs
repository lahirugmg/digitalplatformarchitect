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
    const toDesign = '/playgrounds/system-design-framework';
    const toValidate = '/playgrounds/production-readiness';
    return [
      {
        source: '/tools/apim-capacity-planner',
        destination: '/tools/capacity-planner',
        permanent: true,
      },
      { source: '/patterns', destination: toDesign, permanent: true },
      { source: '/patterns/:path*', destination: toDesign, permanent: true },
      { source: '/blocks', destination: toDesign, permanent: true },
      { source: '/blocks/:path*', destination: toDesign, permanent: true },
      { source: '/articles', destination: toDesign, permanent: true },
      { source: '/articles/:path*', destination: toDesign, permanent: true },
      { source: '/progress', destination: toDesign, permanent: true },
      { source: '/vault', destination: toDesign, permanent: true },
      { source: '/skill-tree', destination: toDesign, permanent: true },
      { source: '/readiness', destination: toValidate, permanent: true },
      { source: '/operational-sympathy', destination: toValidate, permanent: true },
      { source: '/service-mesh', destination: toDesign, permanent: true },
      { source: '/ai-capability-matrix', destination: toDesign, permanent: true },
      { source: '/solution', destination: toDesign, permanent: true },
      { source: '/architecture-map', destination: '/blueprints', permanent: true },
      {
        source: '/capacity-planning',
        destination: '/playgrounds/capacity-planning',
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
