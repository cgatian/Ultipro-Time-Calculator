var startTime = (function () {
    var $t = document.getElementById('contentFrame').contentWindow.$;
    var workcells = $t('.workDetailBlock').find('td > input[value="WRK"][type="text"]');
    var lunchCells = $t('.workDetailBlock').find('td > input[value="LNCHP"][type="text"]');
    var combined = workcells.add(lunchCells);
    var allRows = $t('.workDetailBlock tr');

    var filteredRows = allRows.has(combined);
    var inputs = filteredRows.find('td:nth-child(4) input[type="text"]');
    var hours = 0;
    var minutes = 0;

    $t.each(inputs, function (i, v) {
        var time = v.value.split(":");
        hours += +parseInt(time[0]);
        minutes += parseInt(time[1]);
    });

    var lastClock = $t('.tsclocksui-on').last();
    var lastClockTD = lastClock.parent();
    if (lastClockTD.first().next().length === 0) {
        var re = / (\d{2})(\d{2})(\d{2})/;
        var lastClockTime = lastClock.find('input').first().val();
        var matches = re.exec(lastClockTime);
        var now = new Date();
        var lastClockDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDay(), matches[1], matches[2], matches[3]);
        var diff = now - lastClockDateTime;

        var hour_diff = Math.floor(diff / 1000 / 60 / 60);
        diff -= hour_diff * 1000 * 60 * 60;
        var min_diff = Math.floor(diff / 1000 / 60);

        hours += hour_diff;
        minutes += min_diff;
    }
    hours += Math.floor(minutes / 60);
    minutes = (minutes % 60);

    if (minutes < 10) {
        minutes = "0" + minutes.toString();
    }
    
    alert('Total Time: ' + hours + ':' + minutes);
});