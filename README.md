## Svelte Script Server

I was asked somewhere about what to do with an extra phone. I mentioned that I use 
one as a launch pad for running scripts on my main computer using a homebrewed solution. 
I was asked to share it. But, it is entertwined in another project of mine. So, I've 
pulled it out, refactored, and added a QR code to connect the phone. Now, anyone can 
use my system. But, I can't remember where and who asked me to do this. I hope he finds 
this.

This little project has two parts: an Expressjs server and the Svelte based 
UI. The server is in the `Server` directory and the user interface is in the 
`UI` directory. Once you download this project and install [nodejs](https://nodejs.org/en/), go to each directory and 
run the command:

```sh
npm install
```

Once all the dependencies are installed, come back to the root directory and 
run:

```sh
mask LaunchServer
```

You have to have [mask](https://github.com/jakedeichert/mask) installed for this to work. Or, open the `maskfile.md` 
and run the commands under the `LaunchServer` H2 heading. The `LaunchServer` script in the 
`maskfile.md` will first compile the UI files and then launch the nodejs Express server on 
port 3000.

When launched on the main computer, open your browser to `http://localhost:3000` in 
your web browser. This will show all the script launching buttons and a button in the top right 
corner that says `Show QR Code`. Using your phone or tablet, scan the QR code that 
appears when you press the button, and launch it in the browser for that device. You 
will have the same page loaded, 
but without the `Show QR Code` button. Your tablet or smart phone has to be 
on the same subnet in order to work.

This project isn't really complete, but it is functional. It is used to 
create buttons on a web page that executes scripts on the main computer. I 
use it all the time to launch scripts for adjusting window positions using 
hammerspoon, launching Alfred workfows, and anything else I need to do. I 
then load it onto my tablet or smart phone and keep it beside my computer. 
It makes a very convient way to launch scripts that I use a lot.

In order to use the scripts I've programmed already, you will need to have [Hammerspoon](https://www.hammerspoon.org/) 
and [Alfred](https://www.alfredapp.com/) with my Hammerspoon workflow and Taskpaper Todo 
workflow found [here](https://github.com/raguay/MyAlfred).

In order to customize the buttons, you need to edit the `ScriptList` structure 
in the `main.js` file in the UI. That structure contains the contents of the 
button and the information needed to lauch scripts. I left a few to give you 
an example of how I use it.

Even though my examples will only work on a Mac, you can use this on any system 
that supports nodejs. Let me know how you make use of this system.

## Todo

This is part of a larger project of mine. Therefore, as I upgrade it there, 
I'll be upgrading here as well. Currently it needs:

- Graphic customizer instead of manualling changing the program
- Saving and retreiving the defaults from a file
- Make the UI pretty
