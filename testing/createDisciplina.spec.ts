
import { TABELA_PROFESSORES } from "../shared/config"
import { create } from "../shared/cosmos"
import httpFunction from "../createDisciplina"
import context from "./defaultContext"

describe("createDisciplina -> index.ts", () => {
    jest.setTimeout(10000)

    // TODO: inserir um professor no bd e fazer o teste depois
    test("cria uma disciplina", async () => {

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

})