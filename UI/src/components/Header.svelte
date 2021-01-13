<div id="header" style="background-color: {style.backgroundColor}; color: {style.textColor};" >
  <h2>Script Launcher</h2>
  {#if showQR}
    <div id='qrcode' 
         style="top: {showBtn ? '-500px' : '100px'};" 
         bind:this={QRDom}
         on:click={(e) => { ToggleBtn()}}
    ></div>
  {/if}
  {#if showBtn}
    <button id='qrbtn' on:click={(e) => {ToggleBtn()}}>
      Show QR Code
    </button>
  {/if}
</div>

<style>
  #header {
    display: flex;
    flex-direction: row;
    margin: 0px;
    padding: 5px;
    width:  100%;
    height: 50px;
    font-size: 16px;
    font-family: system-ui;
  }

  #qrcode {
    position: absolute;
    z-index: 5;
    left: 40%;
  }

  #qrbtn {
    margin: 5px;
    border-radius: 10px;
  }

  h2 {
    align-self: center;
    margin: auto;
  }
</style>

<script>
  export let pref;
  export let style;
  export let localIP;
  export let showQR;

  let QRDom;
  let showBtn = true;

  $: qrpre(localIP);

  function qrpre(tmpIP) {
    if(QRDom && showQR) {
      new QRCode(QRDom, "http://" + tmpIP + ":3000");
      showBtn = true;
    } else {
      showBtn = false;
    }
  }

  function ToggleBtn() {
    showBtn = !showBtn;
  }
</script>


