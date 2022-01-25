import { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [cvFile, setCvFile] = useState();
  const [bachelorDegree, setBachelorDegree] = useState();
  const [masterDegree, setMasterDegree] = useState();
  const [phoneNr, setPhoneNr] = useState();

  return (
    <UserContext.Provider
      value={{
        id,
        name,
        email,
        cvFile,
        bachelorDegree,
        masterDegree,
        phoneNr,
        setId,
        setName,
        setEmail,
        setCvFile, 
        setBachelorDegree,
        setMasterDegree, 
        setPhoneNr
      }}
    >
      {children}
    </UserContext.Provider>
  );
};