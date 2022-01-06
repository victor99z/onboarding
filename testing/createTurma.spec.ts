import context from "./defaultContext"
import httpFunction from "../createTurma"
import { TABELA_ALUNOS, TABELA_DISCIPLINAS, TABELA_PROFESSORES, TABELA_TURMAS } from "../shared/config"
import { Aluno, Disciplina, Professor } from "../@types/types"
import { create, deleteAllItems } from "../shared/cosmos"


afterAll(async () => {
    await deleteAllItems(TABELA_ALUNOS)
    await deleteAllItems(TABELA_DISCIPLINAS)
    await deleteAllItems(TABELA_TURMAS)
    await deleteAllItems(TABELA_PROFESSORES)
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

        const professor: Professor = {
            nome: "teste",
            titulacao: "Mestre"
        }

        const professorId = await create(TABELA_PROFESSORES, professor)

        const disciplina: Disciplina = {
            cargaHoraria: 36,
            professorId
        }

        const idAluno = await create(TABELA_ALUNOS, aluno)
        const idDisciplina = await create(TABELA_DISCIPLINAS, disciplina)

        const turma = {
            alunos: [idAluno],
            disciplinas: [idDisciplina],
            ano: 2022,
            numVagas: 30,
            periodoLetivo: "Matutino"
        }

        const req = {
            body: turma
        }

        await httpFunction(context, req)

        expect(context.res.body.id).not.toBeNull()
    })

    test("Erro de aluno ou disciplina inexistente", async () => {
        const turma = {

            alunos: [
                "2bd6abf1-48c8-48cd-8f07-f8f7c2d8af97",
                "2bd6abf1-48c8-48cd-8f07-f8f7c2d8af97",
                "2bd6abf1-48c8-48cd-8f07-f8f7c2d8af97",
                "2bd6abf1-48c8-48cd-8f07-f8f7c2d8af97",
                "2bd6abf1-48c8-48cd-8f07-f8f7c2d8af97"
            ],
            disciplinas: [
                "ce64f64a-4841-44c2-b024-fceb685d2c77",
                "ce64f64a-4841-44c2-b024-fceb685d2c77",
                "ce64f64a-4841-44c2-b024-fceb685d2c77"
            ],
            ano: 2022,
            periodoLetivo: "Manhã",
            numVagas: 30

        }

        const req = {
            body: turma
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toBe("Erro: Aluno ou Disciplina não existe")
    })

    test("Erro de input ao criar turma", async () => {
        const turma = {
            alunos: null,
            disciplinas: null,
            ano: 2022,
            numVagas: 30,
            periodoLetivo: "Matutino"
        }

        const req = {
            body: turma

        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toBe("Campos não preenchidos")
    })
})