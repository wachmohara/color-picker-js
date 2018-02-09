# Color picker for javascript

### STEP1
- add HTML markup into appropriate place or anywhere you need;


### STEP3
- locate the css file into `<head>` of html

```HTML
<link rel="stylesheet" href="./css/ui-color-picker.css">
```


### STEP3

- locate the js file into buttom of this HTML markup  

``` HTML
<div class="ui-color-picker">
  <div class="wrapper">
    <div class="color-plane">
      <canvas id="canvas-plane" width="200" height="200"></canvas>
      <em id="color-ring"></em>
      <canvas id="canvas-bar" width="10" height="200"></canvas>
      <em id="thumb-ball"></em>
    </div>
    <div class="panel-result">
      <!-- <div id="color_show"></div> -->
      <label><input type="text" placeholder="R" class="color_input" value="" id="r_value"></label><br>
      <label><input type="text" placeholder="G" class="color_input" value="" id="g_value"></label><br>
      <label><input type="text" placeholder="B" class="color_input" value="" id="b_value"></label><br>
      <label><input type="text" placeholder="HEX" class="color_input" value="" id="fs-color-hash"></label>
    </div>
  </div>
</div>
<script src="js/ui-color-picker.js"></script>
```
