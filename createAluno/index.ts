import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { create, IQuery } from "../shared/cosmos"

interface Aluno {
    nome: string,
    idade: number,
    matricula: string,
    formaIngresso: string
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { nome, idade, matricula, formaIngresso } = req.body

    const aluno: Aluno = {
        nome,
        idade,
        matricula,
        formaIngresso
    }

    const insert = await create("alunos", aluno)

    context.res = {
        body: {
            id: insert
        }
    }

};

export default httpTrigger;