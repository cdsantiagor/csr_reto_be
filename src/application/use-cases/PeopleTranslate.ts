import { People } from "../../domain/entities/People";
import { PeopleRepository } from "../../infrastructure/repositories/PeopleRepository";

export class PeopleTranslate {    
    constructor(private peopleRepository: PeopleRepository){}
    
    async doTranslate(peopleData: any){
        const keysMapping = await this.peopleRepository.findDictionary();
        const peopleTranslated: People = {};    
        for (const key of Object.keys(peopleData)) {
            if (keysMapping[key]) {    
                peopleTranslated[keysMapping[key]] = peopleData[key];              
            }
        }
        return peopleTranslated;
    }
}