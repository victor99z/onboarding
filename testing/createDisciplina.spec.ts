
import { TABELA_DISCIPLINAS, TABELA_PROFESSORES } from "../shared/config"
import { create, deleteAllItems } from "../shared/cosmos"
import httpFunction from "../createDisciplina"
import context from "./defaultContext"

afterAll(async () => {
    await deleteAllItems(TABELA_DISCIPLINAS)
})

beforeAll

describe("createDisciplina -> index.ts", () => {
    jest.setTimeout(10000)

    test("cria uma disciplina com professor ficticio", async () => {

        const professor = {
            nome: "João da silva",
            titulacao: "Mestre"
        }

        const profIdTeste = await create(TABELA_PROFESSORES, professor)

        const req = {
            body: {
                idProfessor: profIdTeste,
                cargaHoraria: 36
            }
        }

        await httpFunction(context, req);

        expect(context.res.body.id).not.toBeNull()

    })

    test("Erro de professor não encontrado", async () => {

        const req = {
            body: {
                idProfessor: "dada",
                cargaHoraria: 36
            }
        }

        await httpFunction(context, req);

        expect(context.res.body.msg).toBe("Professor não encontrado")

    })


    test("erro de campo nao preenchido", async () => {

        const req = {
            body: {
                idProfessor: null,
                cargaHoraria: 36
            }
        }

        await httpFunction(context, req);

        expect(context.res.body.msg).toBe("Campos não preenchidos")

    })

})