const getMenu = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Graficas', url: 'graficas1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'RxJs', url: 'rxjs' }
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Medicos', url: 'medicos' },
            ]
        },
        {
            titulo: 'Clasificadores',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Monedas', url: 'monedas' },
            ]
        },
        {
            titulo: 'Reportes',
            icono: 'mdi mdi-file-multiple',
            submenu: [
                { titulo: 'Reportes Contabilidad', url: 'reportes' },
            ]
        }

    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: "Usuarios", url: 'usuarios' });
    }

    return menu;

}

module.exports = {
    getMenu
}