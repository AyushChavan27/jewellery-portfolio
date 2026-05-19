"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  const featuredProducts = [
    { id: 1, name: "Luminous Diamond Ring", price: "₹4,500", image: "/images/product_placeholder.png" },
    { id: 2, name: "Eternal Gold Necklace", price: "₹2,850", image: "/images/necklace.png" },
    { id: 3, name: "Sapphire Teardrop Earrings", price: "₹3,200", image: "/images/earrings.png" },
    { id: 4, name: "Royal Emerald Bracelet", price: "₹5,100", image: "/images/bracelet.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="Luxury Jewellery Collection" 
            fill 
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h2 variants={fadeIn} className="text-gold-500 tracking-[0.3em] uppercase text-sm mb-6 font-medium">
              The New Collection
            </motion.h2>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-serif mb-8 text-white">
              Elegance in Every Detail
            </motion.h1>
            <motion.p variants={fadeIn} className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
              Discover our latest masterpieces, handcrafted with precision and passion for those who appreciate true luxury.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link 
                href="/collection" 
                className="inline-block bg-gold-500 text-black px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-gold-400 transition-colors"
              >
                Explore Collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Featured Pieces</h2>
            <div className="w-16 h-[1px] bg-gold-500 mx-auto"></div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeIn} className="group cursor-pointer">
                <div className="relative aspect-square mb-6 overflow-hidden bg-charcoal-900">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">{product.name}</h3>
                  <p className="text-gray-400 font-sans tracking-wide">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Link 
              href="/collection" 
              className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 uppercase tracking-widest text-sm font-medium transition-colors"
            >
              View All Pieces <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="py-24 px-4 bg-charcoal-950">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">A Legacy of Brilliance</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              For over three decades, SWAPNA NAGARI JWELLERS has been synonymous with unparalleled craftsmanship and exquisite design. Each piece tells a story of dedication, from the careful selection of ethically sourced gemstones to the final polish by our master artisans.
            </p>
            <Link 
              href="/about" 
              className="inline-block border border-gold-500 text-gold-500 px-8 py-3 uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-black transition-colors"
            >
              Discover Our Story
            </Link>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
            }}
            className="order-1 md:order-2 relative aspect-[4/3] w-full"
          >
            <Image 
              src="/images/artisan.png" 
              alt="Artisan crafting jewellery" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
