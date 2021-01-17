const Billing = require('../models/billing.model');
var easyinvoice = require('easyinvoice');
const fs=require('fs');
const ObjectId=require('mongoose').Types.ObjectId;


exports.create = function (req, res) {
    console.log(req.body.productName);
    console.log(req.body.quantity);
    console.log(req.body.price);
    var total=req.body.quantity*req.body.price;
    var c_gst=total*6/100;
    var s_gst=total*6/100;
    var finalamount= total+c_gst+s_gst;

    var billing=new Billing({
        productname:req.body.productname,
        quantity:req.body.quantity,
        price:req.body.price,
        total:total,
        cgst:c_gst,
        sgst:s_gst,
        finalamount:finalamount
       
      }); 
          billing.save((err,docs)=>{
          if(!err){res.send(docs);}
          else{ console.log('Error in user save:' + JSON.stringify(err,this.undefind,2));}
          });
  }
  exports.displaysingle = function (req, res) {
    console.log(req.params.id);
    if(!ObjectId.isValid(req.params.id))
      return res.status(400).send('No record');

    Billing.findOne({_id:req.params.id},(err,docs)=>{
       if(!err){
         res.send(docs); 
        }
       else {console.log('Error' + JSON.stringify(err.undefind,2));}
  });
  }

  exports.display = function (req, res) {
    Billing.find((err,docs)=>{
        if(!err){res.send(docs); }
        else {Console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
    });
  }

  exports.edit = function (req, res) {
    var total=req.body.quantity*req.body.price;
    var c_gst=total*6/100;
    var s_gst=total*6/100;
    var finalamount= total+c_gst+s_gst;
    Billing.updateOne({_id:req.params.id},{$set:{productname:req.body.productname,quantity:req.body.quantity,price:req.body.price,total:total,cgst:c_gst,sgst:s_gst,finalamount:finalamount}},{new:true},(err,docs)=>{
        if(!err){res.send("record updated"); }
        else {console.log('Error in Retriving Employeee:' + JSON.stringify(err.undefind,2));}
      });
  }
  exports.delete = function (req, res) {
    console.log("test delete");
    if(!ObjectId.isValid(req.params.id))
      return res.status(400).send('No record');

    Billing.findByIdAndRemove(req.params.id,(err,docs)=>{
       if(!err){res.send("record deleted"); }
       else {console.log('Error' + JSON.stringify(err.undefind,2));}
  });
  }
  exports.invoice = function (req, res) {
    console.log(req.params.id);
    if(!ObjectId.isValid(req.params.id))
      return res.status(400).send('No record');

    Billing.findOne({_id:req.params.id},(err,docs)=>{
       if(!err){
         res.send(docs); 
         invoice(docs)
        }
       else {console.log('Error' + JSON.stringify(err.undefind,2));}
  });
  }
  function invoice(docs){
    var date=new Date()
    console.log(date)

    var data = {
      "currency": "INR",
      "taxNotation": "gst", //or vat
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "logo": "https://www.easyinvoice.cloud/img/logo.png",
      "sender": {
          "company": "company name",
          "address": "banglore",
          "zip": "566001",
          "city": "banglore",
          "country":"india"
  
      },
      "client": {  
      },
      "invoiceNumber": docs.id,
      "invoiceDate":date,
      "products": [
          {
              "quantity": docs.quantity,
              "description":docs.productname,
              "tax":12,
              "price":docs.price
          }
      ],
      "bottomNotice": "this is only for testing"
  };
    easyinvoice.createInvoice(data, async function (result) {
      await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
      console.log(result.pdf);
  });

  
  //       //only supported in the browser
  //       easyinvoice.createInvoice(data, function (result) {
  //       easyinvoice.download('myInvoice.pdf');
 
  // });
}