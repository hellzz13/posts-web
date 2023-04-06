import MainArea from "@/components/MainArea";
import SignUpCard from "@/components/SignUpCard";
import { useState } from "react";

export default function Home() {
    const [hasName, setHasName] = useState(true);
    return (
        <div>
            {hasName ? (
                <MainArea />
            ) : (
                <div className="flex justify-center items-center h-full">
                    <SignUpCard />
                </div>
            )}
        </div>
    );
}
