# BeCode: oto
> ⚙️ Oto, the man in the middle - OAuth2 middleware lambda

* * *

> ⚠️ **NOTE:** this project is a _work in progress_. Be patient.

* * *

## About

_By design_, you cannot use **OAuth2** without a server, since you need to store a _secret key_ from the provider.  
In a world full of PWA and static websites, it´s a _bummer_.

**oto** is a small middleware, a lambda serverless function, which only role is to serve as the server in a OAuth2 transaction.

## Installation

Firstly, run the classic `npm install` to install dependencies.

You will also need to create the file `env/sls.env.json`, following this structure:

```json
{
  "dev": {
    "PROVIDER_ACCESSID": "ACCESSKEY",
    "PROVIDER_ACCESSID": "ACCESSKEY"
  }
}
```

It can contains as many values as you want (like for different stages of development).

The `PROVIDER` value is the service to connect, like `github` ; `ACCESSID` is the *public* access id given by the service ; `ACCESSKEY` is the *private* access key given by the service.

Example:

```json
{
  "dev": {
    "github_xxxxxx": "xyzxyzxyzxyz"
  }
}
```

### Supported providers

- [x] `github`
- [ ] `linkedin`
- [ ] `google`
- [ ] `facebook`

## Usage

Run `npm run build` to build the code, or `npm run work` to watch the changes and rebuild.

Run `npm run dev` to create a local host serving the lambda, on port `6060`.

### Deployment

*TODO*

* * *

June 2019, leny.