import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { findAll, IQuery } from "../shared/cosmos"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const sql = "select * from c"

    const query: IQuery = {
        query: sql
    }

    const response = await findAll("alunos", query)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };

};

export default httpTrigger;