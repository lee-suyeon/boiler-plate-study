const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");

router.post("/subscribeNumber", (req, res) => {
  Subscriber.find({ 'userTo': req.body.userTo })
    .exec((err, subscribe) => { // userTo를 구독하는 수의 case
      if(err) return res.status(400).send(err);
      return res.status(200).json({
        success: true, subscribeNumber: subscribe.length
      })
    })
});


router.post("/subscribed", (req, res) => {
  Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
    .exec((err, subscribe) => {
      if(err) return res.status(400).send(err);
      let result = false; // 구독 X
      if(subscribe.length !== 0){
        result = true; // 구독 O
      }
      res.status(200).json({ success: true, subscribed: result });
    })
});

module.exports = router;