import CreateCard from "@/components/CreateCard";
import ReadonlyCard from "@/components/ReadonlyCard";
import InfoContext from "@/context/InfoContext";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { api } from "../api";
import { HomeProps } from "@/types/Home";
import { parseCookies } from "nookies";

export default function MainArea({ posts: { results } }: HomeProps) {
    const { isLoading, setIsLoading } = useContext(InfoContext);

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return (
        <main className="h-full mx-auto max-w-3xl bg-white">
            <div className="bg-primary w-full h-20 flex items-center">
                <h1 className="text-white font-bold text-2xl px-9">
                    CodeLeap Network
                </h1>
            </div>
            <section className="w-full p-6">
                <CreateCard />
            </section>

            <section className="w-full p-6 space-y-9">
                {isLoading ? (
                    <div className="text-primary flex flex-col items-center gap-3">
                        <FaSpinner className="animate-spin" size={28} />
                        <p>Carregando...</p>
                    </div>
                ) : (
                    <>
                        {results &&
                            results.map((post, index) => (
                                <ReadonlyCard
                                    key={index}
                                    id={post.id}
                                    title={post.title}
                                    author={post.username}
                                    time={post.created_datetime}
                                    content={post.content}
                                />
                            ))}
                    </>
                )}
            </section>
        </main>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ["@usernamePost"]: username } = parseCookies(ctx);
    const response = await fetch(api);
    const posts = await response.json();

    if (!username) {
        return {
            redirect: { destination: "/", permanent: false },
        };
    }

    return {
        props: { posts },
    };
    revalidade: 5;
};
