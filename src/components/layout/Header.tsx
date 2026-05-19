"use client";

import Link from "next/link";
import { User, Menu, LogOut, LayoutDashboard, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import AuthPopup from "@/components/auth/AuthPopup";

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, role, logout } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-charcoal-800 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-gold-500 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-serif tracking-widest text-gold-500">SWAPNA NAGARI JWELLERS</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            <Link href="/" className="hover:text-gold-500 transition-colors">Home</Link>
            <Link href="/collection" className="hover:text-gold-500 transition-colors">Collection</Link>
            <Link href="/contact" className="hover:text-gold-500 transition-colors">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 text-gold-500 transition-colors flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-charcoal-950 border border-charcoal-800 shadow-xl py-2 z-50">
                    <div className="px-4 py-2 text-xs text-gray-400 border-b border-charcoal-800 mb-2 truncate">
                      {user.email}
                    </div>
                    {role === "admin" && (
                      <Link 
                        href="/admin/dashboard" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-gold-500 hover:bg-charcoal-900 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-red-500 hover:bg-charcoal-900 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="p-2 hover:text-gold-500 transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-charcoal-800 bg-charcoal-950 absolute w-full left-0 shadow-2xl">
            <nav className="flex flex-col py-4">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 text-sm tracking-widest uppercase hover:text-gold-500 hover:bg-charcoal-900 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/collection" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 text-sm tracking-widest uppercase hover:text-gold-500 hover:bg-charcoal-900 transition-colors"
              >
                Collection
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-4 text-sm tracking-widest uppercase hover:text-gold-500 hover:bg-charcoal-900 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>
      
      {isAuthOpen && <AuthPopup onClose={() => setIsAuthOpen(false)} />}
    </>
  );
}
