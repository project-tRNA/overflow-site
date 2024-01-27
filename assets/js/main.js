/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Hack: Enable IE flexbox workarounds.
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Forms.

	// Hack: Activate non-input submits.
	$('form').on('click', '.submit', function (event) {

		// Stop propagation, default.
		event.stopPropagation();
		event.preventDefault();

		// Submit form.
		$(this).parents('form').submit();

	});

	// Sidebar.
	if ($sidebar.length > 0) {

		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function () {

				var $this = $(this);

				// External link? Bail.
				if ($this.attr('href').charAt(0) != '#')
					return;

				// Deactivate all links.
				$sidebar_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this
					.addClass('active')
					.addClass('active-locked');

			})
			.each(function () {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					initialize: function () {

						// Deactivate section.
						$section.addClass('inactive');

					},
					enter: function () {

						// Activate section.
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($sidebar_a.filter('.active-locked').length == 0) {

							$sidebar_a.removeClass('active');
							$this.addClass('active');

						}

						// Otherwise, if this section's link is the one that's locked, unlock it.
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function () {

			// If <=large, >small, and sidebar is present, use its height as the offset.
			if (breakpoints.active('<=large')
				&& !breakpoints.active('<=small')
				&& $sidebar.length > 0)
				return $sidebar.height();

			return 0;

		}
	});

	// Spotlights.
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',
			initialize: function () {

				// Deactivate section.
				$(this).addClass('inactive');

			},
			enter: function () {

				// Activate section.
				$(this).removeClass('inactive');

			}
		})
		.each(function () {

			var $this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;

			// Assign image.
			$image.css('background-image', 'url(' + $img.attr('src') + ')');

			// Set background position.
			if (x = $img.data('position'))
				$image.css('background-position', x);

			// Hide <img>.
			$img.hide();

		});

	// Features.
	$('.features')
		.scrollex({
			mode: 'middle',
			top: '-20vh',
			bottom: '-20vh',
			initialize: function () {

				// Deactivate section.
				$(this).addClass('inactive');

			},
			enter: function () {

				// Activate section.
				$(this).removeClass('inactive');

			}
		});

})(jQuery);

const getElementValueOr = function (el, name, def) {
	var list = el.getElementsByTagName(name)
	if (list.length < 1) return def
	return list[0].textContent
}

streamSaver.mitm = "https://mirai.mrxiaom.top/assets/res/mitm.html?version=2.0.0"

