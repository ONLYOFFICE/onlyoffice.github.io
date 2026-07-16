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

import type { SelectableItem } from '@features/import/components/types';

import './checkbox.css';

interface FieldCheckboxProps {
  item: SelectableItem;
  selected: boolean;
  onToggle: () => void;
  showType?: boolean;
}

export function FieldCheckbox({
  item, selected, onToggle, showType = true,
}: FieldCheckboxProps) {
  return (
    <div className="field-item">
      <input type="checkbox" checked={selected} onChange={onToggle} />
      <span>{item.label}</span>
      {showType && item.type && (
      <small>
        (
        {item.type}
        )
      </small>
      )}
    </div>
  );
}
