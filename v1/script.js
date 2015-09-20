var meditationMessages = {
    
    angry: [],
    sad: [],
    
    generic: [["Well it seems like you have a lot on your mind",
                    "Goodness, you really need to let some steam out",
                    "seems like you have a lot to say",
                    "There's always something on our minds we need to let out."],
              
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

$(document).ready(function() {
    $("#status-message").elastic();
});

function firePost() {
    var status = document.getElementById("status-message").value;
    
    if (status !== '') {
        exposeStatus();
    }else{
        alertBlankStatus();
    }
}

function alertBlankStatus() {
    $("#alert-anchor").addClass("alert alert-danger");
    $("#alert-anchor").html("<strong>Oops!</strong> You didn't share your very important thought!");
}

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
    
    cycleThroughMeditationMessages("generic", false);
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
        $("#alert-anchor").html('<span class="glyphicon glyphicon-ok"></span> &nbsp;<strong>Success.</strong>' + 
                                ' Your status has been posted. You can now focus on other things.<br/>'+
                                '<div class="align-center"><a target="_blank" href="about.htm">Learn More</a> | <a href="index.htm">'+
                                'Post Another</a></div>');
    },2400);
}
