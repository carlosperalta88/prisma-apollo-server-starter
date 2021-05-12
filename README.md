# Prisma Apollo Server Starter

This project is a working base with authentication to build a GraphQL API.
It uses [Prisma](https://www.prisma.io) as an ORM, so you can check their doc if you have any questions
about how it works.

Is set to use Auth0 for token authentication.

## Installation

You will need at least node v14.16.

```bash
npm install
```

You will need to add an `.env` file with the following variables
```bash
AUTH0_AUDIENCE=
AUTH0_DOMAIN=
DATABASE_URL=
```

You will need to run de migration over a created db so you can build the schema with the specified constrains
in prisma folder.

After you run the migrations

```bash
npx prisma migrate dev
```
You are ready to start working.

When I deploy to production, I'll update this doc pointing to that production experience.


## Usage

You can check the schema in you prefered REST client. 

## TODO

I need to write tests.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)