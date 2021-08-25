/*** @desc Unit: FIT140 Advanced Programming
           Visual Recogntion and text-to-speech conversion.

           The following file is the Clien side file.
           It gets triggers @class TimerObserver and @class clientListen
     @author Sanjay Sekar Samuel (25036335); Maxim Zaika (26437929); */

new TimerObserver(siofu,document).runServer;
$(function () {
  new clientListen(socket).listen;
});
