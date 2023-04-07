import { Post } from "@/types/Post";
import CreateCard from "../CreateCard";
import ReadonlyCard from "../ReadonlyCard";

interface IMainArea {
    posts: Post[];
}

export default function MainArea({ posts }: IMainArea) {
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
                {posts &&
                    posts.map((post) => (
                        <ReadonlyCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            author={post.username}
                            time={post.created_datetime}
                            content={post.content}
                        />
                    ))}
            </section>
        </main>
    );
}
