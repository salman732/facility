
//=========================seller attrubutes
var seller_id
var seller_ownername;
var seller_companyname;
var seller_company_email;
var seller_price;
var seller_companytype;

//=========cleint attributes==========
var client_id;
var client_name;
var client_email;
var client_companytype;

//==============================================================necassery var of different DOM elements to use in the carmodel
var loginform=document.getElementById('loginform');
var client_signup=document.getElementById('signup_form_client');
var seller_signup=document.getElementById('signup_form_seller');
var book_guid=document.getElementById('book-guid');
var book_hotel=document.getElementById('book-hotel');
var book_car=document.getElementById('book-car');
var profile_btn=document.getElementById('profile-btn');
var account_dactive_btn=document.getElementById('profile-deactivs');
var edit_info_form=document.getElementById('edit-info-form');
//==================================================================================end or declaring var for DOM elements






//=======================================================================================================================================================================================================================
//                                                    HANDLING THE LOGIN PROCESS
//=====================================================================================================================================================================================================================
//===================================================================login response handling
loginform.onsubmit=function(event){
event.preventDefault();
var log_info={
"email":loginform.email.value,
"password":loginform.password.value,
"accounttype":loginform.accounttype.value
};
console.log(log_info.email);
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var response=JSON.parse(this.responseText);
			//==============on login fail this if event will trigger
		if(response=='error'){
				alert("WRONG ID OR PASSWORD PLEASE TRY AGAIN ");
		}
		//===============on login succes this else  event will trigger
		else {
			//on login of client.....
if(response[0].companytype=='client'){
	client_id=response[0].id;
	client_name=response[0].firstname+" "+response[0].surname;
	client_email=response[0].email;
	client_companytype=response[0].companytype;
	header_part_changing(response[0].firstname,response[0].surname);
	show_booking(response[0].firstname,response[0].email);
}
//==========on login of seller .....
else if (response[0].companytype=='hotel' ||response[0].companytype=='rent a car' || response[0].companytype=='tourist guide' ) {
	seller_id=response[0].id;
		seller_ownername=response[0].ownername;
		 seller_companyname=response[0].companyname;
		 seller_company_email=response[0].email;
		seller_price=response[0].price;
		seller_companytype=response[0].companytype;
		header_part_changing(response[0].ownername,"");
}
else {
	alert("ERROR ACCOURD DURING THE LOGIN TRY AGAIN");
}

		}

    }
  };
  xhttp.open("POST","/login", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`email=${log_info.email}&password=${log_info.password}&accounttype=${log_info.accounttype}`);
}
//===========================================================================================================end of login resonse handling
//=======================================================================================================================================================================================================================
//                                                      END OF HANDLING THE LOGIN PROCESS
//=====================================================================================================================================================================================================================







//=======================================================================================================================================================================================================================
//                                                       handling the signup process
//=====================================================================================================================================================================================================================

//============================================================================================================handling request of the signup account for both the seller and the clients
//=======client signup..........
client_signup.onsubmit=function(event){
event.preventDefault();
var signup_info={
"firstname":client_signup.firstname.value,
"surname":client_signup.surname.value,
"email":client_signup.email.value,
"password":client_signup.password.value,
"dateofbirth":client_signup.dateofbirth.value
};
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		//===============================if client signup is succefully done
		if(this.responseText=='signup-sucess'){
			signup_client_change_after_signup();
					alert("your record was added to the data base now you can login");
		}
		else if (this.responseText=='signup-fail') {
				alert("This email was already rgistered login with it or create an different one");
		}
else {
	alert('SOME INEXPECTED ERROR HAS ACCOURD TRY AGAIN LATER ');
}

	}
};
xhttp.open("POST", "/signup-client", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(`firstname=${signup_info.firstname}&surname=${signup_info.surname}&email=${signup_info.email}&password=${signup_info.password}&dateofbirth=${signup_info.dateofbirth}`);
}

//=================end of client signup
//==================================seller signup

seller_signup.onsubmit=function(event){
event.preventDefault();
var signup_info={
"ownername":seller_signup.ownername.value,
"companyname":seller_signup.companyname.value,
"email":seller_signup.email.value,
"password":seller_signup.password.value,
"price":seller_signup.price.value,
"companytype":seller_signup.companytype.value,
};
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		//===============================if client signup is succefully done

		if(this.responseText=='signup-success'){
			signup_client_change_after_signup();
					alert("your record was added to the data base now you can login");
		}
		else if (this.responseText=='signup-fail') {
				alert("This emaill was already registered login with it or create an different one");
		}
else {
	alert('SOME INEXPECTED ERROR HAS ACCOURD TRY AGAIN LATER ');
}

	}
};
xhttp.open("POST", "/signup-seller", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send(`ownername=${signup_info.ownername}&companyname=${signup_info.companyname}&email=${signup_info.email}&password=${signup_info.password}&price=${signup_info.price}&companytype=${signup_info.companytype}`);
}
//=========================seller signup ends here



