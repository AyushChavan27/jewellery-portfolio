"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, User, CheckCircle2 } from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

export default function ContactPage() {
  const { role, loading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, text: "" });

    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        createdAt: new Date()
      });
      setStatus({ type: "success", text: "Your message has been sent successfully! We will get back to you soon." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      setStatus({ type: "error", text: "Failed to send message. Please try again or email us directly." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Get in Touch</h1>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We would love to hear from you. Whether you have a question about our collections, need assistance with an order, or want to inquire about custom pieces, we are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-charcoal-950 p-8 md:p-12 border border-charcoal-800 shadow-xl">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-serif text-white mb-8">Contact Information</h2>
            
            <div className="flex items-start gap-5">
              <div className="p-3 bg-charcoal-900 border border-charcoal-800 shrink-0">
                <User className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 text-lg">Name</h3>
                <p className="text-gray-400">Ayush Chavan</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="p-3 bg-charcoal-900 border border-charcoal-800 shrink-0">
                <Phone className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 text-lg">Phone</h3>
                <a href="tel:90223164XX" className="text-gray-400 hover:text-gold-500 transition-colors">90223164XX</a>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="p-3 bg-charcoal-900 border border-charcoal-800 shrink-0">
                <Mail className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 text-lg">Email</h3>
                <a href="mailto:ayushchavan2762004@gmail.com" className="text-gray-400 hover:text-gold-500 transition-colors break-all">ayushchavan2762004@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="p-3 bg-charcoal-900 border border-charcoal-800 shrink-0">
                <MapPin className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1 text-lg">Studio</h3>
                <p className="text-gray-400 leading-relaxed">By Appointment Only<br/>Mumbai, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-serif text-white mb-8">Send a Message</h2>
            
            {authLoading ? (
              <div className="text-gray-400 py-12 text-center">Loading...</div>
            ) : role === 'admin' ? (
              <div className="bg-charcoal-900/50 border border-charcoal-800 p-8 text-center text-gray-400">
                Admins cannot submit inquiries. You can view inquiries from the Admin Dashboard.
              </div>
            ) : role === 'guest' ? (
              <div className="bg-charcoal-900/50 border border-charcoal-800 p-8 text-center text-gray-400">
                Please <span className="text-gold-500 font-medium">login or register</span> using the profile icon in the top right to send an inquiry.
              </div>
            ) : status.type === 'success' ? (
              <div className="bg-green-900/20 border border-green-500/50 p-6 flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <p className="text-green-400">{status.text}</p>
                <button 
                  onClick={() => setStatus({ type: null, text: "" })}
                  className="text-white underline text-sm mt-4 hover:text-gold-500"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.type === 'error' && (
                  <div className="bg-red-900/20 border border-red-500/50 p-4 text-red-400 text-sm">
                    {status.text}
                  </div>
                )}
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider font-medium">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-charcoal-900 border border-charcoal-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider font-medium">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-charcoal-900 border border-charcoal-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider font-medium">Message</label>
                  <textarea 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full bg-charcoal-900 border border-charcoal-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold-500 text-black py-4 font-semibold uppercase tracking-widest text-sm hover:bg-gold-400 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Submit Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
