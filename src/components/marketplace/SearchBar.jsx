import React, { useState, useEffect } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { T } from "../../theme/tokens.js";
import { fetchAutocompleteSuggestions } from "../../services/api.js";

export default function SearchBar({ value, onChange, onClear, onSelectSuggestion }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!value || value.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      const list = await fetchAutocompleteSuggestions(value);
      setSuggestions(list);
    }, 200);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative mx-4 mt-3 z-30">
      <div className="relative">
        <Search size={16} color={T.sub} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={value}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search live phones, tablets, laptops..."
          className="w-full pl-9 pr-8 py-2.5 rounded-xl text-xs bg-white border transition-colors outline-none focus:border-purple-600 shadow-sm"
          style={{ borderColor: T.line, color: T.ink }}
        />
        {value && (
          <button
            onClick={() => {
              onClear();
              setSuggestions([]);
              setShowDropdown(false);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={14} color={T.sub} />
          </button>
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border overflow-hidden z-40"
          style={{ borderColor: T.line }}
        >
          <div className="p-2 border-b bg-gray-50 flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase">
            <Sparkles size={11} color={T.purple600} /> Live Device Suggestions
          </div>
          {suggestions.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onChange(item.name);
                setShowDropdown(false);
              }}
              className="w-full px-3 py-2 text-left text-xs hover:bg-purple-50 flex items-center justify-between border-b last:border-b-0 transition-colors"
              style={{ borderColor: T.line }}
            >
              <span className="font-semibold text-gray-800">{item.name}</span>
              <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                {item.brand}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