$refresh.onclick = async () => {
	$refresh.setAttribute("disabled", undefined)
	$start.setAttribute("disabled", undefined)
	$overflow.setAttribute("disabled", undefined)
	var miraiVersion = $mirai.options[$mirai.selectedIndex].value
	var versionList = []
	var githubCommits = []
	await fetch("https://mirai.doomteam.fun/versions", {cache: "no-store"})
		.then(resp => {
			if (resp.status == 200) {
				return resp.text()
			}
			return null
		}).then(text => {
			var xmlDoc = new DOMParser().parseFromString(text, "text/xml")
			var versions = xmlDoc.getElementsByTagName("version")

			for (var i = 0; i < versions.length; i++) {
				var item = versions.item(i);
				var content = item.textContent
				if (!content.startsWith(miraiVersion)) continue
				versionList.push(content)
			}
		})
	await fetch("https://api.github.com/repos/MrXiaoM/Overflow/commits", {cache: "no-store"})
		.then(resp => {
			if (resp.status == 200) {
				return resp.json()
			}
			return null
		}).then(json => {
			for (var i = 0; i < json.length; i++) {
				var obj = json[i]
				var sha = obj.sha
				var message = obj.commit.message
				var time = new Date(obj.commit.committer.date)

				var shortHash = sha.substring(0, 7)

				if (versionList.indexOf(miraiVersion + "-" + shortHash + "-SNAPSHOT") != -1) {
					githubCommits.push({ sha: sha, shortHash: shortHash, message: message, time: time })
				}
			}
			//console.log(githubCommits)
		})
	const dateToString = function (date) {
		var month = date.getMonth() + 1
		var day = date.getDate()
		var hour = date.getHours()
		var minute = date.getMinutes()
		if (month < 10) month = "0" + month
		if (day < 10) day = "0" + day
		if (hour < 10) hour = "0" + hour
		if (minute < 10) minute = "0" + minute
		return month + "/" + day + " " + hour + ":" + minute
	}
	$overflow.removeAttribute("disabled")
	$overflow.innerHTML = ""
	for (i = 0; i < githubCommits.length; i++) {
		var commit = githubCommits[i]
		var option = document.createElement("option");
		var version = miraiVersion + "-" + commit.shortHash + "-SNAPSHOT"
		option.value = version
		option.name = commit.sha
		option.text = dateToString(commit.time) + " " + commit.shortHash + " - " + commit.message.split('\n')[0]
		$overflow.add(option, null)
	}
	$overflow.onchange()
	$refresh.removeAttribute("disabled")
	$start.removeAttribute("disabled")
}
$overflow.onchange = () => {
	var hash = $overflow.options[$overflow.selectedIndex].name
	$checkOnGithub.href = "https://github.com/MrXiaoM/Overflow/commit/" + hash
}
$start.onclick = async () => {
	$refresh.setAttribute("disabled", undefined)
	$start.setAttribute("disabled", undefined)
	$overflow.setAttribute("disabled", undefined)
	$start.innerHTML = "正在获取快照版本"
	try {
		var mavenRepo = $repo.options[$repo.selectedIndex].value // "https://mirrors.huaweicloud.com/repository/maven"
		if (mavenRepo.endsWith("/")) mavenRepo = mavenRepo.substring(0, mavenRepo.length - 1)
		var miraiVersion = $mirai.options[$mirai.selectedIndex].value
		var overflowVersion = $overflow.options[$overflow.selectedIndex].value
		var overflowSnapshotVersion = overflowVersion

		//console.log(mavenRepo)
		//console.log(miraiVersion)

		await fetch("https://mirai.doomteam.fun/version/" + overflowVersion + "/maven-metadata.xml")
			.then(resp => {
				if (resp.status == 200) {
					return resp.text()
				}
				return null
			}).then(text => {
				var xmlDoc = new DOMParser().parseFromString(text, "text/xml")
				var versions = xmlDoc.getElementsByTagName("snapshotVersion")

				for (var i = 0; i < versions.length; i++) {
					var item = versions.item(i);
					var extension = getElementValueOr(item, "extension", "")
					var classifier = getElementValueOr(item, "classifier", "")
					var value = getElementValueOr(item, "value", "")
					if (extension == 'jar' && classifier == "all") {
						overflowSnapshotVersion = value
						break
					}
				}
			})

		if (overflowVersion == overflowSnapshotVersion) {
			window.alert("无法获取Overflow快照版本号")
			$start.removeAttribute("disabled")
			$refresh.removeAttribute("disabled")
			$overflow.removeAttribute("disabled")
			$start.innerHTML = "下载"
			return
		}
		$start.innerHTML = "正在下载"

		const fileStream = streamSaver.createWriteStream('overflow-' + overflowVersion + '.zip')
		const readableZipStream = new ZIP({
			start(ctrl) { },
			async pull(ctrl) {
				const downloadRemote = el => {
					let name = el.name
					return new Promise(resolve => {
						//console.log(el.url)
						fetch(el.url).then(resp => {
							if (resp.status == 200) {
								return () => resp.body
							}
							return null
						}).then(stream => {
							resolve({ name: name, stream: stream })
						})
					})
				}
				const plainFile = el => {
					let name = el.name
					return new Promise(resolve => {
						resolve({
							name: name, stream() {
								return new ReadableStream({
									start(ctrl) {
										ctrl.enqueue(new TextEncoder().encode(el.content))
										ctrl.close()
									}
								})
							}
						})
					})
				}
				let arr = [], remotes = [
					{ name: "content/overflow-core-all-" + overflowVersion + "-all.jar", url: "https://mirai.doomteam.fun/version/" + overflowVersion + "/overflow-core-all-" + overflowSnapshotVersion + "-all.jar" },
					{ name: "content/bcprov-jdk15on-1.64.jar", url: mavenRepo + "/org/bouncycastle/bcprov-jdk15on/1.64/bcprov-jdk15on-1.64.jar" },
					{ name: "content/mirai-console-" + miraiVersion + "-all.jar", url: mavenRepo + "/net/mamoe/mirai-console/" + miraiVersion + "/mirai-console-" + miraiVersion + "-all.jar" },
					{ name: "content/mirai-console-terminal-" + miraiVersion + "-all.jar", url: mavenRepo + "/net/mamoe/mirai-console-terminal/" + miraiVersion + "/mirai-console-terminal-" + miraiVersion + "-all.jar" }
				], plains = [
					{ name: "start.bat", content: "@echo off\njava -cp ./content/* net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader\npause" },
					{ name: "start.sh", content: "java -cp \"$CLASSPATH:./content/*\" net.mamoe.mirai.console.terminal.MiraiConsoleTerminalLoader" }
				]
				//console.log(remotes)
				//console.log(plains)
				remotes.forEach(el => {
					arr.push(downloadRemote(el))
				})
				plains.forEach(el => {
					arr.push(plainFile(el))
				})
				//console.log(arr)
				await Promise.all(arr).then(res => {
					//console.log(res)
					let nameMapList = []
					res.forEach(item => {
						let name = item.name
						const stream = item.stream
						let nameList = nameMapList.map(nameMap => nameMap.name)
						if (nameList.indexOf(name) == -1) {
							nameMapList.push({ name: name, cnt: 0 })
						} else {
							let nameItem = nameMapList.find(item => item.name == name)
							nameItem.cnt += 1
							//console.log(nameItem)
							let fileName = name.substring(0, name.lastIndexOf('.'))
							let prefix = name.substr(name.lastIndexOf('.'))
							//console.log(name)
							name = fileName + ("(" + nameItem.cnt + ")") + prefix
							//console.log(name)
						}
						if (item.stream) {
							let file = { name, stream }
							//console.log(file)
							ctrl.enqueue(file)
						}
					})
				})

				ctrl.close()
			}
		})

		// more optimized
		if (window.WritableStream && readableZipStream.pipeTo) {
			return readableZipStream.pipeTo(fileStream).then(() => {
				console.log('done writing')
				$start.removeAttribute("disabled")
				$refresh.removeAttribute("disabled")
				$overflow.removeAttribute("disabled")
				$start.innerHTML = "下载"
			})
		}

		// less optimized
		const writer = fileStream.getWriter()
		const reader = readableZipStream.getReader()
		const pump = () => reader.read()
			.then(res => res.done ? writer.close() : writer.write(res.value).then(pump))

		pump()
	} catch (e) {
		console.log(e)
		$start.removeAttribute("disabled")
		$refresh.removeAttribute("disabled")
		$overflow.removeAttribute("disabled")
		$start.innerHTML = "下载"
	}
}
