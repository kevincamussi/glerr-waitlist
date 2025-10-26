export type Provider = {
  id: number;
  email: string;
  phone: string;
  postcode: string;
  vendorType: "Independent" | "Company";
  serviceOffering: "Housekeeping" | "Window Cleaning" | "Car Valet";
  signupDate: string;
  status: "Onboarded" | "Rejected" | "-";
};

export function formatDate(iso: string) {
  if (!iso) return "-";
  const date = new Date(iso);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export type SortKey = keyof Provider;

export function sortBy<T extends Provider>(
  arr: T[],
  key: SortKey,
  dir: "asc" | "desc"
): T[] {
  const copy = [...arr];
  copy.sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (key === "signupDate") {
      const dA = new Date(valA as string).getTime();
      const dB = new Date(valB as string).getTime();
      return dir === "asc" ? dA - dB : dB - dA;
    }

    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();

    if (strA < strB) return dir === "asc" ? -1 : 1;
    if (strA > strB) return dir === "asc" ? 1 : -1;
    return 0;
  });
  return copy;
}

export function paginate<T>(arr: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(arr.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const items = arr.slice(start, start + perPage);
  return { items, pages: totalPages };
}

export function applyAllFilters(
  arr: Provider[],
  filters: {
    postcode: string;
    status: string[];
    vendor: string[];
    services: string[];
    startDate: string | null;
    endDate: string | null;
  }
) {
  return arr.filter((item) => {
    if (
      filters.postcode &&
      !item.postcode.toUpperCase().includes(filters.postcode.toUpperCase())
    )
      return false;
    if (filters.status.length && !filters.status.includes(item.status))
      return false;
    if (filters.vendor.length && !filters.vendor.includes(item.vendorType))
      return false;
    if (
      filters.services.length &&
      !filters.services.includes(item.serviceOffering)
    )
      return false;
    if (
      filters.startDate &&
      new Date(item.signupDate) < new Date(filters.startDate)
    )
      return false;
    if (
      filters.endDate &&
      new Date(item.signupDate) > new Date(filters.endDate)
    )
      return false;

    return true;
  });
}

export function searchByEmail(arr: Provider[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return arr;
  return arr.filter((item) => item.email.toLowerCase().includes(q));
}
