import http from 'k6/http';
import { check, sleep } from 'k6';

const ip = require('./ip.js');

export const options = {
  vus: 10,
  duration: "1m",

};

const random = num => Math.floor(Math.random() * (num - 9000000 + 1)) + 9000000;

const num = random(10000000);

const url = `http://${ip}:7777/${num}`;

export default function () {
  const res = http.post(url);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 200,
  });
  sleep(0);
}

/**
{
  getSome(num: 9999999){
    id
    address
    city
    beds
    baths
    sqFt
    status
    taxAssessment
  }
}
 */
