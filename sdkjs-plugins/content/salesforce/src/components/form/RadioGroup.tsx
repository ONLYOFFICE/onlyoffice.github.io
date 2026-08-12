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

import './group.css';
import './radio.css';

interface RadioOption<T extends string> {
  value: T;
  label: string;
}

interface RadioGroupProps<T extends string> {
  label: string;
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
  name?: string;
  disabled?: boolean;
}

export function RadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  name = 'radioGroup',
  disabled = false,
}: RadioGroupProps<T>) {
  const groupClass = disabled ? 'radio-group radio-group--disabled' : 'radio-group';

  return (
    <div className="form-group">
      <label className="form-group__label">{label}</label>
      <div className={groupClass}>
        {options.map((option) => (
          <label key={option.value} className="radio-group__item">
            <input
              type="radio"
              className="radio-group__input"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
