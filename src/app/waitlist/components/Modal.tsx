"use client";

import type { Provider } from "@/lib/utils";
import { Mail, Phone, MapPin, Calendar, User, FileText, X } from "lucide-react";

export default function Modal({
  provider,
  onClose,
}: {
  provider: Provider;
  onClose: () => void;
}) {
  if (!provider) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 pb-8 pt-40 md:pt-0  overflow-y-scroll ">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg relative p-6 animate-fadeIn ">
        <button
          onClick={onClose}
          className="absolute  top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-lg font-semibold mb-2">
          <User className="text-gray-700" size={18} />
          User Details
        </div>

        <div className="mb-6  md:flex  md:justify-between">
          <div>
            <h3 className="font-bold text-xl text-gray-900 ">
              {provider.vendorType === "Company"
                ? `${provider.serviceOffering} Solutions`
                : provider.email.split("@")[0]}
            </h3>
            <p className="text-gray-500 text-sm flex items-center gap-2 mb-1">
              <Mail size={14} />
              {provider.email}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="text-sm  bg-gray-100 px-2 m-auto rounded-4xl  border text-gray-700">
              Customer
            </span>
            <span className="text-sm bg-gray-100 px-2 m-auto rounded-4xl border text-gray-700">
              Invited
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4" />

        <div className="mb-6">
          <div className="flex items-center gap-2 text-base font-semibold mb-2">
            <Mail size={16} /> Contact Information
          </div>
          <div className="text-gray-700 text-sm md:flex justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={14} />
                <span>{provider.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>United Kingdom</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2  mb-2">
                <Phone size={14} />
                <span>{provider.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>Signed up {provider.signupDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-2" />

        <div className="mb-4">
          <div className="flex items-center gap-2 text-base font-semibold mb-3">
            Customer Details
          </div>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              <div className="font-medium flex">
                <User className="mr-4" size={16} />
                <span>{provider.vendorType}</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium">User Details: </h3>

              <span>{provider.serviceOffering}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4" />

        <div>
          <div className="flex items-center gap-2 text-base font-semibold mb-2">
            <FileText size={16} /> Internal Notes
          </div>
          <div className="border rounded-md p-2 bg-gray-50">
            <textarea
              className="w-full h-20 text-sm bg-gray-50 outline-none resize-none text-gray-600"
              placeholder="No Note Added yet"
            />
          </div>
          <button className="mt-2 text-sm flex items-center gap-1 text-gray-700 hover:text-gray-900 transition">
            ✎ Edit
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-around ">
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-2 px-10 rounded-full shadow-md transition mt-2">
            Onboard
          </button>
          <button className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-medium py-2 px-10 rounded-full shadow-md transition mt-2">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
