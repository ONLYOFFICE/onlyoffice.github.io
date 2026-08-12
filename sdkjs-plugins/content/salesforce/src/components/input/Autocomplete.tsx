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
  useState, useRef, useEffect, useMemo,
} from 'preact/hooks';

import { useTranslation } from '@hooks';

import './autocomplete.css';

export interface AutocompleteOption {
  value: string;
  label: string;
  searchText?: string;
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value: string;
  placeholder?: string;
  disabled?: boolean;
  maxResults?: number;
  onChange: (value: string, label: string) => void;
  onFocus?: () => void;
}

export function Autocomplete({
  options,
  value,
  placeholder,
  disabled = false,
  maxResults = 50,
  onChange,
  onFocus,
}: AutocompleteProps) {
  const { t } = useTranslation();

  const placeholderText = placeholder || t('common.search');

  const [search, setSearch] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    const query = search.toLowerCase();
    return options
      .filter((opt) => {
        const searchTarget = opt.searchText?.toLowerCase() ?? opt.label.toLowerCase();
        return searchTarget.includes(query) || opt.value.toLowerCase().includes(query);
      })
      .slice(0, maxResults);
  }, [options, search, maxResults]);

  const handleSelect = (opt: AutocompleteOption) => {
    setSearch(opt.label);
    setIsOpen(false);
    onChange(opt.value, opt.label);
  };

  const isDropdownOpen = isOpen && filteredOptions.length > 0;

  return (
    <div className={`autocomplete ${isDropdownOpen ? 'autocomplete--open' : ''}`} ref={containerRef}>
      <input
        className="autocomplete__input"
        type="text"
        value={search}
        placeholder={placeholderText}
        disabled={disabled}
        onInput={(e) => {
          setSearch((e.target as HTMLInputElement).value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
          onFocus?.();
        }}
      />
      {isDropdownOpen && (
      <ul className="autocomplete__dropdown">
        {filteredOptions.map((opt) => (
          <li
            key={opt.value}
            className="autocomplete__option"
            onClick={() => handleSelect(opt)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
