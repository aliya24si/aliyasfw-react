import React from 'react';

export default function TabSystem({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex border-b border-gray-200 w-full overflow-x-auto bg-gray-50 p-1 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 min-w-[100px] text-center py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === tab 
              ? "bg-white text-teks shadow-sm" 
              : "text-teks-samping hover:text-teks"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}