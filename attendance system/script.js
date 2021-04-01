/*Variables*/
let endpoint = "http://localhost:3000/employees";

const signupButton = document.getElementById('signup-button'),
    loginButton = document.getElementById('login-button'),
    userForms = document.getElementById('user_options-forms'),
    signupInForm = document.getElementById("signup"),
    signupBox = document.getElementsByClassName("signup-box")[0],
    firstName = document.getElementById("firstName-signUp"),
    lastName = document.getElementById("lastName-signUp"),
    address = document.getElementById("address-signUp"),
    email = document.getElementById("email-signUp"),
    age = document.getElementById("age-signUp"),
    adminLogin = document.getElementById("admin-login"),
    adminForm = document.getElementsByClassName("admin-form")[0],
    empolyeeLogin = document.getElementById("login-btn"),
    empLoginForm = document.getElementById("login-form-emp"),
    loginBtn = document.getElementById("login-btn");



  // login empolyee event
  loginBtn.addEventListener("click", async function(){
  $("#login-form-emp").validate({
      
    messages: {
      username: {required: "Username (required)" },
      password: {required: "Password (required)" }
    },
   
 
     submitHandler: function(e) {
        let dataLoginEmp = new FormData(empLoginForm);
        let empolyee_data = Object.fromEntries(dataLoginEmp.entries());
      
        $.get(`${endpoint}?username=${empolyee_data.username}&password=${empolyee_data.password}`, function(data, e){
         
          if(data.length == 1){
              let logineduser = data[0].username;
              localStorage.setItem("logineduser", logineduser);
              window.location.pathname = "/confirm-attendance.html";
          }else{
            document.getElementsByTagName("body")[0].innerHTML += `
            <div class="alert alert-danger alert-dismissible msg-show" role="alert">
                <p>This Username maybe have not account in the system please be confirm from username and password !</p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
       `
          }

        });
          return false;
        }
   }); 
  
})


// login as admin event
adminLogin.addEventListener("click",function(e){
   e.preventDefault();
   let data = new FormData(adminForm);
   let adminData = Object.fromEntries(data.entries());

   if(adminData.adminName == "admin@admin" && adminData.adminPassword == "admin"){
    window.location.pathname = "/dashboard.html";
    localStorage.setItem("authentication", true)
   }else{
     
     document.getElementsByTagName("body")[0].innerHTML += `
     <div class="alert alert-danger alert-dismissible msg-show" role="alert">
         <p> invalid username or password .. please try again ! </p>
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <span aria-hidden="true">&times;</span>
         </button>
     </div>
    `;
   }
})



    // bounce-animation function
function bounceAnimation(left, right){
  userForms.classList.remove(left)
  userForms.classList.add(right)
  }
    
/* Add event listener to the "Sign Up" button */
signupButton.addEventListener('click', () => {
  bounceAnimation("bounceRight", "bounceLeft")

}, false)

/*Add event listener to the "Login" button */
loginButton.addEventListener('click', () => {
  bounceAnimation("bounceLeft", "bounceRight")
}, false)

/* Add event listener to the "Sign Up" button that in form */
signupInForm.addEventListener("click", function(e){
   
  $("#form").validate({
      
   messages: {
      first_name: {required: "First-Name (required, at least 2 characters)" },
      last_name: {required: "Last-Name (required, at least 2 characters)" },
      address: {required: "Address( required )" },
      email: {required: "Email (required, Valid)" },
      age: {required: "Age (required, Not less than 18)" },

   },
  

    submitHandler: function(e) {

      let empData = new FormData(signupBox);
      let newEmpData = Object.fromEntries(empData.entries());

      $.get(endpoint+"?email="+newEmpData.email , (data , e)=>{
        if(data.length > 0){
          document.getElementsByTagName("body")[0].innerHTML += `
            <div class="alert alert-danger alert-dismissible msg-show" role="alert">
                <p> this email has been used before .. please use valid email for registeration </p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
           `;
           win

        }else{
          bounceAnimation("bounceLeft", "bounceRight");
          sendingEmail();
  
          postEmp(newEmpData);
  
          signupBox.reset();
          document.getElementsByTagName("body")[0].innerHTML += `
                  <div class="alert alert-success alert-dismissible msg-show" role="alert">
                      <p>registeration has been successfuly completed .. !
                            wait a confirmation email holding username and password  :)
                      </p>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
             `
        }
              
      }); 
      return false;
          }

  }); 

  
})

// sending email to admin when registeration 
  function sendingEmail(){
      Email.send({
        Host : "smtp.elasticemail.com",
        Username : "systemattendance442@gmail.com",
        Password : "FABDB15C1A4CBF99B3E257A5F282124EE54E",
        To : 'ahmedbehiery96@gmail.com',
        From : "systemattendance442@gmail.com",
        Subject : "ask for registeration",
        Body : `
        <h4>Employee Data</h4>
        <table width="100%" border="1">
        <thead>
          <tr>
            <th>Full-Name</th>
            <th>First-Name</th>
            <th>Last-Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${firstName.value}  ${lastName.value}</th>
            <td>${firstName.value}</td>
            <td>${lastName.value}</td>
            <td>${address.value}</td>
            <td>${email.value}</td>
            <td>${age.value}</td>
          </tr>
        </tbody>
      </table>      
        `
    })
  }
  
  // get all empolyee data from json file
   async function getDataFromJson(){
    let allData;
          await $.get(endpoint, function(data, status){
              allData = data;
        });
        return allData;
    }

    // post new empolyee
  async function postEmp(newOne){
    let x = await getDataFromJson();
      newOne.id = parseInt(x.length)+1 
      newOne.accepted = false;
      $.post(endpoint, newOne,
      function(data, status){
      });
  
}

    
    if ($("#progress").length === 0) {
      // inject the bar..
      $("body").append($("<div><b></b><i></i></div>").attr("id", "progress"));
      
      // animate the progress..
      $("#progress").width("101%").delay(800).fadeOut(1000, function() {
        //  remove 
        $(this).remove();
      });  
    }


    function resizeWindow() {
      let widthsidebar = $(window).width();
    
      if (widthsidebar >= 768) {
        $(".sidebar__navbar").addClass("active");
      } else {
        $(".sidebar__navbar").removeClass("active");
      }
    }
    
    $(window).resize(function () {
      resizeWindow();
    });
    
    $(".navabar_menu").click(function () {
      $(".sidebar__navbar").toggleClass("active");
    });
    
    $(".sidebar__navbar.active span").click(function () {
      $(".sidebar__navbar").toggleClass("active");
    });
    

