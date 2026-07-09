import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  ClipboardList,
} from "lucide-react";

export default function Sidebar() {
  // State untuk mengontrol dropdown menu
  const [openMenus, setOpenMenus] = useState({
    appointments: true,
    staff: false,
    billing: false,
  });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const activeStyle =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#E8EBF2] text-[#111827] font-bold transition-all";
  const inactiveStyle =
    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#6b7280] hover:bg-gray-50 hover:text-[#111827] transition-all";
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
            <h1 className="text-sm font-poppins font-bold text-[#111827] leading-none">
              PetTract
            </h1>
            <p className="text-[10px] text-gray-400 mt-1">
              Hospital Management
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION CONTENT */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {/* Dashboard */}
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <LayoutGrid size={18} />
          <span className="text-sm">Dashboard</span>
        </NavLink>

        {/* Patients */}
        <NavLink
          to="/admin/patients"
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <Users size={18} />
          <span className="text-sm">Patients</span>
        </NavLink>

        {/* Data User */}
        <NavLink
          to="/admin/data-user"
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <Users size={18} />
          <span className="text-sm">Data User</span>
        </NavLink>

        {/* Appointments Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => toggleMenu("appointments")}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-[#6b7280] hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Calendar size={18} />
              <span className="text-sm">Appointments</span>
            </div>
            <ChevronDown
              size={14}
              className={`transition-transform ${openMenus.appointments ? "rotate-180" : ""}`}
            />
          </button>

          {openMenus.appointments && (
            <div className="space-y-1">
              <NavLink to="/admin/appointments" className={subLinkStyle}>
                All Appointments
              </NavLink>
              <NavLink to="/admin/calendar" className={subLinkStyle}>
                Calendar View
              </NavLink>
            </div>
          )}
        </div>

        {/* Medical Records */}
        <NavLink
          to="/admin/medical-records"
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
          <FileText size={18} />
          <span className="text-sm">Medical Records</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/admin/settings"
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
        >
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
