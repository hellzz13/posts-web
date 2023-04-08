import { ReactNode, useEffect, useState } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecundaryButton";
import { api } from "@/pages/api";
import { Post } from "@/types/Post";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type ActionModalProps = {
    type: "success" | "delete";
    title: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    action: (data: {
        id: number;
        title: string;
        content: string;
    }) => Promise<void>;
    postId: number;
    children?: ReactNode;
    redirectModal?: boolean;
    link?: string;
    setIsQuickViewOpen?: (isOpen: boolean) => void;
};

export const EditModal = ({
    type,
    isOpen,
    setIsOpen,
    action,
    postId,
}: ActionModalProps) => {
    const completeButtonRef = useRef(null);

    const [post, setPost] = useState<Post>();

    const CreatePostSchema = z.object({
        id: z.number(),
        title: z.string().nonempty("Title is required"),
        content: z.string().nonempty("Title is required"),
    });

    type CreatePostFormData = z.infer<typeof CreatePostSchema>;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(CreatePostSchema),
    });

    useEffect(() => {
        setValue("id", postId);
    }, []);

    useEffect(() => {
        async function getSinglePost() {
            fetch(api + `${postId}/`)
                .then((response) => response.json())
                .then((data) => {
                    setPost(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getSinglePost();
    }, []);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                initialFocus={completeButtonRef}
                as="div"
                className="fixed z-50 inset-0 overflow-y-auto"
                onClose={() => {}}
            >
                <div
                    className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
                    style={{ fontSize: 0 }}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden md:inline-block md:align-middle md:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enterTo="opacity-100 translate-y-0 md:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 md:scale-100"
                        leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    >
                        <form
                            onSubmit={handleSubmit(action)}
                            id="update-data"
                            className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-7 md:my-8 md:align-middle lg:max-w-2xl"
                        >
                            <div className="w-full relative bg-white space-y-6 overflow-hidden shadow-2xl p-5 rounded-2xl">
                                {/* content */}
                                <div className=" w-full text-secondary space-y-5">
                                    <div className="text-xl text-black font-bold ">
                                        Edit item
                                    </div>

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
                                                    defaultValue={post?.title}
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
                                                    defaultValue={post?.content}
                                                />
                                            </div>
                                            {errors.content && (
                                                <span className="text-red-600">
                                                    {errors.content.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions button */}
                                    <div className="flex gap-3 flex-row-reverse">
                                        <PrimaryButton
                                            title={"Save"}
                                            form="update-data"
                                            type="submit"
                                            onClick={() => {
                                                // action(itemId, postId);
                                                // setIsOpen(false);
                                            }}
                                        />
                                        <SecondaryButton
                                            title={"Cancel"}
                                            onClick={() => {
                                                setIsOpen(false);
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* content end */}
                            </div>
                        </form>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
