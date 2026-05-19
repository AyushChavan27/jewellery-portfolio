"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category?: string;
}

export default function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);
      } catch (err: any) {
        setError("Error fetching products. Please ensure Firebase is configured correctly.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background py-24 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 text-center">Our Collection</h1>
        <div className="w-16 h-[1px] bg-gold-500 mx-auto mb-16"></div>

        {loading ? (
          <div className="text-center text-gray-400">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500 bg-red-900/20 p-4 border border-red-900/50 max-w-2xl mx-auto rounded">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400">No products found. Add some from the admin dashboard.</div>
        ) : (
          <div className="space-y-24">
            {/* Women's Collection */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-serif text-white">Women's Collection</h2>
                <div className="h-[1px] bg-charcoal-800 flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.filter(p => p.category !== 'men').map((product) => (
                  <div key={`women-${product.id}`} className="group cursor-pointer">
                    <div className="relative aspect-square mb-6 overflow-hidden bg-charcoal-900">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        unoptimized
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">{product.name}</h3>
                      <p className="text-gray-400 font-sans tracking-wide">{product.price.startsWith('₹') ? product.price : `₹${product.price}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Men's Collection */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-serif text-white">Men's Collection</h2>
                <div className="h-[1px] bg-charcoal-800 flex-1"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.filter(p => p.category === 'men').map((product) => (
                  <div key={`men-${product.id}`} className="group cursor-pointer">
                    <div className="relative aspect-square mb-6 overflow-hidden bg-charcoal-900">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        unoptimized
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-serif text-white mb-2 group-hover:text-gold-500 transition-colors">{product.name}</h3>
                      <p className="text-gray-400 font-sans tracking-wide">{product.price.startsWith('₹') ? product.price : `₹${product.price}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
