define(['jquery',
],function($) {
	$("").on("click", function() {

	});

	function filterTasks(value) {
    $('.map-list .btn').each(function() {
      if(this.textContent.toLowerCase().indexOf(value) > -1) {
        $(this).show();
      } else {
        if ($(this).hasClass("active")) {
          $("#quickbooks_mapping_dialog .orange-button").attr("disabled", true).addClass("disabled");
        }
        $(this).hide().removeClass("active").find("input").attr("checked", false);
      }
    });
  }
});