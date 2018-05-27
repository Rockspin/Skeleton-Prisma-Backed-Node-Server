#!/usr/bin/env bash

apollo-codegen download-schema http://localhost:$Port --output schema.json --header "Authorization: Bearer $(prisma token) "
