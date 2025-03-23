# Home Launcher
These are two custom made browser home pages designed for simplicity and style.
## Style 1: Columns
![screenshot](https://i.postimg.cc/WzDz1ptn/image.png)
## Style 2: Terminal
![screenshot of the terminal style](https://i.postimg.cc/mrXFL58T/image.png)
# Setup
## Windows
<sup>I'm on linux so god knows if this works</sup>
Create a file called home.bat and put this in it
```bash
@echo off
cd "C:\Path\to\folder"
cmd /c "npm run dev"
```
then press win+R and run "shell:startup" to open the startup folder and drag the script you created into it
next go to whatever browser you use and look for any setting that lets you change your homepage and set it to http://localhost:5173
## Linux
The process of setting up a startup script changes depending on your Desktop Environment, but once you figure that out create a file called home.sh and put this in it
```bash
cd /home/user/path/to/folder && npm run dev
```
after that follow the same step as windows and set http://localhost:5173 as your homepage
