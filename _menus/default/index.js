const isMac = process.platform === 'darwin';
const CmdCtrl = isMac?"COMMAND":"CONTROL";

const flags = {
    isProjectOpen: false
}

const ary = [
    {
        label: 'File',
        submenu: [
            {
                label: "New",
                accelerator: `${CmdCtrl}+N`,
                action: function () {
                    this._closeAll();
                },
            },
            {
                label: "Open",
                accelerator: `${CmdCtrl}+O`,
                action: function () {
                    this._closeAll();
                },
            },
            {
                label: "Save",
                accelerator: `${CmdCtrl}+S`,
                action: function () {
                    console.log('YETH')
                    this._closeAll();
                },
                enabled: false
            },
            {
                label: "Save As",
                accelerator: `${CmdCtrl}+SHIFT+S`,
                action: function () {
                    this._closeAll();
                },
                enabled: flags.isProjectOpen
            },
            { type: 'separator' },
            isMac ? { role: 'close', action: function () { window.close(); } } : { role: 'quit', action: function () { window.close(); } },

        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: "Config",
                submenu: [
                    {
                        label: "General",
                    },
                    {
                        label: "Advanced",
                    },
                ]
            },
            {
                label: "Reload Window",
                accelerator: `${CmdCtrl}+R`,
                action: function () {
                    location.reload();
                },
            },
        ]
    },

    {
        label: 'Tools',
        submenu: [
            {
                label: "Import JSON",
            },
            {
                label: "Export JSON",
            },
            {
                label: "Export PNG",
            },
        ]
    },

    {
        label: 'Help',
        submenu: [
            {
                label: "About",
            },
            {
               type: "separator"
            },
            {
                label: "Update",
            },
        ]
    },
];

module.exports = {
    flags,
    ary
}