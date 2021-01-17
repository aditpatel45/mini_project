
$(document).ready(function () {
    


    $a = sessionStorage.getItem('username');
    $y="";
    $category = $(location).attr("href").split("=")[1];
    $answers = "";
    $weight = "";
    $uanswer = "";
    $res = 0;
    $total_ques = 0;
    $qnames = [];
    $non_att = 0;
    $correct = 0;
    $incorrect = 0;
    $total_marks = 0;
    $con_submit=false;
    $notes="";
    $.ajax({
        url: "http://localhost:3000/" + $category + "/",
        method: "GET",
        dataType: "JSON",
        async: false,

        success: (x) => {
           
            $total_ques = x.length;
            for($n=0;$n<x.length;$n++){
                $total_marks += parseInt(x[$n].weight);

            }
            $notes+="<h2> "+$category+" Quiz</h2>";
            $notes+="<h4>Important Notes</h4>";
            $notes+='<div> Total Question :'+$total_ques+'</div>';
            $notes+='<div> Time Limit :'+$total_ques+' Minutes</div> ';
            $notes+='<div> Total Marks :'+$total_marks+'<br> Each Question has different weightage</div>';
            $notes+='<div> Negative Marking : 25% Of the respective weightage of question </div>';
            $notes+='<div>Quiz Will be autosubmitted when time runs out</div>';
            $notes+='<div><button id="startquiz">Start Quiz</button></div>';
           $("#mainArticle").html($notes);


            }
        
    });

    // $("#startquiz").click(function(e){
    //     setInterval(function(){
    //         alert("hi");
    //     },parseInt($total_ques)*60);
        $("#startquiz").click(function(e){
            setTimeout(function(){
                // $con_submit=true;
                // $("#count").trigger("click");
                alert($total_ques);
                
            },parseInt($total_ques)*60000);
        
        e.preventDefault();
        
        $.ajax({
        url: "http://localhost:3000/" + $category + "/",
        method: "GET",
        dataType: "JSON",
        async: false,

        success: (x) => {
            $content = "";
            $total_ques = x.length;
            $non_att = $total_ques;
            for ($n = 0; $n < x.length; $n++) {
               // $total_marks += parseInt(x[$n].weight);
                if (($n + 1) % 3 == 0) {
                    $content += "<button onclick=jump(" + $n + ") id='qq" + ($n + 1) + "'>" + ($n + 1) + "</button><br>";
                }
                else {
                    $content += "<button onclick=jump(" + $n + ") id='qq" + ($n + 1) + "'>" + ($n + 1) + "</button>";

                }



            }
            $content += "<div id='flagged'>Flagged : 0</div><br>"
            $content += "<div id='non'>Not Attampted:</div><br>";
            $content += "<button id='count'>Submit</button>";
            $("#mainNav").html($content);
            $("#non").css("background-color", " rgb(10, 22, 71)");
            $("#non").css("color", "white");
            $("#non").css("margin-top", "100px");

            var student = "";
            $qcontent = "";
            //CONSTRUCTION OF ROWS HAVING 
            // DATA FROM JSON OBJECT 


            for (var i = 0; i < x.length; i++) {
                $answers += x[i].Answer + "  ";
                console.log(x[i].Answer);
                $weight += x[i].weight + "  ";
                $random = Math.floor(Math.random() * 3);
                // alert(x[i].image);
                if ($random == 0) {
                    $qcontent += "<div id='q" + (i + 1) + "'>" + (i + 1) + " " + x[i].question + "<label>Weight : " + x[i].weight + "</label><button onclick='flag(" + (i + 1) + ",this)' class='flag'>flag</button><button id='reset" + (i + 1) + "' class='reset'>Reset</button><br><br><label>";
                    $qcontent += "<input type='radio'name='q" + (i + 1) + "' value='" + x[i].Answer + "'>" + x[i].Answer + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option1 + "'>" + x[i].option1 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option2 + "'>" + x[i].option2 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option3 + "'>" + x[i].option3 + "</label><br><br></div>";

                    if(x[i].img!=undefined){
                        $qcontent += "<label> <img src='" + x[i].img + "'></img></div>";
                    }

                }
                if ($random == 1) {
                    $qcontent += "<div id='q" + (i + 1) + "'>" + (i + 1) + " " + x[i].question + "<label>Weight : " + x[i].weight + "</label><button onclick='flag(" + (i + 1) + ",this)' class='flag'>flag</button><button  id='reset" + (i + 1) + "' class='reset'>Reset</button><br><br><label>";
                    $qcontent += "<input type='radio'name='q" + (i + 1) + "' value='" + x[i].option3 + "'>" + x[i].option3 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option2 + "'>" + x[i].option2 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].Answer + "'>" + x[i].Answer + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option1 + "'>" + x[i].option1 + "</label><br><br></div>";

                    // if(x[i].img!=undefined){
                    //     $qcontent += "<label> <img src='" + x[i].img + "'></img></div>";
                    // }
                }
                if ($random == 2) {
                    $qcontent += "<div id='q" + (i + 1) + "'>" + (i + 1) + " " + x[i].question + "<label>Weight : " + x[i].weight + "</label><button onclick='flag(" + (i + 1) + ",this)'class='flag'>flag</button><button id='reset" + (i + 1) + "' class='reset'>Reset</button><br><br><label>";
                    $qcontent += "<input type='radio'name='q" + (i + 1) + "' value='" + x[i].option2 + "'>" + x[i].option2 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option3 + "'>" + x[i].option3 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option1 + "'>" + x[i].option1 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].Answer + "'>" + x[i].Answer + "</label><br><br></div>";

                    // if(x[i].img!=undefined){
                    //     $qcontent += "<label> <img src='" + x[i].img + "'></img></div>";
                    // }
                }
                if ($random == 3) {
                    $qcontent += "<div id='q" + (i + 1) + "'>" + (i + 1) + " " + x[i].question + "<label>Weight : " + x[i].weight + "</label><button onclick='flag(" + (i + 1) + ",this)'class='flag'>flag</button><button  id='reset" + (i + 1) + "' class='reset'>Reset</button><br><br><label>";
                    $qcontent += "<input type='radio'name='q" + (i + 1) + "' value='" + x[i].option1 + "'>" + x[i].option1 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].Answer + "'>" + x[i].Answer + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option3 + "'>" + x[i].option3 + "</label><br>";
                    $qcontent += "<label> <input type='radio'name='q" + (i + 1) + "' value='" + x[i].option2 + "'>" + x[i].option2 + "</label><br><br></div>";
                    // if(x[i].img!=undefined){
                    //     $qcontent += "<label> <img src='" + x[i].img + "'></img></div>";
                    // }

                }


            }

            // for($m=0;$m<x.length;$m++){
            //     $qcontent+=x[i].question+"<br>";

            // }
            $("#mainArticle").html($qcontent);
            $("#head").html($category + "<div id='time' style='float:right;font-size:medium;'>Remainig Time:</div>");



        },
        error: function (response) {
            console.log(response);
        }
    });



    $("#non").append($total_ques);
    for ($m = 0; $m < $total_ques; $m++) {
        $qnames.push("q" + ($m + 1));
    }
    console.log($qnames);

    // $.ajax({
    //     url: "http://localhost:3000/lit",
    //     method: "GET",
    //     dataType: "JSON",
    //     async: false,

    //     success: (x) => {
    //         var student = "";
    //         //CONSTRUCTION OF ROWS HAVING 
    //         // DATA FROM JSON OBJECT 
    //         for (var i = 1; i < x.length; i++) {
    //             $answers += x[i].Answer + "  ";
    //             console.log(x[i].Answer);
    //             $weight += x[i].weight + "  ";

    //         }



    //     },
    //     error: function(response) {
    //         console.log(response);
    //     }
    // });
    // $answers = $answers.split("  ");
    $answers = $answers.split("  ");
    $weight = $weight.split("  ");
    $answers.pop();
    $weight.pop();
    console.log($answers);
    console.log($uanswer);
    console.log($weight);
    console.log(typeof $answers);
    console.log($answers[0]);

    console.log($res);
    //   for (var n in answers)
    //    console.log(n);
    //  console.log(Object.values(answers));

    // for (var i = 0; i < answers.length; i++) {
    //     console.log("ho");
    //     for (var j = 0; j < answers.length; j++) {
    //         // console.log(answers[j]);
    //         //     // if (uanswer[i] == answers[j]) {
    //         //     //     alert("true");
    //         //     // } else {
    //         //     //     alert("false");
    //         //     // }

    //         // }
    //         // alert($uanswer[$i]);
    //         //alert(answers.includes("uil"));
    //         // if ($answers.includes($uanswer[$i])) {
    //         //     alert("done");
    //         //     $uanswer[$i] = "Correct";
    //         //     continue;



    //     }


    // }
    // console.log($uanswer);
    //"'" + "input[name=" + $ques[$i] + "]:checked" + "'"
    $(".reset").click((function () {

        //   $non_att = $total_ques;
        // for ($i = 0; $i < $qnames.length; $i++) {

        if ($("input[name=q" + $(this).attr("id").split("t")[1] + "]:checked").val() != undefined) {
            $("input[name=q" + $(this).attr("id").split("t")[1] + "]").prop("checked", false);
            $non_att++;
            $("#qq" + $(this).attr("id").split("t")[1]).css("background-color", "rgb(41, 12, 80)");
            $("#non").text("Non Attepted :" + $non_att);
        }
        else {
            alert("No option is selected");
        }


        // if ($("input[name=" + $qnames[$i] + "]:checked").val() != undefined) {


        //  $non_att--;

        //}

        // }
        //  $("#non").text("Non Attepted :" + $non_att);

    }));

    $("#count").click(function () {
       
        if (!$con_submit) {
        

            $con_submit=window.confirm("You have " + $non_att + " Question, Do you still want to submit?");
       
 
        
    }
    if($con_submit){
        
            
    
        $ans = "";

        for ($i = 0; $i < $qnames.length; $i++) {


            $uanswer += $("input[name=" + $qnames[$i] + "]:checked").val() + "  ";
            // alert($("#": checked).val0());
            // $ans += $("." + $ques[$i]).text();

        }
        $uanswer = $uanswer.split("  ");
        $uanswer.pop();
        console.log($uanswer);
        for ($i = 0; $i < $answers.length; $i++) {
            if ($uanswer[$i] == "undefined") {


                $("div[id=" + $qnames[$i] + "]").css("background-color", "rgba(128,128,128,0.6)");
                $("div[id=" + $qnames[$i] + "]").css("color", "white");
                $("div[id=" + $qnames[$i] + "]").append("Not Attampted :Correct Answer " + $answers[$i]);



            } else if ($answers[$i] == $uanswer[$i]) {
                $correct++;
                $res += parseInt($weight[$i]);
                $("div[id=" + $qnames[$i] + "]").css("background-color", "rgba(0,255,0,0.6)");
                $("div[id=" + $qnames[$i] + "]").append("Correct Answer");

            }
            else {
                $res -= parseInt($weight[$i] * .25);

                $("div[id=" + $qnames[$i] + "]").css("background-color", "rgba(255,0,0,0.6)");
                $("div[id=" + $qnames[$i] + "]").css("color", "white");
                $("div[id=" + $qnames[$i] + "]").append("Wrong Answer : Correct Answer  " + $answers[$i]);

                $incorrect++;


            }
            $(".reset").remove();
            $(".flag").remove();

        }
        $percenntage = (($res / $total_marks).toFixed(4) * 100);
        $("#mainNav").html("Result : " + $res + " Out of " + $total_marks + " <br>Percentage : " + $percenntage + "<br>Correct Ans:" + $correct + "<br>Wrong Ans:" + $incorrect + "<br>Attampted: " + ($total_ques - $non_att) + "<br>Not Attampted:" + $non_att);
        $("#mainNav").append("<br><button id='home'>Home</button>")
        $("#home").click(function(){
            window.location.replace("/mini-project-master/User Dashboard/html/userdashboard.html");
        })


        $username_s = $a;
        if ($username_s) {

            // values are not empty
            $.ajax({
               

                    method: "GET",
                    url: "http://localhost:3000/users",
                    async:false,
                    // contentType: "application/json; charset=utf-8",


                    success: function(data, status) {

                        e.preventDefault();
                

                        for ($i = 0; $i < data.length; $i++) {

                            if (data[$i].username == $username_s) {
                                $y = data[$i].id;
                                //alert("calling");
                              
                                break;
                                
                            }

                        }




                    },
                    error: function(data, status) {

                        alert('error');
                    },

                }) // success
        }

        
            // alert($z);
            if($category=="ent"){
                $.ajax({
                    type: "PATCH",
                    
                    url: "http://localhost:3000/users/" + $y,
                    dataType: 'json',
                    async:false,
       
                    data: {
                    
                        'ent' : $res+"/"+$total_marks
                    },
                    success: function(response) {
                        e.preventDefault();
                                        
    
                       
                    }
                })
    

            }
            if($category=="lit"){
                $.ajax({
                    type: "PATCH",
                    
                    url: "http://localhost:3000/users/" + $y,
                    dataType: 'json',
                    async:false,
       
                    data: {
                    
                        'lit' : $res+"/"+$total_marks
                    },
                    success: function(response) {
                        e.preventDefault();
                                        
    
                       
                    }
                })
    

            }
            if($category=="sports"){
                $.ajax({
                    type: "PATCH",
                    
                    url: "http://localhost:3000/users/" + $y,
                    dataType: 'json',
                    async:false,
       
                    data: {
                    
                        'sports' : $res+"/"+$total_marks
                    },
                    success: function(response) {
                        e.preventDefault();
                                        
    
                       
                    }
                })
    

            }
            if($category=="gk"){
                $.ajax({
                    type: "PATCH",
                    
                    url: "http://localhost:3000/users/" + $y,
                    dataType: 'json',
                    async:false,
       
                    data: {
                    
                        'gk' : $res+"/"+$total_marks
                    },
                    success: function(response) {
                        e.preventDefault();
                                        
    
                       
                    }
                })
    

            }
            if($category=="comp"){
                $.ajax({
                    type: "PATCH",
                    
                    url: "http://localhost:3000/users/" + $y,
                    dataType: 'json',
                    async:false,
       
                    data: {
                    
                        'comp' : $res+"/"+$total_marks
                    },
                    success: function(response) {
                        e.preventDefault();
                                        
    
                       
                    }
                })
    

            }
            
    }



    });

    $("input").change((function () {
        $non_att = $total_ques;

        for ($i = 0; $i < $qnames.length; $i++) {


            if ($("input[name=" + $qnames[$i] + "]:checked").val() != undefined) {


                $non_att--;
                $("button[id=qq" + ($i + 1) + "]").css("background-color", "green");
                $("button[id=qq" + ($i + 1) + "]").css("color", "white");


            }

        }
        $("#non").text("Non Attepted :" + $non_att);

    }));

    });



    

});


function jump(val) {
    val++;


    //$s = '#q' + val;
    // alert($s);
    // $('html,body,#mainArticle').animate({
    //     scrollTop: $('#q' + val + '').offset().top
    // }, 1000);
    // return false;
    // //1 
    // // $(window).scrollTop($('#q' + val + '').offset().top);
    //  alert('#q' + val);
    var element = document.getElementById('q' + val);
    element.scrollIntoView({
        behavior: 'smooth'
    });

}
var flagged = 0;
var preval = 0;
var flax = [];
function flag(val, x) {
    console.log(flax);
    var a = document.getElementById("qq" + val);
    if (flax[val] != 0) {
        flagged++;
        a.style.borderWidth = "5px";
        a.style.borderColor = "yellow";
        a.style.color = "red";
        x.innerHTML = "Unflag";
        flax[val] = 0;

    }
    else {
        flagged--;
        //  a.style.backgroundColor="rgb(41, 12, 80)";
        a.style.borderWidth = "0px";
        a.style.color = "white";
        x.innerHTML = "Flag";
        flax[val] = 1;

    }

    document.getElementById("flagged").innerHTML = "Flagged : " + flagged;


}



