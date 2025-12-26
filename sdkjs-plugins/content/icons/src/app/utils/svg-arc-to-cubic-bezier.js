/*
 * (c) Copyright Ascensio System SIA 2010-2025
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
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
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

class ArcToCubicConverter {
    static convert(rx, ry, rotation, largeArc, sweep, dx, dy, startX, startY) {
        const endX = startX + dx;
        const endY = startY + dy;

        return this.#convertEllipticalArcToCubics(
            startX,
            startY,
            endX,
            endY,
            rx,
            ry,
            rotation,
            largeArc,
            sweep
        );
    }

    static #convertEllipticalArcToCubics(
        startX,
        startY,
        endX,
        endY,
        rx,
        ry,
        rotation,
        largeArc,
        sweep
    ) {
        const phi = (rotation * Math.PI) / 180;

        const center = this.#calculateEllipseCenter(
            startX,
            startY,
            endX,
            endY,
            rx,
            ry,
            phi,
            largeArc,
            sweep
        );

        if (!center) {
            return [
                {
                    type: "lineTo",
                    x: endX,
                    y: endY,
                },
            ];
        }

        const { cx, cy, theta1, theta2 } = center;

        const deltaTheta = Math.abs(theta2 - theta1);
        const segments = Math.max(
            1,
            Math.min(4, Math.ceil(deltaTheta / (Math.PI / 2)))
        );
        const thetaStep = (theta2 - theta1) / segments;

        const commands = [];
        let currentTheta = theta1;

        for (let i = 0; i < segments; i++) {
            const nextTheta = currentTheta + thetaStep;
            const bezier = this.#ellipseSegmentToCubicBezierCorrected(
                cx,
                cy,
                rx,
                ry,
                phi,
                currentTheta,
                nextTheta
            );

            commands.push({
                type: "cubicBezier",
                x1: bezier.x1,
                y1: bezier.y1,
                x2: bezier.x2,
                y2: bezier.y2,
                x: bezier.x,
                y: bezier.y,
            });

            currentTheta = nextTheta;
        }

        return commands;
    }

    static #calculateEllipseCenter(
        x1,
        y1,
        x2,
        y2,
        rx,
        ry,
        phi,
        largeArc,
        sweep
    ) {
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        const dx = (x1 - x2) / 2;
        const dy = (y1 - y2) / 2;

        const x1_ = cosPhi * dx + sinPhi * dy;
        const y1_ = -sinPhi * dx + cosPhi * dy;

        const rx2 = rx * rx;
        const ry2 = ry * ry;
        const x1_2 = x1_ * x1_;
        const y1_2 = y1_ * y1_;

        const radicant =
            (rx2 * ry2 - rx2 * y1_2 - ry2 * x1_2) / (rx2 * y1_2 + ry2 * x1_2);

        if (radicant < 0) {
            const scale = Math.sqrt(1 + Math.abs(radicant));
            rx *= scale;
            ry *= scale;
        }

        let factor = Math.sqrt(Math.max(0, radicant));
        if (largeArc === sweep) factor = -factor;

        const cx_ = (factor * rx * y1_) / ry;
        const cy_ = (-factor * ry * x1_) / rx;

        const cx = cosPhi * cx_ - sinPhi * cy_ + (x1 + x2) / 2;
        const cy = sinPhi * cx_ + cosPhi * cy_ + (y1 + y2) / 2;

        const ux = (x1_ - cx_) / rx;
        const uy = (y1_ - cy_) / ry;
        const vx = (-x1_ - cx_) / rx;
        const vy = (-y1_ - cy_) / ry;

        const theta1 = Math.atan2(uy, ux);
        let theta2 = Math.atan2(vy, vx);

        if (sweep === 0) {
            if (theta2 > theta1) theta2 -= 2 * Math.PI;
        } else {
            if (theta2 < theta1) theta2 += 2 * Math.PI;
        }

        return { cx, cy, theta1, theta2 };
    }

    static #getEllipsePoint(cx, cy, rx, ry, phi, theta) {
        return {
            x:
                cx +
                rx * Math.cos(theta) * Math.cos(phi) -
                ry * Math.sin(theta) * Math.sin(phi),
            y:
                cy +
                rx * Math.cos(theta) * Math.sin(phi) +
                ry * Math.sin(theta) * Math.cos(phi),
        };
    }

    static #ellipseSegmentToCubicBezierCorrected(
        cx,
        cy,
        rx,
        ry,
        phi,
        theta1,
        theta2
    ) {
        const p1 = this.#getEllipsePoint(cx, cy, rx, ry, phi, theta1);
        const p4 = this.#getEllipsePoint(cx, cy, rx, ry, phi, theta2);

        const derivative1 = this.#getEllipseDerivative(rx, ry, phi, theta1);
        const derivative4 = this.#getEllipseDerivative(rx, ry, phi, theta2);

        const deltaTheta = theta2 - theta1;
        const alpha =
            (Math.sin(deltaTheta) *
                (Math.sqrt(4 + 3 * Math.pow(Math.tan(deltaTheta / 2), 2)) -
                    1)) /
            3;

        return {
            x1: p1.x + alpha * derivative1.dx,
            y1: p1.y + alpha * derivative1.dy,
            x2: p4.x - alpha * derivative4.dx,
            y2: p4.y - alpha * derivative4.dy,
            x: p4.x,
            y: p4.y,
        };
    }

    static #getEllipseDerivative(rx, ry, phi, theta) {
        const dx =
            -rx * Math.sin(theta) * Math.cos(phi) -
            ry * Math.cos(theta) * Math.sin(phi);
        const dy =
            -rx * Math.sin(theta) * Math.sin(phi) +
            ry * Math.cos(theta) * Math.cos(phi);

        return { dx, dy };
    }
}

export { ArcToCubicConverter };
