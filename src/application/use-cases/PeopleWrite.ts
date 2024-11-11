import { People } from "../../domain/entities/People";
import { PeopleRepository } from "../../infrastructure/repositories/PeopleRepository";
import { ExternalService } from "../../infrastructure/services/ExternalService";
import { PeopleTranslate } from "./PeopleTranslate";

export class PeopleWrite {
    constructor(
        private peopleRepository: PeopleRepository,
        private externalService: ExternalService,
        private peopleTranslate: PeopleTranslate
    ){}

    async create(id: number){
        //obtenemos de swapi
        const validatePeople = await this.peopleRepository.findById(id);
        if(validatePeople){
            return validatePeople;
        } else {
            //insertamos
            const peopleData = await this.externalService.readPeople(id);
            const peopleTranslate = await this.peopleTranslate.doTranslate(peopleData);
            peopleTranslate.id = id;
            return this.peopleRepository.create(peopleTranslate);
        }                  
    }
}