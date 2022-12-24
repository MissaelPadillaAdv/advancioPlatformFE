import { TechStack } from '../../interfaces/prospect/talent.interface';


export class TalentModel {

    constructor(
        public bio?: string,
        public country?: string,
        public fullName?: string,
        public globalRaiting?: string,
        public id?: string,
        public jobPosition?: string,
        public location?: string,
        public modality?: string,
        public profilePic?: string,
        public raitingCount?: string,
        public talentLink?: string,
        public techStack?: TechStack,
        public wishList?: string,
        public yearsOfExp?: string,
    ){ }
}