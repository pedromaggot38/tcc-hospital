import { subDays } from 'date-fns';
import { db } from "@/lib/db";

export async function fetchDashboardData() {
  const sevenDaysAgo = subDays(new Date(), 7);

  try {
    const articlesCount = await db.article.count();
    const usersCount = await db.user.count();

    const publishedArticlesCount = await db.article.count({
      where: {
        published: true,
      },
    });

    const recentArticlesCountLast7Days = await db.article.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    return {
      articlesCount,
      usersCount,
      publishedArticlesCount,
      recentArticlesCountLast7Days,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}
