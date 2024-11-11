import axios from "axios";

export class ExternalService {
    private EXTERNAL_URL: string = 'https://swapi.dev/api/';

    async readPeople(id: number){
        const response = await axios.get(`${this.EXTERNAL_URL}/people/${id}`);
        const peopleData = response.data;
        return peopleData;
    }
}