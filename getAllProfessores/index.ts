import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { findAll, IQuery } from "../shared/cosmos"
import { TABELA_PROFESSORES } from "../shared/config"


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const response = await findAll(TABELA_PROFESSORES)

    context.res = {
        body: response
    };

};

export default httpTrigger;