"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.X402Module = void 0;
const common_1 = require("@nestjs/common");
const x402_service_1 = require("./providers/x402.service");
const x402_guard_1 = require("./guards/x402.guard");
let X402Module = class X402Module {
};
exports.X402Module = X402Module;
exports.X402Module = X402Module = __decorate([
    (0, common_1.Module)({
        providers: [x402_service_1.X402Service, x402_guard_1.X402Guard],
        exports: [x402_service_1.X402Service, x402_guard_1.X402Guard],
    })
], X402Module);
//# sourceMappingURL=x402.module.js.map