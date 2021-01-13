import ScriptLauncher from './ScriptLauncher.svelte';

var scriptList = [[
  {
    name: "Open fman",
    description: "Open a copy of the fman program.",
    script: "/Applications/fman.app/Contents/SharedSupport/bin/fman",
    args: ['&'],
    color: "lightgreen",
    textColor: "darkgreen",
    height: "70px",
    width: "30%"
  },
  {
    name: "Create Todos",
    description: "Create the todo list.",
    script: `/usr/bin/osascript `,
    args: ['-e', `'tell application id "com.runningwithcrayons.Alfred" to run trigger "Create Todays Todos" in workflow "com.customct.Todo"'`],
    color: "lightpink",
    textColor: "blue",
    height: "70px",
    width: "30%"
  },
  {
    name: "Center Current Window",
    description: "This will take the current window and center it on the screen using hammerspoon.",
    script: "/usr/local/bin/hs",
    args: ['-c', "'centerWindow()'"],
    color: "yellow",
    textColor: "black",
    height: "70px",
    width: "30%"
  }],[
  {
    name: "Open My Github",
    description: "This will open my GitHub page.",
    script: "/usr/bin/open",
    args: ['https://GitHub.com/raguay'],
    color: "darkgreen",
    textColor: "white",
    height: "100px",
    width: "100px"
  }]
]

var styles = {
  backgroundColor: "lightblue",
  textColor: "black"
}

var preferences = {
}

//
// Create the application.
//
const app = new ScriptLauncher({
	target: document.body,
	props: {
    lists: scriptList,
    pref: preferences,
    style: styles
	}
});

//
// Save a global copy for debugging.
// 
window.app = app;

export default app;
