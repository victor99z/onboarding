import context from "./defaultContext"
import httpFunction from "../matriculaAluno"
import { deleteAllItems } from "../shared/cosmos"
import { FORMA_INGRESSO, PERIODO, TITULACAO } from "../@types/types"
import { TABELA_ALUNOS, TABELA_DISCIPLINAS, TABELA_PROFESSORES, TABELA_TURMAS } from "../shared/config"
import { create } from "../shared/cosmos"
import * as faker from "faker-br"

let aluno1, aluno2, disp1, disp2, prof1, prof2

afterAll(async () => {
    await deleteAllItems(TABELA_TURMAS)
    await deleteAllItems(TABELA_ALUNOS)
    await deleteAllItems(TABELA_DISCIPLINAS)
    await deleteAllItems(TABELA_PROFESSORES)
})

beforeAll(async () => {

    aluno1 = await create(TABELA_ALUNOS, {
        nome: faker.name.firstName(),
        idade: faker.random.number(),
        matricula: faker.random.hexaDecimal(),
        formaIngresso: FORMA_INGRESSO.SISU
    })
    aluno2 = await create(TABELA_ALUNOS, {
        nome: faker.name.firstName(),
        idade: faker.random.number(),
        matricula: faker.random.number(),
        formaIngresso: FORMA_INGRESSO.VESTIBULAR
    })
    prof1 = await create(TABELA_PROFESSORES, {
        nome: faker.name.firstName(),
        titulacao: TITULACAO.GRADUADO
    })
    prof2 = await create(TABELA_PROFESSORES, {
        nome: faker.name.firstName(),
        titulacao: TITULACAO.PHD
    })
    disp1 = await create(TABELA_DISCIPLINAS, {
        idProfessor: prof1,
        cargaHoraria: faker.random.number()
    })
    disp2 = await create(TABELA_DISCIPLINAS, {
        idProfessor: prof2,
        cargaHoraria: faker.random.number()
    })

})

describe("matriculaAluno -> index.ts", () => {
    jest.setTimeout(10000)

    /**
     * FIXME: Erro no teste ao executar o suite completo porem o test sozinho funciona
     * possivel que algum outro teste tenha apagado os registros no db antes de executar o teste
     * obs: endpoint está funcionando corretamente
     */
    test("deve gerar erro de aluno já matricula na turma ", async () => {

        const turma = {
            alunos: [aluno1],
            disciplinas: [disp1],
            ano: faker.random.number(),
            numVagas: faker.random.number(),
            periodoLetivo: PERIODO.MANHA
        }

        const idTurma = await create(TABELA_TURMAS, turma)

        const req = {
            body: {
                idAluno: aluno1,
                idTurma
            }
        }
        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Aluno já matriculado")
    })

    test("deve matricular um aluno ", async () => {

        const turma = {
            alunos: [aluno1],
            disciplinas: [disp1, disp2],
            ano: faker.random.number(),
            numVagas: faker.random.number(),
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

    test("deve gerar erro de aluno ou turma inexistente ", async () => {
        const turma = {
            alunos: [aluno1],
            disciplinas: [disp1, disp2],
            ano: faker.random.number(),
            numVagas: faker.random.number(),
            periodoLetivo: PERIODO.MANHA
        }

        const idTurma = await create(TABELA_TURMAS, turma)

        const req = {
            body: {
                idTurma,
                idAluno: faker.random.hexaDecimal()
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Turma ou Aluno inválidos")
    })

    test("deve gerar erro de input ", async () => {

        const req = {
            body: {
                idTurma: null,
                idAluno: faker.random.hexaDecimal()
            }
        }

        await httpFunction(context, req)

        expect(context.res.body.msg).toContain("Campos não preenchidos")
    })

})