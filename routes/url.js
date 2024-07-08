const express=require('express');
const {generateShortUrl}=require('../controllers/url');
const {showShortUrl}=require('../controllers/url');
const router=express.Router();
router.post('/',generateShortUrl);
router.get("/:shortid",showShortUrl);

module.exports=router;