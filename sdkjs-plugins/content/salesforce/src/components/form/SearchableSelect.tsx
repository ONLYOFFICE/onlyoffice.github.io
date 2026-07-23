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

import { OptionList, SelectOption } from '@components/form/OptionList';

import { useTranslation } from '@hooks';

import './group.css';
import './combobox.css';

interface SearchableSelectProps<T extends SelectOption> {
  label: string;
  value: string;
  options: T[];
  selectedOption: T | null;
  showDropdown: boolean;
  onChange: (value: string) => void;
  onSelect: (option: T) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
  loading?: boolean;
  emptyMessage?: string;
}

export function SearchableSelect<T extends SelectOption>({
  label,
  value,
  options,
  selectedOption,
  showDropdown,
  onChange,
  onSelect,
  onFocus,
  onBlur,
  placeholder,
  loading = false,
  emptyMessage,
}: SearchableSelectProps<T>) {
  const { t } = useTranslation();

  const inputClass = loading ? 'combobox__input combobox__input--disabled' : 'combobox__input';

  const placeholderText = placeholder || t('common.enter_or_select');

  const isDropdownOpen = showDropdown && !loading;

  return (
    <div className="form-group">
      <label className="form-group__label">{label}</label>
      <div className={`combobox ${isDropdownOpen ? 'combobox--open' : ''}`}>
        <input
          type="text"
          className={inputClass}
          value={value}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholderText}
          disabled={loading}
        />
        {isDropdownOpen && (
        <OptionList
          options={options}
          selectedId={selectedOption?.id ?? null}
          onSelect={onSelect}
          emptyMessage={emptyMessage}
          showEmpty
        />
        )}
      </div>
    </div>
  );
}
