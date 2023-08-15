/*
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

"use strict";
(function(){function b(a){this.frame=a;this.x=window.scrollX;this.y=window.scrollY;this.lockCounter=0;document.addEventListener("scroll",this.onScroll.bind(this),!1);window.addEventListener("blur",this.onBlur.bind(this),!1);window.addEventListener("pointermove",this.onMove.bind(this),!1);window.addEventListener("wheel",this.onMove.bind(this),!1);this.frame.addEventListener("pointerover",this.onOver.bind(this),!1);this.frame.addEventListener("pointerleave",this.onLeave.bind(this),!1)}window.AscEmbed=
window.AscEmbed||{};b.prototype.onScroll=function(){document.activeElement===this.frame||0!==this.lockCounter?window.scrollTo(this.x,this.y):(this.x=window.scrollX,this.y=window.scrollY)};b.prototype.onBlur=function(){document.activeElement===this.frame&&this.lockWithTimeout(500)};b.prototype.onOver=function(){};b.prototype.onLeave=function(){this.lockWithTimeout(100);this.frame.blur()};b.prototype.onMove=function(){document.activeElement===this.frame&&(this.lockWithTimeout(100),this.frame.blur())};
b.prototype.lockWithTimeout=function(a){this.lockCounter++;var c=this;setTimeout(function(){c.lockCounter--},a)};window.AscEmbed.initWorker=function(a){window.AscEmbed.workers=window.AscEmbed.workers||[];a=new b(a);window.AscEmbed.workers.push(a);return a}})();

