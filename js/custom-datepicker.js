$(document).ready(function() {
    //bootstrap datepicker
    $(".datepicker-modal").datepicker({
        autoclose: false,
        daysOfWeekHighlighted: '06',
        multidate: 2
    });
    $(".datepicker-modal").on('changeDate', function(e) {
        dateAppend(e);
    });
    //
    addDatePickerIcon();
    addDayName();
    $(".datepicker-switch").parent().css("justify-content", "space-between");
    $(window).resize(function() {
        addDatePickerIcon();
        addDayName();
    });
});

//changing datepicker Icon
function addDatePickerIcon() {
    if ($(window).innerWidth() > 767) {
        $("#dateTimeModal .datepicker-modal .datepicker-days .table-condensed .next").html('<div class="img-box"><svg width="21" height="32" viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 30L18.0894 15.7307C18.5608 15.3126 18.5327 14.5678 18.031 14.1865L2 2" stroke="#39C8AF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>');
        $("#dateTimeModal .datepicker-modal .datepicker-days .table-condensed .prev").html('<div class="img-box"><svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 2L2.98784 16.2495C2.48724 16.6688 2.5163 17.4476 3.04675 17.8284L20 30" stroke="#39C8AF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>');
    } else {
        $("#dateTimeModal .datepicker-modal .datepicker-days .table-condensed .prev").html('<div class="img-box"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 8L10 12L14 16" stroke="#C2C5D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12.5" cy="12.5" r="12" stroke="#E7E7E7"/></svg></div>');
        $("#dateTimeModal .datepicker-modal .datepicker-days .table-condensed .next").html('<div class="img-box"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 8L15 12L11 16" stroke="#C2C5D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle r="12" transform="matrix(-1 0 0 1 12.5 12.5)" stroke="#E7E7E7"/></svg></div>');
    }
}
//adding days
function addDayName() {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekdaysshort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    if ($(window).innerWidth() > 767) {
        $("#dateTimeModal .datepicker-modal .datepicker-days .table-condensed .dow").each(function(i) {
            $(this).html(weekdays[i]);
        });
    } else {
        $("#dateTimeModal .datepicker-modal .datepicker-days .table-condensed .dow").each(function(i) {
            $(this).html(weekdaysshort[i]);
        });
    }
}

//date Append
var startDate = [];
var endDate = [];

function dateAppend(event) {
    var dateList = {
        date1: event.format('dd-mm-yyyy'),
        date2: event.format(' M ddth'),
        day: event.format('DD')
    };
    console.log(dateList);
    if (dateList.date1 === "") {
        startDate = [];
        endDate = [];
    } else {
        if (startDate.length === 0) {
            startDate.push(dateList);
        } else if (endDate.length === 0) {
            endDate.push(dateList);
        } else {
            if (JSON.stringify(startDate) === JSON.stringify([dateList])) {
                endDate = [];
            } else if (JSON.stringify(endDate) === JSON.stringify([dateList])) {
                startDate = [];
            } else {
                [startDate, endDate] = [endDate, startDate];
                endDate = [dateList];
            }
        }
    }
    if (startDate.length) {
        $("#activityFilterContent .start-date-filter").val(startDate[0].date1);
        $("#dateTimeModal .modal-header .start-date").html('<span class="selected-date"><span class="selected-day">' + startDate[0].day + '</span>' + startDate[0].date2 + '</span>');
    } else {
        $("#activityFilterContent .start-date-filter").val();
        $("#dateTimeModal .modal-header .start-date").html('From Date');
    }
    if (endDate.length) {
        $("#activityFilterContent .end-date-filter").val(endDate[0].date1);
        $("#dateTimeModal .modal-header .end-date").html('<span class="selected-date"><span class="selected-day">' + startDate[0].day + '</span>' + endDate[0].date2 + '</span>');
    } else {
        $("#activityFilterContent .end-date-filter").val();
        $("#dateTimeModal .modal-header .end-date").html('To Date');
    }
}
