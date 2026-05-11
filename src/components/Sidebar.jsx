import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  Users, 
  Calendar, 
  FileText, 
  Stethoscope, 
  Wallet, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  PanelLeftClose,
  ClipboardList
} from 'lucide-react';

export default function Sidebar() {
  // State untuk mengontrol dropdown menu
  const [openMenus, setOpenMenus] = useState({
    appointments: true,
    staff: false,
    billing: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const activeStyle = "flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#E8EBF2] text-[#111827] font-bold transition-all";
  const inactiveStyle = "flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#6b7280] hover:bg-gray-50 hover:text-[#111827] transition-all";
  const subLinkStyle = ({ isActive }) => 
    `block pl-11 py-2 text-sm transition-all ${isActive ? "text-[#111827] font-bold" : "text-[#6b7280] hover:text-[#111827]"}`;

  return (
    <aside className="hidden md:flex w-[260px] bg-white border-r border-gray-100 flex-col sticky top-0 h-screen overflow-y-auto">
      
      {/* HEADER: Logo & Title */}
      <div className="p-6 mb-2 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Stethoscope className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-sm font-poppins font-bold text-[#111827] leading-none">PetTract</h1>
            <p className="text-[10px] text-gray-400 mt-1">Hospital Management</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION CONTENT */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        
        {/* Dashboard */}
        <NavLink to="/" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          <LayoutGrid size={18} />
          <span className="text-sm">Dashboard</span>
        </NavLink>

        {/* Patients */}
        <NavLink to="/patients" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          <Users size={18} />
          <span className="text-sm">Patients</span>
        </NavLink>

        {/* Appointments Dropdown */}
        <div className="space-y-1">
          <button 
            onClick={() => toggleMenu('appointments')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[#6b7280] hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Calendar size={18} />
              <span className="text-sm">Appointments</span>
            </div>
            <ChevronDown size={14} className={`transition-transform ${openMenus.appointments ? "rotate-180" : ""}`} />
          </button>
          
          {openMenus.appointments && (
            <div className="space-y-1">
              <NavLink to="/appointments" className={subLinkStyle}>All Appointments</NavLink>
              <NavLink to="/calendar" className={subLinkStyle}>Calendar View</NavLink>
            </div>
          )}
        </div>

        {/* Medical Records */}
        <NavLink to="/records" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          <FileText size={18} />
          <span className="text-sm">Medical Records</span>
        </NavLink>

        {/* Staff Dropdown */}
        <div className="space-y-1">
          <button 
            onClick={() => toggleMenu('staff')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[#6b7280] hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Users size={18} />
              <span className="text-sm">Staff</span>
            </div>
            <ChevronDown size={14} className={`transition-transform ${openMenus.staff ? "rotate-180" : ""}`} />
          </button>
          {openMenus.staff && (
            <div className="space-y-1">
              <NavLink to="/staff/all" className={subLinkStyle}>All Staff</NavLink>
              <NavLink to="/staff/profiles" className={subLinkStyle}>Doctor Profiles</NavLink>
              <NavLink to="/staff/departments" className={subLinkStyle}>Departments</NavLink>
            </div>
          )}
        </div>

        {/* Billing Dropdown */}
        <div className="space-y-1">
          <button 
            onClick={() => toggleMenu('billing')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[#6b7280] hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Wallet size={18} />
              <span className="text-sm">Billing</span>
            </div>
            <ChevronDown size={14} className={`transition-transform ${openMenus.billing ? "rotate-180" : ""}`} />
          </button>
          {openMenus.billing && (
            <div className="space-y-1">
              <NavLink to="/billing/overview" className={subLinkStyle}>Overview</NavLink>
              <NavLink to="/billing/invoices" className={subLinkStyle}>Invoices</NavLink>
            </div>
          )}
        </div>

        {/* Reports & Analytics */}
        <NavLink to="/reports" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          <ClipboardList size={18} />
          <span className="text-sm">Reports</span>
        </NavLink>
        
        <NavLink to="/analytics" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          <BarChart3 size={18} />
          <span className="text-sm">Analytics</span>
        </NavLink>

        {/* Settings */}
        <NavLink to="/settings" className={({isActive}) => isActive ? activeStyle : inactiveStyle}>
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </NavLink>
      </nav>

      {/* FOOTER: Collapse Button */}
      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-[#6b7280] hover:text-[#111827] transition-all">
          <PanelLeftClose size={18} />
          <span className="text-sm">Collapse</span>
        </button>
      </div>
    </aside>
  );
}