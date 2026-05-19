import Link from "next/link";
import { Mail, Phone, MapPin, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif tracking-widest text-gold-500 mb-6">SWAPNA NAGARI JWELLERS</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Crafting timeless elegance and modern luxury through meticulously designed jewellery pieces.
            </p>
            <div className="flex flex-col gap-3 text-gray-400 text-sm">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gold-500" />
                <span>Ayush Chavan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-500" />
                <a href="tel:90223164XX" className="hover:text-gold-500 transition-colors">90223164XX</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-500" />
                <a href="mailto:ayushchavan2762004@gmail.com" className="hover:text-gold-500 transition-colors">ayushchavan2762004@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white tracking-widest uppercase text-sm mb-6 font-semibold">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/collection" className="hover:text-gold-500 transition-colors">Our Collection</Link></li>
              <li><Link href="/about" className="hover:text-gold-500 transition-colors">Brand Story</Link></li>
              <li><Link href="/contact" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-gold-500 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white tracking-widest uppercase text-sm mb-6 font-semibold">Customer Care</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/shipping" className="hover:text-gold-500 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/care" className="hover:text-gold-500 transition-colors">Jewellery Care</Link></li>
              <li><Link href="/terms" className="hover:text-gold-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white tracking-widest uppercase text-sm mb-6 font-semibold">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-charcoal-900 border border-charcoal-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button 
                type="button" 
                className="bg-gold-500 text-black px-4 py-2 text-sm font-medium tracking-widest uppercase hover:bg-gold-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-charcoal-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} SWAPNA NAGARI JWELLERS. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/admin/login" className="hover:text-gold-500 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