//=-================================================ handling the request for signup ends here
//=======================================================================================================================================================================================================================
//                                                      end of handling the signup
//=====================================================================================================================================================================================================================




//=======================================================================================================================================================================================================================
//                                                   HANDLING THEHEADER PART CHANGING ON LOGIN IT IS A PART OF LOGIN PROCESS
//=====================================================================================================================================================================================================================
////============printing welcom on header of page

function header_part_changing(firstname,surname){

var newspan=document.getElementById('newspan');
newspan.classList.remove("overall-display");
newspan.innerHTML="WELCOM  "+firstname+" "+surname+" TO FACIILITY.COM";
var loginform=document.getElementById('login_form');
loginform.classList.add("overall-display");
var logout=document.getElementById('logout-btn');
logout.classList.remove("overall-display");
var profile_btn=document.getElementById('profile-btn');
profile_btn.classList.remove("overall-display");
profile_btn.style.marginTop="26rem";
var signup=document.getElementById('signup-btn-1');
signup.classList.add("overall-display") ;
var loginbtn=document.getElementById('login-btn-1');
loginbtn.classList.add("overall-display");
};
//=======================================================================================================================================================================================================================
//                                                END OF    HANDLING THEHEADER PART CHANGING ON LOGIN IT IS A PART OF LOGIN PROCESS
//=====================================================================================================================================================================================================================









//=======================================================================================================================================================================================================================
//                                          chnages hapends on front end after signup handeled here
//=====================================================================================================================================================================================================================
//================================================================change on signup_form for both client and seller done here

function signup_client_change_after_signup(){
document.getElementById('signup_form-client').classList.add("overall-display");
};
function signup_client_change_before_signup(){
document.getElementById('signup_form-client').classList.remove("overall-display");
};

function signup_seller_change_after_signup(){
document.getElementById('signup_form-seller').classList.add("overall-display");
};

function signup_seller_change_before_signup(){
document.getElementById('signup_form-seller').classList.remove("overall-display");
};

//===================================================================================change on signup form for both seller and client done herer
//=======================================================================================================================================================================================================================
//                                          END OF chnages hapends on front end after signup handeled here
//=====================================================================================================================================================================================================================








//=======================================================================================================================================================================================================================
//                                                 HANDLING THE LOGOUT FUNCTION
//=====================================================================================================================================================================================================================
/////=============completing the logout functon
function logout(){
var child=document.getElementById('newspan');
child.classList.add("overall-display");

var login=document.getElementById('login-btn-1');
login.classList.remove("overall-display");

var signup=document.getElementById('signup-btn-1');
signup.classList.remove("overall-display");

var logout=document.getElementById('logout-btn');
logout.classList.add("overall-display");
var profile_btn=document.getElementById('profile-btn');
profile_btn.classList.add("overall-display");
var loginform=document.getElementById('login_form');
loginform.classList.remove("overall-display");
document.getElementById('booking').style.display="none";
document.getElementById('booking').classList.add("overall-display");
document.getElementById('booknow-btn').style.display="none";
document.getElementById('booknow-btn').classList.add("overall-display");
  document.getElementById('section-about').classList.remove("overall-display");
 seller_id=null;
 seller_ownername=null;
seller_companyname=null;
seller_company_email=null;
 seller_price=null;
 seller_companytype=null;
//=========cleint attributes
 client_id=null;
 client_name=null;
 client_email=null;
 client_companytype=null;


};
//=======================================================================================================================================================================================================================
//                                                     END OF HADLING THE LOGUOT FUNCTION
//=====================================================================================================================================================================================================================









//=======================================================================================================================================================================================================================
//                                                      SOME BACIS FUNCTIONS TO SHOW DIFFERENT CONTETN ON PAGE LIKE BOOKING FEATURE
//=====================================================================================================================================================================================================================
function navigation_gone(){
document.getElementById("navi-toggle").checked = false;
};

function check_login(){

document.getElementById('booking').style.display="none";
document.getElementById('booknow-btn').style.display="none";

};

