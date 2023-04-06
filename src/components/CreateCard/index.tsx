import PrimaryButton from "../Buttons/PrimaryButton";

export default function CreateCard() {
    return (
        <div className="border bg-white w-full rounded-2xl p-6">
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
                            // {...register("name")}
                            id="title"
                            name="title"
                            type="text"
                            autoComplete="title"
                            placeholder="Hello world"
                            className="appearance-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )} */}
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
                            // {...register("content")}
                            className="appearance-none resize-none block w-full px-3 py-2 border border-secondary rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="content"
                            placeholder="Content"
                            name="content"
                            rows={4}
                        />
                    </div>
                    {/* {errors.content && (
                  <span className="text-red-600">{errors.content.message}</span>
                )} */}
                </div>
            </div>

            <div className="pt-4 flex justify-end w-full">
                <PrimaryButton title="CREATE" disabled={false} />
            </div>
        </div>
    );
}
