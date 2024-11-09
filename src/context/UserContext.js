import React, { createContext, useState } from "react";

export const existUserContext = createContext();

function UserContext({ children }) {
  const [existUser, setExistUser] = useState({
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
    address: '123 Main St, Anytown, USA',
    phone: '123-456-7890',
  
  });

  return (
    <existUserContext.Provider value={{ existUser, setExistUser }}>
      {children}
    </existUserContext.Provider>
  );
}

export default UserContext;