function show_booking(user_firstname,user_email){

	console.log(user_firstname);
	if(user_firstname!=null && user_email!=null){
		console.log("if is runiug for display");
    document.getElementById('section-about').classList.add("overall-display");
    document.getElementById('booking').style.display="block";
document.getElementById('booking').classList.remove("overall-display");
document.getElementById('booknow-btn').style.display="block";
document.getElementById('booknow-btn').classList.remove("overall-display");
}
	else {
document.getElementById('booking').style.display="none";
document.getElementById('booknow-btn').style.display="none";

	}
};
//=======================================================================================================================================================================================================================
//                                                     ENF OF BASIC FUNCTIOJ OF SHOWING DIFFEREN CONTENT
//=====================================================================================================================================================================================================================









//=======================================================================================================================================================================================================================
//                                                    HANDLING OF SHOWING THE GIGS OF COMPINES
//=====================================================================================================================================================================================================================


//===============================================show availble compinies on BOOK A GUID
function setting_company_gig_guid_process(){
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
			var seller=JSON.parse(this.responseText);
     	setting_company_gig_guid(seller);
    }
  };
  xhttp.open("GET", "/gig_guide", true);
  xhttp.send();
}

//=====function for creating gig for each guid seller
function setting_company_gig_guid(seller){
console.log("gig runing");
var idnum=0;
for(var i=0;i<seller.length;i++){
console.log(seller[i].companytype);


if(seller[i].status=='available'){
console.log("gig if runing");
var main_div=document.createElement("div");
main_div.classList.add("seller-part");
var h5_name=document.createElement("h5");
h5_name.classList.add("seller-part-name");
h5_name.classList.add("heading-secondary");
h5_name.setAttribute('id',"name"+idnum);
h5_name.innerHTML=seller[i].companyname;


var h5_email=document.createElement("h5");
h5_email.classList.add("seller-part-email");
h5_email.classList.add("heading-secondary");
h5_email.setAttribute('id',"email"+idnum);
h5_email.innerHTML="EMAIL:";


var h5_email_value=document.createElement("h5");
h5_email_value.classList.add("seller-part-email-value");
h5_email_value.setAttribute('id',"email_value"+idnum);
h5_email_value.innerHTML=seller[i].email;


var h5_rating=document.createElement("h5");
h5_rating.classList.add("seller-part-rating");
h5_rating.classList.add("heading-secondary");
h5_rating.setAttribute('id',"rating"+idnum);
h5_rating.innerHTML="RATING:";


var h5_rating_value=document.createElement("h5");
h5_rating_value.classList.add("seller-part-rating-value");
h5_rating_value.setAttribute('id',"rating_value"+idnum);
if(seller[i].totalorder<=10){
h5_rating_value.innerHTML=seller[i].totalorder+"/10";}
else  {
	h5_rating_value.innerHTML="10/10";

}


var h5_price=document.createElement("h5");
h5_price.classList.add("seller-part-price");
h5_price.classList.add("heading-secondary");
h5_price.setAttribute('id',"price"+idnum);
h5_price.innerHTML="PRICE:";


var h5_price_value=document.createElement("h5");
h5_price_value.classList.add("seller-part-price-value");
h5_price_value.setAttribute('id',"price_value"+idnum);
h5_price_value.innerHTML=seller[i].price;


var h5_type=document.createElement("h5");
h5_type.classList.add("seller-part-type");
h5_type.classList.add("heading-secondary");
h5_type.setAttribute('id',"type"+idnum);
h5_type.innerHTML="TYPE:";


var h5_type_value=document.createElement("h5");
h5_type_value.classList.add("seller-part-type-value");
h5_type.setAttribute('id',"type_value"+idnum);
h5_type_value.innerHTML=seller[i].companytype;



var book_btn=document.createElement("a");
book_btn.classList.add("btn");
book_btn.classList.add("btn-green");
book_btn.classList.add("seller-part-btn-setting");
book_btn.setAttribute('id',"book_btn"+idnum);
book_btn.setAttribute('href','#order-confirm');
book_btn.setAttribute('title','guid_book');
book_btn.setAttribute('onclick',`geting_gig_info(${seller[i].id})`);

book_btn.innerHTML="BOOK NOW";


main_div.appendChild(h5_name);
main_div.appendChild(h5_email);
main_div.appendChild(h5_email_value);
main_div.appendChild(h5_rating);
main_div.appendChild(h5_rating_value);
main_div.appendChild(h5_price);
main_div.appendChild(h5_price_value);
main_div.appendChild(h5_type);
main_div.appendChild(h5_type_value);

main_div.appendChild(book_btn);

document.getElementById('seller-setting').appendChild(main_div);
idnum++;
}

else{
	continue;
}




}




}

//==================================================================setting company gig process for book a guid ends here

