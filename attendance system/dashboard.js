let endpoint = "http://localhost:3000/employees";
let destination = "http://localhost:8080/confirmation";



const tab1 =document.getElementById("tabs-1")
const tab2 =document.getElementById("tabs-2")
const tab3 =document.getElementById("tabs-3")
const tab4 =document.getElementById("tabs-4")
const tab5 =document.getElementById("tabs-5")
const tab6 =document.getElementById("tabs-6")


const allEmpTable = tab1.getElementsByTagName("tbody")[0]
const fullReportTable = tab2.getElementsByTagName("tbody")[0]
const lateTable = tab3.getElementsByTagName("tbody")[0]
const excuseTable = tab4.getElementsByTagName("tbody")[0]
const empolyeeBriefTable = tab5.getElementsByTagName("tbody")[0]
const waitTable = tab6.getElementsByTagName("tbody")[0]

const actionBtn = document.getElementById("actionBtn")


getBriefEmpolyee()
getWaitingEmpolyee()
getexcuseEmpolyee()
getlateEmpolyee()
getFullReport()
getAllEmpolyee()

async function getAllEmpolyee(){
   
    let allEmpolyee;
          await $.get(endpoint, async function(data){
              allEmpolyee = data;
              
              for (let i = 0; i < allEmpolyee.length; i++) {

                var allDataForAllEmptLate =  await  $.get(destination+"?username="+allEmpolyee[i].username+"&statusTime=true");
                var allDataForAllEmpExcuse = await $.get(destination+"?username="+allEmpolyee[i].username+"&type=2");
                var allDataForAllEmpAttendance = await $.get(destination+"?username="+allEmpolyee[i].username+"&type=1");


                    if(allEmpolyee[i].accepted == "true"){
                        allEmpTable.innerHTML += `
                        
                          <tr>
                                <td>${allEmpolyee[i].id}</td>
                                <td><a class="link" href="users/user_details.html?username=${allEmpolyee[i].username}&latecount=${allDataForAllEmptLate.length}&attendancecount=${allDataForAllEmpAttendance.length}&excusecount=${allDataForAllEmpExcuse.length}">
                                        ${allEmpolyee[i].first_name} ${allEmpolyee[i].last_name}
                                </a></td>
                                <td>${allEmpolyee[i].username}</td>
                                <td>${allEmpolyee[i].email}</td>
                                <td>${allEmpolyee[i].address}</td>
                                <td>${allEmpolyee[i].age}</td>
                                <td>${allDataForAllEmpAttendance.length}</td>
                                <td>${allDataForAllEmptLate.length}</td>
                                <td>${allDataForAllEmpExcuse.length}</td>
                          </tr>

                        `   
                    }
              }
              
        });
        return allEmpolyee;
}


async function getFullReport(){

    let fullReport;
            await $.get(endpoint, async function(data){
                fullReport = data;
                for (let i = 0; i < fullReport.length; i++) {
                var allDataForFullRepoertLate = await $.get(destination+"?username="+fullReport[i].username+"&statusTime=true");
                var allDataForFullRepoertExcuse = await $.get(destination+"?username="+fullReport[i].username+"&type=2");
                var allDataForFullReportAttendance = await $.get(destination+"?username="+fullReport[i].username+"&type=1");


                    
                    if(fullReport[i].accepted == "true"){
                        fullReportTable.innerHTML += `
                            <tr>
                                <td>${fullReport[i].first_name} ${fullReport[i].last_name}</td>
                                <td>${fullReport[i].username}</td>
                                <td>${fullReport[i].email}</td>
                                <td>${fullReport[i].address}</td>
                                <td>${fullReport[i].age}</td>
                                <td>${allDataForFullReportAttendance.length}</td>
                                <td>${allDataForFullRepoertLate.length}</td>
                                <td>${allDataForFullRepoertExcuse.length}</td>
                            </tr>

                        `   
                    }
                }
        });
        return fullReport;
}


async function getlateEmpolyee(){
    let lateEmpolyee;
            await $.get(endpoint, async function(data){
                lateEmpolyee = data;
                for (let i = 0; i < lateEmpolyee.length; i++) {
                var allDataForLate = await $.get(destination+"?username="+lateEmpolyee[i].username+"&statusTime=true");
                    if(lateEmpolyee[i].accepted == "true"){
                        lateTable.innerHTML += `
                        
                            <tr>
                                <td>${lateEmpolyee[i].first_name} ${lateEmpolyee[i].last_name}</td>
                                <td>${lateEmpolyee[i].username}</td>
                                <td>${allDataForLate.length}</td>
                            </tr>

                        `   
                    }
                }
        });
        return lateEmpolyee;
}

