import { SetMetadata } from '@nestjs/common';

export const NO_PAYWALL_METADATA = 'no-paywall';
export const NoPaywall = () => SetMetadata(NO_PAYWALL_METADATA, true);
