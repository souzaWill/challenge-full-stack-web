
# Grupo +A Educação Desafio Técnico - Full Stack Web Developer

## Bibliotecas utilizadas - backend
- **[Express.js](https://expressjs.com)** framework web minimalista para criação de APIs em Node.js
- **[Prisma](https://www.prisma.io)** ORM moderno para consulta e manipulação de banco de dados
- **[Jest](https://jestjs.io)** framework para testes automatizados
- **[Prettier](https://prettier.io)** formatação de código
- **[swagger](https://swagger.io)** documentação de APIs
- **[Docker](https://www.docker.com)** contêineres
- **[JWT](https://www.jwt.io)** autenticação
- **[Zod](https://github.com/colinhacks/zod)** Biblioteca de validação e parsing de dados, com esquema fortemente tipado, ideal para validação de inputs e schemas no TypeScript
- **[Express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)** middleware para limitar o número de requisições e proteger a API de ataques

## Bibliotecas utilizadas - frontend
- **[Vuetify](https://vuetifyjs.com/)** Framework de UI
- **[Prettier](https://prettier.io/)** Formatação de código
- **[Vue-router](https://router.vuejs.org/)** Biblioteca de roteamento
- **[Pinia](https://pinia.vuejs.org/)** Gerenciamento de estado
- **[Axios](https://axios-http.com/)** Cliente HTTP

## Links
- [Repositório backend](https://github.com/souzaWill/challenge-full-stack-web)
- [Repositório frontend](https://github.com/souzaWill/challenge-full-stack-vuejs)

## Rodar o projeto local

Para buildar o backend, é necessário ter o Docker e o Docker Compose instalados.

- As variáveis que são necessárias serem definidas estão no arquivo .env.example.

Para iniciar o projeto, defina as variaveis de ambiente no arquivo .env (existe um arquivo .env.example com as variaveis necessárias para o funcionamento), rode o script init.sh

- Para iniciar o projeto, defina as variaveis de ambiente no arquivo .env (existe um arquivo .env.example com as variaveis necessarias para o funcionamento), rode o script init.sh

- acesse o http://localhost na porta que foi definida no .env ( a padrão e a 4000)

Para o frontend, é necessário ter o NPM instalado.
- Defina a variável de ambiente VITE_API_URL no arquivo .env.
- Execute npm install e, em seguida, npm run dev. O frontend ficará disponível em http://localhost:5173/


## Decisão da arquitetura utilizada
Escolhi uma arquitetura baseada em camadas para estruturar a API de maneira organizada, escalável e de fácil manutenção. A divisão em camadas permite que diferentes responsabilidades sejam isoladas, o que facilita tanto o desenvolvimento quanto a realização de testes unitários. A arquitetura utilizada é composta por:

1. Controllers:
Os controllers são responsáveis por receber as requisições HTTP, processá-las e retornar as respostas adequadas. Cada controller corresponde a um recurso específico da aplicação, como StudentController para operações com estudantes.

2. Services:
Os services encapsulam a lógica de negócio da aplicação. Cada serviço é responsável por manipular os dados e interagir com o banco de dados.

3. Middlewares:
Os middlewares são utilizados para manipular as requisições de forma transversal, antes de chegar ao controlador. Eles são ideais para autenticação, validação de dados de entrada, manipulação de erros e outras preocupações.

4. Schemas (Zod):
O Zod é utilizado para validação e parsing de dados de entrada. Ele garante que os dados fornecidos pelo usuário atendem a requisitos específicos antes de serem manipulados pela aplicação.

## Banco de dados: Prisma

Eu decidi criar um relacionamento entre as tabelas User e Student para garantir a normalização dos dados. Se eu tivesse duplicado informações como nome, email nas duas tabelas, poderia ter problemas com consistência com o surgimento de novos tipos de usuarios (professores, diretores etc...), já que teria esses dados em espalhados em varios lugares. Agora, com os dados do usuário centralizados na tabela users, e possivel criar esses novos perfis em tabelas separadas, porem mantendo o relacionamento com users e tambem se um dia o estudante pudesse ter acesso ao sistema, ja estaria meio caminho andado.

tambem escolhi o uso de UUID como chave primária facilita a escalabilidade horizontal, pois evita colisões de IDs quando o banco de dados é distribuído em múltiplas instâncias. Ao contrário das chaves sequenciais, os UUIDs são únicos globalmente, tornando mais simples a sincronização de dados entre diferentes servidores.
![image](/comments_imgs/db.png)

## Testes Automatizados: Jest
Costumo tentar seguir o **TDD** quando estou desenvolvendo uma API; pode ser uma mão na roda, pois fica mais fácil de debugar e ainda garante que o erro não volte a acontecer e você não veja. Utilizei o **Jest**. Infelizmente, devido ao tempo, não consegui os 100% de coverage, mas ficou acima dos 70%.

![image](/comments_imgs/tests.png)

![image](/comments_imgs/coverage.png)


## Documentação: Swagger
A documentação da API foi gerada utilizando o Swagger. Essa ferramenta facilita a criação de uma documentação interativa e autoexplicativa, permitindo que desenvolvedores visualizem e testem os endpoints diretamente na interface. Além de ser simples de configurar, o Swagger gera automaticamente uma documentação atualizada sempre que novas rotas são adicionadas. Ele também permite exportar uma coleção de endpoints que pode ser importada em clientes de API como Postman ou Insomnia, tornando o processo de testes mais ágil e organizado.

Para acessar a documentação da API, visite a rota **`/docs`** da aplicação.


![image](/comments_imgs/docs.png)

## Autenticação JWT
Para controlar a autenticação, foi usado o um implementação de token jwt para express.js.

## Frontend
Para mim, o frontend foi um desafio, pois já tinha trabalhado em alguns projetos, tanto com VueJS quanto com Angular. Porém, a maioria tinha sido de estudos ou em projetos que estavam 'prontos', solucionando problemas. Com isso, tive que estudar, dentro do tempo possível, boas práticas e até projetos para procurar soluções para os meus problemas. Acredito que há muito a melhorar, mas consegui entregar os requisitos.

* A autenticação foi feita salvando o **token** no **local storage** e tudo sendo controlado pelo **Pinia**.
* As chamadas de API foram feitas na camada de serviço e sendo acionadas pela **store**.
* Utilizei o server-side tables porque não acho uma boa prática puxar todos os itens da API e paginar no frontend, porém isso acabou gerando muitas chamadas na API, o que também não é bom num caso com muitos usuários.
* Para formatar o código, utilizei o **Prettier**.

# O que você melhoraria se tivesse mais tempo?
* deploy da aplicação na AWS, cheguei iniciar utilizando lambda com serveless framework, RDS com postgres, cloundfront porem não consegui finalizar pois estava tendo um problema de compatibilidade com o prisma.
* funcionalidade de envio de emails de boas vindas via SQS quando o estudante fosse cadastrado.
* melhor tratitiva para erros que vem do servidor no frontend.
* testes automatizados no frontend.