//=====================================================setting company gig for rent a card
function setting_company_gig_car_process(){
	console.log("ajax  server request runing for the gig_car");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var seller=JSON.parse(this.responseText);
		setting_company_gig_car(seller);
		}
	};
	xhttp.open("GET", "/gig_car", true);
	xhttp.send();
}

//==========function for creating a gig for each car seller
function setting_company_gig_car(seller){
console.log(" car gig runing");
var idnum=0;
for(var i=0;i<seller.length;i++){
console.log(seller[i].companytype);


if(seller[i].status=='available'){
console.log("gig if runing");
var main_div=document.createElement("div");
main_div.classList.add("seller-part");
var h5_name=document.createElement("h5");
h5_name.classList.add("seller-part-name");
h5_name.classList.add("heading-secondary");
h5_name.setAttribute('id',"name"+idnum);
h5_name.innerHTML=seller[i].companyname;


var h5_email=document.createElement("h5");
h5_email.classList.add("seller-part-email");
h5_email.classList.add("heading-secondary");
h5_email.setAttribute('id',"email"+idnum);
h5_email.innerHTML="EMAIL:"


var h5_email_value=document.createElement("h5");
h5_email_value.classList.add("seller-part-email-value");
h5_email_value.setAttribute('id',"email_value"+idnum);
h5_email_value.innerHTML=seller[i].email;


var h5_rating=document.createElement("h5");
h5_rating.classList.add("seller-part-rating");
h5_rating.classList.add("heading-secondary");
h5_rating.setAttribute('id',"rating"+idnum);
h5_rating.innerHTML="RATING:";


var h5_rating_value=document.createElement("h5");
h5_rating_value.classList.add("seller-part-rating-value");
h5_rating_value.setAttribute('id',"rating_value"+idnum);
if(seller[i].totalorder<=10){
h5_rating_value.innerHTML=seller[i].totalorder+"/10";}
else  {
	h5_rating_value.innerHTML="10/10";

}


var h5_price=document.createElement("h5");
h5_price.classList.add("seller-part-price");
h5_price.classList.add("heading-secondary");
h5_price.setAttribute('id',"price"+idnum);
h5_price.innerHTML="PRICE:";


var h5_price_value=document.createElement("h5");
h5_price_value.classList.add("seller-part-price-value");
h5_price_value.setAttribute('id',"price_value"+idnum);
h5_price_value.innerHTML=seller[i].price;


var h5_type=document.createElement("h5");
h5_type.classList.add("seller-part-type");
h5_type.classList.add("heading-secondary");
h5_type.setAttribute('id',"type"+idnum);
h5_type.innerHTML="TYPE:";


var h5_type_value=document.createElement("h5");
h5_type_value.classList.add("seller-part-type-value");
h5_type.setAttribute('id',"type_value"+idnum);
h5_type_value.innerHTML=seller[i].companytype;



var book_btn=document.createElement("a");
book_btn.classList.add("btn");
book_btn.classList.add("btn-green");
book_btn.classList.add("seller-part-btn-setting");
book_btn.setAttribute('id',"book_btn"+idnum);
book_btn.setAttribute('onclick',`geting_gig_info(${seller[i].id})`);
book_btn.setAttribute('href','#order-confirm');
book_btn.setAttribute('title','car_book');
book_btn.innerHTML="BOOK NOW";


main_div.appendChild(h5_name);
main_div.appendChild(h5_email);
main_div.appendChild(h5_email_value);
main_div.appendChild(h5_rating);
main_div.appendChild(h5_rating_value);
main_div.appendChild(h5_price);
main_div.appendChild(h5_price_value);
main_div.appendChild(h5_type);
main_div.appendChild(h5_type_value);

main_div.appendChild(book_btn);

document.getElementById('seller-setting').appendChild(main_div);
idnum++;
}

else{
	continue;
}




}




}

//=======================================================ending gig for rent a car

//===================================setting gig for the gotel

function setting_company_gig_hotel_process(){
	console.log("ajax  server request runing for the gig_hotel");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var seller=JSON.parse(this.responseText);
		setting_company_gig_hotel(seller);
		}
	};
	xhttp.open("GET", "/gig_hotel", true);
	xhttp.send();
}


