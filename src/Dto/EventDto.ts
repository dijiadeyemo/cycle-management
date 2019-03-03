export class EventDto {
    
    constructor(
        public user_id: number,
        public symptom: number,
        public timestamp: string,
    ){}
}