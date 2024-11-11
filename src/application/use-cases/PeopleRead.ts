import { PeopleRepository } from "../../infrastructure/repositories/PeopleRepository";
import { ExternalService } from "../../infrastructure/services/ExternalService";
import { PeopleTranslate } from "./PeopleTranslate";

export class PeopleRead {
    constructor(
        private peopleRepository: PeopleRepository,
        private externalService: ExternalService,
        private peopleTranslate: PeopleTranslate
    ){}

    async findById(id: number){
        return this.peopleRepository.findById(id);
    }

    async findAll(){
        return this.peopleRepository.findAll();
    }

    async readExternalService(id: number){
        const peopleData = await this.externalService.readPeople(id);
        const peopleTranslate = await this.peopleTranslate.doTranslate(peopleData);
        return peopleTranslate;
    }
}