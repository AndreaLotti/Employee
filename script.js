$(document).ready(function(){
    load();
    getData();
    add();
    remove();  
});

function load(){
  $("#container").append('<table id="table"><th colspan="4" id="header"><h3>Manage Employees <button id="btn-form" class="btn btn-success" onclick="formData()">Add new employee</button></h3></th><tr><td><b>Name</b></td><td><b>Surname</b></td><td><b>Email</b></td><td><b>Phone</b></td></tr></table>');       
}

function formData(){ 
  $("#container").append('<label>Employee ID:</label> <input type="text" id="empolyeeID" placeholder="1"><br><label>First name:</label><input type="text" id="firstName" placeholder="mario"><br><label>Last name:</label><input type="text" id="lastName" placeholder="rossi"><br><label>Email:</label><input type="email" id="email" placeholder="mario@rossi.com"><br><label>Phone:</label><input type="text" id="phone" placeholder="123-1234"><br><button type="button" class="btn btn-primary" id="btn-add">Add</button>')
}

function getData(){
    $.ajax({
        url: "http://localhost:8080/api/tutorial/1.0/employees",
        type: "get",
        contentType: "application/json",
        accept: "/",
        success: function(data){
          for (let i = 0; i < data.length; i++) { 
            $("#table").append("<tr><td>" + data[i]["firstName"] + "</td><td>"+ data[i]["lastName"] + "</td><td>" + data[i]["email"] + "</td><td>"+ data[i]["phone"] + "</td><td><button class='btn btn-danger btn-rmv' id='" + data[i]["employeeId"] + "'>Remove</button></tr>");
          }
        },
        error: function(errorThrown){
          console.log( errorThrown );
        }
    });
  }

function add(){
  $(document).on('click','#btn-add',function(){
    var postData = {
      "employeeID" : $("#employeeID").val(),
      "firstName" : $("#firstName").val(),
      "lastName" : $("#lastName").val(),
      "email" : $("#email").val(),
      "phone" : $("#phone").val(),
    };
  
  $.ajax({
    url: "http://localhost:8080/api/tutorial/1.0/employees",
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(postData),
    accept: "*/*",
    success: function(data,){
      alert("Operation done");
      location.reload();
    },
    error: function(errorThrown){
      console.log( errorThrown );
    }
  });
});    
}

function remove(){
  $(document).on('click','.btn-rmv',function(){
    var id= this.id;

  $.ajax({
    url: "http://localhost:8080/api/tutorial/1.0/employees/" +id,
    type: "delete",
    contentType: "application/json",
    accept: "/",
    success: function(data,){
      alert("Operation done");
      location.reload();
    },
    error: function(errorThrown){
      console.log( errorThrown );
    }
  });
});
}

