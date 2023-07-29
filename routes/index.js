var express = require('express');
var router = express.Router();
var {Pool, Client} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodepostgre',
  password: '12345678',
  port: 5432,
})




/* GET home page. */
router.get('/', async(req, res, next) => {
  console.log();
  res.render('index', { title: 'TRANG CHỦ' });
});
//them
router.get('/them', async(req, res, next) => {
  
  res.render('them', { title: 'Thêm dữ liệu' });
});
router.post('/them', async(req, res, next) => {
  var ten = req.body.ten,tuoi = req.body.tuoi;
  await pool.query(`INSERT INTO CONTACT (ten,tuoi) VALUES ('${ten}','${tuoi}')`);
  res.redirect('/xem');
});
//xem
router.get('/xem', async(req, res, next) => {
  const data = await pool.query(`SELECT * FROM CONTACT`);
  res.render('xem', { title: 'Xem dữ liệu',data: data.rows });
});

router.get('/xoa/:idcanxoa', async(req, res, next) => {
  var idcanxoa = req.params.idcanxoa;
  await pool.query(`DELETE FROM CONTACT WHERE id = '${idcanxoa}'`);
  res.redirect('/xem');
});
router.get('/sua/:idcansua', async(req, res, next) => {
  var idcansua = req.params.idcansua;
  const data = await pool.query(`SELECT * FROM contact WHERE id = '${idcansua}'`);
  res.render('sua', { title: 'Xem dữ liệu',data: data.rows });
});
router.post('/sua/:idcansua', async(req, res, next) => {
  var idcansua = req.params.idcansua,ten = req.body.ten,tuoi = req.body.tuoi;
  await pool.query(`UPDATE contact SET ten = '${ten}',tuoi = '${tuoi}' WHERE id = '${idcansua}'`);
  res.redirect('/xem');
});

module.exports = router;
