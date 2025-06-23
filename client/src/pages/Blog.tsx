import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Candle Making: A Journey Through Scent",
    excerpt: "Discover the intricate process behind our handcrafted candles and learn about the different wax types we use to create the perfect burn.",
    category: "Craft",
    author: "Sarah Mitchell",
    date: "June 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1602874801006-8e7ae0b5d8a8?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Creating the Perfect Ambiance: Candle Placement Tips",
    excerpt: "Learn how to strategically place candles throughout your home to create the perfect atmosphere for any occasion.",
    category: "Home Decor",
    author: "David Chen",
    date: "June 12, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Seasonal Scents: Transitioning Your Home Through the Year",
    excerpt: "Explore how different fragrances can complement the changing seasons and enhance your home's seasonal decor.",
    category: "Seasonal",
    author: "Emma Rodriguez",
    date: "June 10, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
  },
  {
    id: 4,
    title: "The Science of Scent: How Fragrances Affect Your Mood",
    excerpt: "Dive into the psychology of scent and learn how different aromas can influence your emotions and well-being.",
    category: "Wellness",
    author: "Dr. Lisa Park",
    date: "June 8, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Candle Care 101: Making Your Candles Last Longer",
    excerpt: "Essential tips and tricks to extend the life of your candles and ensure they burn safely and evenly every time.",
    category: "Care Tips",
    author: "Michael Thompson",
    date: "June 5, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Behind the Scenes: Meet Our Master Candle Makers",
    excerpt: "Get to know the artisans behind WaxHeave candles and learn about their passion for creating exceptional products.",
    category: "Behind the Scenes",
    author: "WaxHeave Team",
    date: "June 3, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=400&fit=crop"
  }
];

const categories = ["All", "Craft", "Home Decor", "Seasonal", "Wellness", "Care Tips", "Behind the Scenes"];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient-brand mb-4">
              WaxHeave Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the world of candles through expert tips, behind-the-scenes stories, and inspiration for creating the perfect ambiance.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "secondary"}
                className="px-4 py-2 cursor-pointer hover:bg-brand-primary hover:text-white transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden border-brand-primary/20 bg-card/50 backdrop-blur">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-brand-accent text-white">
                    Featured
                  </Badge>
                  <Badge variant="outline" className="border-brand-primary text-brand-primary">
                    {blogPosts[0].category}
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold text-brand-primary mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <button className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary-dark transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </Card>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden border-brand-primary/20 bg-card/50 backdrop-blur hover-lift group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-brand-primary">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-tight group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="mt-16 bg-gradient-brand-soft p-8 text-white text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Stay Updated with Our Latest Posts
            </h3>
            <p className="mb-6 opacity-90">
              Subscribe to our newsletter and never miss our latest candle tips, seasonal guides, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-brand-primary border-0 focus:ring-2 focus:ring-white/30"
              />
              <button className="bg-white text-brand-primary px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                Subscribe
              </button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}