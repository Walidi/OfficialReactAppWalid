import { createContext } from 'react';

export const CurrentUserId = createContext(0);  //Default value for auth. Means certain pages wont be rendered without auth-log-in