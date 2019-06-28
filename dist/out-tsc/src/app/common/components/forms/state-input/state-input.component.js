"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var StateInputComponent = /** @class */ (function () {
    function StateInputComponent() {
        this.states = [
            {
                'name': 'Alabama',
                'code': 'AL'
            },
            {
                'name': 'Alaska',
                'code': 'AK'
            },
            {
                'name': 'American Samoa',
                'code': 'AS'
            },
            {
                'name': 'Arizona',
                'code': 'AZ'
            },
            {
                'name': 'Arkansas',
                'code': 'AR'
            },
            {
                'name': 'California',
                'code': 'CA'
            },
            {
                'name': 'Colorado',
                'code': 'CO'
            },
            {
                'name': 'Connecticut',
                'code': 'CT'
            },
            {
                'name': 'Delaware',
                'code': 'DE'
            },
            {
                'name': 'District Of Columbia',
                'code': 'DC'
            },
            {
                'name': 'Federated States Of Micronesia',
                'code': 'FM'
            },
            {
                'name': 'Florida',
                'code': 'FL'
            },
            {
                'name': 'Georgia',
                'code': 'GA'
            },
            {
                'name': 'Guam',
                'code': 'GU'
            },
            {
                'name': 'Hawaii',
                'code': 'HI'
            },
            {
                'name': 'Idaho',
                'code': 'ID'
            },
            {
                'name': 'Illinois',
                'code': 'IL'
            },
            {
                'name': 'Indiana',
                'code': 'IN'
            },
            {
                'name': 'Iowa',
                'code': 'IA'
            },
            {
                'name': 'Kansas',
                'code': 'KS'
            },
            {
                'name': 'Kentucky',
                'code': 'KY'
            },
            {
                'name': 'Louisiana',
                'code': 'LA'
            },
            {
                'name': 'Maine',
                'code': 'ME'
            },
            {
                'name': 'Marshall Islands',
                'code': 'MH'
            },
            {
                'name': 'Maryland',
                'code': 'MD'
            },
            {
                'name': 'Massachusetts',
                'code': 'MA'
            },
            {
                'name': 'Michigan',
                'code': 'MI'
            },
            {
                'name': 'Minnesota',
                'code': 'MN'
            },
            {
                'name': 'Mississippi',
                'code': 'MS'
            },
            {
                'name': 'Missouri',
                'code': 'MO'
            },
            {
                'name': 'Montana',
                'code': 'MT'
            },
            {
                'name': 'Nebraska',
                'code': 'NE'
            },
            {
                'name': 'Nevada',
                'code': 'NV'
            },
            {
                'name': 'New Hampshire',
                'code': 'NH'
            },
            {
                'name': 'New Jersey',
                'code': 'NJ'
            },
            {
                'name': 'New Mexico',
                'code': 'NM'
            },
            {
                'name': 'New York',
                'code': 'NY'
            },
            {
                'name': 'North Carolina',
                'code': 'NC'
            },
            {
                'name': 'North Dakota',
                'code': 'ND'
            },
            {
                'name': 'Northern Mariana Islands',
                'code': 'MP'
            },
            {
                'name': 'Ohio',
                'code': 'OH'
            },
            {
                'name': 'Oklahoma',
                'code': 'OK'
            },
            {
                'name': 'Oregon',
                'code': 'OR'
            },
            {
                'name': 'Palau',
                'code': 'PW'
            },
            {
                'name': 'Pennsylvania',
                'code': 'PA'
            },
            {
                'name': 'Puerto Rico',
                'code': 'PR'
            },
            {
                'name': 'Rhode Island',
                'code': 'RI'
            },
            {
                'name': 'South Carolina',
                'code': 'SC'
            },
            {
                'name': 'South Dakota',
                'code': 'SD'
            },
            {
                'name': 'Tennessee',
                'code': 'TN'
            },
            {
                'name': 'Texas',
                'code': 'TX'
            },
            {
                'name': 'Utah',
                'code': 'UT'
            },
            {
                'name': 'Vermont',
                'code': 'VT'
            },
            {
                'name': 'Virgin Islands',
                'code': 'VI'
            },
            {
                'name': 'Virginia',
                'code': 'VA'
            },
            {
                'name': 'Washington',
                'code': 'WA'
            },
            {
                'name': 'West Virginia',
                'code': 'WV'
            },
            {
                'name': 'Wisconsin',
                'code': 'WI'
            },
            {
                'name': 'Wyoming',
                'code': 'WY'
            }
        ];
        this.state = '';
        this.stateChange = new core_1.EventEmitter();
        this.disabled = false;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], StateInputComponent.prototype, "state", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StateInputComponent.prototype, "stateChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], StateInputComponent.prototype, "disabled", void 0);
    StateInputComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'opspot-state-input',
            template: "\n    <select [ngModel]=\"state\" (ngModelChange)=\"state = $event; stateChange.next($event)\" [disabled]=\"disabled\">\n      <option value=\"\" disabled hidden><i i18n=\"State as a country entity@@M__COMMON__COUNTRY_STATE\">State</i></option>\n      <option *ngFor=\"let state of states\"\n        [value]=\"state.code\"\n      >{{ state.name }}</option>\n    </select>\n  "
        })
    ], StateInputComponent);
    return StateInputComponent;
}());
exports.StateInputComponent = StateInputComponent;
//# sourceMappingURL=state-input.component.js.map