import React, { useState } from 'react';

// ============================================================
// Table primitives — dark admin theme
// ============================================================
export const Table = ({ children, className = '' }) => (
  <table className={`w-full border-collapse ${className}`}>{children}</table>
);

export const Thead = ({ children }) => <thead>{children}</thead>;
export const Tbody = ({ children }) => <tbody>{children}</tbody>;

export const Tr = ({ children, className = '', ...props }) => (
  <tr className={`hover:bg-d-bg-2 ${className}`} {...props}>{children}</tr>
);

export const Th = ({ children, className = '', align, ...props }) => (
  <th
    className={`px-6 py-3 text-[11px] font-semibold text-d-fg-3 uppercase tracking-[0.05em] bg-d-bg-2 border-b border-d-border whitespace-nowrap ${align === 'right' ? 'text-right' : 'text-left'} ${className}`}
    {...props}
  >
    {children}
  </th>
);

export const Td = ({ children, className = '', align, ...props }) => (
  <td
    className={`px-6 py-3.5 text-[13.5px] text-d-fg border-b border-d-border align-middle last:[tr:last-child_&]:border-b-0 ${align === 'right' ? 'text-right' : ''} ${className}`}
    {...props}
  >
    {children}
  </td>
);

// ============================================================
// TableToolbar — Filament-style toolbar with filters, search,
// column toggle, export, and pagination
// ============================================================

const ChevronDown = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const SearchIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
  </svg>
);

const FilterButton = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-[12.5px] text-d-fg-2 cursor-pointer hover:bg-d-card-2 hover:text-d-fg transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {value || label}
        <ChevronDown />
      </button>
      {open && options && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-30 bg-d-card border border-d-border-2 rounded-lg p-1 min-w-40 shadow-[0_14px_40px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.2)]">
          {options.map(opt => (
            <button
              key={opt}
              className={`flex items-center w-full px-3 py-2 rounded-md text-[13px] font-medium cursor-pointer border-none text-left transition-colors ${opt === value ? 'bg-d-card-2 text-d-fg' : 'bg-transparent text-d-fg-2 hover:bg-d-card-2 hover:text-d-fg'}`}
              onClick={() => { onChange?.(opt); setOpen(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ColumnToggle = ({ columns, visible, onToggle }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-[12.5px] text-d-fg-2 cursor-pointer hover:bg-d-card-2 hover:text-d-fg transition-colors"
        onClick={() => setOpen(o => !o)}
        title="Toggle columns"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
        Columns
        <ChevronDown />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] right-0 z-30 bg-d-card border border-d-border-2 rounded-lg p-1.5 min-w-48 shadow-[0_14px_40px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.2)]">
          {columns.map(col => (
            <label
              key={col}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] text-d-fg-2 cursor-pointer hover:bg-d-card-2 hover:text-d-fg"
            >
              <span className={`w-4 h-4 rounded border inline-flex items-center justify-center shrink-0 transition-colors ${visible.includes(col) ? 'bg-indigo border-indigo text-white' : 'bg-d-bg-2 border-d-border-2 text-transparent'}`}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </span>
              {col}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export const TableToolbar = ({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  filters,
  columns,
  visibleColumns,
  onToggleColumn,
  onExport,
  pagination,
}) => (
  <div className="flex items-center gap-3 px-6 py-3.5 border-b border-d-border bg-d-bg-2">
    {/* Search */}
    {onSearchChange && (
      <div className="inline-flex items-center gap-2 bg-d-card border border-d-border px-3.5 py-2 rounded-lg w-72 text-d-fg-3 text-sm">
        <SearchIcon />
        <input
          type="text"
          className="bg-transparent border-none outline-none text-d-fg text-sm w-full placeholder:text-d-fg-4 font-sans"
          placeholder={searchPlaceholder}
          value={searchValue || ''}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
    )}

    {/* Filters */}
    {filters?.map(f => (
      <FilterButton key={f.label} {...f} />
    ))}

    <div className="ml-auto flex items-center gap-2">
      {/* Column toggle */}
      {columns && onToggleColumn && (
        <ColumnToggle columns={columns} visible={visibleColumns || columns} onToggle={onToggleColumn} />
      )}

      {/* Export */}
      {onExport && (
        <button
          className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-[12.5px] text-d-fg-2 cursor-pointer hover:bg-d-card-2 hover:text-d-fg transition-colors"
          onClick={onExport}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Export
        </button>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center gap-1.5 text-[12.5px] text-d-fg-3">
          <span>{pagination.from}–{pagination.to} of {pagination.total}</span>
          <button
            className="w-7 h-7 rounded-md inline-flex items-center justify-center bg-d-card border border-d-border-2 text-d-fg-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-d-card-2 hover:text-d-fg transition-colors"
            disabled={!pagination.hasPrev}
            onClick={pagination.onPrev}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="w-7 h-7 rounded-md inline-flex items-center justify-center bg-d-card border border-d-border-2 text-d-fg-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-d-card-2 hover:text-d-fg transition-colors"
            disabled={!pagination.hasNext}
            onClick={pagination.onNext}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  </div>
);
