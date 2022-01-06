import context from "./defaultContext"
import httpFunction from "../matriculaAluno"
import { deleteAllItems } from "../shared/cosmos"
import { Turma } from "../@types/types"
import { TABELA_ALUNOS, TABELA_DISCIPLINAS, TABELA_PROFESSORES, TABELA_TURMAS } from "../shared/config"
import { create } from "../shared/cosmos"

// TODO: finalizar

let aluno1, aluno2, disp1, disp2, prof1, prof2

afterAll(async () => {
    await deleteAllItems(TABELA_ALUNOS)
    await deleteAllItems(TABELA_TURMAS)
    await deleteAllItems(TABELA_DISCIPLINAS)
})

beforeAll(async () => {
    aluno1 = await create(TABELA_ALUNOS, {
        nome: "Joshua",
        idade: 19,
        matricula: "16498ad",
        formaIngresso: "Vestibular"
    })
    aluno2 = await create(TABELA_ALUNOS, {
        nome: "ROberson",
        idade: 23,
        matricula: "16498ad",
        formaIngresso: "SISU"
    })

    prof1 = await create(TABELA_PROFESSORES, {
        nome: "TESTE",
        titulacao: "PHD"
    })

    prof2 = await create(TABELA_PROFESSORES, {
        nome: "TESTE2",
        titulacao: "MSc"
    })

    disp1 = await create(TABELA_DISCIPLINAS, {
        idProfessor: prof1,
        cargaHoraria: 72
    })

    disp2 = await create(TABELA_DISCIPLINAS, {
        idProfessor: prof2,
        cargaHoraria: 72
    })
})

describe("matriculaAluno -> index.ts", () => {
    jest.setTimeout(10000)

    const turma = {
        alunos: [aluno1, aluno2],
        disciplinas: [disp1, disp2],
        ano: "2022",
        numVagas: 60,
        periodoLetivo: "Manhã"
    }

    test("deve matricular um aluno ", async () => {

        const req = { body: turma }

        await httpFunction(context, req)

        expect(context.res.body.id).not.toBeNull()
    })

    test("deve gerar erro de aluno já matricula na turma ", async () => {
        expect(true).toBe(true)
    })

    test("deve gerar erro de aluno ou turma inexistente ", async () => {
        expect(true).toBe(true)
    })

    test("deve gerar erro de input ", async () => {
        expect(true).toBe(true)
    })

})