// setting the hotel gig
function setting_company_gig_hotel(seller){
console.log(" hotel gig runing");
var idnum=0;
for(var i=0;i<seller.length;i++){

if(seller[i].status=='available'){
console.log("gig if runing");
var main_div=document.createElement("div");
main_div.classList.add("seller-part");
var h5_name=document.createElement("h5");
h5_name.classList.add("seller-part-name");
h5_name.classList.add("heading-secondary");
h5_name.setAttribute('id',"name"+idnum);
h5_name.innerHTML=seller[i].companyname;


var h5_email=document.createElement("h5");
h5_email.classList.add("seller-part-email");
h5_email.classList.add("heading-secondary");
h5_email.setAttribute('id',"email"+idnum);
h5_email.innerHTML="EMAIL:"


var h5_email_value=document.createElement("h5");
h5_email_value.classList.add("seller-part-email-value");
h5_email_value.setAttribute('id',"email_value"+idnum);
h5_email_value.innerHTML=seller[i].email;


var h5_rating=document.createElement("h5");
h5_rating.classList.add("seller-part-rating");
h5_rating.classList.add("heading-secondary");
h5_rating.setAttribute('id',"rating"+idnum);
h5_rating.innerHTML="RATING:";


var h5_rating_value=document.createElement("h5");
h5_rating_value.classList.add("seller-part-rating-value");
h5_rating_value.setAttribute('id',"rating_value"+idnum);
if(seller[i].totalorder<=10){
h5_rating_value.innerHTML=seller[i].totalorder+"/10";}
else  {
	h5_rating_value.innerHTML="10/10";

}


var h5_price=document.createElement("h5");
h5_price.classList.add("seller-part-price");
h5_price.classList.add("heading-secondary");
h5_price.setAttribute('id',"price"+idnum);
h5_price.innerHTML="PRICE:";


var h5_price_value=document.createElement("h5");
h5_price_value.classList.add("seller-part-price-value");
h5_price_value.setAttribute('id',"price_value"+idnum);
h5_price_value.innerHTML=seller[i].price;


var h5_type=document.createElement("h5");
h5_type.classList.add("seller-part-type");
h5_type.classList.add("heading-secondary");
h5_type.setAttribute('id',"type"+idnum);
h5_type.innerHTML="TYPE:";


var h5_type_value=document.createElement("h5");
h5_type_value.classList.add("seller-part-type-value");
h5_type.setAttribute('id',"type_value"+idnum);
h5_type_value.innerHTML=seller[i].companytype;




var book_btn=document.createElement("a");
book_btn.classList.add("btn");
book_btn.classList.add("btn-green");
book_btn.classList.add("seller-part-btn-setting");
book_btn.setAttribute('id',"book_btn"+idnum);
book_btn.setAttribute('href','#order-confirm');
book_btn.setAttribute('onclick',`geting_gig_info(${seller[i].id})`);
book_btn.setAttribute('title','hotel_book');
book_btn.innerHTML="BOOK NOW";


main_div.appendChild(h5_name);
main_div.appendChild(h5_email);
main_div.appendChild(h5_email_value);
main_div.appendChild(h5_rating);
main_div.appendChild(h5_rating_value);
main_div.appendChild(h5_price);
main_div.appendChild(h5_price_value);
main_div.appendChild(h5_type);
main_div.appendChild(h5_type_value);
main_div.appendChild(book_btn);

document.getElementById('seller-setting').appendChild(main_div);
idnum++;
}

else{
	continue;
}




}




}

//====================================================ending the set hotel gig

//========================================removing the gigs

function remove_gig(){
	 var list=document.getElementById('seller-setting');
	while (list.hasChildNodes()) {
  list.removeChild(list.firstChild);
}
}


//========================== getting the seller information to show on the order form
function geting_gig_info(seller_id){
	var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
		 var seller=JSON.parse(this.responseText);
		 	set_order_form(seller);

	 }
 };
 xhttp.open("POST", "/seller_info_for_order_form", true);
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 xhttp.send(`seller_id=${seller_id}`);
}





//========================================================end of getting gig info getting for the order form

//=======================================================================================================================================================================================================================
//                                                    end of handling the gig process
//=====================================================================================================================================================================================================================














//=======================================================================================================================================================================================================================
//                                                        HANDLING THE ORDER PRIOCESS
//=====================================================================================================================================================================================================================


//======================================================set order form with seller info
function set_order_form(seller){
	document.getElementById('order-name').innerHTML=seller[0].companyname;
	document.getElementById('order-ownername').innerHTML=seller[0].ownername;
	document.getElementById('order-email').innerHTML=seller[0].email;
	document.getElementById('order-id').innerHTML=seller[0].id;

	if(seller[0].totalorder<=10){
		document.getElementById('order-rating').innerHTML=seller[0].totalorder+"/10";
	}
	else{
			document.getElementById('order-rating').innerHTML="10/10";
	}

	document.getElementById('order-price').innerHTML=seller[0].price;
	document.getElementById('order-type').innerHTML=seller[0].companytype;
	document.getElementById('order-confirm').classList.remove("overall-display");
	if(seller[0].companytype=="hotel"){
		document.getElementById("book-hotel").classList.remove("overall-display");
	}
	else if (seller[0].companytype=="rent a car") {
			document.getElementById("book-car").classList.remove("overall-display");
	}
	else if (seller[0].companytype=="tourist guide") {
			document.getElementById("book-guid").classList.remove("overall-display");
	}
	else{
		console.log("no form is displaying ");
	}
}


