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

describe('POST /register - Authentication', () => {
  async function register(
    name?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
  ) {
    const payload: Record<string, any> = {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(password !== undefined && { password }),
      ...(confirmPassword !== undefined && { confirmPassword }),
    };

    return await request(app).post('/register').send(payload);
  }

  it('should register user with valid body', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const confirmPassword = password;

    const res = await register(name, email, password, confirmPassword);

    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      email: expect.any(String),
      name: expect.any(String),
    });
    expect(res.body).not.toHaveProperty('password');
  });

  it('should not register user when email already exists', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const confirmPassword = password;

    await createTestUser({ email });

    const res = await register(name, email, password, confirmPassword);

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('E-mail já cadastrado');
  });

  it('should not register user when passwords do not match', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const confirmPassword = faker.internet.password();

    const res = await register(name, email, password, confirmPassword);

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'confirmPassword',
          message: expect.any(String),
        }),
      ]),
    );
  });

  it('should not register user when email is invalid', async () => {
    const name = faker.person.fullName();
    const email = faker.person.fullName();
    const password = faker.internet.password();
    const confirmPassword = password;

    const res = await register(name, email, password, confirmPassword);

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

  it('should not register user when password is invalid', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = '123';
    const confirmPassword = password;

    const res = await register(name, email, password, confirmPassword);

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
