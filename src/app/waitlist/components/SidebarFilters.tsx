"use client";
import Image from "next/image";
import { Calendar } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
  values: {
    postcode: string;
    status: string[];
    vendor: string[];
    services: string[];
    startDate: string | null;
    endDate: string | null;
  };
  onChange: {
    postcode: (v: string) => void;
    status: (v: string[]) => void;
    vendor: (v: string[]) => void;
    services: (v: string[]) => void;
    startDate: (v: string | null) => void;
    endDate: (v: string | null) => void;
  };
};

export default function SidebarFilters({
  open,
  onClose,
  onApply,
  onClear,
  values,
  onChange,
}: Props) {
  const toggleList = (
    list: string[],
    setList: (v: string[]) => void,
    v: string
  ) => setList(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-80 bg-primary border-r p-4 transform transition-transform duration-300 overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2 mb-6">
          <Image src="/logo.png" alt="glerr" width={40} height={40} />
          <div className="font-bold">
            <span className="text-blue-600">Admin Panel</span>
          </div>
        </div>

        <div className="card p-3 mb-6">
          <div className="font-semibold">User Management</div>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-1">Postcode</label>
          <input
            value={values.postcode}
            onChange={(e) => onChange.postcode(e.target.value.toUpperCase())}
            placeholder="ZIP"
            className="border rounded-lg w-full h-9 px-3 bg-white"
          />
        </div>

        <div className="mb-5">
          <h3 className="font-semibold mb-2">Registration Status</h3>
          {["Onboarded", "Rejected"].map((s) => (
            <label
              key={s}
              className="flex items-center gap-2 mb-1 cursor-pointer"
            >
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={values.status.includes(s)}
                onChange={() => toggleList(values.status, onChange.status, s)}
              />
              {s}
            </label>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Date Registered</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative bg-white border-[3px] border-blue-500 rounded-xl  px-1 py-3">
              <span className="absolute -top-3 left-3 bg-white px-1 text-blue-600 text-xs font-semibold">
                Date
              </span>
              <div className="flex items-center justify-between mb-1">
                <Calendar className="text-gray-500" size={20} />
              </div>
              <input
                type="date"
                placeholder="Start"
                value={values.startDate ?? ""}
                onChange={(e) => onChange.startDate(e.target.value || null)}
                className="w-full h-10 border border-gray-300 rounded text-gray-600 placeholder-gray-800 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500">MM/DD/YYYY</span>
            </div>

            <div className="relative bg-white border-[3px] border-blue-500 rounded-xl px-1 py-3">
              <span className="absolute -top-3 left-3 bg-white px-1 text-blue-600 text-xs font-semibold">
                Date
              </span>
              <div className="flex items-center justify-between mb-1">
                <Calendar className="text-gray-500" size={20} />
              </div>
              <input
                type="date"
                placeholder="End"
                value={values.endDate ?? ""}
                onChange={(e) => onChange.endDate(e.target.value || null)}
                className="w-full h-10 border border-gray-300 rounded text-gray-600 placeholder-gray-800 appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="text-xs text-gray-500">MM/DD/YYYY</span>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h3 className="font-semibold mb-2">Vendor Type</h3>
          {["Independent", "Company"].map((v) => (
            <label
              key={v}
              className="flex items-center gap-2 mb-1 cursor-pointer"
            >
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={values.vendor.includes(v)}
                onChange={() => toggleList(values.vendor, onChange.vendor, v)}
              />
              {v}
            </label>
          ))}
        </div>

        <div className="mb-10">
          <h3 className="font-semibold mb-2">Service Offering</h3>
          {["Housekeeping", "Window Cleaning", "Car Valet"].map((s) => (
            <label
              key={s}
              className="flex cursor-pointer items-center gap-2 mb-1"
            >
              <input
                className="cursor-pointer"
                type="checkbox"
                checked={values.services.includes(s)}
                onChange={() =>
                  toggleList(values.services, onChange.services, s)
                }
              />
              {s}
            </label>
          ))}
        </div>

        <div className="flex flex-col gap-3 items-center pb-6">
          <button
            onClick={onApply}
            className="bg-blue-600 text-white py-2 px-8 rounded-full shadow-md hover:bg-blue-700 transition transform hover:scale-105 cursor-pointer"
          >
            Filter
          </button>
          <button
            onClick={onClear}
            className="border py-2 px-8 rounded-full bg-gray-100 hover:bg-gray-300 transition transform hover:scale-105  cursor-pointer"
          >
            Clear
          </button>
        </div>
      </aside>
    </>
  );
}
