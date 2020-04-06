import request from 'supertest';
import { Request, Response, NextFunction } from 'express';

import app from '../loaders/express';
import { UserService } from '../services/user.service';
import { jwtMiddleware } from '../api/middlewares/jwt.middleware';
import { apiMethodLoggingMiddleware } from '../api/middlewares/loggers/api-method.logger';
import { UserInputDTO } from '../interfaces/user.interface';

jest.mock('../api/middlewares/jwt.middleware.ts');
jest.mock('../api/middlewares/loggers/api-method.logger.ts');
jest.mock('../api/middlewares/loggers/controller.logger.ts', () => ({
  ControllerLogger: () => (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const originalMethod: any = descriptor.value;
    descriptor.value = async (...args: any): Promise<void> => {
      try {
        await originalMethod.apply(this, args);
      } catch (e) {
        return;
      }
    };

    return descriptor;
  }
}));

const mockUsers = [{
  id:       '3b8c667c-5c6f-4b29-a2f6-9c4d8a10f33b',
  login:    'Ivan',
  password: 'qwerty',
  age:       18,
  isDeleted: false,
}, {
  id:       '3f587f87-3ae4-4400-b08d-503a3ccd1630',
  login:    'Peter',
  password: '1q2w3e4r',
  age:       50,
  isDeleted: true,
}];

describe('GIVEN UserController', () => {
  beforeEach(() => {
    (apiMethodLoggingMiddleware as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  beforeEach(() => {
    (jwtMiddleware as jest.Mock).mockImplementation(
      (req: Request, res: Response, next: NextFunction) =>
        new Promise(() => next())
    );
  });

  describe('INVOKING [GET] /users', () => {
    describe('WHEN no query params have been passed', () => {
      it('SHOULD use default query params and return status 200 with users list in body if successful', async (done: jest.DoneCallback) => {
        const defaultLoginSubstring = '';
        const defaultLimit = 10;

        const getUsersListSpy = spyOn(
          UserService,
          'getUsersList',
        ).and.returnValue(mockUsers);

        const result: request.Response = await request(app)
          .get('/users');

        expect(getUsersListSpy).toHaveBeenCalledWith(defaultLoginSubstring, defaultLimit);
        expect(result.status).toBe(200);
        expect(result.body).toEqual(mockUsers);
        done();
      });
    });

    describe('WHEN query params have been passed', () => {
      it('SHOULD return status 200 with users list in body if successful', async (done: jest.DoneCallback) => {
        const loginSubstring = 'login';
        const limit = '5';

        const getUsersListSpy = spyOn(
          UserService,
          'getUsersList',
        ).and.returnValue(mockUsers);

        const result: request.Response = await request(app)
          .get(`/users?loginSubstring=${loginSubstring}&limit=${limit}`);

        expect(getUsersListSpy).toHaveBeenCalledWith(loginSubstring, limit);
        expect(result.status).toBe(200);
        expect(result.body).toEqual(mockUsers);
        done();
      });
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const getUsersListSpy = spyOn(
        UserService,
        'getUsersList',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .get('/users');

      expect(getUsersListSpy).toHaveBeenCalled();
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [GET] /users/:id', () => {
    it('SHOULD return status 200 with user data in body if successful', async (done: jest.DoneCallback) => {
      const getUserByIdSpy = spyOn(
        UserService,
        'getUserById',
      ).and.returnValue(mockUsers[0]);

      const result: request.Response = await request(app)
        .get('/users/1');

      expect(getUserByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockUsers[0]);
      done();
    });

    it('SHOULD return status 404 with error in body if there is no user with passed id', async (done: jest.DoneCallback) => {
      const getUserByIdSpy = spyOn(
        UserService,
        'getUserById',
      ).and.returnValue(undefined);

      const result: request.Response = await request(app)
        .get('/users/1');

      expect(getUserByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(404);
      expect(result.body).toEqual({ 'error': 'User does not exist' });
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const getUserByIdSpy = spyOn(
        UserService,
        'getUserById',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .get('/users/1');

      expect(getUserByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [POST] /users', () => {
    let userData: UserInputDTO;

    beforeEach(() => {
      const { login, password, age } = mockUsers[0];
      userData = { login, password, age };
    });

    it('SHOULD return status 201 with created user data in body and corresponding Location header if successful', async (done: jest.DoneCallback) => {
      const createUserSpy = spyOn(
        UserService,
        'createUser',
      ).and.returnValue(mockUsers[0]);

      const result: request.Response = await request(app)
        .post('/users')
        .send(userData);

      expect(createUserSpy).toHaveBeenCalledWith(userData);
      expect(result.status).toBe(201);
      expect(result.body).toEqual(mockUsers[0]);
      expect(result.header?.location).toEqual(`/users/${mockUsers[0].id}`);
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const createUserSpy = spyOn(
        UserService,
        'createUser',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .post('/users')
        .send(userData);

      expect(createUserSpy).toHaveBeenCalledWith(userData);
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [PUT] /users/:id', () => {
    let userData: UserInputDTO;

    beforeEach(() => {
      const { login, password, age } = mockUsers[0];
      userData = { login, password, age };
    });

    it('SHOULD return status 200 with updated user data in body if successful', async (done: jest.DoneCallback) => {
      const updateUserByIdSpy = spyOn(
        UserService,
        'updateUserById',
      ).and.returnValue(mockUsers[0]);

      const result: request.Response = await request(app)
        .put('/users/1')
        .send(userData);

      expect(updateUserByIdSpy).toHaveBeenCalledWith('1', userData);
      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockUsers[0]);
      done();
    });

    it('SHOULD return status 404 with error in body when there is no user with passed id', async (done: jest.DoneCallback) => {
      const updateUserByIdSpy = spyOn(
        UserService,
        'updateUserById',
      ).and.returnValue(undefined);

      const result: request.Response = await request(app)
        .put('/users/1')
        .send(userData);

      expect(updateUserByIdSpy).toHaveBeenCalledWith('1', userData);
      expect(result.status).toBe(404);
      expect(result.body).toEqual({ 'error': 'User does not exist' });
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const updateUserByIdSpy = spyOn(
        UserService,
        'updateUserById',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .put('/users/1')
        .send(userData);

      expect(updateUserByIdSpy).toHaveBeenCalledWith('1', userData);
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [DELETE] /users/:id', () => {
    it('SHOULD return status 204 if successful', async (done: jest.DoneCallback) => {
      const deleteUserByIdSpy = spyOn(
        UserService,
        'deleteUserById'
      ).and.returnValue(1);

      const result: request.Response = await request(app)
        .delete('/users/1');

      expect(deleteUserByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(204);
      done();
    });

    it('SHOULD return status 404 with error in body when there is no user with passed id', async (done: jest.DoneCallback) => {
      const deleteUserByIdSpy = spyOn(
        UserService,
        'deleteUserById',
      ).and.returnValue(0);

      const result: request.Response = await request(app)
        .delete('/users/1');

      expect(deleteUserByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(404);
      expect(result.body).toEqual({ 'error': 'User does not exist' });
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const deleteUserByIdSpy = spyOn(
        UserService,
        'deleteUserById',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .delete('/users/1');

      expect(deleteUserByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });
});
