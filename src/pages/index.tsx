import Head from "next/head";
import ArticleItem from "../components/article-item";
import {Article, getAllArticles} from "../lib/blog";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import Link from "next/link";

const Home = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col w-full max-w-4xl">
      <div
        className="relative flex flex-col md:items-center
          w-full mt-10 md:mt-16 p-4 bg-white dark:bg-knight"
      >
        <Head>
          <title>Abdou Ouahib | Software Engineer 🚀</title>
          <meta
            name="description"
            content="A type-safe software engineer and tech writer, building
            apps by day, playing chess by night. I work mainly with React
            and Next.js, but can Flutter just as good."
          />
          <meta
            name="keywords"
            content="software engineer, software developer, web developer,
            mobile developer, portfolio, blog, React, Next.js, Flutter, GraphQL"
          />
        </Head>
        <img
          className="absolute rounded-full
            -top-8 md:-top-14 md:right-1/2
            transform translate-x-4 md:translate-x-16
            w-16 h-16 md:w-32 md:h-32
            border-black border-4 md:border-8"
          src={"/static/images/avatar.png"}
          alt="Avatar"
        />
        <h1
          className="mt-8 md:mt-16 text-black dark:text-white text-3xl font-bold
            mb-2"
        >
          Abdou Ouahib
        </h1>
        <p className="text-black dark:text-gray-200 mb-2">
          Type-safe Software Developer 🚀 Tech Writer ✍️
        </p>
        <div className="flex flex-wrap">
          <HeaderLink icon="fa fa-map-marker" label="Morocco"/>
          <HeaderLink
            icon="fa fa-github"
            label="GitHub"
            href="https://github.com/aouahib"
          />
          <HeaderLink
            icon="fa fa-twitter"
            label="Twitter"
            href="https://twitter.com/AbdoOuahib"
          />
          <HeaderLink
            icon="fa fa-linkedin"
            label="LinkedIn"
            href="https://www.linkedin.com/in/abdou-ouahib-1350b4196/"
          />
        </div>
      </div>
      <div className="flex flex-col bg-white dark:bg-knight mt-12 mb-12
        divide-y divide-solid divide-black divide-opacity-10
        dark:divide-white dark:divide-opacity-10"
      >
        <div className="flex items-center justify-between py-3 px-4">
          <h2
            className="text-black dark:text-white text-2xl font-bold "
          >
            Recent articles
          </h2>
          <Link href={"/blog"}>
            <a className="hidden sm:inline text-gray-500 dark:text-gray-400
             hover:text-mineta-dark dark:hover:text-mineta">
              Show more
            </a>
          </Link>
        </div>
        {
          props.articles.map(article => (
            <ArticleItem article={article} key={article.slug}/>
          ))
        }
        <Link href={"/blog"}>
          <a className="sm:hidden p-4 text-center
            text-gray-500 dark:text-gray-400
            hover:text-mineta-dark dark:hover:text-mineta"
          >
            Show more
          </a>
        </Link>
      </div>
    </div>
  );
};

type HeaderLinkProps = {
  icon: string,
  href?: string,
  label?: string,
};

const HeaderLink = (props: HeaderLinkProps) => {
  return (
    <a
      className={`flex items-center
        text-sm text-gray-500 dark:text-gray-400 
        ${props.href && "hover:text-mineta-dark dark:hover:text-mineta"}
        pr-8 pt-2 pb-2`}
      href={props.href}
      target="_blank"
    >
      <i className={`${props.icon} mr-2 text-2xl`}/>
      {props.label}
    </a>
  );
};

export const getStaticProps: GetStaticProps<{ articles: Article["meta"][] }> = async () => {
  const articles = getAllArticles().slice(0, 2);
  return {
    props: {articles: articles.map(a => a.meta)}
  };
};

export default Home;