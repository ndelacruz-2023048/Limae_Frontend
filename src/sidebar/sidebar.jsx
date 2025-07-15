import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router";
import { LinksSidebar } from "../utils/DataEstatica";
import { ReportModal } from "../components/organismos/modal/ReportModal";

export const Sidebar = () => {
  const [openReportModal, setOpenReportModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex flex-col items-center w-[100px]" style={{ minWidth: "80px", maxWidth: "120px" }}>
        <div className="flex flex-col items-center w-full" style={{ gap: "8%", marginTop: "8%", height: "80%" }}>
          {LinksSidebar.map(({ name, to }) => (
            <NavLink
              to={to}
              key={name}
              className={({ isActive }) =>
                `w-[20%] aspect-square flex items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? "bg-black text-white shadow-lg"
                    : "bg-white text-gray-500 hover:bg-gray-200"
                }`
              }
              style={{ minWidth: 48, maxWidth: 64 }}
            >
              <Icon icon={name} width="20" height="20" />
            </NavLink>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => setOpenReportModal(true)}
            className="w-[60%] aspect-square flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-gray-200"
            style={{ minWidth: 48, maxWidth: 64 }}
          >
            <Icon icon="mdi:alert-circle-outline" width="28" height="28" />
          </button>

          <button
            className="w-[60%] aspect-square flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-gray-200"
            style={{ minWidth: 48, maxWidth: 64 }}
          >
            <Icon icon="mdi:cog-outline" width="28" height="28" />
          </button>
        </div>
      </aside>

      {/* Botón menú móvil */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={handleToggleMobile}
          className="p-2 bg-white border rounded shadow text-black"
        >
          <Icon icon="mdi:menu" width="28" height="28" />
        </button>
      </div>

      {/* Menú lateral móvil */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={closeMobileMenu}>
          <aside
            className="fixed top-0 left-0 h-full w-[70%] max-w-xs bg-white shadow-xl z-50 p-4 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menú</h2>
              <button onClick={closeMobileMenu}>
                <Icon icon="mdi:close" width="24" height="24" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {LinksSidebar.map(({ name, to }) => (
                <NavLink
                  to={to}
                  key={name}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  <Icon icon={name} width="20" height="20" />
                  <span className="text-sm">Opción</span>
                </NavLink>
              ))}
            </div>

            <hr />

            <div className="flex flex-col gap-4 mt-auto">
              <button
                onClick={() => {
                  setOpenReportModal(true);
                  closeMobileMenu();
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <Icon icon="mdi:alert-circle-outline" width="20" height="20" />
                <span className="text-sm">Reportar</span>
              </button>

              <button
                className="flex items-center gap-3 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <Icon icon="mdi:cog-outline" width="20" height="20" />
                <span className="text-sm">Ajustes</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Modal de reporte */}
      <ReportModal isOpen={openReportModal} onClose={() => setOpenReportModal(false)} />
    </>
  );
};