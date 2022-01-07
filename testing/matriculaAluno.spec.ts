import context from "./defaultContext"
import httpFunction from "../matriculaAluno"
import { deleteAllItems } from "../shared/cosmos"
import { FORMA_INGRESSO, PERIODO, TITULACAO } from "../@types/types"
import { TABELA_ALUNOS, TABELA_DISCIPLINAS, TABELA_PROFESSORES, TABELA_TURMAS } from "../shared/config"
import { create } from "../shared/cosmos"

let aluno1, aluno2, disp1, disp2, prof1, prof2

afterAll(async () => {
    await deleteAllItems(TABELA_TURMAS)
    await deleteAllItems(TABELA_ALUNOS)
    await deleteAllItems(TABELA_DISCIPLINAS)
    await deleteAllItems(TABELA_PROFESSORES)
})

beforeAll(async () => {
    aluno1 = await create(TABELA_ALUNOS, {
        nome: "Joshua",
        idade: 19,
        matricula: "16498ad",
        formaIngresso: FORMA_INGRESSO.SISU
    })
    aluno2 = await create(TABELA_ALUNOS, {
        nome: "ROberson",
        idade: 23,
        matricula: "16498ad",
        formaIngresso: FORMA_INGRESSO.VESTIBULAR
    })
    prof1 = await create(TABELA_PROFESSORES, {
        nome: "TESTE",
        titulacao: TITULACAO.GRADUADO
    })
    prof2 = await create(TABELA_PROFESSORES, {
        nome: "TESTE2",
        titulacao: TITULACAO.PHD
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


    test("deve matricular um aluno ", async () => {

        const turma = {
            alunos: [aluno1],
            disciplinas: [disp1, disp2],
            ano: "2022",
            numVagas: 60,
            periodoLetivo: PERIODO.MANHA
        }

        const idTurma = await create(TABELA_TURMAS, turma)

        const req = {
            body: {
                idTurma,
                idAluno: aluno2
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.id).not.toBeNull()
    })

    test("deve gerar erro de aluno já matricula na turma ", async () => {

        aluno1 = await create(TABELA_ALUNOS, {
            nome: "Joshua",
            idade: 19,
            matricula: "16498ad",
            formaIngresso: FORMA_INGRESSO.SISU
        })

        const turma = {
            alunos: [aluno1],
            disciplinas: [disp1, disp2],
            ano: "2022",
            numVagas: 60,
            periodoLetivo: PERIODO.MANHA
        }

        const idTurma = await create(TABELA_TURMAS, turma)

        const req = {
            body: {
                idTurma,
                idAluno: aluno1
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toBe("Aluno já matriculado")
    })

    test("deve gerar erro de aluno ou turma inexistente ", async () => {
        const turma = {
            alunos: [aluno1],
            disciplinas: [disp1, disp2],
            ano: "2022",
            numVagas: 60,
            periodoLetivo: PERIODO.MANHA
        }

        const idTurma = await create(TABELA_TURMAS, turma)

        const req = {
            body: {
                idTurma,
                idAluno: "aasdad"
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toBe("Turma ou Aluno inválidos")
    })

    test("deve gerar erro de input ", async () => {
        const turma = {
            alunos: [aluno1],
            disciplinas: [disp1, disp2],
            ano: "2022",
            numVagas: 60,
            periodoLetivo: PERIODO.MANHA
        }

        const idTurma = await create(TABELA_TURMAS, turma)

        const req = {
            body: {
                idTurma: null,
                idAluno: "aasdad"
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toBe("Campos não preenchidos")
    })

})