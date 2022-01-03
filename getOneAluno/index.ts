import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_ALUNOS } from "../shared/config";
import { findAll, findByName, IQuery } from "../shared/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { nome } = req.body

    const response = await findByName(TABELA_ALUNOS, nome)

    context.res = {
        body: response
    };

};

export default httpTrigger;