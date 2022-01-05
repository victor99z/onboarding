import context from "./defaultContext"
import httpFunction from "../createTurma"
import { TABELA_ALUNOS } from "../shared/config"
import { Aluno } from "../@types/types"

afterAll(async () => {
    //await deleteAllItems()
})


beforeAll(async () => {

})

describe("createTurma -> index.ts", () => {
    jest.setTimeout(10000)

    test("Cria uma turma ", async () => {

        const aluno: Aluno = {
            nome: "JK",
            formaIngresso: "VESTIBULAR",
            idade: 30,
            matricula: "ABC113"
        }

        const idAluno = create(TABELA_ALUNOS, aluno)

        const turma = {
            alunos: [],
            disciplinas: [],
            ano: 2022,
            numVagas: 30,
            periodoLetivo: "Matutino"
        }
    })

})