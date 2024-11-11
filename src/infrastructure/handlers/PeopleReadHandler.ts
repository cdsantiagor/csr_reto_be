import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { PeopleRepositoryImpl } from "../repositories/PeopleRepositoryImpl";
import { PeopleRead } from "../../application/use-cases/PeopleRead";
import { ExternalService } from "../services/ExternalService";
import { PeopleTranslate } from "../../application/use-cases/PeopleTranslate";

const peopleRead = new PeopleRead(new PeopleRepositoryImpl(), new ExternalService(), new PeopleTranslate(new PeopleRepositoryImpl()));

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { httpMethod, pathParameters, path } = event;
    try{
        if(httpMethod === "GET"){
            if(path.startsWith("/people")){
                if(pathParameters?.id){
                    const people = await peopleRead.findById(Number(pathParameters.id));
                    return { statusCode: people ? 200 : 404, body: JSON.stringify(people) };
                } else {
                    const peopleList = await peopleRead.findAll();
                    return { statusCode: 200, body: JSON.stringify(peopleList) };
                }
            } else if(path.startsWith("/swapi")) {
                const people = await peopleRead.readExternalService(Number(pathParameters.id));
                return { statusCode: people ? 200 : 404, body: JSON.stringify(people) };
            } else {
                return { statusCode: 400, body: "Invalid Request Path" };
            }                       
        } 
        else
        {
            return { statusCode: 400, body: "Invalid Request" };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
}