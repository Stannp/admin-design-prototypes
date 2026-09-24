import React, { useState } from 'react';

// ============================================================
// Table primitives — dark admin theme (Filament layout)
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
    className={`px-6 py-3.5 text-sm text-d-fg border-b border-d-border align-middle last:[tr:last-child_&]:border-b-0 ${align === 'right' ? 'text-right' : ''} ${className}`}
    {...props}
  >
    {children}
  </td>
);

// ============================================================
// Shared icons
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

// ============================================================
// FilterButton — dropdown filter chip
// ============================================================

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
        className="inline-flex items-center gap-1.5 bg-d-card border border-d-border-2 rounded-md px-2.5 py-1.5 text-xs text-d-fg-2 cursor-pointer hover:bg-d-card-2 hover:text-d-fg transition-colors"
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
              className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer border-none text-left transition-colors ${opt === value ? 'bg-d-card-2 text-d-fg' : 'bg-transparent text-d-fg-2 hover:bg-d-card-2 hover:text-d-fg'}`}
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

// ============================================================
// ColumnToggle — checkbox dropdown for visible columns
// ============================================================

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
        className="w-8 h-8 rounded-md inline-flex items-center justify-center bg-transparent border-none text-d-fg-3 cursor-pointer hover:bg-d-card-2 hover:text-d-fg transition-colors"
        onClick={() => setOpen(o => !o)}
        title="Toggle columns"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] right-0 z-30 bg-d-card border border-d-border-2 rounded-lg p-1.5 min-w-48 shadow-[0_14px_40px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.2)]">
          {columns.map(col => (
            <label
              key={col}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-d-fg-2 cursor-pointer hover:bg-d-card-2 hover:text-d-fg"
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

// ============================================================
// FiltersTrigger — icon button that opens filter dropdown
// ============================================================

const FiltersTrigger = ({ filters, activeCount }) => {
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
        className="w-8 h-8 rounded-md inline-flex items-center justify-center bg-transparent border-none text-d-fg-3 cursor-pointer hover:bg-d-card-2 hover:text-d-fg transition-colors relative"
        onClick={() => setOpen(o => !o)}
        title="Filters"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 3H2l8 9v7l4 2v-9l8-9z" />
        </svg>
        {activeCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-orange text-white text-[9px] font-bold inline-flex items-center justify-center">{activeCount}</span>
        )}
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] right-0 z-30 bg-d-card border border-d-border-2 rounded-lg p-4 min-w-64 shadow-[0_14px_40px_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-d-fg">Filters</span>
            <button className="text-xs text-orange font-medium bg-transparent border-none cursor-pointer">Reset</button>
          </div>
          <div className="flex flex-col gap-3">
            {filters.map(f => (
              <FilterButton key={f.label} {...f} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// TableToolbar — Filament-style: right-aligned search + icons
// Sits above the table headers inside the card.
// ============================================================

export const TableToolbar = ({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  filters,
  columns,
  visibleColumns,
  onToggleColumn,
}) => (
  <div className="flex items-center justify-end gap-2 px-6 py-3 border-b border-d-border">
    {/* Search — right-aligned like Filament */}
    {onSearchChange && (
      <div className="inline-flex items-center gap-2 bg-d-bg-2 border border-d-border px-3 py-1.5 rounded-lg w-64 text-d-fg-3 text-sm">
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

    {/* Filter icon trigger */}
    {filters && filters.length > 0 && (
      <FiltersTrigger filters={filters} activeCount={filters.filter(f => f.value && f.value !== f.label).length} />
    )}

    {/* Column toggle icon */}
    {columns && onToggleColumn && (
      <ColumnToggle columns={columns} visible={visibleColumns || columns} onToggle={onToggleColumn} />
    )}
  </div>
);

// ============================================================
// TablePagination — Filament-style footer below the table.
// "Showing X to Y of Z results" left, per-page center,
// page number buttons + prev/next right.
// ============================================================

const PageBtn = ({ children, active, disabled, onClick }) => (
  <button
    className={`min-w-[28px] h-7 rounded-md inline-flex items-center justify-center text-xs font-medium font-sans cursor-pointer transition-colors border ${
      active
        ? 'bg-indigo border-indigo text-white'
        : 'bg-d-card border-d-border-2 text-d-fg-3 hover:bg-d-card-2 hover:text-d-fg'
    } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

// Build a page range like Filament: 1 2 3 4 ... 98 99
const getPageNumbers = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  const near = [current - 1, current, current + 1].filter(p => p >= 1 && p <= total);
  const bookends = [1, 2, total - 1, total];
  const all = [...new Set([...bookends, ...near])].sort((a, b) => a - b);
  for (let i = 0; i < all.length; i++) {
    if (i > 0 && all[i] - all[i - 1] > 1) pages.push('...');
    pages.push(all[i]);
  }
  return pages;
};

export const TablePagination = ({
  from,
  to,
  total,
  page,
  totalPages,
  onPageChange,
  perPage,
  perPageOptions,
  onPerPageChange,
}) => (
  <div className="flex items-center justify-between px-6 py-3 border-t border-d-border">
    {/* Result count */}
    <span className="text-xs text-d-fg-3">
      Showing {from} to {to} of {total} results
    </span>

    {/* Per page */}
    {perPageOptions && onPerPageChange ? (
      <div className="flex items-center gap-2 text-xs text-d-fg-3">
        <span>Per page</span>
        <select
          className="bg-d-bg-2 border border-d-border-2 rounded-md text-d-fg text-xs px-2 py-1 font-sans cursor-pointer outline-none appearance-none bg-no-repeat bg-[right_6px_center] pr-6"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%238E8E93' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")` }}
          value={perPage}
          onChange={e => onPerPageChange(Number(e.target.value))}
        >
          {perPageOptions.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    ) : <span />}

    {/* Page numbers + prev/next */}
    <div className="flex items-center gap-1">
      {/* Prev */}
      <PageBtn disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </PageBtn>

      {/* Page numbers */}
      {getPageNumbers(page, totalPages).map((p, i) =>
        p === '...'
          ? <span key={`e${i}`} className="px-1 text-xs text-d-fg-4">...</span>
          : <PageBtn key={p} active={p === page} onClick={() => onPageChange(p)}>{p}</PageBtn>
      )}

      {/* Next */}
      <PageBtn disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </PageBtn>
    </div>
  </div>
);
