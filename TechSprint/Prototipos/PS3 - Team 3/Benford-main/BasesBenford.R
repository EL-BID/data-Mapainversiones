

#======================================================================================
#==========================================Preparando las bases parsa Benford
#=====================================================================================


#====apertura de librerias


library(tidyverse)
library(tidyr)
library(sjmisc)
library(benford.analysis)
library(scales)
# 


#======Conectando a Base de Datos

#https://idb-air-techsprint.vercel.app/datasets/general-budget-information-on-investment-dom
#Información del Presupuesto General en Inversión

#====================================================================================================================
#========================Bases para Inversión

#----------Base 1: Proyectos de Inversión de República Dominicana (investment-projects.csv)
# https://idb-air-techsprint.vercel.app/datasets/investment-projects-dom

# URL del archivo CSV
url1 <- "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/PROYECTOS/CSV/2024/06/19/PROYECTOS.CSV"
url2 <- "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/PPTO_INVERSION_HACIENDA/CSV/2024/05/01/DatosAbiertosPresupuestoHacienda.csv"
url3 <- "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/PPTO_X_PROYECTO_INVERSION/CSV/2024/05/01/DatosAbiertosPresupuestoXProyInv.csv"  

# Leer los datos desde la URL
dfrdi_1<- read_csv(url1)
dfrdi_2<- read_csv(url2)
dfrdi_3<- read_csv(url3)

# Explorando
dplyr::glimpse(dfrdi_1)
dplyr::glimpse(dfrdi_2)
dplyr::glimpse(dfrdi_3)

#..................Reestructurando y Renombrando

#DOM 214

#------------Colocando el nombre del país, código y nombre del proyecto
dfrdi_1<-dfrdi_1 %>% 
         dplyr::mutate(Pais="República Dominicana",ISO3="DOM",Code="214",Nombre_Base="Proyectos de Inversión de República Dominicana (investment-projects.csv)")  
dfrdi_2<-dfrdi_2 %>% 
  dplyr::mutate(Pais="República Dominicana",ISO3="DOM",Code="214",Nombre_Base="Información del Presupuesto General en Inversión (presupuesto-de-inversion.csv)")  
dfrdi_3<-dfrdi_3 %>% 
  dplyr::mutate(Pais="República Dominicana",ISO3="DOM",Code="214",Nombre_Base="Información del Presupuesto General en Inversión y Los Proyectos de Inversión Pública relacionados (presupuesto-relacionado-a-proyectos-de-inversion.csv)")  

#------Renombrando

dfrdi_1.1<-dfrdi_1 %>%
         dplyr::select(Pais, ISO3,Code,Nombre_Base,codigosnip,AnioInicioProyecto,NombreProyecto,Sector,valorprogramado,valorejecutado) %>% 
         dplyr::mutate(Digito1=(str_sub(valorejecutado,1,1))) %>% 
         dplyr::rename(Pais="Pais",ISO3="ISO3",Code="Code",BaseN="Nombre_Base",Id_Snip="codigosnip",Año="AnioInicioProyecto",
                       Proyecto="NombreProyecto",Sector="Sector",ValorProgramado="valorprogramado",ValorEjecutado="valorejecutado",Digito="Digito1")

dfrdi_2.1<-dfrdi_2 %>%
  dplyr::select(Pais, ISO3,Code,Nombre_Base,CodigoSnip ,Año,Proyecto,Sector,ValorAprobado,ValorEjecutado) %>% 
  dplyr::mutate(Digito1=(str_sub(ValorEjecutado,1,1))) %>% 
  dplyr::rename(Pais="Pais",ISO3="ISO3",Code="Code",BaseN="Nombre_Base",Id_Snip="CodigoSnip",Año="Año",
                Proyecto="Proyecto",Sector="Sector",ValorProgramado="ValorAprobado",ValorEjecutado="ValorEjecutado",Digito="Digito1")

