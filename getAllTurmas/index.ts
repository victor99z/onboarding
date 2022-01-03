import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_TURMAS } from "../shared/config";
import { findAll } from "../shared/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const turmas = await findAll(TABELA_TURMAS)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: turmas
    };

};

export default httpTrigger;