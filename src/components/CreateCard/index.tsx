import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useRouter } from "next/router";
import { useContext } from "react";
import InfoContext from "@/context/InfoContext";
import { api } from "@/pages/api";
import { parseCookies } from "nookies";

export default function CreateCard() {
    const CreatePostSchema = z.object({
        title: z.string().nonempty("Title is required"),
        content: z.string().nonempty("Title is required"),
    });

    type CreatePostFormData = z.infer<typeof CreatePostSchema>;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty },
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(CreatePostSchema),
    });

    const { setIsLoading } = useContext(InfoContext);
    const { ["@usernamePost"]: username } = parseCookies();

    async function createPost(data: CreatePostFormData) {
        const dateNow = new Date().toISOString();
        setIsLoading(true);
        try {
            await fetch(api, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    created_datetime: dateNow,
                    title: data.title,
                    content: data.content,
                }),
            });
        } catch (e) {
            console.log(e);
        }
        setValue("title", "");
        setValue("content", "");
        setIsLoading(false);
    }

    const { push } = useRouter();

    return (
        <form
            className="border bg-white w-full rounded-2xl p-6"
            onSubmit={handleSubmit(createPost)}
        >
            <h2 className="font-bold text-2xl mb-3">What’s on your mind?</h2>
            <div className="flex flex-col gap-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-base font-medium text-gray-700 mb-1"
                    >
                        Title
                    </label>
                    <div>
                        <input
                            {...register("title")}
                            id="title"
                            type="text"
                            autoComplete="title"
                            placeholder="Hello world"
                            className="appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {errors.title && (
                        <span className="text-red-600">
                            {errors.title.message}
                        </span>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="content"
                        className="block text-base font-medium text-gray-700 mb-1"
                    >
                        Content
                    </label>
                    <div>
                        <textarea
                            {...register("content")}
                            className="appearance-none resize-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="content"
                            placeholder="Content"
                            rows={4}
                        />
                    </div>
                    {errors.content && (
                        <span className="text-red-600">
                            {errors.content.message}
                        </span>
                    )}
                </div>
            </div>
            <div className="pt-4 flex justify-end w-full">
                <PrimaryButton
                    title="CREATE"
                    disabled={!isDirty || Boolean(Object.keys(errors).length)}
                    onClick={() => push("/posts")}
                />
            </div>
        </form>
    );
}
