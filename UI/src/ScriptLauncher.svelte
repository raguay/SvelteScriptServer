<Header style="{style}" 
        pref="{pref}" 
        localIP={localIP} 
        showQR={showQR} 
/>
<div id="ScriptGrid" style="background-color: {style.backgroundColor}; color: {style.textColor};">
  {#each lists as list}
    <div class="row">
      {#each list as item}
        <Tile style="{style}" pref="{pref}" item="{item}" on:itemClicked="{(e) => { onClickHandler(e.detail); }}" />
      {/each}
    </div>
  {/each}
</div>

<style>
  :global(body) {
    padding: 0px;
    margin: 0px;
  }

  #ScriptGrid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50px;
    bottom: 0px;
    margin: 0px;
    padding: 10px;
    width: 100%;
  }
  
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
  }
</style>

<script>
  import { onMount } from 'svelte';
  import Tile from './components/Tile.svelte';
  import Header from './components/Header.svelte';

  // 
  // the list is a collection of items to create the tiles for
  // the user to select from. Each item has the following members:
  //
  // name          Name printed on the tile for the script
  // description   A description of what the script will do.
  // script        The command line program to launch
  // args          An array of arguments for the script
  // color         The color for the tile
  // textColor     The color of the text in the tile
  // height        The height of the tile
  // width         The width of the tile
  //

  export let lists;
  export let pref;
  export let style;

  let localIP;
  let showQR = true;

  onMount(async () => {
    //
    // Check to see if we are using an IP in the address already or not.
    //
    var hostname = window.location.hostname;
    if((hostname[0] >= '0')&&(hostname[0] <= '9')) {
      localIP = hostname;
      showQR = false;
    } else {
      localIP = await ip_local();
      showQR = true;
    }
  });

  async function ip_local() {
    if (!RTCPeerConnection) {
        throw new Error("Not supported.")
    }

    const peerConnection = new RTCPeerConnection({ iceServers: [] })

    peerConnection.createDataChannel('')
    peerConnection.createOffer(peerConnection.setLocalDescription.bind(peerConnection), () => { })

    peerConnection.addEventListener("icecandidateerror", (event) => {
        throw new Error(event.errorText)
    })

    return new Promise(async resolve => {
        peerConnection.addEventListener("icecandidate", async ({candidate}) => {
            peerConnection.close()
            
            if (candidate && candidate.candidate) {
                const result = candidate.candidate.split(" ")[4]
                if (result.endsWith(".local")) {
                    const inputDevices = await navigator.mediaDevices.enumerateDevices()
                    const inputDeviceTypes = inputDevices.map(({ kind }) => kind)

                    const constraints = {}

                    if (inputDeviceTypes.includes("audioinput")) {
                        constraints.audio = true
                    } else if (inputDeviceTypes.includes("videoinput")) {
                        constraints.video = true
                    } else {
                        throw new Error("An audio or video input device is required!")
                    }

                    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
                    mediaStream.getTracks().forEach(track => track.stop())
                    resolve(ip_local())
                }
                resolve(result)
            }
        })
    })
  }

  function onClickHandler(tile) {
    //
    // Tell the server to launch the script. Only the tile.item.script and 
    // tile.item.args need to be used for launching the script.
    //
    var lIP = '';
    if(showQR) {
      //
      // We are on the host system. Use localhost only.
      //
      lIP = 'localhost';
    } else {
      //
      // We are on another computer. Use the local network IP.
      //
      lIP = localIP;
    }
    fetch('http://' + lIP + ':3000/api/commandline', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        script: tile.item.script,
        args: tile.item.args
      })
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        tile.toggle()
      })
      .catch(function (err) {
        tile.toggle();
        console.log(err);
      });
  }
</script>