dfrdi_3.1<-dfrdi_3 %>%
  dplyr::select(Pais, ISO3,Code,Nombre_Base,CodigoSnip,AnioPresupuesto,nombreproyecto,NombreSector,ValorProyecto,ValorEjecutado) %>% 
  dplyr::mutate(Digito1=(str_sub(ValorEjecutado,1,1))) %>% 
  dplyr::rename(Pais="Pais",ISO3="ISO3",Code="Code",BaseN="Nombre_Base",Id_Snip="CodigoSnip",Año="AnioPresupuesto",
                Proyecto="nombreproyecto",Sector="NombreSector",ValorProgramado="ValorProyecto",ValorEjecutado="ValorEjecutado",Digito="Digito1")

#------Unificando

dfdomi<-rbind(dfrdi_1.1,dfrdi_2.1,dfrdi_3.1)

dplyr::glimpse(dfdomi)

#---Frecuencia

frq(dfdomi$Sector)

#--------Quitando duplicados y NAs

# Eliminar duplicados y NA
dfdomi <- dfdomi %>%
  distinct() %>%  # Eliminar duplicados
  na.omit()       # Eliminar NAs

#-------Recodificando Sector

dfdomi<-dfdomi %>%
  dplyr::mutate(Sector2 = case_when(
    Sector == "Actividades deportivas  recreativas  culturales y religiosas" ~ "Actividades deportivas, recreativas, culturales y religiosas",
    Sector == "Actividades deportivas, recreativas, culturales y religiosas" ~ "Actividades deportivas, recreativas, culturales y religiosas",
    Sector == "Agropecuaria  caza  pesca y silvicultura" ~ "Agropecuaria, caza, pesca y silvicultura",
    Sector == "Agropecuaria, caza, pesca y silvicultura" ~ "Agropecuaria, caza, pesca y silvicultura",
    Sector == "Asuntos económicos  comerciales y laborales" ~ "Asuntos económicos, comerciales y laborales",
    Sector == "Asuntos económicos, comerciales y laborales" ~ "Asuntos económicos, comerciales y laborales",
    Sector == "Justicia  Orden Público y Seguridad" ~ "Justicia, Orden Público y Seguridad",
    Sector == "Justicia, Orden Público y Seguridad" ~ "Justicia, Orden Público y Seguridad",
    Sector == "Minería  manufactura y construcción" ~ "Minería, manufactura y construcción",
    Sector == "Minería, manufactura y construcción" ~ "Minería, manufactura y construcción",
    Sector == "Protección del aire  agua y suelo" ~ "Protección del aire, agua y suelo",
    Sector == "Protección del aire, agua y suelo" ~ "Protección del aire, agua y suelo",
    TRUE ~ as.character(Sector)  # Mantener los demás valores sin cambios
  ))

frq(dfdomi$Sector2,sort.frq = "desc")

#------Ordenando la base

dplyr::glimpse(dfdomi)

dfdomi<-dfdomi %>% 
       dplyr::select(Pais, ISO3, Code, BaseN,Id_Snip,Año,Proyecto,Sector,Sector2,ValorProgramado,ValorEjecutado,Digito)

#----Exportando la base
write_excel_csv(dfdomi,"Bases/dfDOM_Inver.csv")
write_excel_csv(dfdomi,"Bases/dfDOM_Inver_Raw.csv")
#---Importando


#====================================================================================================================
#========================Bases para contrataciones


# URL del archivo CSV
urlc1 <- "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/EMERGENCIAS_PROCESOS_DE_COMPRAS/CSV/2024/06/24/emergencias_procesos.csv"
urlc2 <- "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/EMERGENCIAS_PROCESOS_DE_COMPRA_ARTICULOS/CSV/2024/06/25/emergencias_procesos_articulos.csv"
urlc3 <- "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/EMERGENCIAS_CONTRATOS_DE_COMPRAS/CSV/2024/06/24/emergencias_contratos.csv"  
urlc4 <- "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/EMERGENCIAS_CONTRATOS_DE_COMPRAS_ARTICULOS/CSV/2024/06/24/emergencias_contratos_artiuclos.csv"
urlc5 <- "https://air.portaljs.com/opendata/DOM/MAPAINVDB/OPENDATA/EMERGENCIAS_PROVEEDORES/CSV/2024/06/25/emergencias_proveedores.csv"  

