import React, { createContext, useState } from 'react';

// Create a context object
const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState("");

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export { DataProvider, DataContext };
