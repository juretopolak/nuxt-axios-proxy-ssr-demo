# Problem: Proxy rewrite rule isn't working with SSR (universal mode)

The proxy rewrite rule is ignored when SSR (node server) tries to make a request on the API.
```
  proxy: {
    '/fakerapi': {
      target: 'https://fakerapi.it/api/v1/',
      pathRewrite: {
          '^/fakerapi/': '/'
      },
      changeOrigin: true
    }
  }

Proxy created: /fakerapi  -> https://fakerapi.it/api/v1/
Proxy rewrite rule created: "^/fakerapi/" ~> ""
```

Because of that Axios makes a request to the wrong URL which means that content is not (pre)rendered.
```
responseUrl: 'https://fakerapi.it/api/v1/fakerapi/products' Wrong url
```

The correct URL would be.
```
responseUrl: 'https://fakerapi.it/api/v1/products' Correct url
```

## Solution

Just to provide the solution in case someone is experiencing the same problem.

I have chosen the same .env variable name 'API_URL' for API backend that '@nuxtjs/axios' is using for overriding baseURL:

https://axios.nuxtjs.org/options/#baseurl

```
API_URL="https://fakerapi.it/api/v1/"
baseURL: 'https://fakerapi.it/api/v1/'
```

Change variable name to not override the baeURL:

```
FAKER_API_URL="https://fakerapi.it/api/v1/"
baseURL: 'http://localhost:3000/'
```