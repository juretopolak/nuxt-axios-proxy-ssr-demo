# Proxy rewrite rule isn't working with SSR (universal mode)

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

To reproduce the error, clone the demo project and run it on the development server.
```
git clone git@github.com:juretopolak/nuxt-axios-proxy-ssr-demo.git
cd nuxt-axios-proxy-ssr-demo
npm install
npm run dev
```

If you open the project in the browser, no product names are displayed. You can also check responseUrl in the console (axios debug) which contains string 'fakerapi'. Shouldn't it be removed by the proxy rewrite rule like it is on the client?

Remove 'faker' string in the URL. Products are now pre-rendered if you refresh the browser.
```
store/products.js:9
```

But this is not a solution, because now requests don't work on the client. Uncomment mounted() hook.
```
pages/index.vue:21-23
```

I don't know if this is a bug in '@nuxtjs/axios' or '@nuxtjs/proxy' or have I just missconfigured everything?

## Update

The problem was fixed in this demo project with modifying pathRewrite rule:
```
pathRewrite: {
  '^/fakerapi/': ''
}
```

The problem still existed in my 'original' project, even after modifying pathRewrite rule in the same way. After futher testing I have discovered that the problem was API_URL environment variable in the .env file. This variable is somehow used in the baseURL even if it's not used nowhere in the nuxt config.

After deleting this variable and restarting dev server SSR work again.

Next step is to test a migration from @nuxtjs/dotenv module to use new runtime config which has been released as of Nuxt v2.13 to be able to use env without existing problems.

With empty .env:
```
baseURL: 'http://localhost:3000/'
status: 'OK'
code: 200
```

With API_URL in .env
```
baseURL: 'https://fakerapi.it/api/v1/'
status: 'Not found'
code: 404
```