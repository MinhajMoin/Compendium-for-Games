const electron = require('electron')
const url = require('url')
const path = require('path')
const express = require('express');

const { app, BrowserWindow } = electron;
let mainWindow;

function showWindow() {

    mainWindow = new BrowserWindow({})
    // mainWindow.setMenu(null);
    mainWindow.setTitle("HU - Compendium for games");
    mainWindow.setSize(800, 600, 1);
    mainWindow.setResizable(true)
    // mainWindow.toggleDevTools();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/pages/home.html'),
        protocol: 'file:',
        slashes: true
    }));
}

function sigOpenWindow() {
    const { ipcMain } = require('electron')
    ipcMain.on('asynchronous-message', (event, arg) => {
        var exeFile = openDialog();
        console.log("requesting fileupload window")
        event.sender.send('asynchronous-reply', exeFile[0])
        event.returnValue = 'pong'
    })
}
    

function openDialog() {
    var exeFile;
    const dialog = require('electron').dialog;
    exeFile = (dialog.showOpenDialog({
        title: 'Select Game Exe (.exe)', filters: [
            { name: 'Executable (.exe)', extensions: ['exe'] },
        ], properties: ['openFile']
    }));
    return exeFile;
}

app.on('ready', function () {
    showWindow();
    sigOpenWindow();
});



