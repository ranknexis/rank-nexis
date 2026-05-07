"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

export default function LeadExportButton({ leads }: { leads: any[] }) {
  const exportToCSV = () => {
    try {
      const headers = ["Name", "Email", "Phone", "Company", "Service", "Budget", "Message", "Status", "Date"];
      const rows = leads.map(l => [
        l.name,
        l.email,
        l.phone || "",
        l.company || "",
        l.service || "",
        l.budget || "",
        `"${l.message.replace(/"/g, '""')}"`,
        l.status,
        new Date(l.createdAt).toLocaleDateString()
      ]);

      const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `ranknexis_leads_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Leads exported successfully.");
    } catch (err) {
      toast.error("Failed to export leads.");
    }
  };

  return (
    <button 
      onClick={exportToCSV}
      className="btn-outline h-14 px-8 text-[10px] font-bold uppercase flex items-center gap-3"
    >
      <Download size={18} /> Export CSV
    </button>
  );
}
