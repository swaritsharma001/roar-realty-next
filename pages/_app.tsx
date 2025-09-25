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
  // 🔹 Maintenance Mode
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        textAlign: 'center',
        background: '#f8f9fa',
        fontFamily: 'Arial, sans-serif',
        padding: '20px'
      }}>
        <h1 style={{color: '#ff4d4d', fontSize: '2.5rem', marginBottom: '20px'}}>
          🚧 Site Under Maintenance 🚧
        </h1>
        <p style={{color: '#555', fontSize: '1.2rem'}}>
          We are currently updating the site. Please check back shortly.
        </p>
      </div>
    )
  }

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