//===============================================ending order form setting

//====================adding back the overall dispplay class to the form in order content

function add_overall_display(id){
if(id=="CANCEL-btn-car"||id=="confirm-btn-car"){
	document.getElementById("book-car").classList.add("overall-display");
		document.getElementById("order-confirm").classList.add("overall-display");
		var list=document.getElementById('seller-setting');
	 while (list.hasChildNodes()) {
	 list.removeChild(list.firstChild);

 }
 document.getElementById('feature-btn-car').click();

}
else if(id=="CANCEL-btn-hotel"||id=="confirm-btn-hotel"){
	document.getElementById("book-hotel").classList.add("overall-display");
		document.getElementById("order-confirm").classList.add("overall-display");
		var list=document.getElementById('seller-setting');
	 while (list.hasChildNodes()) {
	 list.removeChild(list.firstChild);
 }
 document.getElementById('feature-btn-hotel').click();
}
else if(id=="CANCEL-btn-guid"||id=="confirm-btn-guid"){
	document.getElementById("book-guid").classList.add("overall-display");
		document.getElementById("order-confirm").classList.add("overall-display");
		var list=document.getElementById('seller-setting');
	 while (list.hasChildNodes()) {
	 list.removeChild(list.firstChild);
 }
 document.getElementById('feature-btn-guid').click();
}
else{
	console.log("no form adding the overall display class");
}
}

//========================handling the order information from the client to place the order and store the information in // for guide

book_guid.onsubmit=function(event){
	event.preventDefault();
	var seller_id=document.getElementById('order-id').innerHTML;
	var comp_name=document.getElementById("order-name").innerHTML;
			var comp_email=document.getElementById("order-email").innerHTML;
				var comp_type=document.getElementById("order-type").innerHTML;
					var price=document.getElementById("order-price").innerHTML;
	var order_info={
				"startingdate":book_guid.startingdate.value,
				"endingdate":book_guid.endingdate.value,
				"product_type":book_guid.language.value,
				"product_specification":book_guid.no_of_people.value
	};

	var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
		 if(this.responseText=="order-sucess"){
			 alert("YOUR ORDER WAS PLACED SUCESSFULLY");
		 }
		 else if (this.responseText=="order-duplicate") {
		 	alert("YOU HAVE ALREADY PLACED THIS ORDER PLEASE PLACE ANOTHER ONE IF YOU WANT ");
		 }
		 else if (this.responseText=="order-error") {
		 	alert("AN UNEXPECTED ERROR HAS BEEN ACCOURD PLEASE TRY AGAIN LATER ");
		 }
		 else {
		 	alert("unknown error");
		 }

	 }
 };
 xhttp.open("POST", "/order_place", true);
 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 xhttp.send(`seller_id=${seller_id}&comp_name=${comp_name}&comp_email=${comp_email}&comp_type=${comp_type}&price=${price}&client_id=${client_id}&client_name=${client_name}&client_email=${client_email}&startingdate=${order_info.startingdate}&endingdate=${order_info.endingdate}&product_type=${order_info.product_type}&product_specification=${order_info.product_specification}&`);
}


//================================================================================ending guid order_car

//===========================================================================start hotel order
book_hotel.onsubmit=function(event){
	event.preventDefault();
	var seller_id=document.getElementById('order-id').innerHTML;
	var comp_name=document.getElementById("order-name").innerHTML;
			var comp_email=document.getElementById("order-email").innerHTML;
				var comp_type=document.getElementById("order-type").innerHTML;
					var price=document.getElementById("order-price").innerHTML;
	var order_info={
				"startingdate":book_hotel.checkin.value,
				"endingdate":book_hotel.checkout.value,
				"product_type":book_hotel.roomtype.value,
				"product_specification":book_hotel.totalrooms.value
	};
	var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
		 if(this.responseText=="order-sucess"){
			 alert("YOUR ORDER WAS PLACED SUCESSFULLY");
		 }
		 else if (this.responseText=="order-duplicate") {
			alert("YOU HAVE ALREADY PLACED THIS ORDER PLEASE PLACE ANOTHER ONE IF YOU WANT ");
		 }
		 else if (THIS.responseText=="order-error") {
			alert("AN UNEXPECTED ERROR HAS BEEN ACCOURD PLEASE TRY AGAIN KLATER ");
		 }
		 else {
			alert("unknown error");
		 }

	 }
 };
 xhttp.open("POST", "/order_place", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 xhttp.send(`seller_id=${seller_id}&comp_name=${comp_name}&comp_email=${comp_email}&comp_type=${comp_type}&price=${price}&client_id=${client_id}&client_name=${client_name}&client_email=${client_email}&startingdate=${order_info.startingdate}&endingdate=${order_info.endingdate}&product_type=${order_info.product_type}&product_specification=${order_info.product_specification}&`);
}



