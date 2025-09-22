
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    price: string
    location: string
    bedrooms: number
    bathrooms: number
    area: string
    image: string
    type: string
    featured?: boolean
    status?: string
    sale_status?: string
    developer?: string
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover-scale transition-all duration-300 group border-border/50 shadow-none">
      <div className="relative overflow-hidden">
        <Image
          src={property.image || "/assets/penthouse-1.jpg"}
          alt={`${property.title} - ${property.location} luxury property`}
          width={400}
          height={256}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <Badge className="bg-luxury text-white">Featured</Badge>
          )}
          {property.status && (
            <Badge variant="secondary">{property.status}</Badge>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-luxury transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            {property.developer && (
              <p className="text-sm text-muted-foreground">
                By {property.developer}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
              
                <span>Bedrooms: {property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                
                <span>Bathrooms: {property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.developer}</span>
              </div>
              
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-2xl font-bold text-luxury">
              {property.price}
            </div>
            <Link href={`/property/${property.id}`}>
              <Button className="bg-gradient-to-r from-luxury to-luxury-light text-white hover:from-luxury-dark hover:to-luxury">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
