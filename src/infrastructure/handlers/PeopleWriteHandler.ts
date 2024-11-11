import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PeopleRepositoryImpl } from "../repositories/PeopleRepositoryImpl";
import { PeopleWrite } from "../../application/use-cases/PeopleWrite";
import { People } from "../../domain/entities/People";
import { ExternalService } from "../services/ExternalService";
import { PeopleTranslate } from "../../application/use-cases/PeopleTranslate";

const peopleWrite = new PeopleWrite(new PeopleRepositoryImpl(), new ExternalService(), new PeopleTranslate(new PeopleRepositoryImpl()));

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { httpMethod, pathParameters, body } = event;
    try{
        if(httpMethod === "POST"){
            const peopleRequest = JSON.parse(body!);
            const peopleCreated = await peopleWrite.create(peopleRequest.id);
            return { statusCode: 201, body: JSON.stringify(peopleCreated) };
        } 
        else
        {
            return { statusCode: 400, body: "Invalid Request" };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
}