process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
chai.should();
chai.use(chaiHttp);
describe("/GET standard deviation", () => {
  it("powinno pobrac odchylenie standardowe", (done) => {
    const query = "/?startDate=2021-10-15&endDate=2021-11-15&currency=EUR";

    chai
      .request(server)
      .get("/api/standard-deviation" + query)
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
      .get("/api/standarddeviation" + query)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
