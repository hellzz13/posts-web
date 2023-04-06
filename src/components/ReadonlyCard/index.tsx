import PrimaryButton from "../Buttons/PrimaryButton";
import { TbTrashXFilled, TbEdit } from "react-icons/tb";

export default function ReadonlyCard() {
    return (
        <div className="border bg-white w-full rounded-2xl pb-6">
            <div className="w-full h-[70px] bg-primary rounded-t-lg flex justify-between items-center px-9">
                <h2 className="text-white font-bold text-2xl">
                    My First Post at CodeLeap Network!
                </h2>
                <span className="flex gap-5">
                    <TbTrashXFilled
                        className="text-white cursor-pointer"
                        size={28}
                    />
                    <TbEdit className="text-white cursor-pointer" size={28} />
                </span>
            </div>
            <div className="flex justify-between px-9 text-secondary py-5">
                <h3>@Victor</h3> <div>25 minutes ago</div>
            </div>
            <p className="px-9 text-justify">
                Curabitur suscipit suscipit tellus. Phasellus consectetuer
                vestibulum elit. Pellentesque habitant morbi tristique senectus
                et netus et malesuada fames ac turpis egestas. Maecenas egestas
                arcu quis ligula mattis placerat. Duis vel nibh at velit
                scelerisque suscipit.
            </p>
        </div>
    );
}
