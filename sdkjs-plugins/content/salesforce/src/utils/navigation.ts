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

const GUIDE_URL = 'https://onlyoffice.com';

export function openGuide(): void {
  window.open(GUIDE_URL, '_blank');
}

export function openExternalLink(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openPopup(
  url: string,
  name: string,
  options: { width?: number; height?: number } = {},
): Window | null {
  const { width = 500, height = 700 } = options;
  return window.open(url, name, `width=${width},height=${height}`);
}
