import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // Set the number of virtual users
  duration: '30s', // Set the duration of the test
  rps: 1000 // Set the target requests per second
};

export default function () {
  let res = http.get('http://localhost:3000/reviews/users');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}