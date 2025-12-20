"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { theme } from "@/theme/theme";
import { Container, CssBaseline, ThemeProvider, } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Head from "./head";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Sidebar />
            <Container sx={{ display: 'flex', flexDirection: 'column', ml: { xs: 0, sm: 3.5, md: 'auto' }, pt: 4, px: { sm: 6, md: 10 } }}>
              {children}
            </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
