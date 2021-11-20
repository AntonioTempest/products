const frisby = require('frisby');


it('call to a real product should return a server code 200', function () {
  return frisby
    .get('http:/localhost:3000/products/')
    .expect('status', 200);
});

it('call to a fake product should return a server code 500', function () {
  return frisby
    .get('http:/localhost:3000/products/7000000')
    .expect('status', 500);
});

xit('should return some picture urls', function () {
  return frisby
    .get('http:/localhost:3000/products/900000/styles')
    .expect('bodyContains', 'thumbnail_url')
})

it('should get all of the related products', function () {
  return frisby
    .get('http:/localhost:3000/products/800000/related')
    .expect('json', 'length', '5')
})

it('should get the right product details', function () {
  return frisby
    .get('http:/localhost:3000/products/800000/')
    .expect('bodyContains', 'Double Stitch')
})