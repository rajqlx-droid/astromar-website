"use client"
import { MapPin, Box, Snowflake, Layers, Users, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { icon: MapPin, value: "9+", label: "Locations Across India" },
  { icon: Box, value: "5 Lakh+", label: "Sq. Ft. Warehouse Space" },
  { icon: Snowflake, value: "50K+", label: "Sq. Ft. Cold Storage" },
  { icon: Layers, value: "25K+", label: "Pallet Positions" },
  { icon: Users, value: "200+", label: "Clients Served" },
  { icon: Clock, value: "7+", label: "Years of Experience" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center gap-3">
                <stat.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

