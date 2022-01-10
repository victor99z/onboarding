
import { TABELA_DISCIPLINAS, TABELA_PROFESSORES } from "../shared/config"
import { create, deleteAllItems } from "../shared/cosmos"
import httpFunction from "../createDisciplina"
import context from "./defaultContext"
import { TITULACAO } from "../@types/types"
import * as faker from "faker-br"


describe("createDisciplina -> index.ts", () => {
    jest.setTimeout(10000)

    afterAll(async () => {
        await deleteAllItems(TABELA_DISCIPLINAS)
        await deleteAllItems(TABELA_PROFESSORES)
    })

    test("cria uma disciplina com professor ficticio", async () => {

        const professor = {
            nome: faker.name.firstName(),
            titulacao: TITULACAO.MESTRE
        }

        const profIdTeste = await create(TABELA_PROFESSORES, professor)

        const req = {
            body: {
                idProfessor: profIdTeste,
                cargaHoraria: faker.random.number()
            }
        }

        await httpFunction(context, req);

        expect(context.res.body.id).not.toBeNull()

    })

    test("Erro de professor não encontrado", async () => {

        const req = {
            body: {
                idProfessor: faker.random.word(),
                cargaHoraria: faker.random.number()
            }
        }

        await httpFunction(context, req);

        expect(context.res.body.msg).toBe("Professor não encontrado")

    })


    test("erro de campo nao preenchido", async () => {

        const req = {
            body: {
                idProfessor: null,
                cargaHoraria: faker.random.number()
            }
        }

        await httpFunction(context, req);

        expect(context.res.body.msg).toBe("Campos não preenchidos")

    })

})