import httpFunction from '../getAllDisciplinas'
import { TABELA_DISCIPLINAS, TABELA_PROFESSORES } from '../shared/config'
import { create, deleteAllItems } from '../shared/cosmos'
import context from './defaultContext'
import * as faker from "faker-br"
import { TITULACAO } from '../@types/types'

let dis1, dis2, prof

afterAll(async () => {
    await deleteAllItems(TABELA_DISCIPLINAS)
    await deleteAllItems(TABELA_PROFESSORES)
})

beforeAll(async () => {
    prof = {
        nome: faker.name.firstName(),
        titulacao: TITULACAO.GRADUADO
    }

    const idProfessor = await create(TABELA_PROFESSORES, prof)

    dis1 = {
        idProfessor,
        cargaHoraria: faker.random.number()
    }

    dis2 = {
        idProfessor,
        cargaHoraria: faker.random.number()
    }

    await create(TABELA_DISCIPLINAS, dis1)
    await create(TABELA_DISCIPLINAS, dis2)

})

describe("getAllDisciplinas -> index.ts", () => {

    jest.setTimeout(10000)

    test("Deve pegar todos os Disciplinas", async () => {

        const req = {
            body: {}
        }

        await httpFunction(context, req)

        expect(context.res.body.length).toBe(2)
        expect(context.res.body).not.toBeNull()
    })
})

