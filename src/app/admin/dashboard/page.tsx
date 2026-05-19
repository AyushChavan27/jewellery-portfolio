"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Trash2, Edit2, X, Package, MessageSquare } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: any;
}

export default function AdminDashboard() {
  const { role, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"products" | "inquiries">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("women");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData.reverse());
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const fetchInquiries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      const inqData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Inquiry[];
      setInquiries(inqData.reverse());
    } catch (err) {
      console.error("Error fetching inquiries", err);
    }
  };

  useEffect(() => {
    if (!authLoading && role !== "admin") {
      router.push("/");
    }
  }, [role, authLoading, router]);

  useEffect(() => {
    if (role === "admin") {
      if (activeTab === "products") {
        fetchProducts();
      } else {
        fetchInquiries();
      }
    }
  }, [activeTab, role]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-background text-white">Loading...</div>;
  if (role !== "admin") return null;

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && !imageUrl) {
      setMessage("Please upload an image first.");
      return;
    }
    
    setLoading(true);
    try {
      if (editingId) {
        const productRef = doc(db, "products", editingId);
        await updateDoc(productRef, {
          name, price, category
        });
        setMessage("Product updated successfully!");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "products"), {
          name, price, category, imageUrl, createdAt: new Date()
        });
        setMessage("Product added successfully!");
      }
      setName(""); setPrice(""); setCategory("women"); setImageUrl("");
      fetchProducts();
    } catch (error: any) {
      setMessage("Error saving product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category || "women");
    setImageUrl(product.imageUrl);
    setMessage("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName(""); setPrice(""); setCategory("women"); setImageUrl(""); setMessage("");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product", err);
        setMessage("Error deleting product.");
      }
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteDoc(doc(db, "messages", id));
        fetchInquiries();
      } catch (err) {
        console.error("Error deleting inquiry", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Tabs */}
        <div className="flex gap-4 border-b border-charcoal-800 pb-4">
          <button 
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-6 py-3 font-serif uppercase tracking-widest text-sm transition-colors ${activeTab === "products" ? "bg-gold-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            <Package className="w-4 h-4" /> Manage Products
          </button>
          <button 
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center gap-2 px-6 py-3 font-serif uppercase tracking-widest text-sm transition-colors ${activeTab === "inquiries" ? "bg-gold-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            <MessageSquare className="w-4 h-4" /> Inquiries
          </button>
        </div>

        {activeTab === "products" ? (
          <div className="space-y-12">
            {/* Form Section */}
            <div className="bg-charcoal-950 p-8 border border-charcoal-800 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-serif text-white">
                  {editingId ? "Edit Product Details" : "Add New Product"}
                </h1>
                {editingId && (
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" /> Cancel Edit
                  </button>
                )}
              </div>
              
              {message && (
                <div className={`p-4 mb-6 text-sm ${message.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSaveProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Product Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-charcoal-900 border border-charcoal-800 px-4 py-2 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Price (e.g. ₹4,500)</label>
                    <input 
                      type="text" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-charcoal-900 border border-charcoal-800 px-4 py-2 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-charcoal-900 border border-charcoal-800 px-4 py-2 text-white appearance-none"
                  >
                    <option value="women">Women's Collection</option>
                    <option value="men">Men's Collection</option>
                  </select>
                </div>

                {!editingId && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Product Image</label>
                    
                    <CldUploadWidget 
                      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                      onSuccess={(result: any) => {
                        setImageUrl(result.info.secure_url);
                      }}
                    >
                      {({ open }) => {
                        return (
                          <button 
                            type="button"
                            onClick={() => open()}
                            className="w-full border-2 border-dashed border-charcoal-800 p-8 text-gray-400 hover:border-gold-500 hover:text-gold-500 transition-colors"
                          >
                            {imageUrl ? "Image Uploaded Successfully. Click to change." : "Click to upload image via Cloudinary"}
                          </button>
                        );
                      }}
                    </CldUploadWidget>

                    {imageUrl && (
                      <div className="mt-4">
                        <img src={imageUrl} alt="Preview" className="h-32 object-contain" />
                      </div>
                    )}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold-500 text-black py-3 font-medium uppercase tracking-wider hover:bg-gold-400 disabled:opacity-50"
                >
                  {loading ? "Saving..." : (editingId ? "Update Product Details" : "Save Product to Firestore")}
                </button>
              </form>
            </div>

            {/* Product List Section */}
            <div className="bg-charcoal-950 p-8 border border-charcoal-800 shadow-xl">
              <h2 className="text-2xl font-serif text-white mb-6">Manage Existing Products</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="text-xs text-gray-500 uppercase bg-charcoal-900 border-b border-charcoal-800">
                    <tr>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center">No products found.</td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product.id} className="border-b border-charcoal-800 hover:bg-charcoal-900/50">
                          <td className="px-4 py-3">
                            <div className="relative w-12 h-12 bg-charcoal-800">
                              {product.imageUrl && (
                                <Image 
                                  src={product.imageUrl} 
                                  alt={product.name} 
                                  fill 
                                  className="object-cover"
                                  unoptimized
                                />
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-white">{product.name}</td>
                          <td className="px-4 py-3">{product.price}</td>
                          <td className="px-4 py-3 capitalize">{product.category || 'women'}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-3">
                              <button 
                                type="button"
                                onClick={() => handleEdit(product)}
                                className="p-2 hover:text-gold-500 transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleDelete(product.id)}
                                className="p-2 hover:text-red-500 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-charcoal-950 p-8 border border-charcoal-800 shadow-xl">
            <h2 className="text-2xl font-serif text-white mb-6">Customer Inquiries</h2>
            
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="text-center text-gray-500 py-12 border border-dashed border-charcoal-800">
                  No inquiries found.
                </div>
              ) : (
                inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-6 border border-charcoal-800 bg-charcoal-900/30 relative">
                    <button 
                      onClick={() => handleDeleteInquiry(inquiry.id)}
                      className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <h3 className="text-lg font-medium text-white mb-1">{inquiry.name}</h3>
                    <div className="flex gap-4 text-sm text-gray-400 mb-4">
                      <span>{inquiry.email}</span>
                      {inquiry.phone && <span>• {inquiry.phone}</span>}
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                      {inquiry.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
