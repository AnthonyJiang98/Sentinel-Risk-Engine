"use client";

import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  // NEW: State to track selected risk filter
  const [selectedRisk, setSelectedRisk] = useState("All");

  const transactions = [
    { id: "TX1002", user: "Alice Smith", amount: "$12,400", status: "Flagged", risk: "High" },
    { id: "TX1003", user: "Bob Jones", amount: "$45.00", status: "Verified", risk: "Low" },
    { id: "TX1004", user: "Charlie Day", amount: "$2,100", status: "Pending", risk: "Medium" },
    { id: "TX1005", user: "Diane Prince", amount: "$8,900", status: "Flagged", risk: "High" },
  ];

  // NEW logic: Filter by BOTH search and risk level
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === "All" || tx.risk === selectedRisk;
    
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-slate-900 font-sans">
      <header className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sentinel Risk Engine</h1>
            <p className="text-slate-500 text-sm">Enterprise Transaction Monitoring</p>
          </div>
          
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search ID or User..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 bg-white text-sm outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* NEW: Filter Buttons */}
        <div className="flex gap-2 items-center text-sm">
          <span className="text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter by:
          </span>
          {["All", "High", "Medium", "Low"].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedRisk(level)}
              className={`px-4 py-1.5 rounded-full border transition-all ${
                selectedRisk === level 
                ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </header>

      {/* Stats and Table follow same pattern as before... */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Transaction ID</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Entity</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Risk Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-mono text-blue-600">{tx.id}</td>
                <td className="p-4 text-sm font-medium">{tx.user}</td>
                <td className="p-4 text-sm font-semibold">{tx.amount}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    tx.risk === 'High' ? 'bg-red-50 text-red-700 border border-red-100' : 
                    tx.risk === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    {tx.risk === 'High' && <AlertTriangle className="w-3 h-3" />}
                    {tx.risk === 'Low' && <CheckCircle className="w-3 h-3" />}
                    {tx.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}