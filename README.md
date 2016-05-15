# gpio-gui
Raspberry Pi General input/ouput graphical user interface

Images and explanations of application features can be found at www.codexl.fi/data/gpioui/gpiodemo.php

This is a Django Framework based graphical user interface for Raspberry Pi GPIO handling.

Application allows users to connect to RPi quickly through any modern browser and start instantly creating Runs.

Runs are sets of configured pins with status of HIGH or LOW, depending on user decisions. 
All created Runs can be saved into the Django Database for later use, loaded when desired and deleted as wished

There are currently 3 modes that Runs can be executed: Step-by-step, run-through and run-with-delay.

Step-by-step requires user to click the RUN button pin after pin and allows complete control on the flow of the Run.

Run-through executes Run quickly with a default delay between pin activation of 100ms.

Run-with-delay takes a delay argument from the interface, which the user can set by herself. 
The delay is applied between every pin activation.

THIS IS A DJANGO APP ONLY

User must have a basic understanding of Django framwork, be able to create a running Django webpage and successfully install
this application into it.

All dependencies must be downloaded and included by the user themselves.

Hints on dependecy locations for application can be found in the header.html file.
Bootstrap and Bootstrap-touchspin css-files in the top part of header-file.
JQuery, Bootstrap and Bootstrap-touchspin javascript files in the botton part of header-file.

DEPENDENCIES

Django framework

Bootstrap framework

JQuery 2-2.3 library

Bootstrap-touchspin library
