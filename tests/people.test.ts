import { APIGatewayProxyEvent } from "aws-lambda";
import {handler} from '../src/infrastructure/handlers/PeopleReadHandler';
import getPeopleById from '../events/getPeopleById.json';

describe('getPeopleById', () => {
    it('Esperamos que devuelva un valor si mandamos un ID', async () => {
        const event = getPeopleById as unknown as APIGatewayProxyEvent;
        const result = await handler(event);
        expect(result.statusCode).toBe(200);
        expect(result.body).toContain('Luke Skywalker');
    });
});