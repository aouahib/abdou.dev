import Link from "next/link";
import { ArticleMeta } from "../lib/blog";
import DateReadingTimeViews from "./date-reading-time-views";

type ArticleItemProps = {
  article: ArticleMeta;
};

const ArticleItem = (props: ArticleItemProps) => {
  const { title, summary, tags, slug } = props.article;

  return (
    <div className="px-4 py-3 bg-white dark:bg-knight rounded">
      <h3
        className="text-black dark:text-white text-2xl font-bold
          hover:text-mineta-dark dark:hover:text-mineta"
      >
        <Link href={`/blog/${slug}`}>{title}</Link>
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{summary}</p>
      <div
        className="flex flex-wrap items-center
          text-gray-500 dark:text-gray-400"
      >
        {tags.map((tag) => (
          <span
            className="mr-1 mb-1 hover:text-black dark:hover:text-white"
            key={tag}
          >
            <Link href={`/tags/${tag}`}>{`#${tag}`}</Link>
          </span>
        ))}
        <div
          className="flex grow justify-end mb-1
            text-gray-500 dark:text-gray-400 text-right text-xs"
        >
          <DateReadingTimeViews article={props.article} />
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
