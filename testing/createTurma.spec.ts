import context from "./defaultContext"
import httpFunction from "../createTurma"
import { TABELA_ALUNOS, TABELA_DISCIPLINAS, TABELA_PROFESSORES, TABELA_TURMAS } from "../shared/config"
import { Aluno, Disciplina, FORMA_INGRESSO, PERIODO, Professor, TITULACAO } from "../@types/types"
import { create, deleteAllItems } from "../shared/cosmos"
import * as faker from "faker-br"

let aluno: Aluno, disciplina: Disciplina, professor: Professor

afterAll(async () => {
    await deleteAllItems(TABELA_ALUNOS)
    await deleteAllItems(TABELA_DISCIPLINAS)
    await deleteAllItems(TABELA_TURMAS)
    await deleteAllItems(TABELA_PROFESSORES)
})

beforeAll(async () => {
    aluno = {
        nome: faker.name.firstName(),
        formaIngresso: FORMA_INGRESSO.VESTIBULAR,
        idade: faker.random.number(),
        matricula: faker.random.alphaNumeric()
    }

    professor = {
        nome: faker.name.firstName(),
        titulacao: TITULACAO.GRADUADO
    }

    professor.id = await create(TABELA_PROFESSORES, professor)

    disciplina = {
        cargaHoraria: faker.random.number(),
        professorId: professor.id
    }

    aluno.id = await create(TABELA_ALUNOS, aluno)
    disciplina.id = await create(TABELA_DISCIPLINAS, disciplina)

})

describe("createTurma -> index.ts", () => {
    jest.setTimeout(10000)

    test("Cria uma turma ", async () => {


        const turma = {
            alunos: [aluno.id],
            disciplinas: [disciplina.id],
            ano: faker.random.number(),
            numVagas: faker.random.number(),
            periodoLetivo: PERIODO.NOITE
        }

        const req = {
            body: turma
        }

        await httpFunction(context, req)

        expect(context.res.body.id).not.toBeNull()
    })

    test("Erro de aluno inexistente", async () => {
        const turma = {

            alunos: [
                faker.random.words()
            ],
            disciplinas: [
                disciplina.id
            ],
            ano: faker.random.number(),
            periodoLetivo: PERIODO.MANHA,
            numVagas: faker.random.number()

        }

        const req = {
            body: turma
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Aluno não encontrado")
    })

    test("Erro de disciplina inexistente", async () => {
        const turma = {

            alunos: [
                aluno.id
            ],
            disciplinas: [
                faker.random.alphaNumeric()
            ],
            ano: faker.random.number(),
            periodoLetivo: PERIODO.MANHA,
            numVagas: faker.random.number()

        }

        const req = {
            body: turma
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Disciplina não encontrada")
    })

    test("Erro de input ao criar turma", async () => {
        const turma = {
            alunos: null,
            disciplinas: null,
            ano: faker.random.number(),
            numVagas: faker.random.number(),
            periodoLetivo: PERIODO.TARDE
        }

        const req = {
            body: turma

        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Campos não preenchidos")
    })

    test("Erro: Periodo letivo inválido", async () => {
        const turma = {
            alunos: [aluno.id],
            disciplinas: [disciplina.id],
            ano: faker.random.number(),
            numVagas: faker.random.number(),
            periodoLetivo: faker.random.word()
        }

        const req = {
            body: turma
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Periodo letivo informado não existe")
    })

})