'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Plus, Minus, X, CheckCircle2, Package } from 'lucide-react';
import { useSellStation } from '@/hooks/useSellStation';

const ITEMS_PER_PAGE = 3;

export default function SellStation() {
  const {
    medicines,  
    cart,
    search,
    loading,
    sellLoading,
    totalPrice,
    setSearch,
    addToCart,
    removeFromCart,
    updateQuantity,
    sell,
  } = useSellStation();

  const [currentPage, setCurrentPage] = useState(1);

  // Filtered medicines by search
  const filteredMedicines = search
    ? medicines
    : medicines;

  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);

  const displayedMedicines = filteredMedicines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pharmacy Sell Station
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Fast. Modern. Professional.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Medicines List */}
          <div className="flex-1">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-md border border-white/20 p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search medicine, generic, or batch..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 sm:pr-6 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 text-sm sm:text-base"
                  />
                </div>
                <div className="text-xs sm:text-sm text-gray-500">{medicines.length} items</div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <AnimatePresence>
                  {loading ? (
                    <p className="text-center py-10 text-gray-400 text-sm">Loading medicines...</p>
                  ) : filteredMedicines.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      <Package className="w-16 h-16 mx-auto mb-2 opacity-30" />
                      <p className="text-sm sm:text-base">No medicines found</p>
                    </div>
                  ) : (
                    displayedMedicines.map((med) => (
                      <motion.div
                        key={med._id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => addToCart(med)}
                        className="bg-gradient-to-r from-white to-blue-50/50 border border-gray-200 rounded-xl p-3 sm:p-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{med.brandName}</h3>
                            <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
                              {med.genericName} • {med.strength} • {med.dosageForm}
                            </p>
                            <div className="flex gap-2 sm:gap-3 mt-2 flex-wrap text-xs sm:text-sm">
                              <span
                                className={`px-2 py-0.5 rounded-full font-medium ${
                                  med.prescriptionStatus === 'OTC'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : med.prescriptionStatus === 'Prescription'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-amber-100 text-amber-700'
                                }`}
                              >
                                {med.prescriptionStatus}
                              </span>
                              <span className="px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                                Batch: {med.batchNumber}
                              </span>
                              <span className="px-2 py-0.5 rounded-full font-medium bg-indigo-100 text-indigo-700">
                                Disp: {med.stockDispenser}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl sm:text-2xl font-bold text-indigo-600">
                              ${med.sellingPrice.toFixed(2)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">per unit</p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center text-xs sm:text-sm text-green-600">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> In Stock
                          </span>
                          <Plus className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 group-hover:scale-110 transition-transform" />
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {!search && totalPages > 1 && (
                <div className="flex justify-center items-center mt-3 space-x-3 text-sm sm:text-base">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  <span>
                    Page {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cart Panel */}
          <div className="lg:w-1/3">
            <div className="sticky top-6 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-md border border-white/30 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" /> Cart ({cart.length})
                </h2>
              </div>

              <div className="p-4 sm:p-6 space-y-3 max-h-[65vh] overflow-y-auto">
                <AnimatePresence>
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-sm sm:text-base">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-2 opacity-30" />
                      <p>Your cart is empty</p>
                      <p className="mt-1 text-xs sm:text-sm">Click on medicines to add</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.medicine._id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{item.medicine.brandName}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {item.medicine.genericName} • {item.medicine.strength}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.medicine._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.medicine._id, item.quantity - 1)}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <span className="text-sm sm:text-base font-bold w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.medicine._id, item.quantity + 1)}
                              disabled={item.quantity >= item.medicine.stockDispenser}
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                          <p className="text-sm sm:text-base font-bold text-indigo-600">
                            ${(item.quantity * item.medicine.sellingPrice).toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {cart.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6 text-white">
                  <div className="flex justify-between items-center mb-3 sm:mb-5">
                    <span className="text-sm sm:text-base font-medium">Total</span>
                    <span className="text-xl sm:text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sell}
                    disabled={sellLoading}
                    className="w-full py-3 sm:py-4 bg-white text-indigo-600 rounded-xl font-bold text-sm sm:text-lg shadow-sm hover:shadow-md transition"
                  >
                    {sellLoading ? "Processing" : "Process Sale"}
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
