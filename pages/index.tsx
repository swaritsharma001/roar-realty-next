import { useState } from "react"
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from "@/components/Header"
import { PropertyFilters } from "@/components/PropertyFilters"
import { PropertyCard } from "@/components/PropertyCard"
import { FloatingActionButton } from "@/components/FloatingActionButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { ArrowRight, Star, Users, Award, CheckCircle, Mail, Phone } from "lucide-react"

interface PropertyData {
  id: string
  title: string
  price: string
  location: string
  bedrooms: number
  bathrooms: number
  area: string
  image: string
  type: string
  featured: boolean
  status: string
  sale_status: string
  developer: string
}

interface FilterState {
  location: string
  minPrice: string
  maxPrice: string
  propertyType: string
  status: string
  sale_status: string
  area: string
  developer: string
}

interface HomeProps {
  initialPageData: any
  initialTeamMembers: any[]
  initialFeaturedProperties: PropertyData[]
  seoData: {
    title: string
    description: string
    keywords: string
    canonicalUrl: string
    structuredData: any
  }
}

const Home = ({ initialPageData, initialTeamMembers, initialFeaturedProperties, seoData }: HomeProps) => {
  const router = useRouter()
  const [featuredProperties] = useState<PropertyData[]>(initialFeaturedProperties)
  const [page] = useState<any>(initialPageData)
  const [teamMembers] = useState<any[]>(initialTeamMembers)
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    status: "",
    sale_status: "",
    area: "",
    developer: ""
  })

  // Handle filter submission by redirecting to properties page
  const handleFilterSubmit = async (newFilters: FilterState) => {
    // Create URL parameters from filters
    const query = new URLSearchParams()
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        query.append(key, value.trim())
      }
    })

    // Redirect to properties page with filters
    const filterUrl = `/properties${query.toString() ? `?${query.toString()}` : ''}`
    router.push(filterUrl)
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      minPrice: "",
      maxPrice: "",
      propertyType: "",
      status: "",
      sale_status: "",
      area: "",
      developer: ""
    })
  }

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:image" content="/assets/hero-bg.jpg" />
        <meta property="og:site_name" content="Roar Realty Dubai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content="/assets/hero-bg.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        <meta name="robots" content="index, follow" />

        {/* Enhanced SEO for real estate */}
        <meta name="geo.region" content="AE-DU" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="geo.position" content="25.2048;55.2708" />
        <meta name="ICBM" content="25.2048, 55.2708" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.structuredData)
          }}
        />
      </Head>

      <div className="min-h-screen abc">
        <Header />

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/assets/hero-bg.jpg"
              alt="Dubai luxury real estate skyline"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-24 animate-fade-in">
              <span className="block text-white" style={{ transform: 'translateY(80px)' }}>
                {page?.HeroTitle || "Find Your Dream Luxury Home"}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
              {page?.HeroSubtitle || "Discover Dubai's most exclusive properties with Roar Realty. Your gateway to luxury living in the heart of the UAE."}
            </p>

            <div className="mb-12">
              <PropertyFilters 
                onFilterSubmit={handleFilterSubmit}
                onClearFilters={clearFilters}
                isLoading={false}
                filters={filters}
                setFilters={setFilters}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg" className="bg-gradient-to-r from-luxury to-luxury-light text-white hover:from-luxury-dark hover:to-luxury font-semibold text-lg px-8 py-6 mb-4">
                  Explore Properties <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section id="properties" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="bg-gradient-to-r from-luxury to-luxury-light bg-clip-text text-transparent">Properties</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Handpicked selection of Dubai's most prestigious properties
              </p>
            </div>

            {featuredProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {featuredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link href="/properties">
                    <Button size="lg" variant="outline" className="border-luxury text-luxury hover:bg-luxury hover:text-white">
                      View All Properties <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold mb-4">Loading Properties...</h3>
                  <p className="text-muted-foreground mb-6">
                    Please wait while we load our featured properties.
                  </p>
                  <Link href="/properties">
                    <Button className="bg-gradient-to-r from-luxury to-luxury-light text-white hover:from-luxury-dark hover:to-luxury">
                      Browse All Properties
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Why Choose <span className="bg-gradient-to-r from-luxury to-luxury-light bg-clip-text text-transparent">Roar Realty</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  With years of experience in Dubai's luxury real estate market, 
                  we provide unparalleled service and expertise to help you find 
                  the perfect property.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-luxury" />
                    <span>Expert knowledge of Dubai's prime locations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-luxury" />
                    <span>Personalized service tailored to your needs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-luxury" />
                    <span>Access to exclusive off-market properties</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-luxury" />
                    <span>End-to-end support throughout your journey</span>
                  </div>
                </div>

                <Button size="lg" className="bg-gradient-to-r from-luxury to-luxury-light text-white hover:from-luxury-dark hover:to-luxury font-semibold">
                  Learn More About Us
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <Star className="h-12 w-12 text-luxury mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{page?.PropertiesSold || "500+"}</h3>
                  <p className="text-muted-foreground">Properties Sold</p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <Users className="h-12 w-12 text-luxury mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{page?.happyClient || "1000+"}</h3>
                  <p className="text-muted-foreground">Happy Clients</p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <Award className="h-12 w-12 text-luxury mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{page?.Experience || "15+"}</h3>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <CheckCircle className="h-12 w-12 text-luxury mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{page?.Satisfaction || "98.9%"}</h3>
                  <p className="text-muted-foreground">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section id="team" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Meet Our <span className="bg-gradient-to-r from-luxury to-luxury-light bg-clip-text text-transparent">Expert Team</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our experienced professionals are dedicated to making your real estate dreams come true
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {teamMembers.map((member, index) => (
                    <CarouselItem key={member.id || `team-member-${index}`} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="h-full hover-scale transition-all duration-300 hover:shadow-lg border-border/50">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <div className="relative mb-6">
                              <Image
                                src={member.img || "/assets/team-ceo.jpg"}
                                alt={member.name}
                                width={96}
                                height={96}
                                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-luxury/20"
                              />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                            <p className="text-luxury font-semibold mb-3">{member.role}</p>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                              {member.bio}
                            </p>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center justify-center gap-2">
                                <Mail className="h-4 w-4 text-luxury" />
                                <span className="text-xs">{member.email}</span>
                              </div>
                              <div className="flex items-center justify-center gap-2">
                                <Phone className="h-4 w-4 text-luxury" />
                                <span className="text-xs">{member.phone}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your <span className="bg-gradient-to-r from-luxury to-luxury-light bg-clip-text text-transparent">Dream Home?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our expert team guide you through Dubai's luxury real estate market
            </p>
            <Button size="lg" className="bg-gradient-to-r from-luxury to-luxury-light text-white hover:from-luxury-dark hover:to-luxury font-semibold text-lg px-8 py-6">
              Get In Touch Today
            </Button>
          </div>
        </section>

        <FloatingActionButton />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://roarrealty.ae'

    let pageData = {}
    let teamMembers = []
    let featuredProperties = []

    if (baseUrl) {
      try {
        // Fetch page data
        const pageResponse = await fetch(`${baseUrl}/page`)
        if (pageResponse.ok) {
          pageData = await pageResponse.json()
        }

        // Fetch team members
        const teamResponse = await fetch(`${baseUrl}/team`)
        if (teamResponse.ok) {
          teamMembers = await teamResponse.json()
        }

        // Fetch featured properties
        const propertiesResponse = await fetch(`${baseUrl}/property?limit=5`)
        if (propertiesResponse.ok) {
          const apiData = await propertiesResponse.json()
          const properties = apiData.properties || []

          // Transform properties data
          featuredProperties = properties.map((property: any) => {
            let imageUrl = ""
            try {
              const parsedImage = JSON.parse(property.cover_image_url)
              imageUrl = parsedImage.url || ""
            } catch {
              imageUrl = "/assets/penthouse-1.jpg"
            }

            return {
              id: property.id.toString(),
              title: property.name,
              price: `AED ${property.min_price?.toLocaleString() || "Price on request"}`,
              location: `${property.area || "Dubai"}, UAE`,
              bedrooms: 2,
              bathrooms: 2,
              area: property.area_unit ? `${property.area_unit}` : "Size varies",
              image: imageUrl,
              type: property.status || "Apartment",
              featured: true,
              status: property.status || "",
              sale_status: property.sale_status || "",
              developer: property.developer || ""
            }
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    // Enhanced SEO data
    const seoData = {
      title: `${(pageData as any)?.HeroTitle || "Find Your Dream Luxury Home"} | Roar Realty Dubai - Premium Real Estate`,
      description: (pageData as any)?.HeroSubtitle || "Discover Dubai's most exclusive properties with Roar Realty. Your gateway to luxury living in the heart of the UAE. Browse apartments, villas, and penthouses in prime locations.",
      keywords: "Dubai real estate, luxury properties Dubai, apartments for sale Dubai, villas Dubai, penthouses Dubai, property investment UAE, Dubai Marina properties, Downtown Dubai real estate, Emirates Hills villas, Palm Jumeirah properties, Roar Realty",
      canonicalUrl: siteUrl,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Roar Realty Dubai",
        "description": "Premium real estate agency in Dubai specializing in luxury properties including apartments, villas, and penthouses",
        "url": siteUrl,
        "logo": `${siteUrl}/assets/logo.png`,
        "image": `${siteUrl}/assets/hero-bg.jpg`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.2048,
          "longitude": 55.2708
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+971-58-500-5438",
          "contactType": "sales",
          "availableLanguage": ["English", "Arabic"]
        },
        "areaServed": "Dubai, UAE",
        "priceRange": "$$$$"
      }
    }

    return {
      props: {
        initialPageData: pageData,
        initialTeamMembers: teamMembers,
        initialFeaturedProperties: featuredProperties,
        seoData
      }
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error)

    // Fallback data with enhanced SEO
    const fallbackSeoData = {
      title: "Find Your Dream Luxury Home | Roar Realty Dubai - Premium Real Estate",
      description: "Discover Dubai's most exclusive properties with Roar Realty. Your gateway to luxury living in the heart of the UAE. Browse apartments, villas, and penthouses in prime locations.",
      keywords: "Dubai real estate, luxury properties Dubai, apartments for sale Dubai, villas Dubai, penthouses Dubai, property investment UAE",
      canonicalUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://roarrealty.ae',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Roar Realty Dubai",
        "description": "Premium real estate agency in Dubai specializing in luxury properties",
        "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://roarrealty.ae'
      }
    }

    return {
      props: {
        initialPageData: {},
        initialTeamMembers: [],
        initialFeaturedProperties: [],
        seoData: fallbackSeoData
      }
    }
    }
    }

    export default Home;