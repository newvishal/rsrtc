export interface IBank {
    bankId ?: string,
    bankName: string,
    shortCode: string,
    status ?: boolean
}

export interface IDesignation {
    designationId ?: string,
    designationType: string,
    designationName: string,
    shortCode: string,
    status ?: boolean
}

export interface IZone {
    zoneId ?: string,
    zoneName: string,
    shortCode: string,
    status ?: boolean
}