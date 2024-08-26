import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import Providers from "./Providers";
import Footer from "../components/Footer";
import FloatingAiIcon from "../components/FloatingAiIcon";
import FloatingBar from "@/components/FloatingBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mapa Inversiones",
  description: "Portal de Mapa Inversiones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Box>{children}</Box>
          <Footer />
          <FloatingBar />
          <FloatingAiIcon />
        </Providers>
      </body>
    </html>
  );
}
