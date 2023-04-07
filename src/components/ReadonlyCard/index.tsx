import PrimaryButton from "../Buttons/PrimaryButton";
import { TbTrashXFilled, TbEdit } from "react-icons/tb";
import { ConfirmModal } from "../Modals/ConfirmModal";
import { useEffect, useState } from "react";
import { EditModal } from "../Modals/EditModal";
import { api } from "@/pages/api";

interface IContentCard {
    id: number;
    title: string;
    author: string;
    time: string;
    content: string;
}

export default function ReadonlyCard({
    id,
    title,
    author,
    time,
    content,
}: IContentCard) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        const dateCreated = new Date(time);
        const dateNow = new Date();
        const betweenMinutes = dateNow.getTime() - dateCreated.getTime();
        const betweenHours = betweenMinutes / (1000 * 60 * 60);

        setHours(Math.floor(betweenHours));
        setMinutes(Math.floor((betweenHours - hours) * 60));
    }, []);

    async function removePost(id: number) {
        try {
            await fetch(api + `${id}/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="border bg-white w-full rounded-2xl pb-6">
            <div className="w-full h-[70px] bg-primary rounded-t-lg flex justify-between items-center px-9">
                <h2 className="text-white font-bold text-2xl">{title}</h2>
                <span className="flex gap-5">
                    <TbTrashXFilled
                        className="text-white cursor-pointer"
                        size={28}
                        onClick={() => setIsOpen(true)}
                    />
                    <TbEdit
                        className="text-white cursor-pointer"
                        size={28}
                        onClick={() => setIsEditable(true)}
                    />
                </span>
            </div>
            <div className="flex justify-between px-9 text-secondary py-5">
                <h3>{author}</h3>{" "}
                <div>
                    {hours.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
                    :
                    {minutes.toLocaleString("en-US", {
                        minimumIntegerDigits: 2,
                    })}{" "}
                    ago
                </div>
            </div>
            <p className="px-9 text-justify">{content}</p>

            <ConfirmModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Are you sure you want to delete this item?"
                type="delete"
                action={removePost}
                postId={id}
            />
            <EditModal
                isOpen={isEditable}
                setIsOpen={setIsEditable}
                title="Are you sure you want to delete this item?"
                type="delete"
                postId={id}
            />
        </div>
    );
}