//=======================================================================ending hotel order PLACING
//=================================starting car order PLACING
book_car.onsubmit=function(event){
	event.preventDefault();
	var seller_id=document.getElementById('order-id').innerHTML;
	var comp_name=document.getElementById("order-name").innerHTML;
			var comp_email=document.getElementById("order-email").innerHTML;
				var comp_type=document.getElementById("order-type").innerHTML;
					var price=document.getElementById("order-price").innerHTML;
	var order_info={
				"startingdate":book_car.startingdate.value,
				"endingdate":book_car.endingdate.value,
				"product_type":book_car.carcompany.value,
				"product_specification":book_car.carmodel.value
	};
	var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
		 if(this.responseText=="order-sucess"){
			 alert("YOUR ORDER WAS PLACED SUCESSFULLY");
		 }
		 else if (this.responseText=="order-duplicate") {
		 	alert("YOU HAVE ALREADY PLACED THIS ORDER PLEASE PLACE ANOTHER ONE IF YOU WANT ");
		 }
		 else if (THIS.responseText=="order-error") {
		 	alert("AN UNEXPECTED ERROR HAS BEEN ACCOURD PLEASE TRY AGAIN KLATER ");
		 }
		 else {
		 	alert("unknown error");
		 }

	 }
 };
 xhttp.open("POST", "/order_place", true);
 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 xhttp.send(`seller_id=${seller_id}&comp_name=${comp_name}&comp_email=${comp_email}&comp_type=${comp_type}&price=${price}&client_id=${client_id}&client_name=${client_name}&client_email=${client_email}&startingdate=${order_info.startingdate}&endingdate=${order_info.endingdate}&product_type=${order_info.product_type}&product_specification=${order_info.product_specification}&`);
}
//=============in case of error in order placing
//=========================================end of placing the order for the the client
//===============================================================================================================================================================================================================
//                                                         END OF HANDLING THE ORDER PROCESS
//==================================================================================================================================================================================================================












//===========================================================================================================================================================================================================================
//                                                          user profile management  functions HANDELED HERE
//==========================================================================================================================================================================================================================
profile_btn.onclick=function(){
console.log("profile btn working");
//getting aND SETING THE CLIENT PROFILE DATA
if(client_id != null && client_companytype != null)
{
	var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200) {
			 //===========in case of error in getting the account infon
			 if(this.responseText=="profile-error"){
				 alert("ERROR HAS BEEN ACCOURD WHILE GETTING YOUR DATA FROM DATA BASE");
			 }
			 else {
				 //=================account information is setting
			 	 var profile=JSON.parse(this.responseText);
				 document.getElementById('profile-name').innerHTML=profile[0].firstname+" "+profile[0].surname;
			 	document.getElementById('profile-email-head').innerHTML=profile[0].email;
			 	document.getElementById('profile-firstname').innerHTML=profile[0].firstname;
			 		document.getElementById('profile-surname').innerHTML=profile[0].surname;
			 			document.getElementById('profile-email').innerHTML=profile[0].email;
			 				document.getElementById('profile-password').innerHTML=profile[0].password;
			 					document.getElementById('profile-dateofbirth').innerHTML=profile[0].dateofbirth;
			 }

     }
   };
   xhttp.open("POST", "/get-profile-info", true);
	 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   xhttp.send(`id=${client_id}&companytype=${client_companytype}`);
 }



//cheking the seller profile data
else if (seller_id !=null && seller_companytype!=null) {
	alert("THIS FUNCTIONALUITY FOR SELLER PROFILE IS NOT WORKING YET");
	/*
	var xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
		 if (this.readyState == 4 && this.status == 200) {
			document.getElementById("demo").innerHTML = this.responseText;
		 }
	 };
	 xhttp.open("POST", "/get-profile-info", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	 xhttp.send(`seller_id=${seller_id}&seller_companytype=${seller_companytype}`);
	 */
 }


