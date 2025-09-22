
import "../styles/globals.css"
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@/components/ThemeProvider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import Layout from "@/components/Layout"

// 👇 SEO imports
import { DefaultSeo } from "next-seo"
import SEO from "../next-seo.config"

// 👇 Head import
import Head from "next/head"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Head>
            {/* Favicon */}
            <link rel="icon" href="/fav.ico" />
          </Head>

          <DefaultSeo {...SEO} />

          <Layout pageData={pageProps.initialPageData}>
            <Component {...pageProps} />
          </Layout>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MyApp