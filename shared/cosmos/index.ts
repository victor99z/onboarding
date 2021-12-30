import { CosmosClient, SqlParameter } from "@azure/cosmos";
import { config as dotenv_config } from "dotenv"


dotenv_config()

interface IQuery {
    query: string,
    parameters?: SqlParameter[]
}

const endpoint = process.env.END_POINT_URL
const key = process.env.DB_KEY
const DB_NAME = "onboarding"

const client = new CosmosClient({ endpoint, key })

const create = async (nomeTabela: string, body: any): Promise<string> => {
    const { database } = await client.databases.createIfNotExists({ id: "onboarding" });
    const { container } = await database.containers.createIfNotExists({ id: nomeTabela });

    const result = await container.items.create(body);

    return result.item.id

}

const findAll = async (nomeTabela: string, { query, parameters }: IQuery): Promise<any> => {
    const { container } = await client.database(DB_NAME).containers.createIfNotExists({ id: nomeTabela })

    const { resources } = await container.items.query({ query, parameters }).fetchAll()

    return resources;
}

const deleteOne = async (nomeTabela: string, nome: string) => {
    const { container } = await client.database(DB_NAME).containers.createIfNotExists({ id: nomeTabela })

    // TODO: terminar exlucao de alunos
    //const response = container.item()

}

export { IQuery, create, findAll }