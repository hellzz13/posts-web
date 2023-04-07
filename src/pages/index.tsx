import MainArea from "@/components/MainArea";
import SignUpCard from "@/components/SignUpCard";
import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Post } from "@/types/Post";
import InfoContext from "@/context/InfoContext";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Home() {
    const { hasName, isLoading } = useContext(InfoContext);

    const { push } = useRouter();

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="text-primary flex flex-col items-center gap-3">
                        <FaSpinner className="animate-spin" size={28} />
                        <p>Carregando...</p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <SignUpCard />
                </div>
            )}
        </div>
    );
}
