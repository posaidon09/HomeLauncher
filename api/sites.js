export default {
  columns: {
    Social: [
      {
        name: "Youtube",
        url: "https://youtube.com",
        icon: "TbBrandYoutube",
        color: "FF0000",
      },
      {
        name: "Reddit",
        url: "https://reddit.com",
        icon: "TbBrandReddit",
        color: "FF4500",
      },
      {
        name: "Tumblr",
        url: "https://tumblr.com",
        icon: "TbBrandTumblr",
        color: "34465D",
      },
    ],
    Coding: [
      {
        name: "Github",
        url: "https://github.com",
        icon: "TbBrandGithub",
        color: "7D7D7D",
      },
      {
        name: "RealtimeColors",
        url: "https://www.realtimecolors.com/?colors=ebe9fc-010104-3a31d8-020024-0600c2&fonts=Inter-Inter",
        icon: "TbPalette",
        color: "999999",
      },
      {
        name: "Stackoverflow",
        url: "https://stackoverflow.com",
        icon: "TbBrandStackoverflow",
        color: "F47F24",
      },
    ],
    Misc: [
      {
        name: "Gmail",
        url: "https://mail.google.com",
        icon: "TbMail",
        color: "D0F0F0",
      },
      {
        name: "Photopea",
        url: "https://photopea.com",
        icon: "TbPhotoEdit",
        color: "005500",
      },
      {
        name: "Manga",
        url: "https://ww4.readchainsawman.com",
        icon: "TbBook2",
        color: "9FF099",
      },
    ],
  },
  terminal: {
    sites: [
      {
        name: "youtube",
        url: "https://youtube.com",
      },
      {
        name: "reddit",
        url: "https://reddit.com",
      },
      {
        name: "tumblr",
        url: "https://tumblr.com",
      },
      {
        name: "gmail",
        url: "https://mail.google.com",
      },
      {
        name: "github",
        url: "https://github.com",
      },
      {
        name: "instagram",
        url: "https://instagram.com",
      },
      {
        name: "realtimecolors",
        url: "https://www.realtimecolors.com/?colors=ebe9fc-010104-3a31d8-020024-0600c2&fonts=Inter-Inter",
      },
      {
        name: "manga",
        url: "https://ww4.readchainsawman.com",
      },
    ],
    commands: [
      {
        name: "help",
        alias: "ls",
        description: "Lists all available commands",
        args: "none",
      },
      {
        name: "clear",
        alias: "clr",
        description: "Clears command history",
        args: "none",
      },
      {
        name: "google",
        alias: "g",
        description: "Opens a search query in google",
        args: "<query>",
      },
      {
        name: "calculate",
        alias: "calc",
        description: "Returns the result of a given mathematical formula",
        args: "<math equation>",
      },
      {
        name: "create",
        alias: "cmd",
        description: "Adds a new command to your list",
        args: "<command name> <url>",
      },
      {
        name: "visit",
        alias: "goto",
        description: "opens the given url",
        args: "<url>",
      },
      {
        name: "delete",
        alias: "rm",
        description: "removes a created command",
        args: "<bookmark>",
      },
    ],
  },
};
