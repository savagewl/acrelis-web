"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import MenuOverlay from "@/components/base/MenuOverlay";
import LeaveRequestModal from "@/components/modals/LeaveRequestModal";
import ExitIntentPopup from "@/components/modals/ExitIntentPopup";

const EXIT_POPUP_SESSION_KEY = "acrelis:exit-popup-shown";
const EXIT_POPUP_DELAY_MS = 60_000;

interface ModalContextValue {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  isLeaveRequestOpen: boolean;
  openLeaveRequest: () => void;
  closeLeaveRequest: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLeaveRequestOpen, setLeaveRequestOpen] = useState(false);
  const [isExitPopupOpen, setExitPopupOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openLeaveRequest = useCallback(() => setLeaveRequestOpen(true), []);
  const closeLeaveRequest = useCallback(() => setLeaveRequestOpen(false), []);

  // ТЗ: попап автозахвата открывается через 60с на сайте, повторно за сессию не показывается.
  useEffect(() => {
    if (sessionStorage.getItem(EXIT_POPUP_SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setExitPopupOpen(true);
      sessionStorage.setItem(EXIT_POPUP_SESSION_KEY, "1");
    }, EXIT_POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isMenuOpen,
        openMenu,
        closeMenu,
        isLeaveRequestOpen,
        openLeaveRequest,
        closeLeaveRequest,
      }}
    >
      {children}
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
      <LeaveRequestModal isOpen={isLeaveRequestOpen} onClose={closeLeaveRequest} />
      <ExitIntentPopup
        isOpen={isExitPopupOpen}
        onClose={() => setExitPopupOpen(false)}
      />
    </ModalContext.Provider>
  );
}
