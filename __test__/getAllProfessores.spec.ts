import httpFunction from '../getAllProfessores'
import context from './defaultContext'
import * as faker from "faker-br"
import { TABELA_PROFESSORES } from '../shared/config'
import { create, deleteAllItems } from '../shared/cosmos'
import { TITULACAO } from '../@types/types'


describe("getAllProfessores -> index.ts", () => {

    jest.setTimeout(10000)

    let prof1, prof2

    afterAll(async () => {
        await deleteAllItems(TABELA_PROFESSORES)
    })

    beforeAll(async () => {
        prof1 = {
            nome: faker.name.firstName(),
            titulacao: TITULACAO.GRADUADO
        }
        prof2 = {
            nome: faker.name.firstName(),
            titulacao: TITULACAO.MESTRE
        }

        prof1 = await create(TABELA_PROFESSORES, prof1)
        prof2 = await create(TABELA_PROFESSORES, prof2)

    })

    test("Deve pegar todos os professores", async () => {

        const req = {
            body: {}
        }

        await httpFunction(context, req)

        expect(context.res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: prof1 }),
            expect.objectContaining({ id: prof2 })
        ]))
        expect(context.res.body).not.toBeNull()
    })
})

