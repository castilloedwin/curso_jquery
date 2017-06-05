$(document).on('ready', function () {
	
	var $storage = !window.localStorage.getItem('profile') ? [] : JSON.parse( window.localStorage.getItem('profile') );
	var $card = '';

	var add = function (e) {

		e.preventDefault();

		var $profiles = {
			id: Math.floor( Math.random() * 10000 ),
			name: $('#name').val(),
			photo: $('#photo').val(),
			facebook: $('#facebook').val(),
			message: $('#message').val()
		};

		$storage.push($profiles);

		window.localStorage.setItem('profile', JSON.stringify($storage) );

		$('#speakers').append('<div class="col-md-4 col-sm-6 feature"><i id="'+$profiles.id+'">x</i><img src=" ' + $profiles.photo + ' " class="speaker-img" width="95" height="80"><h3>' + $profiles.name + '</h3><p>' + $profiles.message + '</p><ul class="speaker-social"><li><a href=" ' + $profiles.facebook + ' "><span class="ti-facebook"></span></a></li></ul></div>');

		notify( $profiles.name, null, $profiles.message );

		$(this)[0].reset();

	}

	$('.form-horizontal').on('submit', add);

	$storage.forEach(function (value, index) {
		$card += '<div class="col-md-4 col-sm-6 feature">';
		$card += '<i id="'+value.id+'">x</i>';
		$card += '<img src=" ' + value.photo + ' " class="speaker-img" width="95" height="80">';
		$card += '<h3>' + value.name + '</h3>';
		$card += '<p>' + value.message + '</p>';
		$card += '<ul class="speaker-social"><li><a href=" ' + value.facebook + ' "><span class="ti-facebook"></span></a></li></ul>';
		$card += '</div>';
	});

	$('#speakers').append($card);

	var remove = function (id, element) {
		$storage.forEach(function (profile, index) {
			if ( id == profile.id ) {
				$storage.splice(index, 1);
			}
		});

		$(element).parent().fadeOut('slow', function () {
			$(this).remove();
		});

		window.localStorage.setItem('profile', JSON.stringify($storage));
	}

	$('.feature').on('click', 'i', function () {
		var id = $(this).attr('id');
		remove(id, $(this));
	});



	// Notifications

	var notify = function (body, icon, title) {
		if ( !('Notification') in window ) {
			return 'Su navegador no soporta notificaciones';
		}
		
		var notification = new Notification(title, {
			body: body,
			icon: icon
		});

		setTimeout(function () {
			notification.close();
		}, 3000);
	}

	Notification.requestPermission().then(function (response) {
		console.log(response);
	});

});