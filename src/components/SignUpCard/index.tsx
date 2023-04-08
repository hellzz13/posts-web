import PrimaryButton from "../Buttons/PrimaryButton";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useContext } from "react";
import InfoContext from "@/context/InfoContext";

export default function SignUpCard() {
    const CreateNameSchema = z.object({
        name: z.string().nonempty("Username is required"),
    });

    type CreateNameFormData = z.infer<typeof CreateNameSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<CreateNameFormData>({
        resolver: zodResolver(CreateNameSchema),
    });

    const { setIsLoading, isLoading } = useContext(InfoContext);

    const saveName = ({ name }: CreateNameFormData) => {
        setIsLoading(true);
        setCookie(null, "@usernamePost", name);
        push("/posts");
    };

    const { push } = useRouter();

    return (
        <form
            className="border bg-white max-w-lg w-[500px] rounded-2xl p-6"
            onSubmit={handleSubmit(saveName)}
        >
            <h2 className="font-bold text-2xl mb-6">
                Welcome to CodeLeap network!
            </h2>

            <div>
                <label
                    htmlFor="name"
                    className="block text-base font-medium text-gray-700 mb-3"
                >
                    Please enter your username
                </label>
                <div>
                    <input
                        {...register("name")}
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
                        className="appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {errors.name && (
                    <span className="text-red-600">{errors.name.message}</span>
                )}
            </div>

            <div className="pt-4 flex justify-end w-full">
                <PrimaryButton
                    title="ENTER"
                    disabled={!isDirty || Boolean(Object.keys(errors).length)}
                />
            </div>
        </form>
    );
}
