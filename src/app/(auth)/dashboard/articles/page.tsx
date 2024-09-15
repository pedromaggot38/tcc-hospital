import ArticlesTable from "@/components/dashboard/articlesTable"

const News = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-6xl px-4">
                <ArticlesTable />
            </div>
        </div>
    )
}

export default News