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

import { OptionItem } from './OptionItem';

export interface SelectOption {
  id: string;
  name: string;
}

interface OptionListProps<T extends SelectOption> {
  options: T[];
  selectedId: string | null;
  onSelect: (option: T) => void;
  emptyMessage?: string;
  showEmpty?: boolean;
}

export function OptionList<T extends SelectOption>({
  options,
  selectedId,
  onSelect,
  emptyMessage,
  showEmpty = false,
}: OptionListProps<T>) {
  if (options.length === 0) {
    if (showEmpty && emptyMessage) {
      return (
        <div className="dropdown__list">
          <div className="dropdown__empty">{emptyMessage}</div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="dropdown__list">
      {options.map((option) => (
        <OptionItem
          key={option.id}
          label={option.name}
          selected={selectedId === option.id}
          onSelect={() => onSelect(option)}
        />
      ))}
    </div>
  );
}
