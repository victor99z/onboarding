import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { create, IQuery } from "../shared/cosmos"
import { TABELA_PROFESSORES } from "../shared/config"



const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { nome, titulacao } = req.body;

    const professor: Professor = {
        nome,
        titulacao
    }

    const idCriacao = await create(TABELA_PROFESSORES, professor)

    context.res = {
        body: {
            idCriacao
        }
    };

};

export default httpTrigger;