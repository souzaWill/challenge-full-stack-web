import request from 'supertest';
import app from '../../app';
import { generateTestToken, createTestStudent } from '../setup';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('POST /student - student', () => {
  it('should create a new student', async () => {
    const { token } = await generateTestToken();

    const payload = {
      document: faker.string.numeric(11),
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    };

    const res = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(res.status).toBe(StatusCodes.CREATED);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      userId: expect.any(String),
      document: expect.any(String),
      registrationNumber: expect.any(Number),
      user: {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
    expect(res.body.user).not.toHaveProperty('password');
  });
  it('should not create a new student with same document', async () => {
    const { token } = await generateTestToken();

    const document = faker.string.numeric(11);

    await createTestStudent({
      document: document,
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    const res = await request(app)
      .post('/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: document,
        user: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
        },
      });

    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Documento já está cadastrado');
  });
  it('should not create a new student with same registration number', async () => {});
});

describe('PUT /student - student', () => {
  it('should update student', async () => {
    const { token } = await generateTestToken();

    const student = await createTestStudent({
      document: faker.string.numeric(11),
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    const res = await request(app)
      .put(`/students/${student.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        user: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
        },
      });

    expect(res.status).toBe(StatusCodes.OK);
  });
});

describe('GET /student - student', () => {
  it('should list students paginated', async () => {
    const { token } = await generateTestToken();
    await createTestStudent({
      document: faker.string.numeric(11),
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    const res = await request(app).get(`/students`).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body).toMatchObject({
      total: expect.any(Number),
      page: expect.any(Number),
      limit: expect.any(Number),
      totalPages: expect.any(Number),
    });

    res.body.data.forEach((item: any) => {
      expect(item).toMatchObject({
        id: expect.any(String),
        userId: expect.any(String),
        document: expect.any(String),
        registrationNumber: expect.any(Number),
        user: {
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });
  });
  it('should search students', async () => {});
  it('should view student', async () => {
    const { token } = await generateTestToken();
    const student = await createTestStudent({
      document: faker.string.numeric(11),
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    const res = await request(app)
      .get(`/students/${student.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.OK);

    expect(res.body).toMatchObject({
      id: expect.any(String),
      userId: expect.any(String),
      document: expect.any(String),
      registrationNumber: expect.any(Number),
      user: {
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });
});

describe('DELETE /student - student', () => {
  it('should delete student', async () => {
    const { token } = await generateTestToken();
    const student = await createTestStudent({
      document: faker.string.numeric(11),
      user: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    const res = await request(app)
      .delete(`/students/${student.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.NO_CONTENT);
  });

  it('should not delete if student not found', async () => {
    const { token } = await generateTestToken();

    const res = await request(app)
      .delete(`/students/${faker.string.uuid()}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Requisição não pode ser processada');
  });
});
