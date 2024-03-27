process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { before } = require("mocha");
const incident = require("../models/incident");

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

before(async () => {
  await incident.destroy({ where: {} });
});

describe("Incident Routes", () => {
  it("Create a new Incident", (done) => {
    chai
      .request(server)
      .post("/api/v1/incidents")
      .send({
        incident_desc: "Test incident",
        city: "London",
        country: "UK",
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // console.log(res.body);
        expect(res.status).to.equal(201);
        expect(res.body.incident).to.have.property(
          "incident_desc",
          "Test incident"
        );
        expect(res.body.incident).to.have.property("city", "London");
        expect(res.body.incident).to.have.property("country", "UK");
        expect(res.body.incident).to.have.property("weather_report");
        res.body.incident.weather_report.should.be.a("object");
        done();
      });
  });

  it("Search Incidents By Country", (done) => {
    chai
      .request(server)
      .post("/api/v1/incidents/search")
      .send({
        country: "UK",
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.should.be.a("array");
        expect(res.body[0].country).to.equal("UK");
        done();
      });
  });

  it("Search Incidents By Country: Country Absent", (done) => {
    chai
      .request(server)
      .post("/api/v1/incidents/search")
      .send({
        country: "",
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property("error");
        done();
      });
  });
});

after(async () => {
  await incident.destroy({ where: {} });
});
