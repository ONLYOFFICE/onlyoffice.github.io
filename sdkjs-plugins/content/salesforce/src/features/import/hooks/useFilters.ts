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

import { useState } from 'preact/hooks';

import type { FilterCondition } from '@features/import/components/types';

export interface UseFiltersResult {
  filters: FilterCondition[];
  maxRows: number;
  addFilter: (filter: Omit<FilterCondition, 'id'>) => void;
  updateFilter: (id: string, key: keyof FilterCondition, value: string) => void;
  removeFilter: (id: string) => void;
  setMaxRows: (value: number) => void;
  reset: () => void;
}

export function useFilters(): UseFiltersResult {
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [maxRows, setMaxRows] = useState(10000);

  const addFilter = (filter: Omit<FilterCondition, 'id'>) => {
    setFilters((prev) => [
      ...prev,
      { ...filter, id: Date.now().toString() },
    ]);
  };

  const updateFilter = (id: string, key: keyof FilterCondition, value: string) => {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const removeFilter = (id: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const reset = () => {
    setFilters([]);
    setMaxRows(10000);
  };

  return {
    filters, addFilter, updateFilter, removeFilter, maxRows, setMaxRows, reset,
  };
}
