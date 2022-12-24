
export interface JobPositionResponse {
    hasItems: boolean;
    items:    JobPosition[];
    total:    number;
    page:     number;
    pages:    number;
}

export interface JobPosition {
    id:              string;
    name:            string;
    username:        string;
    assineeUsername: string;
    description:     string;
    talentCount:     number;
    isActive:        boolean;
    identityName:    string;
}
