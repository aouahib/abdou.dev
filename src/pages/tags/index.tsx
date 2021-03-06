import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import tags, { Tag } from "../../../data/tags/tags";
import SocialSharePreview from "../../components/social-share-preview";
import { getAllArticles } from "../../lib/blog";

type CountedTag = Tag & { postCount: number };

type AllTagsProps = {
  tags: CountedTag[];
};

const AllTags = ({ tags }: AllTagsProps) => {
  const title = "Tags | Abdou Ouahib";
  const description =
    "Here are all the tags used throughout the blog. They help group articles into categories";

  return (
    <div className="w-full max-w-screen-lg mx-1 sm:mx-2">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <SocialSharePreview
        image="/static/images/social-share-preview/tags.png"
        title={title}
        description={description}
      />
      <header>
        <h1
          className="text-markup-h1 text-black dark:text-white font-extrabold
            mx-2 my-4"
        >
          All tags
        </h1>
      </header>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 mx-auto gap-1">
        {tags.map((tag) => (
          <Link href={`/tags/${tag.name}`} key={`tag_${tag.name}`}>
            <div
              className="flex flex-col w-full rounded py-1 px-2 cursor-pointer"
              style={{ backgroundColor: tag.bgColor, color: tag.color }}
            >
              <a className="text-4xl" href={`/tags/${tag.name}`}>
                <span className="opacity-40">#</span>
                {tag.name}
              </a>
              <div className="opacity-80">{tag.postCount} posts</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<AllTagsProps> = async () => {
  const countedTags: { [name: string]: CountedTag } = {};
  for (const name of Object.keys(tags))
    countedTags[name] = { ...tags[name], postCount: 0 };
  getAllArticles().forEach((article) => {
    for (const tagName of article.meta.tags) {
      countedTags[tagName].postCount++;
    }
  });
  return {
    props: {
      tags: Object.keys(countedTags).map((key) => countedTags[key]),
    },
  };
};

export default AllTags;
