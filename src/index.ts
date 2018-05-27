import {GraphQLServer} from "graphql-yoga";
import resolvers from './resolvers'
import {Prisma} from "./generated/prisma";

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: req => {
        const prisma = new Prisma({
            endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
            secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
            debug: true, // log all GraphQL queries & mutations
        });

        return ({
            ...req,
            isServerless: false,
            db: prisma
        });
    },
});

server.start({port: process.env.Port},() => {console.log(`Server is running on http://localhost:4001`) });