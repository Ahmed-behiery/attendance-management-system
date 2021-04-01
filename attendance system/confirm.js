let destination = "http://localhost:8080/confirmation";
let endpoint = "http://localhost:3000/employees";

const confirmBtn = document.getElementById("confirm-btn");
const confirmForm = document.getElementById("confirmForm");
const jobStartTime =  moment("2021/02/01").format('YYYY/MM/DD'); 

async function getConfirmationData(){
    var allData = await $.get(destination+"?username="+localStorage.getItem("logineduser"));
    return allData
}

async function addConfirmation(newOne){
    let x = await await $.get(destination);
      newOne.id = parseInt(x.length)+1 ;
      newOne.type = 1;

      $.post(destination, newOne,
      function(data, status){
      });
}

confirmBtn.addEventListener("click", async function(e){
    e.preventDefault();
    let empolyeeUsername = new FormData(confirmForm);
    let empUsername = Object.fromEntries(empolyeeUsername.entries());

    let userConfirm = localStorage.getItem("logineduser")

    if(userConfirm == empUsername.empolyee_confirm){

        let countLate = 0;

        var currentdate = new Date(); 
        let formatDate = moment(currentdate).format('YYYY/MM/DD');

        let toDayDate = moment(currentdate).format('YYYY/MM/DD').split("/").map(Number);  
        let startDate = jobStartTime.split("/").map(Number);

        let x = moment(startDate);
        let y = moment(toDayDate);

        let differenceDay = y.diff(x, "days");

        var standerTime = moment('8:00am', 'h:mma');
        var arrivalTime = moment(currentdate, 'h:mma');

        var status = standerTime.isBefore(arrivalTime);


        let currDate = moment(new Date()).format('YYYY/MM/DD');
        var getDataConfirm = await $.get(destination+"?username="+localStorage.getItem("logineduser")+"&type=1&date="+currDate);

        
        if(getDataConfirm.length > 0) {
            document.getElementsByTagName("body")[0].innerHTML += `
            <div class="alert alert-warning alert-dismissible msg-show" role="alert">
                <p>
                   You have been loggedIn today Before :)
                </p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
       `;
        }else{
    
            let empolyeeConfirmation = {
                username: empUsername.empolyee_confirm
            }
    
            empolyeeConfirmation.statusTime = status;
            empolyeeConfirmation.dateAndTime = currentdate;
            empolyeeConfirmation.date = formatDate;

            addConfirmation(empolyeeConfirmation);
        }

        let allLoginedUser = await getConfirmationData();
   
        for (let i = 0; i < allLoginedUser.length; i++) {
            if(allLoginedUser[i].statusTime == "true"){
                countLate++;
            }

        }

        document.getElementsByClassName("employee-report")[0].style.display = "block";
        document.getElementsByTagName("body")[0].style.backgroundColor = "transparent";
        document.getElementsByClassName("confirm-form")[0].style.display = "none";
        
        await $.get(endpoint, async function(data){
            allEmpolyee = data;
                        
            
            for (let i = 0; i < allEmpolyee.length; i++) {
                  if(allEmpolyee[i].username == userConfirm){
                    var allDataForAddendance =  await  $.get(destination+"?username="+allEmpolyee[i].username+"&type=1");
                    var allDataForLate =  await  $.get(destination+"?username="+allEmpolyee[i].username+"&statusTime=true");

                        

                    document.getElementById("empolyee-fullName").innerHTML = `${allEmpolyee[i].first_name} ${allEmpolyee[i].last_name}`

                    document.getElementsByClassName("time-box")[0].innerHTML = `

                    <p>Emplyee Name:  ${allEmpolyee[i].first_name} ${allEmpolyee[i].last_name}</p>
                    <p>Attendance Time: ${moment(arrivalTime).format('h:mm a')}</p>
                    <button class="btn btn-danger" id="close" onClick="hidingAttendanceBox()">close</button>

                      `;
                      document.getElementsByClassName("attendance-data")[0].innerHTML = `
                      
                      <p>Attendance Times : ${allDataForAddendance.length}</p>
                      <p>Late Times : ${allDataForLate.length}</p>
                      <p>Absence Times : ${differenceDay - (allDataForAddendance.length)}</p>

                      ` ;
                      document.getElementsByClassName("empolyee-data")[0].innerHTML  = `
                      
                      <p>Name : ${allEmpolyee[i].first_name} ${allEmpolyee[i].last_name}</p>
                      <p>Age : ${allEmpolyee[i].age}</p>
                      <p>E-mail : ${allEmpolyee[i].email}</p>
                      <p>Attendance Times : ${allDataForAddendance.length}</p>
                      <p>Late : ${allDataForLate.length}</p>
                      `
                  }
            }
            
      });

    }else{
        document.getElementsByTagName("body")[0].innerHTML += `
            <div class="alert alert-danger alert-dismissible msg-show" role="alert">
                <p>
                    username not match with login username :( please try again .. !
                </p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
       `;
       confirmForm.reset();

    }
})


function hidingAttendanceBox(){
    $(".time-box").hide(500);
    document.getElementsByClassName("details-box")[0].style.height = "100vh";
}


document.getElementsByClassName("logout")[0].addEventListener("click", function (){
    window.location.pathname = "/home.html";
    localStorage.removeItem("logineduser");
})

document.getElementsByClassName("excuse")[0].addEventListener("click", async function (){
    let empolyee_excuse = {}

    let empolyees = await $.get(destination);

    empolyee_excuse.id = empolyees.length+1 ;
    empolyee_excuse.type = 2;
    empolyee_excuse.username = localStorage.getItem("logineduser");
    empolyee_excuse.dateAndTime = new Date();
    empolyee_excuse.statusTime = false;
    empolyee_excuse.date = moment(new Date()).format('YYYY/MM/DD');

    $.post(destination, empolyee_excuse);

    window.location.pathname = "/home.html";

})


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
})