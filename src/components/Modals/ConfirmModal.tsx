import { ReactNode } from "react";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecundaryButton";

type ActionModalProps = {
    type: "success" | "delete";
    title: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    action: (postId: number) => Promise<void>;
    postId: number;
    children?: ReactNode;
    redirectModal?: boolean;
    link?: string;
    setIsQuickViewOpen?: (isOpen: boolean) => void;
    itemId?: number | string;
};

export const ConfirmModal = ({
    type,
    title,
    isOpen,
    setIsOpen,
    action,
    postId,
}: ActionModalProps) => {
    const completeButtonRef = useRef(null);

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
                        <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-7 md:my-8 md:align-middle lg:max-w-2xl">
                            <div className="w-full relative bg-white space-y-6 overflow-hidden shadow-2xl p-5 rounded-2xl">
                                {/* content */}
                                <div className=" w-full text-secondary space-y-5">
                                    <div className="text-xl text-black font-bold ">
                                        {title}
                                    </div>

                                    {/* Actions button */}
                                    <div className="flex gap-3 flex-row-reverse">
                                        <PrimaryButton
                                            title="Delete"
                                            onClick={() => {
                                                action(postId);
                                                setIsOpen(false);
                                            }}
                                        />
                                        <SecondaryButton
                                            title={"cancelar"}
                                            onClick={() => {
                                                setIsOpen(false);
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* content end */}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
