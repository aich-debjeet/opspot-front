"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.animations = [
    animations_1.trigger('attentionNeeded', [
        animations_1.transition('* => *', [
            animations_1.style({ transform: 'perspective(1px) translateZ(0)', transformOrigin: '0 100%' }),
            animations_1.animate(1000, animations_1.keyframes([
                animations_1.style({ transform: 'skew(0deg)', offset: 0.0000 }),
                animations_1.style({ transform: 'skew(-12deg)', offset: 0.1665 }),
                animations_1.style({ transform: 'skew(10deg)', offset: 0.3333 }),
                animations_1.style({ transform: 'skew(-6deg)', offset: 0.4995 }),
                animations_1.style({ transform: 'skew(4deg)', offset: 0.6666 }),
                animations_1.style({ transform: 'skew(-2deg)', offset: 0.8325 }),
                animations_1.style({ transform: 'skew(0deg)', offset: 1.0000 }),
            ]))
        ])
    ])
];
//# sourceMappingURL=animations.js.map