# BeCode: oto

> ⚙️ Oto, the man in the middle - OAuth2 middleware lambda

* * *

## About

_By design_, you cannot use **OAuth2** without a server, since you need to store a _secret key_ from the provider.  
In a world full of PWA and static websites, it´s a _bummer_.

**oto** is a small middleware, a lambda serverless function, which only role is to serve as the server in a OAuth2 transaction.

[Read the **dev.to** article](https://dev.to/leny/introducing-oto-the-man-in-the-middle-52go) introducing oto & its purpose.

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
- [x] `linkedin`
- [ ] `google`

## Usage

Run `npm run build` to build the code, or `npm run work` to watch the changes and rebuild.

Run `npm run dev` to create a local host serving the lambda, on port `6060`.

### Deployment

You need to have [setup](https://serverless.com/framework/docs/providers/aws/guide/credentials/) the appropriate user from AWS and stored it in your `~/.aws/credentials`.

#### Dev deployment

	npm run deploy:dev --aws-profile=<your-aws-profile>

#### Production deployment

	npm run deploy:prod --aws-profile=<your-aws-profile>
	
* * * 

> 🤟 You are working on a project for BeCode and want to use **oto**?  
> Contact **My Becode Team** `my@becode.org` via email to inject your app's credentials and use our instances!

* * *

My Becode Team
