"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoPaywall = exports.NO_PAYWALL_METADATA = void 0;
const common_1 = require("@nestjs/common");
exports.NO_PAYWALL_METADATA = 'no-paywall';
const NoPaywall = () => (0, common_1.SetMetadata)(exports.NO_PAYWALL_METADATA, true);
exports.NoPaywall = NoPaywall;
//# sourceMappingURL=no-paywall.decorator.js.map