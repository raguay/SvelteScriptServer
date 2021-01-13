<div class="{active ? 'inactive' : 'active'} scriptItem" 
     style="background-color: {item.color}; color: {item.textColor}; height: {item.height}; width: {item.width};" 
     on:click="{launchScript}"
>
  <p>{item.name}</p>
</div>

<style>
  .scriptItem {
    border-color: gray;
    border-radius: 10px;
    border-width: 3px;
    border-style: solid;
    margin: 10px;
    text-align: center;
    align-content: center;
  }

  .inactive {
    box-shadow: inset 5px 5px 5px grey;
  }

  .active {
    box-shadow: 5px 5px 5px grey;
  }
</style>


<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let pref;
  export let item;
  export let style;
  let active = false;

  function launchScript(e) {
    toggleActive();
    dispatch('itemClicked', {
      item: item,
      toggle: toggleActive
    });
  }

  function toggleActive() {
    active = !active;
  }
</script>


