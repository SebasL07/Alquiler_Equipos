
import {number, object, string} from 'zod';

export const requestDeviceSchema = object({
    request_id: number({required_error: 'Request id is required'}).min(1),
    deviceName: string({required_error: 'Device id is required'}).min(3).max(255),
    quantity: number({required_error: 'Quantity is required'}).min(1),
});