# Leer los datos desde la URL
dfrdc_1<- read_csv(urlc1)
dfrdc_2<- read_csv(urlc2)
dfrdc_3<- read_csv(urlc3)
dfrdc_4<- read_csv(urlc4)
dfrdc_5<- read_csv(urlc5)

# Explorando
dplyr::glimpse(dfrdc_1)
dplyr::glimpse(dfrdc_2)
dplyr::glimpse(dfrdc_3)
dplyr::glimpse(dfrdc_4)
dplyr::glimpse(dfrdc_5)



#------------Colocando el nombre del país, código y nombre del proyecto
dfrdc_1<-dfrdc_1 %>% 
  dplyr::mutate(Pais="República Dominicana",ISO3="DOM",Code="214",Nombre_Base="Información del Presupuesto General de Emergencias - Lluvias 2023 - Decreto 585-23 y Huracán Fiona - Decreto 537-22 (procurement-process.csv)",Moneda="DOP")  
dfrdc_2<-dfrdc_2 %>% 
  dplyr::mutate(Pais="República Dominicana",ISO3="DOM",Code="214",Nombre_Base="Información del Presupuesto General de Emergencias - Lluvias 2023 - Decreto 585-23 y Huracán Fiona - Decreto 537-22 - nivel de objeto (procurement-process-item-level.csv)",Moneda="DOP") 
dfrdc_3<-dfrdc_3 %>% 
  dplyr::mutate(Pais="República Dominicana",ISO3="DOM",Code="214",Nombre_Base="Información del Presupuesto General de Emergencias - Lluvias 2023 - Decreto 585-23 y Huracán Fiona - Decreto 537-22 - Contratos (contract.csv)",Moneda="DOP") 
dfrdc_4<-dfrdc_4 %>% 
  dplyr::mutate(Pais="República Dominicana",ISO3="DOM",Code="214",Nombre_Base="Información del Presupuesto General de Emergencias - Lluvias 2023 - Decreto 585-23 y Huracán Fiona - Decreto 537-22 - Nivel de elemento de contratos (contract-item-level.csv)",Moneda="DOP") 


#-------------Renombrando

dfrdc_1.1<-dfrdc_1 %>%
  dplyr::select(Pais, ISO3,Code,Nombre_Base,CODIGO_PROCESO,ESTADO_PROCESO,CARATULA,Moneda,MONTO_ESTIMADO,FECHA_SUSCRIPCION) %>% 
  dplyr::mutate(Digito1=(str_sub(MONTO_ESTIMADO,1,1))) %>% 
  dplyr::rename(Pais="Pais",ISO3="ISO3",Code="Code",BaseN="Nombre_Base",Cod_Proceso="CODIGO_PROCESO",EstadoProceso="ESTADO_PROCESO", DescProceso="CARATULA",Moneda="Moneda",
                Monto="MONTO_ESTIMADO",Fecha="FECHA_SUSCRIPCION",Digito="Digito1")

dfrdc_2.1<-dfrdc_2 %>%
  dplyr::select(Pais, ISO3,Code,Nombre_Base,CODIGO_PROCESO,ESTADO_PROCESO,DESCRIPCION_ARTICULO,Moneda,PRECIO_TOTAL_ESTIMADO,FECHA_ACTUALIZACION) %>% 
  dplyr::mutate(Digito1=(str_sub(PRECIO_TOTAL_ESTIMADO,1,1))) %>% 
  dplyr::rename(Pais="Pais",ISO3="ISO3",Code="Code",BaseN="Nombre_Base",Cod_Proceso="CODIGO_PROCESO",EstadoProceso="ESTADO_PROCESO",DescProceso="DESCRIPCION_ARTICULO",Moneda="Moneda",
                Monto="PRECIO_TOTAL_ESTIMADO",Fecha="FECHA_ACTUALIZACION",Digito="Digito1")

