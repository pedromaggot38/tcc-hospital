import { db } from "@/lib/db";
export async function fetchDashboardData() {
  const articlesCount = await db.article.count();
  const usersCount = await db.user.count();
  return {
    articlesCount,
    usersCount,
  };
}
