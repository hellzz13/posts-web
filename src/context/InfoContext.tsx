import { createContext, useEffect, useState } from "react";

type InfoProps = {
    hasName: boolean;
    setHasName: (state: boolean) => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
};

const DEFAULT_VALUE = {
    hasName: false,
    setHasName: () => {},
    isLoading: true,
    setIsLoading: () => {},
};

const InfoContext = createContext<InfoProps>(DEFAULT_VALUE);

const InfoContextProvider = ({ children }: any) => {
    const [hasName, setHasName] = useState(DEFAULT_VALUE.hasName);
    const [isLoading, setIsLoading] = useState(DEFAULT_VALUE.isLoading);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.getItem("@usernamePost") && setHasName(true);
        }
        setIsLoading(false);
    }, []);

    return (
        <InfoContext.Provider
            value={{
                hasName,
                setHasName,
                setIsLoading,
                isLoading,
            }}
        >
            {children}
        </InfoContext.Provider>
    );
};

export { InfoContextProvider };
export default InfoContext;
