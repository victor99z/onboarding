import context from "./defaultContext"
import httpFunction from "../createProfessor"
import { deleteAllItems } from "../shared/cosmos"
import { TABELA_PROFESSORES } from "../shared/config"
import { TITULACAO } from "../@types/types"
import * as faker from "faker-br"

afterAll(async () => {
    await deleteAllItems(TABELA_PROFESSORES)
})

describe("createProfessor -> index.ts", () => {
    jest.setTimeout(10000)

    test("Deve criar um professor", async () => {
        const req = {
            body: {
                nome: faker.name.firstName(),
                titulacao: TITULACAO.PHD
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.id).not.toBeNull()

    })

    test("Deve gerar um erro por falta de input", async () => {
        const req = {
            body: {
                nome: null,
                titulacao: TITULACAO.PHD
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toBe("Campos não preenchidos")

    })

    test("Deve gerar um erro por falta de input", async () => {
        const req = {
            body: {
                nome: null,
                titulacao: null
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toBe("Campos não preenchidos")

    })

    test("Deve gerar um erro por falta de input", async () => {
        const req = {
            body: {
                nome: faker.name.firstName(),
                titulacao: "RAPAZZ"
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toBe("Titulação inválida")

    })

})