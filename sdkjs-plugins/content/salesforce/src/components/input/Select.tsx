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

import { useState, useRef, useEffect } from 'preact/hooks';

import chevronIcon from '@resources/images/chevron.svg';
import chevronDarkIcon from '@resources/images/chevron_dark.svg';

import './select.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Select({
  options, value, onChange, placeholder, className = '', disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || placeholder || '';
  const classes = ['select', disabled ? 'select--disabled' : '', className].filter(Boolean).join(' ');

  useEffect(() => {
    const checkTheme = () => {
      const { body } = document;
      setIsDarkTheme(
        body.classList.contains('theme-dark')
        || body.classList.contains('theme-contrast-dark')
        || body.classList.contains('theme-night')
        || body.classList.contains('theme-type-dark'),
      );
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`select-container ${isOpen ? 'select-container--open' : ''}`} ref={containerRef}>
      <button
        type="button"
        className={classes}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
      >
        <span className={`select__value ${!selectedOption && placeholder ? 'select__value--placeholder' : ''}`}>
          {displayValue}
        </span>
        <img src={isDarkTheme ? chevronDarkIcon : chevronIcon} alt="" className="select__arrow" />
      </button>
      {isOpen && (
      <div className="select__dropdown" role="listbox">
        {options.map((option) => (
          <div
            key={option.value}
            className={`select__option ${option.value === value ? 'select__option--selected' : ''}`}
            onClick={() => handleSelect(option)}
            role="option"
            aria-selected={option.value === value}
          >
            {option.label}
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
