import { ApolloServer } from "apollo-server-micro"
import { buildSchema } from "type-graphql"
import RESOLVERS from "@workspace/database/config/resolvers"

interface MyApolloContext {
    req: Request
    res: Response
}

// processRequest()

const APOLLO_SERVER = new ApolloServer({
    schema: await buildSchema({
        resolvers: RESOLVERS,
    }),
    context: async ({req, res}): Promise<MyApolloContext> => {
        return {
            req,
            res,
        }
    },
    
    // link: 
    
    // cache: InMemoryCache()
})

export default APOLLO_SERVER