// components/QuickActions.tsx

import { Plus, Search, BarChart } from "lucide-react";

const QuickActions = () => {
  return (
    <section className="bg-gray-50 py-12 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
        <p className="text-gray-600 mb-8">Frequently used operations</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Add Medicine */}
          <div className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-center mb-4">
              <Plus size={24} />
            </div>
            <h3 className="text-lg font-bold text-center">Add Medicine</h3>
            <p className="text-sm text-center text-white mt-2">Add new inventory item</p>
          </div>

          {/* Search Stock */}
          <div className="bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-center mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-center">Search Stock</h3>
            <p className="text-sm text-center text-white mt-2">Find medicine details</p>
          </div>

          {/* View Reports */}
          <div className="bg-gray-700 hover:bg-gray-800 text-white rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-center mb-4">
              <BarChart size={24} />
            </div>
            <h3 className="text-lg font-bold text-center">View Reports</h3>
            <p className="text-sm text-center text-white mt-2">Generate analytics</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
