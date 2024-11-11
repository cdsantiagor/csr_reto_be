import { Dictionary } from "../../domain/entities/Dictionary";
import { People } from "../../domain/entities/People";

export interface PeopleRepository {
    create(people: People): Promise<People>;
    findById(id: number): Promise<People | null>;
    findAll(): Promise<People[]>;
    findDictionary(): Promise<Dictionary[]>;
  }