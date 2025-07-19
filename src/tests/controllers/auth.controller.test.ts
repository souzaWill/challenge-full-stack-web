import request from 'supertest';
import app from '../../app';
import { faker } from '@faker-js/faker';
import { createTestUser } from '../setup';
import { StatusCodes } from 'http-status-codes';

describe('POST /login - Authentication', () => {
  async function login(email?: string, password?: string) {
    const payload: Record<string, any> = {
      ...(email !== undefined && { email }),
      ...(password !== undefined && { password }),
    };

    return await request(app).post('/login').send(payload);
  }

  it('should login with valid user', async () => {
    const { email, password } = await createTestUser();

    const res = await login(email, password);

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toMatchObject({
      token: expect.any(String),
      user: {
        id: expect.any(String),
        email: expect.any(String),
        name: expect.any(String),
      },
    });
    expect(res.body).not.toHaveProperty('user.password');
  });

  it('should not login with invalid user', async () => {
    const res = await login(faker.internet.email(), faker.internet.password());

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('invalid credentials');
  });

  it('should not login with wrong password', async () => {
    const { email } = await createTestUser();

    const res = await login(email, 'wrongPassword');

    expect(res.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('invalid credentials');
  });

  it('should return an error if email is missing', async () => {
    const res = await login(undefined, faker.internet.password());

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'email',
          message: 'Invalid input: expected string, received undefined',
        }),
      ]),
    );
  });

  it('should return an error if email is invalid', async () => {
    const res = await login(faker.internet.username(), faker.internet.password());

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'email',
          message: expect.any(String),
        }),
      ]),
    );
  });

  it('should return an error if password is missing', async () => {
    const res = await login(faker.internet.email());

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'password',
          message: expect.any(String),
        }),
      ]),
    );
  });

  it('should return an error if password is invalid', async () => {
    const res = await login(faker.internet.username(), 'p');

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'password',
          message: expect.any(String),
        }),
      ]),
    );
  });
});
