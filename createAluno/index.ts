import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_ALUNOS } from "../shared/config";
import { create, IQuery } from "../shared/cosmos"


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { nome, idade, matricula, formaIngresso } = req.body

    const aluno: Aluno = {
        nome,
        idade,
        matricula,
        formaIngresso
    }

    const insert = await create(TABELA_ALUNOS, aluno)

    context.res = {
        body: {
            id: insert
        }
    }

};

export default httpTrigger;