import PrimaryButton from "../Buttons/PrimaryButton";

export default function SignUpCard() {
    return (
        <div className="border bg-white max-w-lg w-[500px] rounded-2xl p-6">
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
                        // {...register("name")}
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
                        className="appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {/* {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )} */}
            </div>

            <div className="pt-4 flex justify-end w-full">
                <PrimaryButton title="ENTER" disabled={false} />
            </div>
        </div>
    );
}
