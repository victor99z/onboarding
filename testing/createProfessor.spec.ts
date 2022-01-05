import context from "./defaultContext"
import httpFunction from "../createProfessor"

describe("createProfessor -> index.ts", () => {
    jest.setTimeout(10000)

    test("Deve criar um professor", async () => {
        const req = {
            body: {
                nome: "Java",
                titulacao: "Doutor"
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.id).not.toBeNull()

    })

    test("Deve gerar um erro por falta de input", async () => {
        const req = {
            body: {
                nome: null,
                titulacao: "Doutor"
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

})