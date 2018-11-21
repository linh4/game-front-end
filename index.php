<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/timer.css">
  <link rel="stylesheet" href="css/formstyle.css">
  <link rel="stylesheet" href="pop/pop.css">
</head>
<body>

  <div class="row">
    <!-- <div class="col-md-3"></div> -->
    <div id="leaderboard-table" style="display: none"></div>

  </div>

  </div>
  <div class="container">
    <div class="row">
      <h1>Tic Tap Tone...</h1>
    <div class="col-md-3">

      <div class="button" id="start">
        <span>Start/Reset</span>
      </div>

      <br>

      <div class="button" id="quit">
        <span>Quit</span>
      </div>

      <div class="wrapper">
        <div class="pie spinner"></div>
        <div class="pie filler">
        </div>
        <div class="mask"></div>
        <div id="timer"></div>
      </div>

      <div class="button" id="boardBtn">
        <span>Leader Board</span>
      </div>

    </div><!-- end of col-3 -->

    <div class="col-md-7 col-md-offset-1">

      <div class="row-top">
        <div id="0" class="square clicked"></div>
      </div>

      <div class="row-middle">
        <div id="1" class="triangle clicked"></div>
        <div class="level">0</div>
        <div id="2" class="circle clicked"></div>
      </div>

      <div class="row-bottom">
        <div id="3" class="pacman clicked"></div>
      </div>

      <br>


      <div id="running">
        <img id="image" src="pop/popup.png" style="display:none">
      </div>

    </div><!-- end of col-7 -->
</div><!-- end of row -->

</div> <!-- end of container -->

<div id="instruction-box" style="display: none"></div>
<div id="name-box"  style="display: none">
  <div class="form-group">
    <p>Great Game! Enter your name:</p>
    <form>
      <div class="form-group">
        <input class="form-control form-control-lg" type="text" name="name" placeholder="Name...">
      </div><br>
      <div class="btn-group">
        <input class="btn btn-danger btn-sm" type="submit" value="submit">
        <input class="btn btn-warning btn-sm" type="cancel" value="cancel">
      </div>
    </form>
  </div>
</div><!-- end of form -->






  <script type="text/javascript" src="src/adapter.js"></script>
  <script type="text/javascript" src="src/pop.js"></script>
  <!-- <script type="text/javascript" src="src/instructions.js"></script> -->
  <script type="text/javascript" src="src/player.js"></script>
  <script type="text/javascript" src="src/index.js"></script>

</body>
</html>
