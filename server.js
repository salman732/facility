var express = require("express");
var http = require("http");
var app = express();
var port=process.env.PORT||3000;
var server = http.createServer(app).listen(port);

//var io = require("socket.io")(server);

var bodyparser=require("body-parser");
var path=require("path");
var fs=require("fs");

var mysql=require("mysql");
var con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"facility"
});
con.connect(function(err){
  if(err) throw err;
  console.log("database is connected");
});

//====================oscket.io createConnection
var user_firstname;
var user_surname;
var user_dateofbirth;
var user_companytype;
var user_email;
var user_id;

//======done with basic structure

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
//app.use(express.static(__dirname));
//================================================================================================================homepage request


app.get("/",function(req,res){

  fs.readFile("./practis.html","UTF-8",function(err,content){
    res.writeHead(200,{"content-type":"text/html"});
    res.end(content);
  });
});
//app.use("/",express.static("./practis.html"));
//app.use("/style.css",express.static("./style.css"));
app.get("/style.css",function(req,res){
  fs.readFile("./style.css","UTF-8",function(err,content){
    res.writeHead(200,{"content-type":"text/css"});
    res.end(content);
  });
});
app.get("/frontscript.js",function(req,res){
  fs.readFile("./frontscript.js","UTF-8",function(err,content){
    res.writeHead(200,{"content-type":"text/js"});
    res.end(content);
  });
});
app.get("/font/css/fontawesome.min.css",function(req,res){
  fs.readFile("./font/css/fontawesome.min.css","UTF-8",function(err,content){
    res.writeHead(200,{"content-type":"text/css"});
    res.end(content);
  });
});

app.get("/iconfont.css",function(req,res){
  fs.readFile("./iconfont.css","UTF-8",function(err,content){
    res.writeHead(200,{"content-type":"text/css"});
    res.end(content);
  });
});
app.get("/fonts/linea.woff",function(req,res){
  fs.readFile("./fonts/linea.woff",function(err,content){
    res.writeHead(200,{"content-type":"font/woff"});
    res.end(content);
  });
});

