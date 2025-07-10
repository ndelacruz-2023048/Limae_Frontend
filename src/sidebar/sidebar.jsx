import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router";
import { LinksSidebar } from "../utils/DataEstatica";
import { ReportModal } from "../components/organismos/modal/ReportModal";

const icons = [
  { name: "mdi:view-dashboard-outline", active: false },
  { name: "mdi:book-outline", active: true },
  { name: "mdi:file-document-outline", active: false },
  { name: "mdi:image-outline", active: false },
  { name: "mdi:chat-outline", active: false },
];

export const Sidebar = () => {
  const [openReportModal, setOpenReportModal] = useState(false);

  return (
    <>
      <aside
        className="flex flex-col items-center  w-[100px] "
        style={{ minWidth: "80px", maxWidth: "120px" }}
      >
        <div
          className="flex flex-col items-center w-full"
          style={{ gap: "8%", marginTop: "8%", height: "80%" }}
        >
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

        <div>
          <button
            onClick={() => setOpenReportModal(true)}
            className="w-[60%] aspect-square flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-gray-200"
            style={{ minWidth: 48, maxWidth: 64 }}
          >
            <Icon icon="mdi:alert-circle-outline" width="28" height="28" />
          </button>
        </div>

        <div>
          <button
            className="w-[60%] aspect-square flex items-center justify-center rounded-full bg-white text-gray-500 hover:bg-gray-200"
            style={{ minWidth: 48, maxWidth: 64 }}
          >
            <Icon icon="mdi:cog-outline" width="28" height="28" />
          </button>
        </div>
      </aside>

      <ReportModal isOpen={openReportModal} onClose={() => setOpenReportModal(false)} />
    </>
  );
};