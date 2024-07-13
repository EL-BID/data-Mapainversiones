import { Box } from "@mui/material";
import Navbar from "../../components/Country/Navbar";
import CountryFooter from "@/components/Country/CountryFooter";
import { ProjectProvider } from "./ProjectContext";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <ProjectProvider>
        <Box>{children}</Box>
      </ProjectProvider>
      <CountryFooter />
    </>
  );
}
