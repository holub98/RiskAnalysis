process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
chai.should();
chai.use(chaiHttp);
describe("/GET var", () => {
  it("powinno zwrocić wartosc zagrozoną", (done) => {
    const query =
      "/?startDate=2021-10-15&endDate=2021-11-15&currency=EUR&confidenceLevel=0.05&cost=1000";

    chai
      .request(server)
      .get("/api/var" + query)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
  it("powinno zwrocic 404", (done) => {
    const query = "/?currency=EUR";

    chai
      .request(server)
      .get("/api/VaRs" + query)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
