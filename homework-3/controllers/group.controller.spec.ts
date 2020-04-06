import request from 'supertest';
import { Request, Response, NextFunction } from 'express';

import app from '../loaders/express';
import { jwtMiddleware } from '../api/middlewares/jwt.middleware';
import { apiMethodLoggingMiddleware } from '../api/middlewares/loggers/api-method.logger';
import { Permission, GroupInputDTO } from '../interfaces/group.interface';
import { GroupService } from '../services/group.service';
import { UserGroupInputDTO } from '../interfaces/user-group.interface';

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

const mockGroups = [{
  id:          'de7ba4bb-c541-43bd-ac71-9d0453c12b56',
  name:        'Admins',
  permissions: [Permission.READ, Permission.SHARE, Permission.WRITE, Permission.DELETE, Permission.UPLOAD_FILES],
}, {
  id:          '6dbd86a7-1110-499f-a2b3-1e756c49522c',
  name:        'Authors',
  permissions: [Permission.READ, Permission.SHARE, Permission.WRITE, Permission.UPLOAD_FILES],
}];

describe('GIVEN GroupController', () => {
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

  describe('INVOKING [POST] /groups', () => {
    let groupData: GroupInputDTO;

    beforeEach(() => {
      const { name, permissions } = mockGroups[0];
      groupData = { name, permissions };
    });

    it('SHOULD return status 201 with created group data and corresponding Location header in body if successful', async (done: jest.DoneCallback) => {
      const createGroupSpy = spyOn(
        GroupService,
        'createGroup'
      ).and.returnValue(mockGroups[0]);

      const result: request.Response = await request(app)
        .post('/groups')
        .send(groupData);

      expect(createGroupSpy).toHaveBeenCalledWith(groupData);
      expect(result.status).toBe(201);
      expect(result.body).toEqual(mockGroups[0]);
      expect(result.header?.location).toEqual(`/groups/${mockGroups[0].id}`);
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const createGroupSpy = spyOn(
        GroupService,
        'createGroup',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .post('/groups')
        .send(groupData);

      expect(createGroupSpy).toHaveBeenCalledWith(groupData);
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [GET] /groups', () => {
    it('SHOULD return status 200 with groups list in body if successful', async (done: jest.DoneCallback) => {
      const getGroupsSpy = spyOn(
        GroupService,
        'getGroups'
      ).and.returnValue(mockGroups);

      const result: request.Response = await request(app)
        .get('/groups');

      expect(getGroupsSpy).toHaveBeenCalled();
      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockGroups);
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const getGroupsSpy = spyOn(
        GroupService,
        'getGroups',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .get('/groups');

      expect(getGroupsSpy).toHaveBeenCalled();
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [GET] /groups/:id', () => {
    it('SHOULD return status 200 with group data in body if successful', async (done: jest.DoneCallback) => {
      const getGroupByIdSpy = spyOn(
        GroupService,
        'getGroupById'
      ).and.returnValue(mockGroups[0]);

      const result: request.Response = await request(app)
        .get('/groups/1');

      expect(getGroupByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockGroups[0]);
      done();
    });

    it('SHOULD return status 404 with error in body if there is no group with passed id', async (done: jest.DoneCallback) => {
      const getGroupByIdSpy = spyOn(
        GroupService,
        'getGroupById'
      ).and.returnValue(undefined);

      const result: request.Response = await request(app)
        .get('/groups/1');

      expect(getGroupByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(404);
      expect(result.body).toEqual({ 'error': 'Group does not exist' });
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const getGroupByIdSpy = spyOn(
        GroupService,
        'getGroupById',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .get('/groups/1');

      expect(getGroupByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [PUT] /groups/:id', () => {
    let groupData: GroupInputDTO;

    beforeEach(() => {
      const { name, permissions } = mockGroups[0];
      groupData = { name, permissions };
    });

    it('SHOULD return status 200 with updated group data in body if successful', async (done: jest.DoneCallback) => {
      const updateGroupByIdSpy = spyOn(
        GroupService,
        'updateGroupById'
      ).and.returnValue(mockGroups[0]);

      const result: request.Response = await request(app)
        .put('/groups/1')
        .send(groupData);

      expect(updateGroupByIdSpy).toHaveBeenCalledWith('1', groupData);
      expect(result.status).toBe(200);
      expect(result.body).toEqual(mockGroups[0]);
      done();
    });

    it('SHOULD return status 404 with error in body if there is no group with passed id', async (done: jest.DoneCallback) => {
      const updateGroupByIdSpy = spyOn(
        GroupService,
        'updateGroupById'
      ).and.returnValue(undefined);

      const result: request.Response = await request(app)
        .put('/groups/1')
        .send(groupData);

      expect(updateGroupByIdSpy).toHaveBeenCalledWith('1', groupData);
      expect(result.status).toBe(404);
      expect(result.body).toEqual({ 'error': 'Group does not exist' });
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const updateGroupByIdSpy = spyOn(
        GroupService,
        'updateGroupById',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .put('/groups/1')
        .send(groupData);

      expect(updateGroupByIdSpy).toHaveBeenCalledWith('1', groupData);
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [DELETE] /groups/:id', () => {
    it('SHOULD return status 204 if successful', async (done: jest.DoneCallback) => {
      const deleteGroupByIdSpy = spyOn(
        GroupService,
        'deleteGroupById'
      ).and.returnValue(1);

      const result: request.Response = await request(app)
        .delete('/groups/1');

      expect(deleteGroupByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(204);
      done();
    });

    it('SHOULD return status 404 with error in body if there is no group with passed id', async (done: jest.DoneCallback) => {
      const deleteGroupByIdSpy = spyOn(
        GroupService,
        'deleteGroupById'
      ).and.returnValue(0);

      const result: request.Response = await request(app)
        .delete('/groups/1');

      expect(deleteGroupByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(404);
      expect(result.body).toEqual({ 'error': 'Group does not exist' });
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const deleteGroupByIdSpy = spyOn(
        GroupService,
        'deleteGroupById',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .delete('/groups/1');

      expect(deleteGroupByIdSpy).toHaveBeenCalledWith('1');
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });

  describe('INVOKING [POST] /groups/:id/addUsers', () => {
    const usersData: UserGroupInputDTO = {
      userIds: ['1', '2', '3'],
    };

    it('SHOULD return status 201 if successful', async (done: jest.DoneCallback) => {
      const addUsersToGroupSpy = spyOn(
        GroupService,
        'addUsersToGroup'
      ).and.returnValue(3);

      const result: request.Response = await request(app)
        .post('/groups/1/addUsers')
        .send(usersData);

      expect(addUsersToGroupSpy).toHaveBeenCalledWith('1', usersData);
      expect(result.status).toBe(201);
      done();
    });

    it('SHOULD return status 404 with error in body if there is no group with passed id', async (done: jest.DoneCallback) => {
      const addUsersToGroupSpy = spyOn(
        GroupService,
        'addUsersToGroup'
      ).and.returnValue(0);

      const result: request.Response = await request(app)
        .post('/groups/1/addUsers')
        .send(usersData);

      expect(addUsersToGroupSpy).toHaveBeenCalledWith('1', usersData);
      expect(result.status).toBe(404);
      expect(result.body).toEqual({ 'error': 'Group does not exist' });
      done();
    });

    it('SHOULD return status 500 with error in body if there is an error within the service', async (done: jest.DoneCallback) => {
      const addUsersToGroupSpy = spyOn(
        GroupService,
        'addUsersToGroup',
      ).and.throwError('An error occured');

      const result: request.Response = await request(app)
        .post('/groups/1/addUsers')
        .send(usersData);

      expect(addUsersToGroupSpy).toHaveBeenCalledWith('1', usersData);
      expect(result.status).toBe(500);
      expect(result.body).toHaveProperty('error');
      done();
    });
  });
});
