<img src="https://raw.githubusercontent.com/transitive-bullshit/functional-typescript/master/logo.png" alt="FTS Logo" width="150" />

# FTS "Hello World" Example

This is a simple example which transforms a "Hello World" TypeScript function into type-safe function callable over HTTP. To do so, we perform the following steps:

1. Generate an `FTS.Definition` from our input TS source file
2. Create an `FTS.HttpHandler` from our definition and compiled JS source file
3. Start an http server to handle requests to our FTS function

In order to run this example, you first need to build the top-level `functional-typescript` package locally.

Then, run:

```bash
$ yarn install
$ node index.js
```

Which will print out an `FTS.Definition` schema, as well as which port the server is listening on:

```
{
  "title": "hello-world",
  "version": "0.0.1",
  "config": {
    "language": "typescript",
    "defaultExport": true
  },
  "params": {
    "context": false,
    "order": [
      "name"
    ],
    "schema": {
      "type": "object",
      "properties": [
        null
      ],
      "additionalProperties": false,
      "required": [
        null
      ],
      "$schema": "http://json-schema.org/draft-07/schema#"
    }
  },
  "returns": {
    "async": false,
    "schema": {
      "type": "string",
      "$schema": "http://json-schema.org/draft-07/schema#"
    }
  }
}

fts: Accepting connections on port 3000
```

Once you have the server running, you can invoke your type-safe function over HTTP:

```bash
$ curl -s http://localhost:3000?name=GET
Hello GET!

$ curl -s http://localhost:3000 -d 'name=POST'
Hello POST!
```

Note that in this example, we're generating the FTS Definition and serving it together, but in practice it is recommended that you generate these definitions during your build step, alongside your normal TS => JS compilation. These definitions should be viewed as json build artifacts that are _referenced_ at runtime in your server or serverless function.

## License

MIT © [Travis Fischer](https://transitivebullsh.it)