import { Box } from "@mui/material";
import Navbar from "../../components/Home/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Box>{children}</Box>
    </>
  );
}
