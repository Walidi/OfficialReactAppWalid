import React, { useState, createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [id, setID] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [bachelorDegree, setBachelorDegree] = useState(null);
  const [masterDegree, setMasterDegree] = useState(null);
  const [phoneNr, setPhoneNr] = useState();



  return (
    <UserContext.Provider value={{ id: [id, setID], name: [name, setName], email: [email, setEmail], cvFile: [cvFile, setCvFile], bachelorDegree: [bachelorDegree, setBachelorDegree], 
    masterDegree: [masterDegree, setMasterDegree], phoneNr: [phoneNr, setPhoneNr]}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};