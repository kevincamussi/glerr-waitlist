"use client";

import SidebarFilters from "./components/SidebarFilters";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import Toast from "./components/Toast";
import { useMemo, useState } from "react";
import { allProviders } from "@/lib/data";
import { applyAllFilters, searchByEmail } from "@/lib/utils";

export default function WaitlistPage() {
  const [raw] = useState(allProviders);
  const [postcode, setPostcode] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [vendor, setVendor] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    const f = applyAllFilters(raw, {
      postcode,
      status,
      vendor,
      services,
      startDate,
      endDate,
    });
    return searchByEmail(f, query);
  }, [raw, postcode, status, vendor, services, startDate, endDate, query]);

  const handleApplyFilters = () => {
    document.dispatchEvent(new CustomEvent("filters:apply"));
    setSidebarOpen(false);
  };

  const handleClearFilters = () => {
    setPostcode("");
    setStatus([]);
    setVendor([]);
    setServices([]);
    setStartDate(null);
    setEndDate(null);
    setSidebarOpen(false);
    document.dispatchEvent(
      new CustomEvent("toast:show", { detail: "Filters cleared" })
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarFilters
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        values={{ postcode, status, vendor, services, startDate, endDate }}
        onChange={{
          postcode: setPostcode,
          status: setStatus,
          vendor: setVendor,
          services: setServices,
          startDate: setStartDate,
          endDate: setEndDate,
        }}
      />

      <main className="flex-1 p-6 overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <button
              className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setSidebarOpen(true)}
            >
              Open Filters
            </button>

            <div className="md:hidden">
              <SearchBar value={query} onChange={setQuery} />
            </div>
          </div>

          <div className="hidden md:block">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>

        <div className="card overflow-hidden">
          <Table data={filtered} />
        </div>

        <Toast />
      </main>
    </div>
  );
}
