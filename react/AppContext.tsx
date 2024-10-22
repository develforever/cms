import { createContext } from "react";
import { AppState } from "./Types/AppTypes";


const AppContext = createContext<AppState>({} as AppState);
AppContext.displayName = "AppContext";
export default AppContext;