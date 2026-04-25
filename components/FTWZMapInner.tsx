"use client"

interface FTWZMapInnerProps {
  locations: Array<{
    city: string;
    state: string;
    lat: number;
    lng: number;
    address: string;
    phone: string;
    type: string;
    slug: string;
  }>;
  activeCity: string | null;
  onMarkerClick?: (city: string) => void;
}

export default function FTWZMapInner({ locations, activeCity, onMarkerClick }: FTWZMapInnerProps) {
  return (
    <div className="w-full">
      <div
        className="w-full rounded-xl overflow-hidden border border-border"
        style={{ height: "500px" }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7677888.669099932!2d78.96288!3d22.59374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Astromar FTWZ Locations across India"
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center px-4">
        * Map boundaries shown are for representational purposes only. Jammu &amp; Kashmir and Ladakh are integral parts of India as per the Government of India.
      </p>
    </div>
  );
}
