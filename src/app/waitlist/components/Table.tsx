"use client";
import { Provider, SortKey, formatDate, sortBy, paginate } from "@/lib/utils";
import Modal from "./Modal";
import { useEffect, useMemo, useState } from "react";
import { Pencil } from "lucide-react";

export default function Table({ data }: { data: Provider[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "email",
    dir: "asc",
  });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState<Provider | null>(null);

  const ordered = useMemo(() => sortBy(data, sort.key, sort.dir), [data, sort]);
  const perPage = 10;
  const { items, pages } = useMemo(
    () => paginate(ordered, page, perPage),
    [ordered, page]
  );

  const pageIds = items.map((r) => r.id);
  const allChecked = pageIds.every((id) => selected.includes(id));

  const toggleHeader = (checked: boolean) => {
    if (checked)
      setSelected((prev) => Array.from(new Set([...prev, ...pageIds])));
    else setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
  };

  const toggleRow = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const onSort = (key: SortKey) =>
    setSort((s) => ({
      key,
      dir: s.key === key ? (s.dir === "asc" ? "desc" : "asc") : "asc",
    }));

  useEffect(() => setSelected([]), [data]);

  useEffect(() => {
    const handler = () =>
      document.dispatchEvent(
        new CustomEvent("toast:show", { detail: "Filters applied!" })
      );
    document.addEventListener("filters:apply", handler);
    return () => document.removeEventListener("filters:apply", handler);
  }, []);

  const headers: { label: string; key: SortKey }[] = [
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phone" },
    { label: "Postcode", key: "postcode" },
    { label: "Vendor Type", key: "vendorType" },
    { label: "Service Offering", key: "serviceOffering" },
    { label: "Signup Date", key: "signupDate" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm">
      <table className="table min-w-[960px]">
        <thead>
          <tr className="text-sm bg-primary border-b">
            <th className="w-10 p-2">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(e) => toggleHeader(e.target.checked)}
              />
            </th>
            {headers.map((h) => (
              <th
                key={h.key}
                onClick={() => onSort(h.key)}
                className="cursor-pointer select-none transition-colors hover:text-blue-600"
              >
                {h.label}
                <span className="ml-1 text-xs text-gray-500">
                  {sort.key === h.key ? (sort.dir === "asc" ? "▲" : "▼") : ""}
                </span>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((row, idx) => (
            <tr
              key={row.id}
              className={`transition-colors ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50`}
            >
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={selected.includes(row.id)}
                  onChange={() => toggleRow(row.id)}
                />
              </td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.postcode}</td>
              <td>{row.vendorType}</td>
              <td>{row.serviceOffering}</td>
              <td>{formatDate(row.signupDate)}</td>
              <td>{row.status}</td>
              <td className="text-center">
                <button
                  onClick={() => setOpen(row)}
                  className="p-1 text-blue-600 hover:text-blue-800 cursor-pointer transition-transform hover:scale-110"
                >
                  <Pencil size={16} strokeWidth={2} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center gap-2 py-4">
        <button
          className="btn btn-outline h-9 px-3 cursor-pointer"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          «
        </button>
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`cursor-pointer h-9 px-3 rounded ${
              i + 1 === page
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100 border"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-outline h-9 px-3 cursor-pointer"
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          disabled={page === pages}
        >
          »
        </button>
      </div>

      {open && <Modal provider={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
