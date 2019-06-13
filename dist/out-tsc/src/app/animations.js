"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.animations = [
    animations_1.trigger('foolishIn', [
        animations_1.transition('* => *', [
            animations_1.style({ opacity: 0 }),
            animations_1.animate(2000, animations_1.keyframes([
                animations_1.style({ opacity: 0, transformOrigin: '50% 50%', transform: 'scale(0, 0)     rotate(360deg)', offset: 0.000 }),
                animations_1.style({ opacity: 1, transformOrigin: '0% 100%', transform: 'scale(0.5, 0.5) rotate(0deg)', offset: 0.066 }),
                animations_1.style({ opacity: 1, transformOrigin: '100% 100%', transform: 'scale(0.5, 0.5) rotate(0deg)', offset: 0.132 }),
                animations_1.style({ opacity: 1, transformOrigin: '0%', transform: 'scale(0.5, 0.5) rotate(0deg)', offset: 0.198 }),
                animations_1.style({ opacity: 1, transformOrigin: '0% 0%', transform: 'scale(0.5, 0.5) rotate(0deg)', offset: 0.264 }),
                animations_1.style({ opacity: 1, transformOrigin: '50% 50%', transform: 'scale(1, 1)     rotate(0deg)', offset: 0.330 }),
                animations_1.style({ opacity: 1, offset: 0.660 }),
                animations_1.style({ opacity: 0, offset: 1.000 }),
            ]))
        ])
    ])
];
//# sourceMappingURL=animations.js.map