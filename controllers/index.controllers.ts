import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";

import { v4 } from "https://deno.land/std/uuid/mod.ts";

import { User } from "./../entities/index.ts";
let users: User[] = [
  {
    id: "d33b16db-ab70-44da-bdb3-a280b9ff9f0f",
    name: "Ryan Ray",
  },
  {
    id: "f846589b-de6d-4dd0-96ac-e1b7f53e03c8",
    name: "George Ray",
  },
];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "success",
    users,
  };
};
export const getUser = async (
  { params, response }: { params: { id: string }; response: Response },
) => {
  // f846589b-de6d-4dd0-96ac-e1b7f53e03c8
  const userFound = await users.find((user) => user.id === params.id);
  if (userFound) {
    response.status = 200;
    response.body = {
      message: "success",
      user: userFound,
    };
  } else {
    response.status = 404;
    response.body = {
      message: "User not found",
    };
  }
};
export const createUser = async (
  { request, response }: { request: Request; response: Response },
) => {
  const body: Body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      message: "Request is not valid.",
    };
  } else {
    const newUser: User = body.value;
    newUser.id = v4.generate();

    users.push(newUser);

    response.status = 200;
    response.body = {
      message: "User created successfully.",
      newUser,
    };
  }
};
export const updateUser = async (
  { request, response, params }: {
    request: Request;
    response: Response;
    params: { id: string };
  },
) => {
  // f846589b-de6d-4dd0-96ac-e1b7f53e03c8
  const userFound = await users.find((user) => user.id === params.id);
  if (!userFound) {
    response.status = 404;
    response.body = {
      message: "User not found.",
    };
  } else {
    const body = await request.body();
    const updateUser = body.value;
    users = users.map((user) =>
      user.id === params.id ? { ...user, ...updateUser } : user
    );
    response.status = 200;
    response.body = {
      message: "User updated successfully.",
      users,
    };
  }
};

export const deleteUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  // f846589b-de6d-4dd0-96ac-e1b7f53e03c8
  users = users.filter((user) => user.id !== params.id);
  response.status = 200;
  response.body = {
    message: "User delete successfully",
    users,
  };
};
