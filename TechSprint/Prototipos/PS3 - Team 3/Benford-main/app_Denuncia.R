
#======================================================================
#----------------------------- APPS Denuncia-BID
#====================================================================

#library(haven)
library(tidyverse)
library(shinyjs)


#------Kibreria de mapas
library(leaflet)
library(shiny)
library(shinydashboard)
library(rpivotTable)
library(stringr)



#-----------Base  


# Define UI for application that draws a histogram
ui <- dashboardPage( skin = "red",
                     
                     dashboardHeader(title="BID-Sprintech MapaInversiones/Citizen Complaint System CCS",titleWidth=800),
                     dashboardSidebar(
                       
                       #-----------Logo  
                       
                       
                       h2("País:EL SALVADOR/G3 (GCEJ)",align = "center",style = "color:yellow"),
                       a(img(src = "https://idb-air-techsprint.vercel.app/_next/image?url=%2Fidb-logo-es.png&w=640&q=75", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 60)),
                       a(img(src = "https://images.cvent.com/d10c93a6dad54e459d105ec69479f937/pix/36e56ab9650849e6a21416f6b090f81a!_!1b861f8d69ffe5d973f5abc32e918acd.png?f=webp", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 73)),
                       
                       hr(),
                       h2("Tema #3:",align = "center",style = "color:yellow"),
                       div("¿Cómo podemos mejorar la capacidad de gestión de la información de los gobiernos mediante aplicaciones de código reducido y herramientas de autoservicio para reforzar la toma de decisiones, la transparencia y sacar a la luz posibles casos de corrupción?",align = "center",style = "color:white"),
                       hr(),
                       div("El sistema de denuncia ciudadana es una potente herramienta tecnológica elaborada para que la ciudadanía y autoridades reporten 
               problemas a nivel comunitario o local para que sean resueltos de manera más efectiva",align = "center",style = "color:white")#,
                       
                       
                     ),
                     
                     
                     dashboardBody(
                       
                       # Ajustar el tamaño del contenedor del mapa usando CSS
                       tags$style(type = "text/css", "#myMap {height: calc(100vh - 80px) !important;}"),
                       
                       # Show a plot of the generated distribution
                       
                       fluidRow(
                         tabBox(title = p(strong("MENU PRINCIPAL")),width = 12,height = "2000px",    
                                
                                tabPanel("Mapa",
                                         leafletOutput("myMap")#,width = "100%", height = "90vh"),#,
                                         #box(title = "Registro", status = "primary",background="black",solidHeader = TRUE,collapsible = TRUE, DT::dataTableOutput("Base"),width = 14,height = "auto")
                                ),
                                tabPanel("Base", box(title = "Base de Datos", status = "danger",background="navy", solidHeader = TRUE,collapsible = TRUE, DT::dataTableOutput("Base2"),width = 14,height = "auto")),
                                tabPanel("Pivote Table",box(title = "Pivote Table", status = "danger", solidHeader = TRUE,collapsible = TRUE,rpivotTableOutput("Pivote",width = "20%", height = "100px"),width = 20,height = "1000px")))
                         
                         
                       )
                     )
                     
)






# --------------------------------------------------Server----------------------------------------------



server <- function(input, output) {
  
  

  # Renderizar el mapa
  output$myMap <- renderLeaflet({
    # Define los iconos personalizados
    icons <- awesomeIcons(
      icon = 'ios-close',
      iconColor = 'black',
      library = 'ion',
      markerColor = 'blue'
    )
    
    # Preprocesar los datos para los popups usando sapply
    popups <- sapply(1:nrow(base), function(i) {
      paste(sep = "<br/>",
            "<b> Ir al link para observar la Fotografía del Problema:</a></b>",
            img(src = base$FotoReferencia_1_URL[i],  # Utilizar el valor específico para cada fila
                class = "custom-logo",
                style = "margin-top: 0px; padding-left:36px;padding-bottom:5px",
                height = 320),
            "<b> Id del Problema:</a></b>",
            paste(data$Id[i]),
            "<b> Descripción del Problema:</a></b>",
            paste(base$PROBLEMA_01[i],base$PROBLEMA_02[i],base$PROBLEMA_03[i],base$PROBLEMA_04[i],
                  base$PROBLEMA_05[i], base$PROBLEMA_06[i]),
            "<b> Fecha del Problema:</a></b>",
            base$FECHA_DENUNCIA[i],
            "<b> Duración Denuncia (Días):</a></b>",
            data$PeriodoDias[i])
    })
    
    # Configuración del mapa
    leaflet(base) %>%
      addTiles(group = "OpenStreetMap") %>%  # OpenStreetMap por defecto
      addProviderTiles('OpenStreetMap.France', group = "OpenStreetMap.France") %>%
      addProviderTiles("OpenStreetMap.HOT", group = "OpenStreetMap.HOT") %>%
      addProviderTiles('Esri.WorldImagery', group = "Satélite") %>%  # Capa de satélite de Esri
      #addProviderTiles('CartoDB.DarkMatter', group = "CartoDB.DarkMatter") %>%  # Capa de mapa oscuro
      #addProviderTiles('Stamen.TonerLite', group = "Stamen.TonerLite") %>%  # Capa de mapa claro-oscuro
      setView(lat = 13.7941847, lng = -88.8965302, zoom = 10) %>%
      addAwesomeMarkers(lat = ~`_UBICACION_DENUNCIA_latitude`,
                        lng = ~`_UBICACION_DENUNCIA_longitude`,
                        popup = ~popups,  # Utilizar los popups preprocesados
                        label = ~paste(PROBLEMA_01, PROBLEMA_02, PROBLEMA_03, PROBLEMA_04, PROBLEMA_05, PROBLEMA_06),
                        icon = icons
      ) %>%
      # Añadir control de capas para seleccionar entre OpenStreetMap y Satélite
      addLayersControl(
        baseGroups = c("OpenStreetMap","OpenStreetMap.France", "OpenStreetMap.HOT", "Satélite"),
        options = layersControlOptions(collapsed = TRUE)
      )
  })

  
  #---------------------------------Lanzamiento de Base
  
  base<-read_delim("https://kf.kobotoolbox.org/api/v2/assets/aQWCaWdPejowRnATj3GsoV/export-settings/esqB6iBP2JP2yWYorQ3eYoF/data.csv", 
                  delim = ";", escape_double = FALSE, trim_ws = TRUE)
  
 
  attach(base)
  
  
  data<-base %>%
    dplyr::select(`_id`, AREA_PROBLEMA,FECHA_DENUNCIA,`_UBICACION_DENUNCIA_latitude`,
                  `_UBICACION_DENUNCIA_longitude`,PROBLEMA_01,OTRO_PROBLEMA_01) %>%
    dplyr::rename(Id="_id", Dimension="AREA_PROBLEMA",FechaHoraProblema="FECHA_DENUNCIA",Latitud="_UBICACION_DENUNCIA_latitude",
           Longitud="_UBICACION_DENUNCIA_longitude",Problema="PROBLEMA_01",OtroProblema="OTRO_PROBLEMA_01"
           ) %>%
    #mutate(FechaHoy=(as_date(today(tzone="America/El_Salvador"))))%>%
    mutate(FechaHoy=Sys.Date())%>%
    #mutate(FechaInicial=as_date(FechaHoy,tz="America/El_Salvador"))%>%
    mutate(FechaInicial=as.Date(FechaHoraProblema,"%d/%m/%y"))%>%
    mutate(PeriodoDias=as.numeric(FechaHoy-FechaInicial))
  
  
  
  #---------------------------------Lanzamiento del menu 
  output$menuitem <- renderMenu({
    menuItem("Menu item", icon = icon("calendar"))
  }) 
  
  #---------------------------------Lanzamiento de Base2
 
  
  output$Base2<- DT::renderDataTable(
    
    
    #DT::datatable({data2<-data[,c(1,8,9,14,15)]
    DT::datatable({data[,c(1,3,2,6,7,10)]#%>%filter(data$Muni=="0510")
      
      
    },
    options=list(lengthMenu=list(c(7,15,-1),c('5','15','Todo')),
                 pageLength=15),
    filter="top",
    selection="multiple",
    style='bootstrap' 
    
    ))
  
  #-------------------------------Lanzamiento del graf 2
  output$Pivote<-rpivotTable::renderRpivotTable({
    
    rpivotTable(data[,c(2,3,6,7,10)]#%>%filter(data$Muni=="0510")
    )
    
  }) 
  
  
  
  
}

# Run the application 
shinyApp(ui = ui, server = server)
