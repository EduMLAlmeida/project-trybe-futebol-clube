import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import TeamModel from '../database/models/TeamModel'

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('usersRouter', () => {
  describe('POST /login', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */

    // let chaiHttpResponse: Response;

    // before(async () => {
    //   sinon
    //     .stub(Example, "findOne")
    //     .resolves({
    //       ...<Seu mock>
    //     } as Example);
    // });

    // after(()=>{
    //   (Example.findOne as sinon.SinonStub).restore();
    // })

    // it('...', async () => {
    //   chaiHttpResponse = await chai
    //      .request(app)
    //      ...

    //   expect(...)
    // });
    describe('quando o campo "email" não é informado', () => {
      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')        
          .send({ password: 'string' })
        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal(
          { message: 'All fields must be filled' }
        )
      });
    });
  });
});

describe('teamsRouter', () => {
  describe('GET /teams', () => {
    describe('quando realizada requisição GET na rota /teams', () => {
      const teams = [{ id: 1, teamName: 'Bahia' },{ id: 2, teamName: 'Botafogo' }]
      before(() => sinon.stub(Model, 'findAll').resolves(teams as TeamModel[]));
      after(() => sinon.restore());
      it('deve retornar um array com objetos esperados', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/teams')
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.deep.equal(teams);
      });
    });
  });

  describe('GET /teams/:id', () => {
    describe('quando realizada requisição GET na rota /teams:id com sucesso', () => {
      const team = { id: 1, teamName: 'Avaí/Kindermann' };
      before(() => sinon.stub(Model, 'findOne').resolves(team as TeamModel));
      after(() => sinon.restore());
      it('deve retornar um array com objetos esperados', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/teams/1')
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.deep.equal(team);
      });
    });

    describe('quando realizada requisição GET na rota /teams:id sem sucesso', () => {
      const team = null;
      before(() => sinon.stub(Model, 'findOne').resolves(team as unknown as TeamModel));
      after(() => sinon.restore());
      it('deve retornar uma mensagem de erro', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/teams/1')
        expect(httpResponse.status).to.equal(404);
        expect(httpResponse.body).to.deep.equal({ message: 'Team not found'});
      });
    });
  });
});
