import Header from "@/components/Header";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Heart, Leaf, Users, Award, Clock, Globe, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

export default function About() {
  const { cartOpen, setCartOpen } = useCartStore();

  const values = [
    {
      icon: Heart,
      title: "Passion & Craftsmanship",
      description: "Every candle is handcrafted with love and attention to detail by our skilled artisans who take pride in their work."
    },
    {
      icon: Leaf,
      title: "Natural & Sustainable",
      description: "We use only the finest natural waxes and sustainable materials, caring for both your home and our planet."
    },
    {
      icon: Sparkles,
      title: "Premium Quality",
      description: "Our commitment to excellence ensures that every candle meets the highest standards of quality and performance."
    },
    {
      icon: Globe,
      title: "Global Inspiration",
      description: "Drawing inspiration from fragrances around the world to create unique and memorable scent experiences."
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Founded in a small studio with a passion for creating the perfect candle experience."
    },
    {
      year: "2020",
      title: "Artisan Expansion",
      description: "Grew our team of skilled artisans and introduced our signature collection methods."
    },
    {
      year: "2022",
      title: "Sustainable Focus",
      description: "Committed to 100% natural and sustainable candle-making practices."
    },
    {
      year: "2024",
      title: "Global Reach",
      description: "Expanded to serve candle enthusiasts worldwide while maintaining our artisan quality."
    }
  ];

  const team = [
    {
      name: "Sarah Mitchell",
      role: "Founder & Master Candlemaker",
      description: "With over 15 years of experience in fragrance design, Sarah leads our creative vision.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "David Chen",
      role: "Head of Quality & Sustainability",
      description: "David ensures every candle meets our highest standards while maintaining eco-friendly practices.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Emma Rodriguez",
      role: "Fragrance Designer",
      description: "Emma creates our unique scent profiles, blending traditional techniques with modern innovation.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pale-pink via-white to-soft-pink">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-purple via-medium-purple to-mauve-purple py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
                Our <span className="text-gradient-pink animate-flicker">Story</span>
              </h1>
              <p className="text-xl text-pale-pink mb-8 leading-relaxed">
                Born from a passion for creating extraordinary moments, WaxHeave transforms everyday spaces into sanctuaries of warmth and tranquility through the art of handcrafted candles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-soft-pink text-primary-purple hover:bg-pale-pink px-8 py-4 text-lg font-semibold">
                  <Heart className="w-5 h-5 mr-2" />
                  Our Mission
                </Button>
                <Button variant="outline" className="border-pale-pink text-pale-pink hover:bg-pale-pink hover:text-primary-purple px-8 py-4 text-lg">
                  Meet Our Team
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Artisan crafting candles"
                className="rounded-3xl shadow-2xl w-full h-auto animate-float"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-pink rounded-2xl p-6 shadow-xl animate-scale-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <Flame className="h-8 w-8 text-primary-purple" />
                  <div>
                    <p className="font-bold text-primary-purple">6+ Years</p>
                    <p className="text-sm text-medium-purple">Crafting Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-purple mb-6">Our Mission & Values</h2>
            <p className="text-lg text-medium-purple max-w-3xl mx-auto leading-relaxed">
              We believe that a beautifully scented candle has the power to transform any moment into something extraordinary. Our mission is to craft candles that don't just illuminate spaces, but elevate experiences and create lasting memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-light-mauve/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-8 pb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-mauve rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-purple mb-3">{value.title}</h3>
                    <p className="text-medium-purple text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-gradient-to-r from-soft-pink to-pale-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-purple mb-6">Our Journey</h2>
            <p className="text-lg text-medium-purple max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted name in artisan candles, discover the milestones that shaped our story.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-mauve rounded-full hidden lg:block"></div>
            
            <div className="space-y-12 lg:space-y-16">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col lg:flex-row items-center gap-8 animate-scale-in ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-1">
                    <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-light-mauve/20">
                      <Badge className="bg-gradient-purple text-white mb-4 px-3 py-1">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-xl font-bold text-primary-purple mb-3">{milestone.title}</h3>
                      <p className="text-medium-purple leading-relaxed">{milestone.description}</p>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden lg:block">
                    <div className="w-4 h-4 bg-gradient-mauve rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="flex-1 lg:block hidden"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-purple mb-6">Meet Our Artisans</h2>
            <p className="text-lg text-medium-purple max-w-2xl mx-auto">
              The passionate craftspeople behind every WaxHeave candle, dedicated to bringing you exceptional quality and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index} 
                className="overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-light-mauve/20 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary-purple mb-2">{member.name}</h3>
                  <Badge className="bg-gradient-mauve text-white mb-3 px-3 py-1">
                    {member.role}
                  </Badge>
                  <p className="text-medium-purple text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-purple via-medium-purple to-mauve-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-pale-pink">Happy Customers</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-pale-pink">Unique Scents</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-white mb-2">6+</div>
              <div className="text-pale-pink">Years of Excellence</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-pale-pink">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-purple mb-6">Join Our Journey</h2>
          <p className="text-lg text-medium-purple mb-8 leading-relaxed">
            Become part of the WaxHeave family and discover how our handcrafted candles can transform your everyday moments into extraordinary experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-mauve hover:bg-gradient-purple text-white px-8 py-4 text-lg font-semibold">
              <Sparkles className="w-5 h-5 mr-2" />
              Shop Our Collection
            </Button>
            <Button variant="outline" className="border-mauve-purple text-mauve-purple hover:bg-mauve-purple hover:text-white px-8 py-4 text-lg">
              <Users className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Cart open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}