async function getexcuseEmpolyee(){
    let excuseEmpolyee;
            await $.get(endpoint, async function(data){
                excuseEmpolyee = data;
                for (let i = 0; i < excuseEmpolyee.length; i++) {
                var allDataForExcuse = await $.get(destination+"?username="+excuseEmpolyee[i].username+"&type=2");
                    if(excuseEmpolyee[i].accepted == "true"){
                        excuseTable.innerHTML += `
                        
                            <tr>
                                <td>${excuseEmpolyee[i].first_name} ${excuseEmpolyee[i].last_name}</td>
                                <td>${excuseEmpolyee[i].username}</td>
                                <td>${allDataForExcuse.length}</td>
                            </tr>

                        `   
                    }
                }
        });
        return excuseEmpolyee;

}

async function getWaitingEmpolyee(){
    let allData;
          await $.get(endpoint, function(data){
              allData = data;
              for (let i = 0; i < allData.length; i++) {
                    if(allData[i].accepted == "false"){
                        waitTable.innerHTML += `
                        
                          <tr>
                                <td>${allData[i].id}</td>
                                <td>${allData[i].first_name}</td>
                                <td>${allData[i].last_name}</td>
                                <td>${allData[i].email}</td>
                                <td>${allData[i].address}</td>
                                <td>${allData[i].age}</td>
                                <td><button data-id="${allData[i].id}" type="button" onClick="acceptEmpolyee.call(this)" id=actionBtn${allData[i].id} class="btn btn-success">Accept</button></td>
                          </tr>

                        `   
                    }
              }

        });
        return allData;
}

async function getBriefEmpolyee(){
    
    let briefData;
            await $.get(endpoint, async function(data){
                briefData = data;
                for (let i = 0; i < briefData.length; i++) {

                var allDataForBriefLate =  await  $.get(destination+"?username="+briefData[i].username+"&statusTime=true");
                var allDataForBriefExcuse = await $.get(destination+"?username="+briefData[i].username+"&type=2");
                var allDataForBriefAttendance = await $.get(destination+"?username="+briefData[i].username+"&type=1");


                    if(briefData[i].accepted == "true"){
                        empolyeeBriefTable.innerHTML += `
                        
                    <tr>
                            <td>${briefData[i].first_name} ${briefData[i].last_name}</td>
                            <td>${briefData[i].username}</td>
                            <td>${briefData[i].email}</td>
                            <td>${briefData[i].address}</td>
                            <td>${briefData[i].age}</td>
                            <td>${allDataForBriefAttendance.length}</td>
                            <td>${allDataForBriefLate.length}</td>
                            <td>${allDataForBriefExcuse.length}</td>
                    </tr>

                        `   
                    }
                }
        });
        return briefData;

    }

function getRandomPassword(){
    let randomPassword = Math.floor(100000 + Math.random() * 900000);
    return randomPassword;
}

function getRandomUsername(){

        var username = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++)
        username += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return username;
}

async function acceptEmpolyee(){
    let that = $(this).data("id");

    await $.get(endpoint, function(data){
        allData = data;
        for (let i = 0; i < allData.length; i++) {

              if(allData[i].id == that){
                allData[i].username = getRandomUsername();
                allData[i].password = getRandomPassword();
                allData[i].accepted = "true"
                $.ajax({  
                    url: endpoint+"/"+that,  
                    type: 'PUT',  
                    dataType: 'json',  
                    data: allData[i],  
                    success: function () { 
                        $(`#actionBtn${that}`).parents("tr").remove();
                        Email.send({
                            Host : "smtp.elasticemail.com",
                            Username : "systemattendance442@gmail.com",
                            Password : "FABDB15C1A4CBF99B3E257A5F282124EE54E",
                            To : `${allData[i].email}`,
                            From : "systemattendance442@gmail.com",
                            Subject : "confirmation email holding username and password for attendance system",
                            Body : `
                            <h4>User Name : ${allData[i].username}</h4>
                            <h4>Password : ${allData[i].password}</h4>
                            `
                        }) 
                        location.reload();
                    },  
                    error: function () {  
                        console.log('Error in Operation');  
                    }  
                });  
              }
        }
        
  });
}

document.getElementById("dash-logout").addEventListener("click", function(){
        localStorage.removeItem("authentication");
        location.href = "home.html"
})

if(!localStorage.getItem("authentication")){
    location.href = "access/access.html"
}

        
$(":text:eq(0)").keyup(function () {
    let data = $(this).val();
    $("table:eq(4) tbody tr").each(function () {
        let value = $(this).children("td").first().text();
        if (value.toLowerCase().indexOf(data.toLowerCase()) != -1) {
            $(this).show(750);
        } else {
            $(this).hide(750);
        }

    })

});

if ($("#progress").length === 0) {
      // inject the bar..
      $("body").append($("<div><b></b><i></i></div>").attr("id", "progress"));
      
      // animate the progress..
      $("#progress").width("101%").delay(800).fadeOut(1000, function() {
        // ..then remove it.
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
  