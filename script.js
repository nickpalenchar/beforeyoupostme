var meditationMessages = {
    
    Blessed: [  ["Hey, I'm glad you're feeling blessed!",
                "Today you wear the hastag of #blessed.",
                "You're feeling blessed. Cool!",
                "It's not everyday someone feels so blessed."],
            
                ["But it's good to post it here rather than humblebragging.",
                "No point in humblebragging on social media though, they wouldn't understand."],
              
                "Luckily I'm a website so I'm not jealous :)"
             ],
    Annoyed: [  "You're annoyed?! Nuuuuuu :(",
              
                ["Maybe it's because everyone on Facebook is SO ANNOYINGGamIRiGHT??",
                 "Maybe someone was being rude today! (Why are people so rude?)",
                 "Is the universe against you today? I hate those days",
                 "Well there are those days where nothing is going our way..."],
              
                "Good thing you're here, though!",
              
                "Let's post this without the reprocussions of annoying people reading it"
             ],
            
    Depressed:[ "Oh man... I'm so sorry you're depressed",
                "Just remember there's nothing wrong with you, ok?",
                "Anyone can feel that way with the crazy world we live in",
                "But you can consider this your safe place :)",
                "Let's try to let some of that anxiety go, shall we?"
              ],
    Angry:      ["Who's making you angry? I'll beat 'em up!",
                 
                 ["Maybe not.. but I will take care of this status for you",
                  "Kidding, that's like posting an to Facebook--not helpful",
                  "Better idea, let's get meditative about it!",
                  "Nah I don't need to prove myself. Let's do the mature thing",
                  "Lol, we can be the bigger person here instead, right?"
                 ],
                 
                 "We allowed ourselves to be angry, let's allow ourselvs to release it..."
                ],
    
    Accomplished:   [   ["Congrats on your accomplishment!",
                         "All right! Achievement unlocked!",
                         "Good on you for feeling accomplished!!!",
                         "Feeling accomplished? FOUR FOR YOU GLEN COCO!!"
                        ],
                        
                        "But even feelings of accomplishment can be released here.",
                     
                        "Cause if we settle for this one, we won't be ambitious and accomplish more",
                     
                        "And there's always more to accomplish!!"
                    ],
    
    Emotional:  [   "It's okay, let it out!",
                    "Oh, right, you already did. Excuse me.",
                 
                    ["Good news, now you won't have to bottle those emotions up.",
                     "Like a virtual stress ball, posting hear will relieve what's on your mind.",
                     "Now the good part, we're gonna take a little moment for some peace"]
                ],
    
    Lonely:     [   "Ironically, if you're feeling lonely, you're not alone!",
                    
                    "Lonliness is a part of life. Ture story.",
                 
                    ["If you feel people on facebook are less lonely than you, you'd be surprised.",
                    "But those kids posting on Facebook does not count as being in company.",
                    "Just remember that \"this too shall pass.\""]
                ],
    
    generic: [["Well it seems like you have a lot on your mind",
                    "Goodness, you really need to let some steam out",
                    "seems like you have a lot to say",
                    "There's always something on our minds we need to let out.",
                    "That's quite the status you've typed up"],
              
              ["That's ok, it happens to all of us",
                    "But now that you've said it, we can keep moving on",
                    "Time to let these thoughts go and get a move on!",
                    "But there's something cathartic about releasing them into the (cyber)air",
                    "I think we can work with this."]
              ],
    final: ["Take a deep breath",
            "Visualize these feelings leaving your heavy mind...",
            "...and release them into oblivion",
            "Here we go!..."]
};
var successMessages = ["Your status has been \"posted.\" You can now focus on other things",
                       "You did the right thing by \"posting\" here.",
                       "You have been relieved of the burden of that stauts",
                       "Status posted. You no longer have to harbor those thoughts",
                       "Status posted. That wasn't so hard, was it?"];

$(document).ready(function() {
    $("#status-message").elastic();
});

function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function firePost() {
    var status = document.getElementById("status-message").value;
    
    if (status !== '') {
        exposeStatus();
    }else{
        alertBlankStatus();
    }
}

function setFeeling(feeling) {
    $("#menu-emotion").html(feeling);
}

function alertBlankStatus() {
    $("#alert-anchor").addClass("alert alert-danger");
    $("#alert-anchor").html("<strong>Oops!</strong> You didn't share your very important thought!");
}

//////////////////////////////////////////
// POSTING OF STATUS /////////////////////
//////////////////////////////////////////


function exposeStatus() {
    
    $(".btn-primary").prop("disabled", true);
    $(".checkbox-inline").prop("disabled", true);
    //generate submitted status
    $(function() {
        var status = document.getElementById("status-message").value;
        var statusSplit = status.split('').map(function(value) {
            return "" + value + "";
    }).
        join('');
        
        $(".textbox-class").html(statusSplit);
        
        if($("#meditation-mode").is(":checked")) {
            guidedMeditation();
        }
        else{
            postStatus();
        }

    });
}  

function guidedMeditation() {
    var emotion = $("#menu-emotion").html();
    
    if (emotion === "Add Feeling...") cycleThroughMeditationMessages("generic", false);
    else cycleThroughMeditationMessages(emotion, false);
}

function cycleThroughMeditationMessages(prop, final) {
    $("#alert-anchor").removeClass("alert-danger");
    $("#alert-anchor").addClass("alert alert-info");
    if(!final) {
        $("#alert-anchor").html("Thanks for posting here. Let's read your status...");
    }
    
    var messages = meditationMessages[prop]
        //console.log(messages)
        messages = messages.map(function(item) {
        var returnIndex = 0;
        if(Array.isArray(item)) {
           returnIndex = Math.floor(Math.random() * item.length);
           return item[returnIndex];
        }
        else return item;
    });
       
    var index = 0;
    var target = messages.length;
    
    var interval = setInterval(function(){
        $("#alert-anchor").html(messages[index]);
        if(index >= target) {
            clearInterval(interval);
            if(final) postStatus();
            else cycleThroughMeditationMessages("final", true);
        }
        else index++;
    },2400)
}

function postStatus() {
    
    $("#title").html("");
    
    var posting = setTimeout(function(){
        $("#alert-anchor").removeClass("alert-danger alert-info");
        $("#alert-anchor").addClass("alert alert-warning");
        $("#alert-anchor").html("Posting status...");
        $("#progress-anchor").addClass("progress-bar progress-bar-striped active");
    }, 400);

    var statusGoByeBye = setTimeout(function() {
        $(".textbox-class").fadeOut(1300);
        }, 1300);
    
    var posted = setTimeout(function(){
        $("#alert-anchor").removeClass("alert-warning alert-danger alert-info");
        $("#alert-anchor").addClass("alert alert-success");
        $("#progress-anchor").removeClass("progress-bar progress-bar-striped active");
        $("#alert-anchor").html('<span class="glyphicon glyphicon-ok"></span> &nbsp;<strong>Success.</strong> ' +
                                choose(successMessages) +
                                //' Your status has been posted. You can now focus on other things.<br/>'+
                                '<div class="align-center"><a target="_blank" href="about.htm">Learn More</a> | <a href="index.htm">'+
                                'Post Another</a></div>');
    },2400);
}
