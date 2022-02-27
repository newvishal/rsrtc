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

export interface IUserRole {
    roleId ?: string,
    roleName: string,
    status ?: boolean
}

export interface ILocationType {
    locationTypeId ?: string,
    locationType: string,
    shortCode: string,
    status ?: boolean
}

export interface ILeaveReasonType {
    leaveReasonTypeId ?: string,
    reasonType: string,
    shortCode: string,
    status ?: boolean
}