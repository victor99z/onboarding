import httpFunction from '../getAllAlunos'
import { TABELA_ALUNOS } from '../shared/config'
import { create, deleteAllItems } from '../shared/cosmos'
import context from './defaultContext'
import * as faker from "faker-br"
import { FORMA_INGRESSO } from "../@types/types"



describe("getAllAlunos -> index.ts", () => {

    let aluno1, aluno2, aluno3

    afterAll(async () => {
        await deleteAllItems(TABELA_ALUNOS)
    })

    beforeAll(async () => {
        aluno1 = {
            nome: faker.name.firstName(),
            idade: faker.random.number(),
            matricula: faker.random.hexaDecimal(),
            formaIngresso: FORMA_INGRESSO.ENEM
        }
        aluno2 = {
            nome: faker.name.firstName(),
            idade: faker.random.number(),
            matricula: faker.random.hexaDecimal(),
            formaIngresso: FORMA_INGRESSO.ENADE
        }
        aluno3 = {
            nome: faker.name.firstName(),
            idade: faker.random.number(),
            matricula: faker.random.hexaDecimal(),
            formaIngresso: FORMA_INGRESSO.VESTIBULAR
        }
        aluno1 = await create(TABELA_ALUNOS, aluno1)
        aluno2 = await create(TABELA_ALUNOS, aluno2)
        aluno3 = await create(TABELA_ALUNOS, aluno3)
    })

    jest.setTimeout(10000)

    test("Deve pegar todos os alunos", async () => {

        const req = {
            body: {}
        }

        await httpFunction(context, req)

        expect(context.res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: aluno1 }),
            expect.objectContaining({ id: aluno2 }),
            expect.objectContaining({ id: aluno3 })
        ]))

        expect(context.res.body).not.toBeNull()
    })
})

