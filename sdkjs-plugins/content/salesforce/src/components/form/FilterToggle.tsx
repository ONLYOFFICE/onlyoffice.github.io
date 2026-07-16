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

import type { ComponentChildren } from 'preact';

import { useTranslation } from '@hooks';

import './collapsible.css';

interface FilterToggleProps {
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
  label?: string;
  children?: ComponentChildren;
}

export function FilterToggle({
  expanded,
  onToggle,
  label,
  children,
}: FilterToggleProps) {
  const { t } = useTranslation();

  const displayLabel = label || t('filters.show_filters');
  const hideLabel = t('filters.hide_filters');

  return (
    <>
      <div className="form-group">
        <button
          type="button"
          className="collapsible__toggle"
          onClick={() => onToggle(!expanded)}
        >
          {expanded ? hideLabel : displayLabel}
        </button>
      </div>
      {expanded && children && (
      <div className="collapsible__content">{children}</div>
      )}
    </>
  );
}
