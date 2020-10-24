export const appList = [
  {
    name: 'Event',
    label: 'Event',
    css: 'fa fa-calendar fs-36 success--text',
    type: 'route',
    route: '/apps/event/list/Event/live and draft event',
    roles: ['$orguser'],
  },
  {
    name: 'Administration',
    label: 'Administration',
    css: 'fa fa-cogs fs-36 primary--text',
    type: 'route',
    route: '/apps/admin/organization/5cfe026f6ab042000c530105',
    roles: [],
  },
  {
    name: 'HelpCenter',
    label: 'Help-Center',
    css: 'fa fa-help-circle fs-36 warning--text',
    type: 'route',
    route: '/apps/help-center/',
    roles: ['$orguser'],
  },
  {
    name: 'Survey',
    label: 'Survey',
    css: 'survey-img',
    type: 'url',
    icon: 'https://survey.bitpod.io/favicon.ico',
    href: 'https://dev-survey.bitpod.io/',
    roles: ['$orguser'],
  },
  {
    name: 'seatmap',
    label: 'Seat Map',
    css: 'fa fa-grid-alt fs-36 primary--text',
    type: 'route',
    route: '/apps/seatmap/list/seatmaps/seatmaps',
    roles: ['$orguser'],
  },
]
