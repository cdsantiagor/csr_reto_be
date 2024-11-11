import { Dictionary } from "../../domain/entities/Dictionary";
import { People } from "../../domain/entities/People";
import { getDBConnection } from "../databases/ClientMySQL";
import { PeopleRepository } from "./PeopleRepository";

export class PeopleRepositoryImpl implements PeopleRepository {
    
    async create(people: People): Promise<People> {
        const connection = await getDBConnection();
        const [result] = await connection.execute(
            "INSERT INTO RETOS.people (id, nombre, altura, peso, color_cabello, color_piel, color_ojos, genero, mundo_natal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [people.id, people.nombre, people.altura, people.peso, people.colorCabello, people.colorPiel, people.colorOjos, people.genero, people.mundoNatal]
        );        
        await connection.end();
        const peopleCreated = new People(people.nombre, people.altura, people.peso, people.colorCabello, people.colorPiel, people.colorOjos, people.genero, people.mundoNatal, people.id);        
        return peopleCreated;
    }

    async findById(id: number): Promise<People | null> {
        const connection = await getDBConnection();
        const [rows] = await connection.execute(
            "SELECT nombre, altura, peso, color_cabello, color_piel, color_ojos, genero, mundo_natal FROM RETOS.people WHERE id = ?",
            [id]
        );
        await connection.end();
        const data = (rows as any)[0];
        return data ? new People(data.nombre, data.altura, data.peso, data.color_cabello, data.color_piel, data.color_ojos, data.genero, data.mundo_natal) : null;
    }

    async findAll(): Promise<People[]> {
        const connection = await getDBConnection();
        const [rows] = await connection.execute("SELECT nombre, altura, peso, color_cabello, color_piel, color_ojos, genero, mundo_natal FROM RETOS.people");
        await connection.end();
        return (rows as any).map((data: any) => new People(data.nombre, data.altura, data.peso, data.color_cabello, data.color_piel, data.color_ojos, data.genero, data.mundo_natal));
    }

    async findDictionary(): Promise<any> {
        const connection = await getDBConnection();
        const [rows] = await connection.execute("SELECT original, translated FROM RETOS.dictionary");
        await connection.end();
        const keysMapping = {};
        await (rows as any).map((data: any) => keysMapping[data.original] = data.translated );
        return keysMapping;
    }

}