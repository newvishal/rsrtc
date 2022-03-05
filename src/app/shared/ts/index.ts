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

export interface IHRA {
    hraId ?: string,
    hraValue: string,
    status ?: boolean
}


export interface ISection {
    sectionId ?: string,
    sectionName: string,
    shortCode: string,
    status ?: boolean
}


// ----------------------------------------- start date 01-22 -------------------------------------------------------------------

export interface IDistrict {
    districtId ?: string,
    zoneId ?: number,
    districtName: string,
    shortCode: string,
    status ?: boolean
}

export interface IFinancialYear {
    fyId ?: string,
    financialYear : string,
    shortCode ?: string,
    fyFrom ?: string,
    fyTo ?: string,
    status ?: boolean
}

export interface IMonth {
    monthId ?: string,
    fyId : number,
    monthName : string,
    monthNo ?: Number,
    attendanceStatus ?: boolean,
    salaryStatus ?: boolean,
    userId: number,
    status ?: boolean
}


export interface ILeaveLimit {
    empLeaveApplicableId ?: string,
    leaveTypeId : number,
    empTypeId : number,
    perMonthLeaveAllowed ?: number,
    maxLeaveAllowed ?: number,
    carryForwardMaxLimit ?: number,
    status ?: boolean
}

export interface ILeaveType {
    leaveTypeId ?: string,
    leaveTypeName : string,
    genderApplicable ?: number ,
    carryForwardStatus ?: boolean,
    shortCode ?: string,
    status ?: boolean
}

export interface ILocation {
    locationId ?: string,
    zoneId : number | string,
    districtId : number | string,
    locationTypeId : number | string,
    locationName : string,
    shortCode : string,
    hra : number | string,
    ccaStatus : boolean,
    cccAmount : number,
    status ?: boolean
}

export interface IEmployee {
    employeeId ?: string,
    locationType ?: string | number,
    zoneId ?: string | number,
    districtId ?: string,
    locationId ?: string,
    empType ?: string,
    employeeName ?: string,
    fatherName ?: string,
    mobile ?: string,
    emailID ?: string,
    dob ?: string,
    addressDistrictId ?: string,
    address ?: string,
    accountNo ?: string,
    yearOfPosting ?: string,
    adhar ?: string,
    basicPayAmount ?: string,
    epfEndDate ?: string,
    dpAmount ?: string,
    dA1Amount ?: string,
    dA2Amount ?: string,
    cpfNo ?: string,
    gpfNo ?: string,
    siNo ?: string,
    cgisNo ?: string,
    panNo ?: string,
    npsNo ?: string,
    designationId ?: string,
    employeeUniqueID ?: string,
    empStatus ?: boolean,
    serviceType ?: string,
    employeeType ?: string,
    probationEndDate ?: string,
    janAadharNo ?: string,
    ssoid ?: string,
    sectionId ?: string
}