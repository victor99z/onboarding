import httpFunction from '../getAllTurmas'
import context from './defaultContext'
import * as faker from "faker-br"
import { Aluno, Disciplina, FORMA_INGRESSO, PERIODO, Professor, TITULACAO } from "../@types/types"
import { create, deleteAllItems } from '../shared/cosmos'
import { TABELA_ALUNOS, TABELA_DISCIPLINAS, TABELA_PROFESSORES, TABELA_TURMAS } from '../shared/config'


describe("getAllTurmas -> index.ts", () => {

    jest.setTimeout(10000)

    let aluno: Aluno, disciplina: Disciplina, professor: Professor, t1, t2

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

        const turma1 = {
            alunos: [aluno.id],
            disciplinas: [disciplina.id],
            ano: faker.random.number(),
            numVagas: faker.random.number(),
            periodoLetivo: PERIODO.NOITE
        }

        const turma2 = {
            alunos: [aluno.id],
            disciplinas: [disciplina.id],
            ano: faker.random.number(),
            numVagas: faker.random.number(),
            periodoLetivo: PERIODO.MANHA
        }

        t1 = await create(TABELA_TURMAS, turma1)
        t2 = await create(TABELA_TURMAS, turma2)

    })


    test("Deve pegar todos os Turmas", async () => {

        const req = {
            body: {}
        }

        await httpFunction(context, req)

        expect(context.res.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: t1 }),
            expect.objectContaining({ id: t2 })
        ]))

        expect(context.res.body).not.toBeNull()
    })
})

