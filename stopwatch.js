$(function () {
    // variables
    var mode = false;// app mode
    var timecounter = 0;// time counter
    var lapcounter = 0; // lap counter
    var action;//variables of set Interval
    var lapnumber = 0;// number of laps
        // min, secs, centisecs
    var timerMins, timerSecs, timerCentiSecs, lapMins, lapSecs, lapCentiSecs;
    
        // on app load show start and lap buttons
    hideshowbtns("#startbtn","#lapbtn")
            //click on start
    $("#startbtn").click(function () {
                
        //Mode:ON
        mode = true;
        // Show start and lap buttons
        hideshowbtns("#stopbtn", "#lapbtn")

        // start counter
        startaction();
    });
            // click on stop button
            $("#stopbtn").click(function(){
        // show resume button
        hideshowbtns("#resumebtn","#resetbtn");
        // stop counter
        clearInterval(action);
    });
    // Click resume Button
    $("#resumebtn").click(function () {
        
        // restarrt timer
        startaction();
        // show stop button
        hideshowbtns("#stopbtn","#lapbtn");
    });
            // click on reset button
            $("#resetbtn").click(function () {

                // relode
                location.reload();
       
            });
            // click on lap button
            $("#lapbtn").click(function () {

                // if Mode:ON then
                if (mode) {

                    // stop action
                    clearInterval(action);
                    // reset lap and print details
                    lapcounter = 0;
                    addLap();
                    // start action
                    startaction();
                }
            });
        // functions
    function hideshowbtns(x,y) {
        $(".controlbtn").hide();
        $(x).show();
        $(y).show();
    }
    // starting thr timer
    function startaction() {
        action = setInterval(function(){
            timecounter++;
            if (timecounter==100*60*100) {
                timecounter = 0;
            }
            lapcounter++;
            if (lapcounter==100*60*100) {
                lapcounter = 0;
            }
            updateTime();
        }, 10);
    }
    // convert timer to mins,sec and centisecs
    function updateTime() {
        // 1min = 60*100 centisecs = 6000centisecs
        timerMins = Math.floor(timecounter/6000);
        // 1sec = 100 centisecs
        timerSecs = Math.floor((timecounter%6000)/100);
        timerCentiSecs = Math.floor((timecounter % 6000) % 100);
        $("#min").text(format(timerMins));
        $("#sec").text(format(timerSecs));
        $("#msec").text(format(timerCentiSecs));
        
        lapMins = Math.floor(lapcounter/6000);
        lapSecs = Math.floor((lapcounter % 6000) / 100);
        lapCentiSecs = Math.floor((lapcounter % 6000) % 100);
        
        $("#lapmin").text(format(lapMins));
        $("#lapsec").text(format(lapSecs));
        $("#lapmsec").text(format(lapCentiSecs));
    }
    // formating number 
    function format(number) {
        if (number<10) {
            return '0' + number;
        }
        else {
                return number;
             }
    }
    // add lap
    function addLap() {
        lapnumber++;
        var lapDetails =
            '<div class="lap">' +

            '<div class="lapTitle">' + 'Lap ' + lapnumber + '</div>' +
            
                '<div class="lapTime">' +
                    '<span>' + format(lapMins) +'</span>:' +
                    
                    '<span>' + format(lapSecs) +'</span>:' +
                    
                    '<span>' + format(lapCentiSecs) +'</span>' +
                '</div>' +
                
            '</div>';
        $(lapDetails).prependTo("#laps");
    }
    

});
