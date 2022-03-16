# Description

In this project, I built a backend using `ORM` with `sequelize` package from `npm` to show that I'm able to:
 - Create and associate tables using `models` from `sequelize`
 - Build endpoints (following REST principles) to consume the models
 - Create a `CRUD` with `ORM`

This project was made for Trybe's FullStack Developer course. The files from `seeders/` were provided by the institution.

 # Sumary

- [Description](#description)
- [Getting started](#getting-started)
- [Endpoints](#endpoints)
    - [POST `/user`](#post-user)
    - [POST `/login`](#post-login)
    - [GET `/user`](#get-user)
    - [GET `/user/:id`](#get-userid)
    - [POST `/categories`](#post-categories)
    - [GET `/categories`](#get-categories)
    - [POST `/post`](#post-post)
    - [GET `/post`](#get-post)
    - [GET `post/:id`](#get-postid)
    - [PUT `/post/:id`](#put-postid)
    - [DELETE `post/:id`](#delete-postid)
    - [DELETE `/user/me`](#delete-userme)
    - [GET `post/search?q=:searchTerm`](#get-postsearchqsearchterm)

# Getting started

1. Clone the repository

2. Enter in the cloned repository directory and install the dependencies
  * `npm install`

3. Create `.env` file and add the needed environment variables
  * `HOSTNAME=your_host_name`
  * `MYSQL_USER=your_mysql_user`
  * `MYSQL_PASSWORD=your_mysql_password`
  * `JWT_SECRET=your_jwt_secret`

4. Make sure you have [MySQL](https://www.mysql.com/downloads/) installed and running

5. Create *database* and execute *migration* files
  * `npx sequelize-cli db:create && npx sequelize db:migrate` or `npm run prestart`

6. Execute *seeds* files
  * `npx sequelize db:seed:all` or `npx sequelize-cli db:seed:all`

8. Start API
  * `npm start`

# Endpoints

## POST `/user`

- Request body must have the following format:

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

- The field `displayName` must be a string with at least 8 characters. It's optional;
- The field `email` will be considered valid if it has `prefix@domain` format and it needs to be unique. It is not optional;
- The password must have 6 characters. It's not optional;

- In the case a user with the email sent is already registered, the following error is returned:

  ```json
  {
    "message": "User already registered"
  }
  ```

- In the case all the fields are correct, a `JWT` token is returned

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _The token above is just an example_


## POST `/login`

- Request body must have the following format:

  ```json
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```

- In the case any of these fields is invalid or there is no corresponding user in database, it will return a status code 400 with body `{ message: "Invalid fields" }`.

- In the case all the fields are correct, a `JWT` token is returned

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _The token above is just an example_

## GET `/user`

- It will list all the **Users** and return them with status http `200` and following structure:

  ```json
  [
    {
      "id": "401465483996",
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
  ]
  ```

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## GET `/user/:id`

- It will return details from user based on `id` from route  with status http `200` and following structure:

  ```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## POST `/categories`

- It will receive a _Category_ in request body and create it in database. The request body must have the following structure:

  ```json
  {
    "name": "Inovação"
  }
  ```

- If there is no `name` in the request body, the API will return an error `status 400`.

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## GET `/categories`

- It will list all the **Categories** and return them with status http `200` and following structure:

  ```json
  [
    {
      "id": 1,
      "name": "Escola"
    },
    {
      "id": 2,
      "name": "Inovação"
    }
  ]
  ```

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## POST `/post`

- It will receive a _BlogPost_ in request body and create it in database. The request body must have the following structure:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

- If there is no `name`, `content` or `categoryIds` in the request body, the API will return an error `status 400`.

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## GET `/post`

- It will list all the _BlogPosts_ and return them with status http `200` and following structure:

  ```json
  [
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        }
      ]
    }
  ]
  ```

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## GET `/post/:id`

- It will return details from post based on `id` from route  with status http `200` and following structure:

  ```json
    {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
  ```

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## PUT `/post/:id`

- The endpoint must receive a **BlogPost** to overwrite the original with `id` from URL. It's just allowed for the post's creator.

- The categories can **not** be changed. Just `title` and `content`.

- The request body must have the following structure:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## DELETE `post/:id`

- It removes post with `id` from URL. It's just allowed for the post's creator.

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## DELETE `user/me`

- It removes user based on token sent by headers and return status http `204`.

- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.

## GET `post/search?q=:searchTerm`

- It returns an array of **BlogPosts** that contain in title or content the term searched in `queryParam`. The return will have status code `200` and the following format:

```json
[
  {
    "id": 2,
    "title": "Vamos que vamos",
    "content": "Foguete não tem ré",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
]
  ```

- If no `queryParam` is sent, return all the posts.
- If there is no post that match the `queryParam`, an empty array is returned.
- The request must have the token authenticator (from POST `/login` or POST `/user`) in headers or it will return code `status 401`.