process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
chai.should();
chai.use(chaiHttp);
describe("/GET relative return var", () => {
  it("powinno zwrocić wzgledna wartosc zagrozoną", (done) => {
    const query =
      "/?startDate=2021-10-15&endDate=2021-11-15&confidenceLevel=0.05";

    chai
      .request(server)
      .get("/api/rrVaR" + query)
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
      .get("/api/rrvaRs" + query)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
