import { createContext, useEffect, useState } from "react";

type InfoProps = {
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
};

const DEFAULT_VALUE = {
    isLoading: true,
    setIsLoading: () => {},
};

const InfoContext = createContext<InfoProps>(DEFAULT_VALUE);

const InfoContextProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(DEFAULT_VALUE.isLoading);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <InfoContext.Provider
            value={{
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
