// const withTM = require("next-transpile-modules")([
//     "@workspace/backend",
//     "@workspace/database",
//     "@workspace/shared",
// ])

/** @type {import('next').NextConfig} */
const nextConfig = {
    // headers: async () => [
    //     {
    //         source: "/api/graphql",
    //         headers: [
    //             // { key: "Access-Control-Allow-Origin", value: "https://studio.apollographql.com" },
    //             { key: "Access-Control-Allow-Origin", value: "*" },
    //             { key: "Access-Control-Allow-Credentials", value: "true" },
    //             // { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
    //             // {
    //             //     key: "Access-Control-Allow-Headers",
    //             //     value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    //             // },
    //         ],
    //     },
    // ],

    experimental: {
        externalDir: true,
    },
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        config.resolve.fallback = { fs: false }

        // Fixes api routes crashing
        config.experiments = {
            topLevelAwait: true,
            // it makes a WebAssembly modules async modules
            syncWebAssembly: true,
            asyncWebAssembly: true,
            layers: true,
        }

        // generate wasm module in ".next/server" for ssr & ssg
        if (isServer) {
            config.output.webassemblyModuleFilename = "./../static/wasm/[modulehash].wasm"
        } else {
            config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm"
        }

        return {
            ...config,
        }
    },
}

module.exports = nextConfig
