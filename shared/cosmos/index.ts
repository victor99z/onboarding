import { CosmosClient, ItemResponse, SqlParameter } from "@azure/cosmos";
import { config as dotenv_config } from "dotenv"
import { DB_NAME } from "../config"


dotenv_config()

interface IQuery {
    query: string,
    parameters?: SqlParameter[]
}

const endpoint = process.env.END_POINT_URL
const key = process.env.DB_KEY

const client = new CosmosClient({ endpoint, key })

const create = async (nomeTabela: string, body: any): Promise<string> => {
    const { database } = await client.databases.createIfNotExists({ id: "onboarding" });
    const { container } = await database.containers.createIfNotExists({ id: nomeTabela });

    const result = await container.items.create(body);

    return result.item.id

}

const findAll = async (nomeTabela: string): Promise<any> => {

    const sql = `select * from ${nomeTabela}`
    const query: IQuery = {
        query: sql,
    }

    const { container } = await client.database(DB_NAME).containers.createIfNotExists({ id: nomeTabela })
    const { resources } = await container.items.query(query).fetchAll()

    return resources;
}

const findById = async (nomeTabela: string, id: string): Promise<ItemResponse<any>> => {
    const item = await client.database(DB_NAME).container(nomeTabela).item(id).read()
    return item
}

const deleteAllItems = async (nomeTabela: string): Promise<any> => {
    const container = await client.database(DB_NAME).container(nomeTabela)
    await container.delete()
    await client.database(DB_NAME).containers.create({ id: nomeTabela })
}

const findByName = async (nomeTabela: string, nome: string): Promise<any> => {
    const sql = `select * from ${nomeTabela} t where t.nome=@nome`

    const query: IQuery = {
        query: sql,
        parameters: [{
            name: "@nome", value: nome
        }]
    }

    const { resources: result } = await client.database(DB_NAME).container(nomeTabela).items.query(query).fetchAll()

    return result
}

export { IQuery, create, findAll, findById, deleteAllItems, findByName }