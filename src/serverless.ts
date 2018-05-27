import {GraphQLServerLambda} from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'
import { sign } from 'jsonwebtoken';

/**
 * The server created in this file is used for production deployment in aws lambda.
 * It should be functionally equivalent to the local server implementation in in index.ts.
 */
const lambda = new GraphQLServerLambda({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => {
        const prisma = new Prisma({
            endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
            secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
            debug: true, // log all GraphQL queries & mutations
        });

        return ({
            ...req,
            isServerless: true,
            db: prisma
        })
    },
});

export const server = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;