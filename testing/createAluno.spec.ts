import httpFunction from '../createAluno'
import { TABELA_ALUNOS } from '../shared/config'
import { deleteAllItems } from '../shared/cosmos'
import context from './defaultContext'

afterAll(async () => {
    await deleteAllItems(TABELA_ALUNOS)
})

beforeAll(async () => {
    // init db
})

describe("createAluno -> index.ts", () => {

    jest.setTimeout(10000)

    test("Deve gerar um erro ao criar o aluno", async () => {

        const req = {
            body: {
                nome: "teste",
                idade: "22",
                matricula: "ABC5547E",
                formaIngresso: "VESTIBULAR"
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Idade precisa ser um numero")
    })

    test("Deve criar um aluno", async () => {

        const req = {
            body: {
                nome: "teste",
                idade: 22,
                matricula: "ABC5547E",
                formaIngresso: "VESTIBULAR"
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.id).not.toBeNull()
    })

    test("Deve gerar um erro por falta de input", async () => {

        const req = {
            body: {
                nome: null,
                idade: 22,
                matricula: "ABC5547E",
                formaIngresso: "VESTIBULAR"
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Campos não preenchidos")
    })

    test("Deve gerar um erro por falta de input e idade sem ser numero", async () => {

        const req = {
            body: {
                nome: null,
                idade: "22",
                matricula: "ABC5547E",
                formaIngresso: "VESTIBULAR"
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Campos não preenchidos")
        expect(context.res.body.msg).toContain("Idade precisa ser um numero")
    })
})


