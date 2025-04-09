/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://misiknote.com',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*'],
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  outDir: './public',
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path.startsWith('/restaurant') ? 0.8 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/restaurant_reviews?select=id,restaurant_id&status=eq.active`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });

    const data = await res.json();

    const restaurantIds = new Set();

    const paths = data.flatMap((item) => {
      restaurantIds.add(item.restaurant_id);
      return [
        {
          loc: `/restaurant/${item.restaurant_id}/review/${item.id}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        },
      ];
    });

    // 각 식당별 리뷰 리스트 페이지 추가
    const reviewListPaths = Array.from(restaurantIds).map((restaurantId) => ({
      loc: `/restaurant/${restaurantId}/review`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));

    return [...paths, ...reviewListPaths];
  },
};
