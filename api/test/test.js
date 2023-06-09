const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../routes/data');
const Data = require('../model/dataSchema');

chai.use(chaiHttp);

describe('API Tests', () => {
  // ...

  // Test /create endpoint
  describe('/create', () => {
    it('should create data successfully', (done) => {
      const mockData = [
        // Mock data objects here
        // For example: { key: 'value' }
      ];

      chai
        .request(app)
        .post('/create')
        .send(mockData)
        .end(async (err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.equal('success');

          // Check if the data is saved in the database
          try {
            const savedData = await Data.find({});
            expect(savedData).to.be.an('array');
            expect(savedData.length).to.equal(mockData.length);
            // Add more assertions to check the saved data if needed
            done();
          } catch (error) {
            done(error);
          }
        });
    });
  });

  // ...
});