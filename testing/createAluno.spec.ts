import { FORMA_INGRESSO } from '../@types/types'
import httpFunction from '../createAluno'
import { TABELA_ALUNOS } from '../shared/config'
import { deleteAllItems } from '../shared/cosmos'
import context from './defaultContext'
import * as faker from "faker-br"

afterAll(async () => {
    await deleteAllItems(TABELA_ALUNOS)
})


describe("createAluno -> index.ts", () => {

    jest.setTimeout(10000)

    test("Deve gerar um erro ao criar o aluno", async () => {

        const req = {
            body: {
                nome: faker.name.firstName(),
                idade: faker.random.word(),
                matricula: faker.random.alphaNumeric(),
                formaIngresso: FORMA_INGRESSO.ENADE
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Idade precisa ser um numero")
    })

    test("Deve criar um aluno", async () => {

        const req = {
            body: {
                nome: faker.name.firstName(),
                idade: faker.random.number(),
                matricula: faker.random.alphaNumeric(),
                formaIngresso: FORMA_INGRESSO.VESTIBULAR
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.id).not.toBeNull()
    })

    test("Deve gerar um erro por falta de input", async () => {

        const req = {
            body: {
                nome: null,
                idade: faker.random.number(),
                matricula: faker.random.alphaNumeric(),
                formaIngresso: FORMA_INGRESSO.SISU
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Campos não preenchidos")
    })

    test("Deve gerar um erro por falta de input e idade sem ser numero", async () => {

        const req = {
            body: {
                nome: null,
                idade: faker.random.word(),
                matricula: faker.random.alphaNumeric(),
                formaIngresso: FORMA_INGRESSO.VESTIBULAR
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Campos não preenchidos")
        expect(context.res.body.msg).toContain("Idade precisa ser um numero")
    })

    test("Deve gerar um erro por formato de Ingresso incorreto", async () => {

        const req = {
            body: {
                nome: faker.name.firstName(),
                idade: faker.random.number(),
                matricula: faker.random.alphaNumeric(),
                formaIngresso: faker.random.word()
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Campo formaIngresso com tipo incorreto")
    })

})


