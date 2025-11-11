"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paywall = exports.PAYWALL_METADATA = void 0;
const common_1 = require("@nestjs/common");
exports.PAYWALL_METADATA = 'paywall_metadata';
const Paywall = (config) => (0, common_1.SetMetadata)(exports.PAYWALL_METADATA, config);
exports.Paywall = Paywall;
//# sourceMappingURL=paywall.decorator.js.map