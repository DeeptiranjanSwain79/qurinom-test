import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface NavbarContextType {
  activeText: string;
  setActiveText: Dispatch<SetStateAction<string>>;
  authSidebarActiveText: string;
  setAuthSidebarActiveText: Dispatch<SetStateAction<string>>;
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

const NavbarContext = createContext<NavbarContextType>({
  activeText: "",
  setActiveText: () => {},
  authSidebarActiveText: "",
  setAuthSidebarActiveText: () => {},
  openDrawer: false,
  setOpenDrawer: () => {},
});

export const NavbarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeText, setActiveText] = useState("home");
  const [authSidebarActiveText, setAuthSidebarActiveText] =
    useState("dashboard");
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <NavbarContext.Provider
      value={{
        activeText,
        setActiveText,
        authSidebarActiveText,
        setAuthSidebarActiveText,
        openDrawer,
        setOpenDrawer,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
