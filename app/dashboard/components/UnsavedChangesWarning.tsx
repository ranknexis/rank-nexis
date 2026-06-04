"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";

interface UnsavedChangesWarningProps {
  isDirty: boolean;
  isBusy?: boolean;
}

export default function UnsavedChangesWarning({ isDirty, isBusy = false }: UnsavedChangesWarningProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  // 1. Intercept browser reload, tab close, or window navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty || isBusy) {
        e.preventDefault();
        e.returnValue = isBusy
          ? "An operation is currently in progress. Are you sure you want to leave?"
          : "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isBusy]);

  // 2. Intercept client-side link clicks (Sidebar, Cancel links, logo clicks, etc.)
  useEffect(() => {
    if (!isDirty && !isBusy) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor) {
        const href = anchor.getAttribute("href");
        // Only intercept internal dashboard or public links that change routing
        if (href && !href.startsWith("#") && !href.startsWith("javascript:") && href !== window.location.pathname) {
          const targetAttr = anchor.getAttribute("target");
          if (targetAttr === "_blank") return; // Allow new tab links to open normally

          e.preventDefault();
          e.stopPropagation();
          setPendingUrl(href);
          setShowModal(true);
        }
      }
    };

    // Use capture phase to intercept the click before Next.js Link component handles it
    document.addEventListener("click", handleAnchorClick, true);
    return () => document.removeEventListener("click", handleAnchorClick, true);
  }, [isDirty, isBusy]);

  // 3. Intercept browser back/forward buttons (Popstate)
  useEffect(() => {
    if (!isDirty && !isBusy) return;

    // Push a dummy state to block the immediate back movement
    window.history.pushState(null, "", window.location.pathname);

    const handlePopState = () => {
      // Re-push immediately to keep the user locked on this page while confirmation is open
      window.history.pushState(null, "", window.location.pathname);
      setPendingUrl("BACK_NAVIGATION");
      setShowModal(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty, isBusy]);

  const handleConfirm = () => {
    setShowModal(false);
    if (pendingUrl === "BACK_NAVIGATION") {
      // Go back twice: once to pop the re-pushed dummy, once to pop the page itself
      window.history.go(-2);
    } else if (pendingUrl) {
      router.push(pendingUrl);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setPendingUrl(null);
  };

  return (
    <ConfirmationModal
      isOpen={showModal}
      onClose={handleCancel}
      onConfirm={handleConfirm}
      title={isBusy ? "Operation in Progress" : "Discard Unsaved Changes?"}
      message={isBusy 
        ? "An operation is currently running. Leaving now may cancel or disrupt the process. Are you sure you want to leave?"
        : "You have unsaved changes. If you leave this page, your changes will be permanently lost."}
      confirmText={isBusy ? "Leave Anyway" : "Discard & Leave"}
      cancelText={isBusy ? "Wait / Keep Editing" : "Keep Editing"}
      type="warning"
    />
  );
}
