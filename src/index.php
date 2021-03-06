<?php
    $meta = Opspot\Core\SEO\Manager::get();
?>

<?php
    if (!defined('__OPSPOT_CONTEXT__')) {
        define('__OPSPOT_CONTEXT__', 'app');
    }
?>
<html>
  <head>
    <base href="/" />

    <meta charset="utf-8">
    <link rel="icon" type="image/svg" href="<?php echo Opspot\Core\Config::_()->get('cdn_assets_url') ?>assets/logos/ops.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo Opspot\Core\Config::_()->get('cdn_assets_url') ?>assets/logos/ops-apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo Opspot\Core\Config::_()->get('cdn_assets_url') ?>assets/logos/ops-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo Opspot\Core\Config::_()->get('cdn_assets_url') ?>assets/logos/ops-16x16.png">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="google-site-verification" content="4e3-srEQdyDsdQQS2UO4dh9TTFgN6FioY-vmKmUxJhs">
    <meta name="google-site-verification" content="t9kPyE7765gdvY_fy3oxN4H9MzMDU_PRqYmBVfcytx0" />
    <!--fb instant articles-->
	  <meta property="fb:pages" content="322930081558507" />
    
    <?php
      foreach($meta as $name => $content){
        $name = strip_tags($name);
        $content = str_replace(['"'], '\'', $content);
        switch($name){
          case "title":
            echo "<title>$content</title>\n";
            break;
          case strpos($name, "smartbanner") !== FALSE:
            echo "<meta name=\"$name\" content=\"$content\">\n";
            break;
          case strpos($name, ":") !== FALSE:
            echo "<meta property=\"$name\" content=\"$content\">\n";
            break;
          default:
            echo "<meta name=\"$name\" content=\"$content\">\n";
        }
      }
    ?>

    <!-- inject:css -->
    <!-- endinject -->

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156194289-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-156194289-1');
    </script>
    		<!-- Google Tag Manager -->
		<script>(function (w, d, s, l, i) {
			w[l] = w[l] || []; w[l].push({
				'gtm.start':
					new Date().getTime(), event: 'gtm.js'
			}); var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
					'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-NNB24M3');
    </script>
		<!-- End Google Tag Manager -->
	<!-- Google Tag Manager -->
	<script>(function (w, d, s, l, i) {
			w[l] = w[l] || []; w[l].push({
				'gtm.start':
					new Date().getTime(), event: 'gtm.js'
			}); var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
					'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-WPNT8F6');</script>
	<!-- End Google Tag Manager -->
  <script data-ad-client="ca-pub-5036730119620262" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  </head>
  <body>


    <?php if (__OPSPOT_CONTEXT__ === 'embed'): ?>
        <!-- The embed component created in embed.ts -->
        <opspot-embed></opspot-embed>
    <?php else: ?>
        <!-- The app component created in app.ts -->
        <m-app class="">
          <div class="mdl-progress mdl-progress__indeterminate initial-loading is-upgraded">
            <div class="progressbar bar bar1" style="width: 0%;"></div>
            <div class="bufferbar bar bar2" style="width: 100%;"></div>
            <div class="auxbar bar bar3" style="width: 0%;"></div>
          </div>
        </m-app>
    <?php endif; ?>

      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNB24M3" height="0" width="0"
          style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->
      <!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPNT8F6"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->

      <script>
      // Fixes undefined module function in SystemJS bundle
      function module() {}
          </script>

    <!-- shims:js -->
    <!-- endinject -->

    <!-- libs:js -->
    <!-- endinject -->

    <script>
      <?php
          $opspot = [
              "OpspotContext" => __OPSPOT_CONTEXT__,
              "LoggedIn" => Opspot\Core\Session::isLoggedIn() ? true : false,
              "Admin" => Opspot\Core\Session::isAdmin() ? true : false,
              "cdn_url" => Opspot\Core\Config::_()->get('cdn_url') ?: Opspot\Core\Config::_()->cdn_url,
              "cdn_assets_url" => Opspot\Core\Config::_()->get('cdn_assets_url'),
              "site_url" => Opspot\Core\Config::_()->get('site_url') ?: Opspot\Core\Config::_()->site_url,
              "cinemr_url" => Opspot\Core\Config::_()->get('cinemr_url') ?: Opspot\Core\Config::_()->cinemr_url,
              "socket_server" => Opspot\Core\Config::_()->get('sockets-server-uri') ?: 'ha-socket-io-us-east-1.ops.doesntexist.com:3030',
              "navigation" => Opspot\Core\Navigation\Manager::export(),
              "thirdpartynetworks" => Opspot\Core\Di\Di::_()->get('ThirdPartyNetworks\Manager')->availableNetworks(),
              'language' => Opspot\Core\Di\Di::_()->get('I18n')->getLanguage(),
              'languages' => Opspot\Core\Di\Di::_()->get('I18n')->getLanguages(),
              "categories" => Opspot\Core\Config::_()->get('categories') ?: [],
              "stripe_key" => Opspot\Core\Config::_()->get('payments')['stripe']['public_key'],
              "recaptchaKey" => Opspot\Core\Config::_()->get('google')['recaptcha']['site_key'],
              "max_video_length" => Opspot\Core\Config::_()->get('max_video_length'),
              "features" => (object) (Opspot\Core\Config::_()->get('features') ?: []),
              "blockchain" => (object) Opspot\Core\Di\Di::_()->get('Blockchain\Manager')->getPublicSettings(),
              "sale" => Opspot\Core\Config::_()->get('blockchain')['sale'],
              "last_tos_update" => Opspot\Core\Config::_()->get('last_tos_update') ?: time(),
              "tags" => Opspot\Core\Config::_()->get('tags') ?: []
          ];

          if(Opspot\Core\Session::isLoggedIn()){
              $opspot['user'] = Opspot\Core\Session::getLoggedinUser()->export();
              $opspot['user']['rewards'] = !!Opspot\Core\Session::getLoggedinUser()->getPhoneNumberHash();
              $opspot['wallet'] = array('balance' => Opspot\Helpers\Counters::get(Opspot\Core\Session::getLoggedinUser()->guid, 'points', false));
          }

          if (__OPSPOT_CONTEXT__ === 'embed') {
              $opspot['OpspotEmbed'] = $embedded_entity;
          }
      ?>
      window.Opspot = <?= json_encode($opspot) ?>;
    </script>
  
  </body>
</html>
