import './fonts.css';
import React from "react";
import { Plane, QrCode } from "lucide-react";

export function BoardingPass() {
  return (
    <div 
      style={{ width: "100%", height: "100%" }} 
      className="bg-zinc-100 overflow-hidden font-['Plus_Jakarta_Sans'] text-zinc-900 relative"
    >
      <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-600 rounded-b-[2.5rem]"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6 pt-14 flex justify-between items-center text-white">
        <h1 className="text-xl font-bold tracking-tight">Boarding Pass</h1>
        <div className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-wider">
          First Class
        </div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 px-5 mt-4">
        <div className="bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
          
          {/* Flight Route */}
          <div className="p-6 pb-8 border-b-2 border-zinc-100 border-dashed relative">
            {/* Cutouts */}
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-zinc-100 rounded-full shadow-[inset_-3px_3px_5px_rgba(0,0,0,0.02)]"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-zinc-100 rounded-full shadow-[inset_3px_3px_5px_rgba(0,0,0,0.02)]"></div>

            <div className="flex justify-between items-center mb-8 mt-2">
              <div className="flex flex-col w-20">
                <span className="text-[2.75rem] leading-none font-bold text-zinc-900 tracking-tighter">JFK</span>
                <span className="text-sm font-medium text-zinc-400 mt-1">New York</span>
              </div>
              
              <div className="flex-1 px-2 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-blue-200">
                  <div className="w-2 h-2 rounded-full border-2 border-blue-600 bg-white z-10 shadow-sm"></div>
                  <div className="flex-1 border-t-2 border-dashed border-blue-200 mx-2"></div>
                  <div className="bg-white p-2 rounded-full z-10 shadow-sm">
                    <Plane className="w-5 h-5 text-blue-600 transform rotate-45" />
                  </div>
                  <div className="flex-1 border-t-2 border-dashed border-blue-200 mx-2"></div>
                  <div className="w-2 h-2 rounded-full border-2 border-blue-600 bg-zinc-300 z-10 shadow-sm"></div>
                </div>
                <span className="text-xs font-bold text-zinc-400 mt-3 tracking-widest uppercase">5H 30M</span>
              </div>
              
              <div className="flex flex-col text-right w-20">
                <span className="text-[2.75rem] leading-none font-bold text-zinc-900 tracking-tighter">LHR</span>
                <span className="text-sm font-medium text-zinc-400 mt-1">London</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-zinc-50 rounded-2xl p-4">
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Flight</span>
                <span className="block text-lg font-bold text-zinc-800">BA 0112</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Date</span>
                <span className="block text-lg font-bold text-zinc-800">24 Oct</span>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="p-6 pb-8 border-b-2 border-zinc-100 border-dashed relative">
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-zinc-100 rounded-full shadow-[inset_-3px_-3px_5px_rgba(0,0,0,0.02)]"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-zinc-100 rounded-full shadow-[inset_3px_-3px_5px_rgba(0,0,0,0.02)]"></div>

            <div className="grid grid-cols-3 gap-y-8">
              <div className="col-span-3">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Passenger</span>
                <span className="block text-xl font-bold text-zinc-800">Alex Thompson</span>
              </div>
              
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Gate</span>
                <span className="block text-2xl font-bold text-blue-600">B24</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Seat</span>
                <span className="block text-2xl font-bold text-zinc-800">2A</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Boarding</span>
                <span className="block text-2xl font-bold text-zinc-800">18:40</span>
              </div>
            </div>
          </div>

          {/* QR */}
          <div className="p-6 bg-white flex flex-col items-center justify-center">
            <div className="p-3 border-2 border-zinc-100 rounded-2xl relative">
              <QrCode className="w-32 h-32 text-zinc-900" strokeWidth={1.5} />
              {/* Corner markers for aesthetic */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-zinc-900 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-zinc-900 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-zinc-900 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-zinc-900 rounded-br-lg"></div>
            </div>
            <span className="mt-4 font-mono text-xs tracking-[0.2em] font-medium text-zinc-500">1893 7402 8471 93</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full px-5 text-center">
        <button className="bg-zinc-900 text-white w-full py-4 rounded-2xl font-bold shadow-[0_8px_16px_-4px_rgba(0,0,0,0.3)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          <span>Add to Apple Wallet</span>
        </button>
      </div>
    </div>
  );
}
