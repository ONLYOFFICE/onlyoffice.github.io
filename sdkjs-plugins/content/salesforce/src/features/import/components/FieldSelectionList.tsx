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

import { TextButton } from '@components';

import { FieldCheckbox } from '@features/import/components/FieldCheckbox';
import type { SelectableItem } from '@features/import/components/types';

import './checkbox.css';

interface FieldSelectionListProps {
  items: SelectableItem[];
  selected: string[];
  onToggle: (name: string) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
  showType?: boolean;
  loading?: boolean;
}

export function FieldSelectionList({
  items,
  selected,
  onToggle,
  onSelectAll,
  onClear,
  showType = true,
  loading = false,
}: FieldSelectionListProps) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {(onSelectAll || onClear) && (
      <div className="checkbox-list__actions">
        {onSelectAll && <TextButton onClick={onSelectAll}>Select All</TextButton>}
        {onClear && <TextButton onClick={onClear}>Clear</TextButton>}
      </div>
      )}
      <div className="fields-list">
        {items.map((item) => (
          <FieldCheckbox
            key={item.name}
            item={item}
            selected={selected.includes(item.name)}
            onToggle={() => onToggle(item.name)}
            showType={showType}
          />
        ))}
      </div>
    </div>
  );
}
