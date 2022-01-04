import httpFunction from '../getAllAlunos'
import context from './defaultContext'

describe("getAllAlunos -> index.ts", () => {

    jest.setTimeout(10000)

    test("Deve pegar todos os alunos", async () => {

        const req = {
            body: {}
        }

        await httpFunction(context, req)

        expect(context.res.body).not.toBeNull()
    })
})

