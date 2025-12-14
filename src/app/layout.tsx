"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/theme/theme";
import { Container, CssBaseline, } from "@mui/material";
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
            <Container sx={{ display: 'flex', flexDirection: 'column', pt: 4 }}>
              {children}
            </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
