import MainArea from "@/components/MainArea";
import SignUpCard from "@/components/SignUpCard";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { Post } from "@/types/Post";

interface HomeProps {
    posts: { results: Post[] };
}

export default function Home({ posts: { results } }: HomeProps) {
    const [hasName, setHasName] = useState(true);
    return (
        <div>
            {hasName ? (
                <MainArea posts={results} />
            ) : (
                <div className="flex justify-center items-center h-full">
                    <SignUpCard />
                </div>
            )}
        </div>
    );
}

export const getStaticProps: GetServerSideProps<HomeProps> = async () => {
    const response = await fetch("https://dev.codeleap.co.uk/careers/");
    const posts = await response.json();
    return {
        props: { posts },
    };
};
