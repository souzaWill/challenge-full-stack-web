import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10, // até 10 requisições por IP por minuto
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Limite de requisições excedido. Tente novamente em breve.',
})
