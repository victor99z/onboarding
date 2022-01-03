import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TABELA_DISCIPLINAS } from "../shared/config";
import { findAll } from "../shared/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const response = await findAll(TABELA_DISCIPLINAS)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };

};

export default httpTrigger;