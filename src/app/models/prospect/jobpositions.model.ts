
export class JobPositionModel {

    constructor(
        public id:              string,
        public name:            string,
        public username:        string,
        public assineeUsername: string,
        public description:     string,
        public talentCount:     number,
        public isActive:        boolean,
        public identityName:    string
    ) {}

}
