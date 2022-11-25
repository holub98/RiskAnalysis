process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
chai.should();
chai.use(chaiHttp);
describe("/GET currency", () => {
  it("powinno pobrac wszystkie dane o podanej walucie", (done) => {
    const waluta = "/?currency=EUR";

    chai
      .request(server)
      .get("/api/currency" + waluta)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
  it("powinno zwrocic 404", (done) => {
    const waluta = "/?currency=EUR";

    chai
      .request(server)
      .get("/api/currencies" + waluta)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
