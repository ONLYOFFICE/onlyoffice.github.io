/**
 *
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {
  useState, useRef, useEffect, useMemo, useCallback,
} from 'preact/hooks';

import { useTranslation } from '@hooks';

import './multiselect.css';

interface OptionProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  extra?: string;
  selectAll?: boolean;
}

function Option({
  checked, onChange, label, extra, selectAll,
}: OptionProps) {
  const className = selectAll
    ? 'multiselect__option multiselect__option--select-all'
    : 'multiselect__option';

  return (
    <li className={className}>
      <label className="multiselect__label">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="multiselect__text">{label}</span>
        {extra && <span className="multiselect__extra">{extra}</span>}
      </label>
    </li>
  );
}

export interface MultiSelectOption {
  value: string;
  label: string;
  extra?: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  placeholder?: string;
  disabled?: boolean;
  onToggle: (value: string) => void;
  onClose?: () => void;
  onSelectAll?: (values: string[]) => void;
}

export function MultiSelect({
  options,
  selected,
  placeholder,
  disabled = false,
  onToggle,
  onClose,
  onSelectAll,
}: MultiSelectProps) {
  const { t } = useTranslation();

  const placeholderText = placeholder || t('common.search');

  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  const filtered = useMemo(() => {
    if (!search) return options;
    const q = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q));
  }, [options, search]);

  const allSelected = filtered.length > 0 && filtered.every((o) => selected.includes(o.value));

  const toggleAll = useCallback(() => {
    if (!onSelectAll) return;
    const values = filtered.map((o) => o.value);
    const next = allSelected
      ? selected.filter((v) => !values.includes(v))
      : [...new Set([...selected, ...values])];
    onSelectAll(next);
  }, [onSelectAll, filtered, allSelected, selected]);

  const handleInput = (e: Event) => {
    setSearch((e.target as HTMLInputElement).value);
    setIsOpen(true);
  };

  const handleFocus = () => {
    if (!disabled) setIsOpen(true);
  };

  return (
    <div className="multiselect" ref={containerRef}>
      <input
        className="multiselect__input"
        type="text"
        value={search}
        placeholder={placeholderText}
        disabled={disabled}
        onInput={handleInput}
        onFocus={handleFocus}
      />

      {isOpen && !disabled && (
      <ul className="multiselect__dropdown">
        {onSelectAll && filtered.length > 0 && (
        <Option checked={allSelected} onChange={toggleAll} label={t('common.select_all')} selectAll />
        )}

        {filtered.map((o) => (
          <Option
            key={o.value}
            checked={selected.includes(o.value)}
            onChange={() => onToggle(o.value)}
            label={o.label}
            extra={o.extra}
          />
        ))}

        {filtered.length === 0 && (
        <li className="multiselect__empty">{t('common.no_items_found')}</li>
        )}
      </ul>
      )}
    </div>
  );
}