dfrdc_3.1<-dfrdc_3 %>%
  dplyr::select(Pais, ISO3,Code,Nombre_Base,CODIGO_PROCESO,ESTADO_PROCESO,CARATULA,Moneda,VALOR_CONTRATADO,FECHA_ADJUDICACION) %>% 
  dplyr::mutate(Digito1=(str_sub(VALOR_CONTRATADO,1,1))) %>% 
  dplyr::rename(Pais="Pais",ISO3="ISO3",Code="Code",BaseN="Nombre_Base",Cod_Proceso="CODIGO_PROCESO",EstadoProceso="ESTADO_PROCESO",DescProceso="CARATULA",Moneda="Moneda",
                Monto="VALOR_CONTRATADO",Fecha="FECHA_ADJUDICACION",Digito="Digito1")

dfrdc_4.1<-dfrdc_4 %>%
  dplyr::select(Pais, ISO3,Code,Nombre_Base,CODIGO_PROCESO,ESTADO_PROCESO,DESCRIPCION_SUBCLASE,Moneda,MONTO_TOTAL,FECHA_ACTUALIZACION) %>% 
  dplyr::mutate(Digito1=(str_sub(MONTO_TOTAL,1,1))) %>% 
  dplyr::rename(Pais="Pais",ISO3="ISO3",Code="Code",BaseN="Nombre_Base",Cod_Proceso="CODIGO_PROCESO",EstadoProceso="ESTADO_PROCESO",DescProceso="DESCRIPCION_SUBCLASE",Moneda="Moneda",
                Monto="MONTO_TOTAL",Fecha="FECHA_ACTUALIZACION",Digito="Digito1")

#---Proveedores
dfrdc_4.2<-dfrdc_4 %>%
  dplyr::select(Pais, ISO3,Code,Nombre_Base,CODIGO_PROCESO,ESTADO_PROCESO,ESTADO_CONTRATO,DESCRIPCION_SUBCLASE,Moneda,MONTO_TOTAL,RPE,RAZON_SOCIAL,NUMERO_DOCUMENTO,FECHA_FIRMA_CONTRATO) %>% 
  #dplyr::mutate(Digito1=(str_sub(MONTO_TOTAL,1,1))) %>% 
  dplyr::rename(Pais="Pais",ISO3="ISO3",Code="Code",BaseN="Nombre_Base",Cod_Proceso="CODIGO_PROCESO",EstadoProceso="ESTADO_PROCESO",EstadoContrato="ESTADO_CONTRATO",DescProceso="DESCRIPCION_SUBCLASE",Moneda="Moneda",
                Monto="MONTO_TOTAL",RPE="RPE",RazonSocial="RAZON_SOCIAL",RNC="NUMERO_DOCUMENTO", Fecha="FECHA_FIRMA_CONTRATO")

dplyr::glimpse(dfrdc_4.2)

#----Exportando la base
write_excel_csv(dfrdc_4.2,"Bases/dfDOM_Proveedores_Raw.csv")


#------Unificando

dfdomc<-rbind(dfrdc_1.1,dfrdc_2.1,dfrdc_3.1,dfrdc_4.1)

dplyr::glimpse(dfdomc)

#----Exportando la base
write_excel_csv(dfdomc,"Bases/dfDOM_Compras_Raw.csv")

#---Frecuencia

frq(dfdomc$EstadoProceso)


#--------Quitando duplicados y NAs

# Eliminar duplicados y NA
dfdomc <- dfdomc %>%
  distinct() %>%  # Eliminar duplicados
  na.omit()       # Eliminar NAs

#----Exportando la base
write_excel_csv(dfdomc,"Bases/dfDOM_Compras.csv")
