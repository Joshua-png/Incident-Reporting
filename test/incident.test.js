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

const incidents = [
  {
    incident_desc: "Typoon destroyed all the expensive houses",
    city: "Washington",
    country: "USA",
    date: "2024-03-28T06:33:14.974Z",
    weather_report: {
      coord: {
        lon: -120.5015,
        lat: 47.5001,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      base: "stations",
      main: {
        temp: 275.48,
        feels_like: 273.9,
        temp_min: 274.29,
        temp_max: 277.95,
        pressure: 1009,
        humidity: 86,
        sea_level: 1009,
        grnd_level: 922,
      },
      visibility: 10000,
      wind: {
        speed: 1.61,
        deg: 258,
        gust: 1.39,
      },
      clouds: {
        all: 100,
      },
      dt: 1711607594,
      sys: {
        type: 2,
        id: 2003593,
        country: "US",
        sunrise: 1711547367,
        sunset: 1711592680,
      },
      timezone: -25200,
      id: 5815135,
      name: "Washington",
      cod: 200,
    },
  },

  {
    incident_desc: "Typoon destroyed all the expensive houses",
    city: "London",
    country: "UK",
    date: "2024-03-28T06:33:14.974Z",
    weather_report: {
      coord: {
        lon: -120.5015,
        lat: 47.5001,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      base: "stations",
      main: {
        temp: 275.48,
        feels_like: 273.9,
        temp_min: 274.29,
        temp_max: 277.95,
        pressure: 1009,
        humidity: 86,
        sea_level: 1009,
        grnd_level: 922,
      },
      visibility: 10000,
      wind: {
        speed: 1.61,
        deg: 258,
        gust: 1.39,
      },
      clouds: {
        all: 100,
      },
      dt: 1711607594,
      sys: {
        type: 2,
        id: 2003593,
        country: "UK",
        sunrise: 1711547367,
        sunset: 1711592680,
      },
      timezone: -25200,
      id: 5815135,
      name: "London",
      cod: 200,
    },
  },

  {
    incident_desc: "Typoon destroyed all the expensive houses",
    city: "Accra",
    country: "Ghana",
    date: "2024-03-28T06:33:14.974Z",
    weather_report: {
      coord: {
        lon: -120.5015,
        lat: 47.5001,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      base: "stations",
      main: {
        temp: 275.48,
        feels_like: 273.9,
        temp_min: 274.29,
        temp_max: 277.95,
        pressure: 1009,
        humidity: 86,
        sea_level: 1009,
        grnd_level: 922,
      },
      visibility: 10000,
      wind: {
        speed: 1.61,
        deg: 258,
        gust: 1.39,
      },
      clouds: {
        all: 100,
      },
      dt: 1711607594,
      sys: {
        type: 2,
        id: 2003593,
        country: "Ghana",
        sunrise: 1711547367,
        sunset: 1711592680,
      },
      timezone: -25200,
      id: 5815135,
      name: "Accra",
      cod: 200,
    },
  },

  {
    incident_desc: "Typoon destroyed all the expensive houses",
    city: "Washington",
    country: "USA",
    date: "2024-03-28T06:33:14.974Z",
    weather_report: {
      coord: {
        lon: -120.5015,
        lat: 47.5001,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      base: "stations",
      main: {
        temp: 275.48,
        feels_like: 273.9,
        temp_min: 274.29,
        temp_max: 277.95,
        pressure: 1009,
        humidity: 86,
        sea_level: 1009,
        grnd_level: 922,
      },
      visibility: 10000,
      wind: {
        speed: 1.61,
        deg: 258,
        gust: 1.39,
      },
      clouds: {
        all: 100,
      },
      dt: 1711607594,
      sys: {
        type: 2,
        id: 2003593,
        country: "US",
        sunrise: 1711547367,
        sunset: 1711592680,
      },
      timezone: -25200,
      id: 5815135,
      name: "Washington",
      cod: 200,
    },
  },
];

describe("Incident Routes", () => {
  it("Get All incidents and filter (No query specified)", async () => {
    await incident.bulkCreate(incidents);

    const res = await chai.request(server).get("/api/v1/incidents");

    expect(res).to.have.status(200);
    res.body.incidents.should.be.a("array");
    expect(res.body.incidents.length).to.equal(4);
  });

  it("Get All incidents and filter (city not in the database specified)", async () => {
    await incident.bulkCreate(incidents);

    const res = await chai
      .request(server)
      .get("/api/v1/incidents/?city=washingston"); //washington with an s
    // .query({ city: "London" });

    expect(res).to.have.status(200);
    res.body.incidents.should.be.a("array");
    expect(res.body.incidents.length).to.equal(0);
  });

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