app.get("/aboutimg1.jpg",function(req,res){
  fs.readFile("./aboutimg1.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});
app.get("/default-profile.png",function(req,res){
  fs.readFile("./default-profile.png",function(err,content){
    res.writeHead(200,{"content-type":"image/png"});
    res.end(content);
  });
});
app.get("/aboutimg2.jpg",function(req,res){
  fs.readFile("./aboutimg2.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});
app.get("/aboutimg3.jpg",function(req,res){
  fs.readFile("./aboutimg3.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});
app.get("/KASH64.jpg",function(req,res){
  fs.readFile("./KASH64.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});
app.get("/KASH79.jpg",function(req,res){
  fs.readFile("./KASH79.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});
app.get("/pictures/blue.jpg",function(req,res){
  fs.readFile("./pictures/blue.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});
app.get("/pictures/logo.png",function(req,res){
  fs.readFile("./pictures/logo.png",function(err,content){
    res.writeHead(200,{"content-type":"image/png"});
    res.end(content);
  });
});
app.get("/pictures/sky.jpg",function(req,res){
  fs.readFile("./pictures/sky.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});

app.get("/rentacar.jpg",function(req,res){
  fs.readFile("./rentacar.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});
app.get("/hotel.jpg",function(req,res){
  fs.readFile("./hotel.jpg",function(err,content){
    res.writeHead(200,{"content-type":"image/jpg"});
    res.end(content);
  });
});
app.get("/vedio2.mp4",function(req,res){
  fs.readFile("./vedio2.mp4",function(err,content){
    res.writeHead(200,{"content-type":"video/mp4"});
    res.end(content);
  });
});
//=======================================================================================================================finish homepage request






//=====================handling events starts from hhere============================================================

//==================handling the login request for the homepage====================================================================================================
//========================================================================
app.post("/login",function(req,res){
console.log("this is email"+req.body.email);
var email=req.body.email;
var accounttype=req.body.accounttype;
var password=req.body.password;
if(accounttype=='client'){
  console.log("DATA BASE IS CONNECTED FOR LOGIN PURPOSE");
  var sql_query=`SELECT * FROM clients WHERE email="${email}" AND password="${password}"`;
  console.log(sql_query);
  con.query(sql_query,function(err,result){

  if(result.length>0)  {
res.send(result);

  }
  else{

res.send("error");

  }
  });

}


else if (accounttype=='seller') {
  console.log("DATA BASE IS CONNECTED FOR LOGIN PURPOSE");
  var sql_query=`SELECT * FROM seller WHERE email="${email}" AND password="${password}"`;
  con.query(sql_query,function(err,result){
    console.log("query is runing");
  if(result.length>0)  {

  res.send(result);


  }
  else{
res.send("error");


  }
  });

}





});

//=============================end of handling login request from home page===================================================================================

//===============================================================================================================================================




//===========================handling the post request for signup from form the home page ==================================================================================

//=====signup_client was handeled herer===
app.post("/signup-client",function(req,res){
console.log("/signup-client is runig for signup purposes");
var firstname=req.body.firstname;
var surname=req.body.surname;
var email=req.body.email;
var password=req.body.password;
var dateofbirth=req.body.dateofbirth;
console.log("DATA base is connected for regiter new facility user");
var sql_check=`SELECT * FROM clients WHERE email="${email}"`;
console.log(sql_check);
con.query(sql_check,function(err,result){
if(result.length>0){
res.send("signup-fail");
}
else{
var sql_query=`INSERT INTO clients(firstname,surname,email,password,dateofbirth) VALUES ("${firstname}","${surname}","${email}","${password}","${dateofbirth}")`;
con.query(sql_query,function(err,result){
if(err) throw err;
console.log("record was added in client table");
res.send("signup-sucess");

});

}


});

});
//=======================================================signup client is completed


//============================================================signup seller was handeled herer
app.post("/signup-seller",function(req,res){
console.log("/signup_seller is runig for signup");
      console.log("DATA base is connected for regiter new facility seller");
var ownername=req.body.ownername;
var companyname=req.body.companyname;
var companytype=req.body.companytype;
var price=req.body.price;
var email=req.body.email;
var password=req.body.password;
      var sql_check=`SELECT * FROM seller WHERE email="${email}"`;
      console.log(sql_check);
      con.query(sql_check,function(err,result){
      if(result.length>0){
res.send('signup-fail');
      }
      else {
        var sql_query=`INSERT INTO seller(ownername,companyname,email,password,price,companytype) VALUES ("${ownername}","${companyname}","${email}","${password}","${price}","${companytype}")`;
console.log(sql_query);
         con.query(sql_query,function(err,result){
        if(err) throw err;
      console.log("record was added in seller table");
    res.send("signup-success");
    });

}
      });

});






//=========================================================================signup seller handel was ended here
//=========================== END OF handling the post request for signup from form the home page ==========================



//==============================getting information for the gig of seller

//=====================creating sguid gig data for c;lient
app.get("/gig_guide",function(req,res){
    var sql_query='SELECT id,ownername,companyname,email,price,companytype,status,totalorder FROM seller WHERE companytype="tourist guide"';
    con.query(sql_query,function(err,result){
  if(result.length>0){
    console.log("GUIDE SELLER GIG DATA WAS GET AND SENT TO THE CLIENT ");
    res.send(result);
  }

    });

  });
  //=================creating the  car gig data for client

app.get("/gig_car",function(req,res){
      console.log("car seller gig  getting data ");
      var sql_query='SELECT id,ownername,companyname,email,price,companytype,status,totalorder FROM seller WHERE companytype="rent a car"';
      con.query(sql_query,function(err,result){
    if(result.length>0){
      console.log("rent a car SELLER GIG DATA WAS GET AND SENT TO THE CLIENT ");
    res.send(result);
    }

      });

    });

//setting hotel gig
    app.get("/gig_hotel",function(req,res){
        console.log("hotel seller gig  getting data ");
        var sql_query='SELECT id,ownername,companyname,email,price,companytype,status,totalorder FROM seller WHERE companytype="hotel"';
        con.query(sql_query,function(err,result){
      if(result.length>0){
        console.log("hotel SELLER GIG DATA WAS GET AND SENT TO THE CLIENT ");
        res.send(result);
      }

        });

      });


//==============================  END OF getting information for the gig of seller
//===================================================================getting the data for setting the order FORM

app.post("/seller_info_for_order_form",function(req,res){
  var seller_id=req.body.seller_id;
  var sql_query=`SELECT id,ownername,companyname,email,price,companytype,status,totalorder FROM seller WHERE id="${seller_id}"`;

  con.query(sql_query,function(err,result){
    if(result.length>0){
      console.log("gettinh order seller query is runing ");
    res.send(result);
    }


  });
});

//================================================setting the data for order places

app.post("/order_place",function(req,res){
  var seller_id=req.body.seller_id;
  var comp_name=req.body.comp_name;
  var comp_email=req.body.comp_email;
  var comp_type=req.body.comp_type;
  var price=req.body.price;
  var client_id=req.body.client_id;
  var client_name=req.body.client_name;
  var client_email=req.body.client_email;
  var startingdate=req.body.startingdate;
  var endingdate=req.body.endingdate;
  var product_type=req.body.product_type;
  var product_specification=req.body.product_specification;
  console.log("order_place runing");
console.log(comp_type);

  if(comp_type=='hotel'){
    var sql_check=`SELECT * FROM order_hotel WHERE sellerid="${seller_id}" AND clientid="${client_id}" AND checkin="${startingdate}" AND checkout="${endingdate}" AND roomtype="${product_type}" AND totalrooms="${product_specification}"`;
    con.query(sql_check,function(err,result){
      if(result.length>0){
          console.log("duplicate order ");
res.send("order-duplicate");
      }
      else{
        var sql_query=`INSERT INTO order_hotel(companyname,companytype,companyemail,checkin,checkout,sellerid,clientid,clientname,clientemail,roomtype,totalrooms,price) VALUES ("${comp_name}","${comp_type}","${comp_email}","${startingdate}","${endingdate}","${seller_id}","${client_id}","${client_name}","${client_email}","${product_type}","${product_specification}","${price}")`;
        console.log(sql_query);
        con.query(sql_query,function(err,result){
          console.log("order_place query  runnung your data was saved in hotel order ");
  res.send("order-sucess");
        });
      }
    });



  }
  else if(comp_type=='rent a car'){
    var sql_check=`SELECT * FROM order_car WHERE sellerid="${seller_id}" AND clientid="${client_id}" AND startingdate="${startingdate}" AND endingdate="${endingdate}" AND carcompany="${product_type}" AND cartmodel="${product_specification}"`;
    console.log(sql_check);
    con.query(sql_check,function(err,result){
      console.log(result);
      if(result.length>0){
          console.log("duplicate order ");
res.send("order-duplicate");
      }
      else{
    var sql_query=`INSERT INTO order_car(companyname,companytype,companyemail,startingdate,endingdate,sellerid,clientid,clientname,clientemail,carcompany,cartmodel,price) VALUES ("${comp_name}","${comp_type}","${comp_email}","${startingdate}","${endingdate}","${seller_id}","${client_id}","${client_name}","${client_email}","${product_type}","${product_specification}","${price}")`;
    console.log(sql_query);
    con.query(sql_query,function(err,result){

      console.log("order_place query s runnung your data was saved in car order");
  res.send("order-sucess");
    });
}

});
}

  else if(comp_type=='tourist guide'){
    var sql_check=`SELECT * FROM order_guid WHERE sellerid="${seller_id}" AND clientid="${client_id}" AND startingdate="${startingdate}" AND endingdate="${endingdate}" AND language="${product_type}" AND people="${product_specification}"`;
    con.query(sql_check,function(err,result){
      if(result.length>0){
        console.log("duplicate order ");
res.send("order-duplicate");
      }
      else{
      var sql_query=`INSERT INTO order_guid(companyname,companytype,companyemail,startingdate,endingdate,sellerid,clientid,clientname,clientemail,language,people,price) VALUES ("${comp_name}","${comp_type}","${comp_email}","${startingdate}","${endingdate}","${seller_id}","${client_id}","${client_name}","${client_email}","${product_type}","${product_specification}","${price}")`;
      console.log(sql_query);
      con.query(sql_query,function(err,result){

        console.log("order_place query s runnung  your data was saved in guid order");
res.send("order-sucess");
      });
}

});
}
    else{
      console.log("wrong order error ");
    res.send("order-error");
    }


});

  //==================================END of placing the order for the client




//=====================================================================================gettign the user information from data base for profile
app.post("/get-profile-info",function(req,res){
  var id=req.body.id;
  var companytype=req.body.companytype;
  if(companytype=="client"){
    var sql_query=`SELECT * FROM clients WHERE id="${id}"`;
    con.query(sql_query,function(err,result){
      if(err){
        console.log("an error accourd while getting the profile data from data base");
        res.send("profile-error");
      }
    res.send(result);
    });
  }

  else if (companytype=="seller") {
    console.log("sellere profile not defiendyet");
  }
  else {
    res.send("profile-error");
  }

});
//===============================end of geting user information fromdata base

//============================================================================================DEACTIVATION OF  ACCOUNT
app.post("/deactiv-account",function(req,res){
  var id=req.body.id;
  var companytype=req.body.companytype;

  if(companytype=="client"){
    var sql_query=`DELETE FROM clients WHERE id= "${id}"`;
    con.query(sql_query,function(err,result){
      if(err){
        res.send("deactive-error");
      }
      res.send("deactive-succes");
    });
  }
  else if(companytype=="seller") {
console.log("seller is not defiend for dactivation");
  }
  else {
    console.log("erroe while dactivating account");
  }
});

//=============================end of deactivation of account


//==================editing the info of user   PROCESS
	app.post("/edit-info",function(req,res){
    var new_info=req.body.new_info;
    var element_to_change=req.body.element_to_change;
    var id=req.body.id;
    var companytype=req.body.companytype;
console.log("this is element that is to be changed "+element_to_change);
    if(companytype=="client"){
        var sql_query=`UPDATE clients SET ${element_to_change}="${new_info}" WHERE id="${id}"`;
        con.query(sql_query,function(err,result){
          if(err){
            res.send("edit-info-error");
          }
          res.send("edit-info-sucess");
        });

    }

    else {
      console.log("error in changing the content ");
        res.send("edit-info-error");
    }

  });

//=============================edit info of user end here ==============










console.log("APP IS LISTNING ON "+port);
