$(function () {
	$("body").css({
		fontFamily: "Arial, sans-serif",
		margin: "0",
		padding: "24px",
		background: "#f4f6f8",
		color: "#222"
	});
	$("#profile-card").css({
		padding: "24px",
		background: "white",
		border: "2px solid #ddd",
		position: "relative"
	});
	$("#profile-photo").css({
		width: "90px",
		height: "90px",
		display: "grid",
		placeItems: "center",
		marginBottom: "16px",
		background: "#3498db",
		color: "white",
		fontSize: "28px",
		fontWeight: "bold"
	});
	$(".controls").css("marginTop", "20px");
	$("h2").css({ fontSize: "18px", margin: "18px 0 8px" });
	$("button").css({ margin: "3px", padding: "8px 10px", cursor: "pointer" });
	$("#nickname-input").css({ display: "block", marginTop: "6px", padding: "8px" });
	$("#output").css({
		minHeight: "24px",
		marginTop: "24px",
		padding: "12px",
		background: "#fff",
		borderLeft: "4px solid #3498db"
	});

	$("#show-name").click(function () {
		$("#output").text($("#student-name").text());
	});

	$("#change-name").click(function () {
		$("#student-name").text("Milan Paudel");
	});

	$("#show-bio").click(function () {
		$("#output").text($("#student-bio").html());
	});

	$("#get-input").click(function () {
		$("#output").text($("#nickname-input").val());
	});

	$("#set-input").click(function () {
		$("#nickname-input").val("jQuery Pro");
	});

	$("#highlight-card").click(function () {
		$("#profile-card").addClass("highlighted").css({
			borderColor: "#f1c40f",
			boxShadow: "0 0 12px rgba(241, 196, 15, 0.6)"
		});
	});

	$("#remove-highlight").click(function () {
		$("#profile-card").removeClass("highlighted").css({
			borderColor: "#ddd",
			boxShadow: "none"
		});
	});

	$("#toggle-dark-mode").click(function () {
		$("#profile-card").toggleClass("dark-mode");
		$("#profile-card").css($("#profile-card").hasClass("dark-mode") ? {
			background: "#222",
			color: "white"
		} : {
			background: "white",
			color: "#222"
		});
	});

	$("#toggle-rounded").click(function () {
		$("#profile-photo").toggleClass("rounded");
		$("#profile-photo").css("borderRadius", $("#profile-photo").hasClass("rounded") ? "50%" : "0");
	});

	$("#red-background").click(function () {
		$("#profile-card").css("background", "#e74c3c");
	});

	$("#reset-background").click(function () {
		$("#profile-card").css("background", "white");
	});

	$("#hide-photo").click(function () {
		$("#profile-photo").hide("slow");
	});

	$("#show-photo").click(function () {
		$("#profile-photo").show("slow");
	});

	$("#toggle-bio").click(function () {
		$("#student-bio").toggle();
	});

	$("#fade-out-card").click(function () {
		$("#profile-card").fadeOut();
	});

	$("#fade-in-card").click(function () {
		$("#profile-card").fadeIn();
	});

	$("#fade-card").click(function () {
		$("#profile-card").fadeTo("slow", 0.5);
	});

	$("#slide-up-skills").click(function () {
		$("#skills-list").slideUp();
	});

	$("#slide-down-skills").click(function () {
		$("#skills-list").slideDown();
	});

	$("#slide-toggle-skills").click(function () {
		$("#skills-list").slideToggle();
	});

	$("#animate-card").click(function () {
		$("#profile-card").animate({ marginLeft: "200px" }, 1000)
			.animate({ marginLeft: "0px" }, 1000);
	});

	$("#profile-photo").mouseenter(function () {
		$(this).addClass("shadow").css("boxShadow", "0 8px 18px rgba(0, 0, 0, 0.3)");
	}).mouseleave(function () {
		$(this).removeClass("shadow").css("boxShadow", "none");
	});

	$("#nickname-input").keypress(function (event) {
		$("#output").text(event.key);
	});
});
