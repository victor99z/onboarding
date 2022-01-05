import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { findAll } from "../shared/cosmos"
import { TABELA_ALUNOS } from "../shared/config"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const response = await findAll(TABELA_ALUNOS)

    context.res = {
        body: response,
    };

};

export default httpTrigger;