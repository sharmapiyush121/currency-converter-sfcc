
var loadMask;
var actionFormWindow;
var transactionDetailWindow;
var $window = $(window);

function initEvents() {
	$('#euros, #symbol').on('input', function () {
		if ($("#euros").val().length === 0) {
			$("#other").val("");
			return;
		}
		var url = $("#ConverterForm").attr("action");
		var data = {
			'euro': $("#euros").val(),
			'symbol': $("#symbol").val()
		};
		$.ajax({
			url: url,
			data: data,
			success: function (response) {
				if (response.success) {
					$("#other").val(response.value);
				}
			}
		});
	});
}

$(document).ready(function () {
	initEvents();
});