else {
	alert("error accourd while cheking your account type ");
}
}




//=================deactivation of account
account_dactive_btn.onclick=function(){
	if(client_id != null && client_companytype != null)
	{
		var xhttp = new XMLHttpRequest();
		 xhttp.onreadystatechange = function() {
			 if (this.readyState == 4 && this.status == 200) {
				 //===========in case of error in getting the account infon
				 if(this.responseText=="deactive-error"){
					 alert("ERROR HAS BEEN ACCOURD WHILE GETTING YOUR DATA FROM DATA BASE");
				 }
				 else if (this.responseText=="deactive-sucess") {
					 alert("your account has been dactived now you cannot login with account all your record was deleted");
				 	document.getElementById("profile-close").click();
				 		document.getElementById("logout-btn").click();
				 }
				 else {

					alert("unknown error");
				 }

			 }
		 };
		 xhttp.open("POST", "/deactiv-account", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		 xhttp.send(`id=${client_id}&companytype=${client_companytype}`);
	 }


	else if (seller_id !=null && seller_companytype!=null) {
	alert("this is not workinn yet for seller ");
	}
	else {
		alert("error accourd while cDEACTIVATING YOPUR ACCOUNT");
	}

}

//================================END OF DACTIVATION OF ACCOPUNT



///=====================INFORMATION EDITING METHODS ================================================================

//=======these method change the content of edit form
function edit_firstname(){
document.getElementById('old-userdata').innerHTML="firstname";
document.getElementById('old-userdata-value').innerHTML=document.getElementById('profile-firstname').innerHTML;
document.getElementById('new-userdata').innerHTML=" ENTER NEW FIRST NAME :";
		document.getElementById('new-data-input').setAttribute('type','text');
}
function edit_surname(){
	document.getElementById('old-userdata').innerHTML="surname";
	document.getElementById('old-userdata-value').innerHTML=document.getElementById('profile-surname').innerHTML;
	document.getElementById('new-userdata').innerHTML=" ENTER NEW SURNAME :";
			document.getElementById('new-data-input').setAttribute('type','text');
}
function edit_email(){
	document.getElementById('old-userdata').innerHTML="email";
	document.getElementById('old-userdata-value').innerHTML=document.getElementById('profile-email').innerHTML;
	document.getElementById('new-userdata').innerHTML=" ENTER NEW EMAIL :";
	document.getElementById('new-data-input').setAttribute('type','email');
}
function edit_password(){
	document.getElementById('old-userdata').innerHTML="password";
	document.getElementById('old-userdata-value').innerHTML=document.getElementById('profile-password').innerHTML;
	document.getElementById('new-userdata').innerHTML=" ENTER NEW PASSWORD :";
		document.getElementById('new-data-input').setAttribute('type','text');
}
function edit_dob(){
	document.getElementById('old-userdata').innerHTML="dateofbirth";
	document.getElementById('old-userdata-value').innerHTML=document.getElementById('profile-dateofbirth').innerHTML;
	document.getElementById('new-userdata').innerHTML=" ENTER NEW DOB :";
		document.getElementById('new-data-input').setAttribute('type','date');
}
//=========end of changing the edit form
//========on edit info submition
edit_info_form.onsubmit=function(event){
	console.log("event od editing");
	event.preventDefault();
	var new_info=edit_info_form.new_info.value;
	var element_to_change=document.getElementById('old-userdata').innerHTML;

	if(client_id != null && client_companytype!= null){
		//ajax request for editing the info
		var xhttp = new XMLHttpRequest();
	   xhttp.onreadystatechange = function() {
	     if (this.readyState == 4 && this.status == 200) {
				 //============in case of error in editing info
	  if(this.responseText=="edit-info-error")
	     {
					alert("an error accourd while changing your information try again later ");
			 }
			 //======================in case of succesfully changed in info
			 else if (this.responseText="edit-info-succes") {
				 document.getElementById('edit-form-close').click();
				 document.getElementById("profile-close").click();
				 document.getElementById('profile-btn').click();
			 }
			 else {
			 	alert("an unknown error accourd while changing your information try again later ");
			 }
		 }
	   };
	   xhttp.open("POST", "/edit-info", true);
		 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	   xhttp.send(`new_info=${new_info}&element_to_change=${element_to_change}&id=${client_id}&companytype=${client_companytype}`);
	 }



else if (seller_id !=null && seller_companytype != null) {
	alert("edit info is not working for the seller yet");
}
else {
	alert("ERRRO ACCOURD WHILE CHANGING THE ACCOUNT INFO ");
}
}
