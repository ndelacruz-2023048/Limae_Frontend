export const LinksSidebar = [
  { name: "mdi:view-dashboard-outline", to:"/", roles: ["ADMIN", "STUDENT"] ,title:"Dashboard"},
  { name: "material-symbols-light:vr180-create2d", to:"/add-notice", roles: ["ADMIN"] ,title:"Agregar Noticia"},
  { name: "fluent:form-multiple-48-filled",to:"/dashboard-formulario", roles: ["ADMIN", "STUDENT"] ,title:"Formulario"},
  { name: "icon-park-outline:sales-report", to:"/dashboard-reportes", roles: ["ADMIN"] ,title:"Reportes"},
  { name: "mdi:book-outline", to: "/notice-list", roles: ["ADMIN"] ,title:"Noticias"},
]; 