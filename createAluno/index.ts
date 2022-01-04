import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_ALUNOS } from "../shared/config";
import { create, IQuery } from "../shared/cosmos"
import { validaAluno } from "./valida";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { nome, idade, matricula, formaIngresso } = req.body

    const aluno: Aluno = {
        nome,
        idade,
        matricula,
        formaIngresso
    }

    const msgValida = validaAluno(aluno)

    if (msgValida.length == 0) {
        const idCriacao = await create(TABELA_ALUNOS, aluno)
        context.res = {
            body: {
                id: idCriacao
            }
        }
        return
    }

    context.res = {
        body: {
            msg: msgValida
        }
    }

};

export default httpTrigger;