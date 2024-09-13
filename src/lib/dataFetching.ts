import { db } from "@/lib/db";

export async function fetchDashboardData() {
  try {
    const articlesCount = await db.article.count();
    const usersCount = await db.user.count();
    return {
      articlesCount,
      usersCount,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw new Error("Failed to fetch dashboard data");
  }
}
