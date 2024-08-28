#======================================================================
#----------------------------- APPS Benford-Test DEMO
#====================================================================

library(shiny)
library(shinydashboard)
library(shinyjs)
library(dplyr)
library(benford.analysis)
library(tidyverse)
library(rpivotTable)
library(tidyr)
library(sjmisc)
library(scales)
library(shinythemes)
library(plotly)
library(knitr)
library(kableExtra)
library(rmarkdown )
library(bslib)

# install.packages("devtools") # run this to install the devtools package
#devtools::install_github("carloscinelli/benford.analysis", build_vignettes = TRUE)

#=============================================================================================

#Base resumen
dfdomi<-read_csv("dfDOM_Inver.csv")
#Base resumen
dfdomc<-read_csv("dfDOM_Compras.csv")
#Base resumen
dfdomp<-read_csv("dfDOM_Proveedores_Raw.csv")

#================================================================================================

# Define UI for application that draws a histogram
ui <- dashboardPage( skin = "blue",
                     
                     dashboardHeader(title="BID-Sprintech MapaInversiones",titleWidth=800),
                     dashboardSidebar(
                       
                       #-----------Logo
                       
                       
                       h2("País:EL SALVADOR/G3 (GCEJ)",align = "center",style = "color:yellow"),
                       a(img(src = "https://idb-air-techsprint.vercel.app/_next/image?url=%2Fidb-logo-es.png&w=640&q=75", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 60)),
                       a(img(src = "https://images.cvent.com/d10c93a6dad54e459d105ec69479f937/pix/36e56ab9650849e6a21416f6b090f81a!_!1b861f8d69ffe5d973f5abc32e918acd.png?f=webp", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 73)),
                       hr(),
                       h2("Tema #3:",align = "center",style = "color:yellow"),
                       div("¿Cómo podemos mejorar la capacidad de gestión de la información de los gobiernos mediante aplicaciones de código reducido y herramientas de autoservicio para reforzar la toma de decisiones, la transparencia y sacar a la luz posibles casos de corrupción?",align = "center",style = "color:white"),
                       hr(),
                       h4("Aplica para Inversión Sectorial:",align = "center",style = "color:yellow"),
                       
                       selectInput("sector", "Seleccione el Sector Inversión:",choices = unique(dfdomi$Sector2)),
                       selectInput("filtro", "Filtre dígito en Base de Datos:",choices = unique(dfdomi$Digito )),
                       #actionButton("calcular", "Calcular Ley de Benford")
                       hr(),
                       h4("Aplica para Procesos Compras:",align = "center",style = "color:yellow"),
                       
                       selectInput("estado", "Seleccione Estado Compra:",choices = unique(dfdomc$EstadoProceso)),
                       selectInput("filtro2", "Filtre dígíto en Base de Datos:",choices = unique(dfdomc$Digito ))
                       #actionButton("calcular", "Calcular Ley de Benford")
                       
                     ),
                     
                     
                     dashboardBody(
                       
                       
                       # Show a plot of the generated distribution
                       
                       fluidRow(
                         tabBox(title = p(strong("MENU PRINCIPAL")),width = 14,height = "2000px",
                                
                                tabPanel("Referencia", a(img(src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaiR5Sg6LFR6-ttPwL7S3aCK0UHdOLrXwKXA0toUbKX_Qy_4N8DSLbQbRVuhdB1yij1KU&usqp=CAU", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 260)),
                                         
                                         
                                         h1("1.0 Ley de Benford"),
                                         p("Retomado de la Tesis UNAM Propuesta Metodológica para Utilizar la Ley de Benford en la Investigación Forense en Resultados Electorales"),
                                         
                                         h3("1.1 Contexto Histórico"),
                                         p("El logaritmo es una herramienta matemática que facilita que una opera-
ción de potencias se convierta en una multiplicación, y las multiplicaciones
en sumas. Por sus ventaja en simplificar los cálculos, cuando se descubrieron
en el siglo XVII, fueron rápidamente adoptados por científicos, ingenieros,
banqueros, además de otros profesionales; quienes entre sus instrumentos
cotidianos de trabajo utilizaban tablas con los valores logarítmicos.
En 1881, el matemático y astrónomo Simón Newcomb se percató que las
tablas logarítmicas, –impresas en libros disponibles en bibliotecas– mostraban
mayor desgaste en las primeras páginas que en las últimas. Es decir, que las
hojas relacionas con los primeros dígitos (e.i. 1, 2, 3) se encontraban en
peores condiciones que los folios de los últimos dígitos (i.e. 7, 8, 9). Sin
importar el campo de uso, el mismo patrón de deterioro lo mostraba el libro
consultado por el astrónomo que el contador. Por este simple hecho, él dedujo
que los dígitos iniciales muestran una diferente probabilidad de ocurrencia
comparativa. En otras palabras, él conjeturó que el dígito 1 aparece con
mayor frecuencia, seguido del 2, hasta el 9 que es el menos frecuente.
De este razonamiento Newcomb manifestó verbalmente una relación o ley
logarítmica, que se puede enunciar en términos modernos como: «la ley de
probabilidad de la ocurrencia de números es tal que las mantisas de sus loga-
ritmos son equiprobables». Sin embargo, por mucho tiempo esta observación
sólo fue una curiosidad matemática para algunos especialistas en la materia.
En 1938, el físico e ingeniero Frank Albert Benford Jr. (quien trabajó pa-
ra la compañía General-Electric) observó el mismo fenómeno en las tablas de ogaritmos; y emprendió un registro ingente de datos. Él obtuvo 20,229 nú-
meros agrupados en 20 muestras de gran diversidad, entre las que se encon-
traban: áreas fluviales, constantes, magnitudes físicas y químicas, funciones
matemáticas, poblaciones en ciudades, datos financieros, promedios de la liga
americana de baseball, incluso números de direcciones de personas. A par-
tir de tales resultados empíricos Benford postuló una «ley de los números
anómalos». Sin embargo, Benford, sólo alcanzó a describir la relación, sin
profundizar por las razones, mecanismos o causas de tal comportamiento,
por lo que por mucho tiempo sólo se contaba con esta teoría de caja negra.
En 1961, el matemático Roger Pinkham aportó una explicación a esta
relación, su reflexión se basó en que realmente existe una ley de frecuencias
de dígitos que debe ser universal. Tanto si se calcula los precios entre dis-
tintas divisas, o si se mide la longitud entre diferentes sistemas métricos; en
todos estos casos, las proporciones de frecuencias de dígitos deberían ser las
mismas. Así, la distribución de las frecuencias de dígitos debía ser invariante
frente a cambios de escala; y que esta constituía a la ley de Benford. Boy-
le, en 1994, demostró que si los datos analizados se construyen a partir de
multiplicaciones y cocientes de variables aleatorias provenientes de diversas
fuentes, también satisfacen la antes mencionada ley"),
                                         
                                         
                                         h3("1.2 Concepto de la Ley de Benford"),
                                         p("La Ley de Benford, también conocida como la Ley del Primer Dígito, es un fenómeno matemático que describe la distribución de los dígitos en muchos conjuntos de datos numéricos. Descubierta inicialmente por el astrónomo y matemático Simon Newcomb en 1881 y popularizada por el físico Frank Benford en 1938, esta ley ha demostrado ser sorprendentemente precisa en la predicción de la frecuencia con la que ciertos dígitos aparecen en posiciones específicas dentro de números de la vida real.
                                         Aunque Simon Newcomb fue el primero en observar el fenómeno, fue Frank Benford quien lo estudió y lo formalizó en su artículo de 1938 titulado 'The Law of Anomalous Numbers'. Benford, un físico estadounidense, notó que en muchas tablas de datos reales, el número 1 aparecía como el primer dígito con mucha más frecuencia que otros números.La Ley de Benford establece que en muchos conjuntos de datos numéricos, el primer dígito d (donde d va de 1 a 9) no se distribuye uniformemente, sino que sigue una distribución logarítmica. Según la ley, el dígito 1 aparecerá como el primer dígito aproximadamente el 30% del tiempo, mientras que el dígito 9 aparecerá solo alrededor del 5% del tiempo."),
                                         br(),
                                         
                                         h3("1.3 Fórmula Matemática"),
                                         p("En particular, la frecuencia relativa P que caracteriza a la
ley de Benford para el primer dígito se describe como la probabilidad de que un dígito aparezca como el primer dígito 
                                         en un conjunto de datos que sigue la Ley de Benford se puede expresar mediante la siguiente fórmula matemática:"),
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/XMQeDvHeYRGzSffiESlYRSbylOvSCCaWyOLKo4YYZC0.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 60)),
                                         
                                         p("de este modo, el dígito 1 muestra una probabilidad de 0.301 mientras que
el dígito 9 muestra una probabilidad de tan sólo 0.0458. Las probabilidades
restantes en un cuadro más adelante, donde se señalan las distribuciones de
la ley de Benford para diferentes dígitos.
Ahora, la distribución teórica que caracteriza la ley de Benford para el
segundo dígito se describe mediante la siguiente expresión:"),
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/0YoYlRia0Hve8195fOa2-YdoHGziLZpjN9lA99y6Lz4.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 60)),
                                         
                                         p("En este caso, si existe una probabilidad positiva de que exista el dígito
0, que es igual a 0.11968, pues en este caso el cero sí puede presentarse
en las segunda posición. La tabla 1.1 presenta el calculo de los dígitos en
diferentes posiciones en un número, desde la uno a la cinco. Destacamos que
para posiciones posteriores a la tercer se requieren varias cifras significativas
para distinguir los valores de probabilidad. Por ejemplo, la posición quinta
al presentar únicamente cuatro cifras significativas presenta una distribución
uniforme causada por el redondeo. La Figura ilustra la idea.
Finalmente, esta ley de dígito-significativo se puede generalizar en térmi-
nos de una densidad conjunta de dígitos en las primeras k posiciones iniciales,
por ejemplo de la siguiente manera"),
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/ihJz-dk6OjwUwcwY0TWIBs3daMvmwxOQAN1dyJCfP1Y.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 80)),
                                         
                                         p("Por ejemplo, calculemos la probabilidad relativa de 129 sean los primeros
dígitos"),
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/1G-rAsC1MpU1iaTch7yehxmEmyQqbFRy8G_Xgq2g-kY.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 95)),
                                         
                                         p("También se puede demostrar que la distribución del k-ésimo dígito signi-
ficativo (Dk ) se aproxima muy rápido a una distribución uniforme cuando la
k-ésima posición se mueve hacia la derecha.Por medio de histogramas es sencillo visualizar la presencia de distribu-
ciones no-uniformes para la primera y la segunda posición pero no para las
demás posiciones. De hecho cuando k ≥ 3 las distribuciones asociadas tie-
nen un valor medio de alrededor de 4.5 y una varianza de 8.25, valores que
coinciden con los de una distribución uniforme,Una forma equivalente a la expresión general anterior:"),
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/ZMVXgWUNsfqdypMqOlUvXU5BP44H6Pz3jJaFjpc1hJE.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 55)),
                                         
                                         
                                         h3("1.4 Componentes y Distribución"),
                                         p("La Ley de Benford no solo se aplica al primer dígito, sino que también puede extenderse al segundo dígito, a los dígitos en otras posiciones, 
                        y a combinaciones de dígitos. Sin embargo, la distribución de la Ley de Benford es más pronunciada en el primer dígito, y se va suavizando a medida que se analizan los dígitos subsiguientes.Distribuciones de la ley de Benford para la k-ésima posición ini-
cial calculados mediante la formula. Se observa que para la primera posición
es notoria la diferencia de probabilidades entre dígitos, en contraste para
posiciones superiores a la frecuencia de distribución es uniforme, lo que des-
tacamos para d5 presentando sólo cuatro cifras después del cero"),
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/fYQDpe92BKq-BKhA_BFOYVVr-Bd2zeiD3BBRcdXdZ74.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 245)),
                                         
                                         br(),
                                         
                                         h1("2.0 Interpretación de la Pruebas Estadísticas"),
                                         
                                         h3("2.1 MAD La desviación absoluta media"),
                                         p("La desviación absoluta media (o por sus sigla en inglés: MAD), también
conocida como «desviación media» es la media de las desviaciones absolutas
de los datos en torno a la media de los datos. En otras palabras la distancia
promedio (absoluta) respecto de la media. La «desviación absoluta prome-
dio» puede referirse a este uso, o a la forma general con respecto a un punto
central especificado. En términos matemáticos, para el análisis MAD del pri-
mer dígito lo podemos escribir como:."),
                                         
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/vHFIuQaOnSuM1GPfeIJ6d9m1L3nnPW9EKwHIRvorWWc.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 85)),
                                         
                                         p("Por ser una diferencia entre lo observado y la teoría (en nuestro caso la ley
de Benford) mientras más pequeño sea el índice MAD, mejor.Criterios de interpretación de MAD, algunos parámetros pueden ser:"),
                                         
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/S7h6pyYwscuv9nBFVZ-XR3zAZqtTJpO2XynTwclBGbw.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 135)),
                                         
                                         p("
Ejemplo de como una interpretacion de la MAD:MAD(bfd)
[1] 0.01150785

La **Mean Absolute Deviation (MAD)** en el contexto de la Ley de Benford se utiliza para medir la desviación media absoluta de las frecuencias observadas de los dígitos de la distribución esperada de Benford. Es una manera de cuantificar cuánto se desvían los datos de la distribución teórica.

### Interpretación del Resultado:

**Resultado de la MAD**:
```
MAD(bfd)
[1] 0.01150785
```

- **MAD = 0.01150785**: Este valor indica que, en promedio, la desviación absoluta de las frecuencias observadas de los dígitos con respecto a las frecuencias esperadas según la Ley de Benford es de aproximadamente 0.0115 (o 1.15%).

### Significado del Valor de MAD:

- **Valor Bajo de MAD**: Un valor bajo de MAD indica que las frecuencias observadas están muy cerca de las frecuencias esperadas según la Ley de Benford. Por lo general, un MAD menor a 0.015 sugiere que los datos siguen bien la Ley de Benford.
- **Valor Alto de MAD**: Un valor más alto de MAD indica una mayor desviación de las frecuencias observadas respecto a las esperadas, sugiriendo que los datos no siguen tan bien la Ley de Benford. Un MAD superior a 0.025 generalmente se considera un indicativo de posibles irregularidades o manipulaciones en los datos.

### Conclusión del Resultado:

Con un **MAD de 0.01150785**, tus datos parecen ajustarse razonablemente bien a la Ley de Benford. Este valor está por debajo del umbral de 0.015, lo que sugiere que no hay una desviación significativa entre las frecuencias observadas y las esperadas. En términos prácticos:

1. **Conformidad con la Ley de Benford**: Los datos probablemente siguen la distribución esperada según la Ley de Benford, lo que indica que no hay evidencia fuerte de irregularidades en este aspecto.
2. **Validez de los Datos**: Los datos podrían considerarse como válidos y sin manipulación obvia, al menos en cuanto a la distribución del primer dígito.

Sin embargo, dado que otros resultados (como las pruebas Chi-cuadrado y Mantissa Arc Test) han sugerido posibles desviaciones en otros aspectos de los datos, es importante considerar todos los resultados en conjunto para una evaluación completa. La MAD sugiere conformidad en la distribución de los primeros dígitos, pero otros aspectos pueden necesitar una revisión adicional.

### Recomendación:

Aunque la MAD sugiere que los datos siguen la Ley de Benford, se recomienda:
- **Revisar los otros resultados de las pruebas**: Considerar los resultados de las pruebas Chi-cuadrado y Mantissa Arc Test para tener una visión completa.
- **Realizar Análisis Adicionales**: Hacer más análisis y comparaciones con otros conjuntos de datos para identificar y entender cualquier discrepancia o irregularidad.

En resumen, el valor de MAD muestra una conformidad razonable con la Ley de Benford, pero otros análisis deben ser considerados para una evaluación más completa de la validez de los datos.

"),
                                         
                                         h3("2.1 Prueba ji-cuadrada"),
                                         
                                         p("Tradicionalmente se suele clasificar la estadística en descriptiva e inferen-
cial. La primera se asocia a la presentación de tablas, gráficas y mediciones
que describen en forma general el comportamiento de una muestra o una po-
blación. Por otra parte, la inferencia estadística es asociada con la labor de
investigación científica en la búsqueda de relaciones causales u asociaciones
entre fenómenos diversos. En sus inicios, la investigación y desarrollo en torno
a la estadística inferencial se orientaron en los métodos llamados «paramétri-
cos», tales métodos de estimación y procedimientos de pruebas de hipótesis
se apoyan a una serie de supuestos para su correcta aplicación y obtención de
conclusiones certeras. Los científicos especialistas en ciencias que requieren el
uso de inferencia estadística, pero cuyas observaciones no siempre cumplen
con los supuestos necesarios para la aplicación de las pruebas clásicas, ta-
les como la normalidad, la homogeneidad de varianzas y la exactitud de las
mediciones, motivaron a la investigación de estadísticos y matemáticos en el
terreno de procedimientos inferenciales que no plantean tantos requisitos y
que sin embargo, coadyuvaran a conclusiones científicamente válidas.Su formula:"),
                                         
                                         a(img(src = "https://cdn.mathpix.com/snip/images/oUf0os8qnRJXKCKdlxL3cE00JuWANmMzjEqzLxT1p6c.original.fullsize.png", class = "custom-logo",style="margin-top: 0px; padding-left:36px;padding-bottom:5px", height = 85)),
                                         
                                         p("Ejemplo de como se interpreta este resultado:Pearson's Chi-squared test

data:  data2$ValorEjecutado
X-squared = 73.795, df = 8, p-value = 0.0000000000008593

Resultado:
El resultado de la prueba chi-cuadrado de Pearson que proporcionaste se interpreta de la siguiente manera:

### Resultados del test chi-cuadrado de Pearson
```
Pearson's Chi-squared test

data:  data2$ValorEjecutado
X-squared = 73.795, df = 8, p-value = 0.0000000000008593
```

### Interpretación

1. **Valor de X-squared (X²)**:
   - El valor de X-squared es 73.795. Este es el estadístico de la prueba y mide la divergencia entre los valores observados y los esperados bajo la hipótesis nula.

2. **Grados de libertad (df)**:
   - Los grados de libertad para esta prueba son 8. Los grados de libertad están relacionados con el número de categorías menos el número de restricciones. 

3. **Valor p**:
   - El valor p es 0.0000000000008593, que es extremadamente pequeño. 

### Conclusión

- **Hipótesis nula (H₀)**: La hipótesis nula para una prueba chi-cuadrado generalmente afirma que no hay diferencia significativa entre los valores observados y los valores esperados. En el contexto de la ley de Benford, esto significaría que la distribución del primer dígito de los valores ejecutados sigue la distribución esperada según la ley de Benford.
  
- **Hipótesis alternativa (H₁)**: La hipótesis alternativa afirma que hay una diferencia significativa entre los valores observados y los valores esperados, lo que indica que la distribución del primer dígito no sigue la distribución esperada.

Dado que el valor p es extremadamente pequeño (mucho menor que el nivel de significancia típico de 0.05), rechazamos la hipótesis nula. Esto significa que hay una diferencia significativa entre la distribución observada de los primeros dígitos de `data2$ValorEjecutado` y la distribución esperada según la ley de Benford.

### Interpretación práctica
- La distribución de los primeros dígitos de los valores ejecutados en tu dataset no sigue la ley de Benford.
- Esto podría indicar algún tipo de anomalía en los datos, como errores de registro, manipulación de datos o simplemente que los datos no se ajustan naturalmente a la ley de Benford.

Es importante considerar el contexto de los datos y realizar análisis adicionales para comprender la causa de esta desviación.
"),    
                                         br(),
                                         
                                         h3("2.3 Factor de Distorsión"),
                                         
                                         p("Un ejemplo de como se interpreta interpreta este resultado: dfactor(bfd)
[1] -7.34266

El resultado `dfactor(bfd)` muestra el valor del factor de distorsión (distortion factor) de la ley de Benford aplicado a tus datos. Este valor se interpreta de la siguiente manera:

### Interpretación del Factor de Distorsión

1. **Factor de Distorsión (Distortion Factor)**:
   - El valor del factor de distorsión es `-7.34266`.

### ¿Qué es el Factor de Distorsión?

El factor de distorsión es una medida utilizada para cuantificar cuánto se desvían los primeros dígitos observados en tus datos de la distribución esperada según la ley de Benford. 

- **Valores negativos**: Un valor negativo del factor de distorsión indica que la distribución observada de los primeros dígitos está distorsionada y no se ajusta bien a la distribución de Benford. Cuanto más negativo sea el valor, mayor es la desviación de la distribución de Benford.
- **Valores positivos**: Un valor positivo indicaría que los datos se ajustan bien a la distribución de Benford.
- **Cercano a cero**: Un valor cercano a cero indicaría que los datos se ajustan muy bien a la distribución de Benford.

### Interpretación del Resultado

- **Valor del factor de distorsión = -7.34266**:
  - Este valor negativo indica que hay una desviación significativa de la distribución esperada de Benford en tus datos. En otras palabras, los primeros dígitos en tus datos no siguen la ley de Benford.
  - La magnitud del valor (`-7.34266`) sugiere que esta desviación es considerable.

### Conclusión

- **Desviación de la ley de Benford**: Tus datos no siguen la distribución esperada de los primeros dígitos según la ley de Benford.
- **Implicaciones**: Esto podría indicar anomalías en los datos, como errores en la entrada de datos, manipulación o características inherentes de los datos que no se ajustan a la ley de Benford.

Es importante investigar más a fondo las razones detrás de esta desviación. Podría ser útil realizar análisis adicionales o inspeccionar los datos para identificar posibles problemas o entender mejor sus características."),
                                         
                                         br(),
                                         
                                         h3("2.4 Mantisa"),
                                         p("Ejemplo de que significa este resultado de la prueba: mantissa(bfd)
               statistic     values
                  <char>      <num>
1:         Mean Mantissa  0.4692173
2:          Var Mantissa  0.0791575
3: Ex. Kurtosis Mantissa -1.1185310
4:     Skewness Mantissa  0.1080321

El resultado de la función `mantissa(bfd)` proporciona estadísticas descriptivas sobre las mantisas de tus datos en el contexto de la ley de Benford. La mantisa es la parte decimal del logaritmo de un número, y analizar las mantisas puede proporcionar información sobre cómo se ajustan tus datos a la ley de Benford.

### Interpretación de las Estadísticas de Mantisa

1. **Mean Mantissa** (Media de la Mantisa):
   - Valor: `0.4692173`
   - **Interpretación**: La media de las mantisas en tus datos es aproximadamente 0.469. En una distribución que sigue la ley de Benford, la media de las mantisas debería ser cercana a 0.5.

2. **Var Mantissa** (Varianza de la Mantisa):
   - Valor: `0.0791575`
   - **Interpretación**: La varianza de las mantisas es 0.079. Esta medida indica la dispersión de las mantisas en tus datos. Una varianza menor sugiere que las mantisas están más concentradas alrededor de la media, mientras que una varianza mayor indica más dispersión.

3. **Ex. Kurtosis Mantissa** (Exceso de Curtosis de la Mantisa):
   - Valor: `-1.1185310`
   - **Interpretación**: El exceso de curtosis mide la puntualida o achatamiento de la distribución de las mantisas en comparación con una distribución normal. Un valor negativo indica que la distribución de las mantisas es más plana (menos puntual) que una distribución normal. En el contexto de la ley de Benford, un valor cercano a cero es esperado, pero una curtosis negativa podría indicar desviaciones de la ley.

4. **Skewness Mantissa** (Asimetría de la Mantisa):
   - Valor: `0.1080321`
   - **Interpretación**: La asimetría mide la simetría de la distribución de las mantisas. Un valor positivo indica que la distribución está sesgada hacia la derecha, mientras que un valor negativo indica un sesgo hacia la izquierda. En una distribución que sigue la ley de Benford, se esperaría una asimetría cercana a cero. El valor `0.1080321` sugiere una ligera asimetría a la derecha, pero está bastante cerca de cero, lo que podría indicar un ajuste razonable a la ley de Benford.

### Conclusión

- **Media de la Mantisa**: La media está cerca de 0.5, lo que es consistente con la ley de Benford.
- **Varianza de la Mantisa**: La varianza sugiere una dispersión razonable de las mantisas.
- **Exceso de Curtosis**: La distribución de las mantisas es más plana de lo esperado.
- **Asimetría**: Hay una ligera asimetría a la derecha, pero es relativamente pequeña.

Estos resultados sugieren que, aunque hay algunas desviaciones (como la curtosis negativa), la distribución de las mantisas en tus datos no se aleja dramáticamente de lo que se esperaría bajo la ley de Benford. Sin embargo, es importante considerar estos resultados junto con otros análisis y contextos específicos de tus datos para hacer una evaluación completa."),
                                         
                                         br(),
                                         
                                         h3("2.5 Mantisa de Arco"),
                                         p("Ejemplo de la interpretación de la	Mantissa Arc Test

data:  data2$ValorEjecutado
L2 = 0.0040272, df = 2, p-value = 0.000000004471

La prueba de mantisa en arco es una técnica específica para evaluar la conformidad de un conjunto de datos con la ley de Benford mediante el análisis de las mantisas (la parte decimal de los logaritmos de los números). La prueba devuelve un valor de ( L2 ), los grados de libertad (( df )), y un valor ( p ).

### Interpretación de los Resultados

- **L2**:
  - Valor: 0.0040272
  - **Interpretación**: Este valor es una medida de la desviación de las mantisas observadas con respecto a las esperadas según la ley de Benford. Un valor pequeño indica que las mantisas están muy cerca de lo esperado según la ley de Benford.

- **df** (grados de libertad):
  - Valor: 2
  - **Interpretación**: Los grados de libertad se refieren al número de categorías menos el número de parámetros estimados. En este caso, hay 2 grados de libertad, lo que sugiere que la prueba está considerando 2 parámetros.

- **p-value**:
  - Valor: 0.000000004471 (o (4.471 times 10{-9}))
  - **Interpretación**: El valor ( p ) es extremadamente bajo, mucho menor que el típico umbral de significancia (como 0.05 o 0.01). Un valor ( p ) tan bajo indica que la probabilidad de que las mantisas observadas se desvíen tanto de las esperadas por la ley de Benford por puro azar es extremadamente baja.

### Conclusión

- **Significancia**: Dado el muy bajo valor ( p ), rechazamos la hipótesis nula de que los datos siguen la distribución esperada por la ley de Benford. Esto significa que hay una evidencia muy fuerte de que las mantisas de tus datos **no** siguen la ley de Benford.
- **Desviación**: Aunque el valor ( L2 ) es pequeño, el valor ( p ) extremadamente bajo sugiere que incluso una pequeña desviación puede ser altamente significativa dado el tamaño del conjunto de datos o la naturaleza de las distribuciones observadas.

### Recomendación

Este resultado indica que los datos probablemente no siguen la ley de Benford, lo cual podría ser una señal de irregularidades, errores en los datos, o características específicas de los datos que los alejan de lo esperado por la ley de Benford. Para una interpretación más detallada y acciones a tomar, se debería considerar el contexto específico de los datos y realizar análisis complementarios.
"),
                                         
                                         br(),
                                         
                                         h1("3.0 Algunas Áreas de Aplicación"),
                                         
                                         p("La Ley de Benford tiene aplicaciones en una amplia variedad de campos. Una de las aplicaciones más notables es en la detección de fraudes financieros. Dado que los datos financieros genuinos a menudo siguen la Ley de Benford, las desviaciones significativas de esta distribución pueden ser indicativas de manipulación o fraude."),
                                         p("Además, la Ley de Benford también se utiliza en campos como la ciencia de datos, la física, la geografía, y la ecología para modelar fenómenos naturales. En estos contextos, los conjuntos de datos que abarcan varios órdenes de magnitud tienden a seguir la distribución de Benford, lo que puede ayudar a verificar la autenticidad y precisión de los datos recopilados."),
                                         
                                         h3("3.1 Área económica"),
                                         p("En diversas actividades económicas encontramos aplicaciones de la ley
de Benford, principalmente como un indicador de falsificación o alteración
maliciosa de los datos.
La ley de Benford puede ser utilizada como una herramienta para detec-
tar la manipulación indebida de los precios y en consecuencia del equilibrio
en la curva de oferta-demanda de los insumos o bienes. Un caso relevante
surgió en Europa en el año 2002, en esa época comenzaba a surgir el euro
como la moneda corriente en la Unión Europea, de modo que varios vende-
dores minoristas comenzaron redondear los precios de los productos y bienes
con el objetivo de convencer psicológicamente al consumidor de comprar un
producto más barato. El alza de precio de algunos productos puede ser
considerada un delito en economías proteccionistas; pero en una perspectiva
ideal de libre mercado este fenómeno seria aceptado.
Hal Ronald Varian, estadounidense especializado en microeconomía, ar-
gumenta que una de las aplicaciones de la Ley de Benford sería en las ciencias
sociales. El autor argumenta que se puede usar esta ley para detectar posi-
bles fraudes en datos socieoconómicos que presentan el gobierno, empresas privadas y público en general. Pues, según Ronald, si la gente inventa los
números estos no seguirán la ley de Benford, al parecer estamos propensos
psicológicamente a tratar de mostrar un patrón uniforme.
En cuestiones macroeconómicas, la ley Benford puede usarse para validar
información de un país o un conjunto de países. Es decir, índices como el
producto interno bruto, la tasa de desempleo, el déficit público, la balanza
de cuentas corriente, entre otros pueden ser históricamente y geográficamente
analizados desde la perspectiva de la distribución de Benford"),
                                         br(),
                                         
                                         h3("3.2 Aplicaciones en auditorías"),
                                         p("El trabajo de la auditoría financiera consiste en revisar los estados fi-
nancieros de las empresas. Ver su balance entre activos y pasivos, así como
implementar estrategias para mantener las finanzas sanas; y por tanto, que
la empresa crezca y se diversifique. Lo anterior requiere de un proceso ético
ya que utilizando una adecuada información financiera es posible al inver-
sionista decidir del mejor modo. Por ello, el trabajo del auditor es revisar
que las cuentas de la empresa estén correctamente establecidas. La ley de
Benford es útil como un criterio para que la auditoría se fundamente más;
con la intención de prevenir sospecha y fraudes en los estados financieros.
El Instituto Americano de Contadores Públicos (por sus siglas en inglés:
AICPA) ha considerado proponer una profesión que se dedique a la búsqueda
de herramientas analíticas y métodos de auditoría para detectar el fraude.
Específicamente, el SAS No. 99 (párrafo 28) y al igual SAS No. 56 al re-
querir a los auditores que empleen procedimientos analíticos durante la fase
de planificación de la auditoría con el objetivo de identificar la existencia
de transacciones, eventos y tendencias atípicas. Al mismo tiempo,
SAS Núm. 99 advierte que confiar en procedimientos analíticos, que tradicio-
nalmente se realizan en datos altamente agregados, puede proporcionar sólo
indicaciones generales de fraude.
El propósito de tal documento es ayudar a los auditores en el uso más
efectivo de la información usando el análisis digital basado en la ley de Ben-
ford. Cuando se usa correctamente, puede ayudar a los auditores a identificar
cuentas específicas en las que podría residir el fraude. Puesto que desde hace
tiempo, los auditores han aplicado diversas formas de análisis digital como
la verificación de pagos duplicados o la búsqueda de números de cheques o
facturas faltantes como métodos de procedimientos analíticos.
La ley de Benford aplicada a la auditoría es simplemente otra forma de
análisis digital que consiste en la observación de una cuenta completa para
determinar si los números recaen en la distribución esperada, es decir si se
ajustan a una distribución teórica general o ley de Benford en particular.
Hal Varian (1972), economista de la Universidad de California, sugiere que
la ley de Benford puede usarse como una prueba de la honestidad o validez de
datos científicos en un contexto de ciencias sociales. Sin embargo, su visión no
fue retomada por los contadores hasta finales de los años ochenta. Carslaw
(1988) encontró que las ganancias de las empresas de Nueva Zelanda no
estaban ajustadas a la distribución esperada. Más bien, los números contenían
más ceros en la posición de segundo dígito de lo esperado y menos nueves,
lo que implica que cuando una empresa tenía ganancias como $ 1,900,000,
redondeaban a $ 2,000,000. Caslaw usó la distribución de Benford y la nombró como «Prueba de Feller». Thomas, en 1989, descubrió un patrón similar en
las ganancias de las empresas de EE.UU.
Nigrini parece ser el primer investigador en aplicar ampliamente la ley de
Benford a los números contables con el objetivo de detectar el fraude. Según
un artículo publicado en Canadian Business (1995), Nigrini se interesó por
primera vez en el trabajo sobre manipulación de ganancias por parte de
Carslaw. Thomas luego se encontró con el trabajo de Benford y combinó las
dos ideas para su disertación. Usó el análisis digital para ayudar a identificar
a los evasores de impuestos. Más recientemente, se han publicado documentos
que detallan aplicaciones prácticas del análisis digital, como descripciones de
cómo un auditor realiza pruebas en conjuntos de números contables, cómo
un auditor usa programas de computación de análisis digital y estudios de
casos para el entrenamiento de estudiantes"),
                                         
                                         br(),
                                         
                                         h3("3.3 Evasión de impuestos"),
                                         p("Por otro lado la ley de Benford puede de ser utilizada para detectar el
comportamiento de la conducta humana para facilitar la detección de evasión
de impuestos. Pero para ello se pondrá en definición algunos concepto para
entrar en contexto. La evasión no planificada (ENP) se define como una
manipulación flagrante por el papel de impuestos de los artículos de línea en
el momento de la presentación. La evasión planificada (EP) es el resultado
de acciones planificadas para ocultar una pista de auditoría.
Christian y Gupta (1993) analizaron datos de impuestos para examinar
la evasión secundaria. La evasión secundaria se deduce de sus datos y ocurre
cuando los contribuyentes reducen el ingreso impositivo desde arriba del nivel
de ingreso de la tabla de impuestos por debajo de una tabla de impuestos.
Estos investigadores usaron la Ley de Benford para justificar la suposición de
que los dos dígitos finales de la renta imponible deberían ser uniforme sobre
el rango de [00, 99]. Su análisis mostró que un porcentaje de usuarios de
tablas de impuestos superior al esperado se posicionó en dólares superiores
de los soportes de la tabla.
En julio de 1995, el Ministerio de Finanzas de los Países Bajos analizó las
frecuencias digitales de los datos seleccionados de la declaración de impues-
tos. El objetivo del análisis fue detectar la falta de cumplimiento, evaluar
la viabilidad de incorporar pruebas digitales seleccionadas en un modelo de
selección de auditoría, y evaluar si los informes de terceros contribuyen al
cumplimiento. Se analizó una muestra de 30,000 declaraciones de impuestos
para el año fiscal de 1992. El análisis incluyó una tabulación, con gráficos, de
los datos recibidos de interés por contribuyente, de acuerdo con los retornos
de terceros de los bancos holandeses a las autoridades tributarias. Las frecuencias de primer y segundo dígito mostraron una conformidad casi perfecta
con la Ley de Benford.
La ley Benford es utilizada como una distribución esperada para los dí-
gitos en datos tabulados. La suposición son los dígitos de los datos que se
informaron con sinceridad o que están sujetos a EP. Deben conformarse a las
frecuencias digitales esperadas. Se desarrolla un modelo de Factor de Distor-
sión que cuantifica la extensión de ENP."),
                                         
                                         br(),
                                         
                                         h3("3.4 Área electoral"),
                                         
                                         p("La generación de esta ley en datos socio-económicos y de otra índole
depende de la presencia de un doble proceso aleatorio: eventos de una distri-
bución y distribuciones de probabilidades elegidas de un conjunto de datos
reducido. Walter Mebane ha empleado esta metodología para detectar frau-
des electorales, por lo general estudiando el primero o segundo dígito inicial
en la cuenta de votos recibidos por cada candidato, ya sea en la casilla o en
las secciones electorales.
Básicamente el cuestionamiento obedece a la dificultad de saber, efecti-
vamente, si las decisiones de voto producen una distribución logarítmica en
los primeros dígitos de las cuentas de las diferentes casillas o distritos. En
especial, si pensamos que los procesos electorales son caracterizados como
sistemas adaptables complejos.
En consecuencia, para que la ley de Benford funcione en datos electorales
la decisión de votar debe contar con explicaciones de fuentes en términos
de colecciones de funciones de distribución. Por ejemplo, un voto emitido en determinada casilla debe provenir, en ciertas ocasiones, de un votante duro,
en otras, de la decisión de un individuo con un compromiso partidista débil;
mientras que otros más serían emitidos por personas independientes atraídos
por lo menos por un rasgo del plan de campaña o el candidato o bien es
otra la razón. En cualquier caso, la decisión de votar por un candidato está
determinada por la distribución de probabilidad específica. De esta forma, el
tipo de votante y la decisión que adopta son el resultado de un doble proceso
de aleatorización.
Algunos autores han sugerido que las leyes de dígitos significativos no
son relevantes para datos electorales. Por ejemplo, Taylor (2005) al igual que
otros politólogos cuantitativos, plantea que la decisión de votar puede des-
cribirse como un esquema de lotería. De manera, que la probabilidad de un
individuo de votar por un candidato se define en términos de un modelo mul-
tinomial y por ello existen diferentes distribuciones dependiendo de variables
sociodemográficas, ideología y otros elementos que sirven para categorizar la
población de votantes; por tanto, la cuenta total de votos es la suma de una
serie de realizaciones de eventos aleatorios. Así, para el caso de las elecciones
presidenciales de Venezuela en el 2018, el autor encuentra una discrepancia
entre los datos y la ley de Benford, pero suponiendo que las elecciones fueron
limpias si se ajustan a un modelo multinomial de exclusivamente variables
que reflejan un proceso limpio; por lo que el estudio puede estar sesgado por
la ausencia de variables que empañen el proceso."),
                                         br(),
                                         
                                         h1("4.0 Limitaciones"),
                                         p("Aunque la Ley de Benford es poderosa, no se aplica a todos los conjuntos de datos. Funciona mejor en datos que abarcan varios órdenes de magnitud y que no están limitados por un rango fijo, como los precios de las acciones, las poblaciones de ciudades, o los datos de consumo de energía.En términos generales la ley Benford se cumple cuando los datos están
distribuidos en varios órdenes de magnitud o distintas escalas. Pero aunque
es una afirmación general y clara, también son términos muy vagos. Así que
se expone con base a los supuestos principales de una distribución tipo
Benford:
-Que sean sucesiones geométricas (requisito fundamental), es decir que
no cuenten con máximo, ni un mínimo teórico; de otro modo, los núme-
ros aparecerán con una marcada frecuencia. Por ejemplo, una serie de
mediciones del largo de una mesa, tenderán a un valor central: la longi-
tud de tal mueble. Por lo que los primeros dígitos estarán constreñidos
a la medición (sin importar el número de mediciones) y sin ajustarse a
la ley de Benford.

-Datos que contengan cuatro o más dígitos. Le da robustez a la colección
de la base de datos. De otro modo el conjunto estudiado es inadecuado
para observar la tendencia según Benford. Entonces, además de requerir
una cantidad amplia de datos, cada dato debe ser consecuencia de un
calculo, medición o conteo amplio que supere cuatro cifras significativas.

-Datos que contiene valores similares para fenómenos similares. Si bien es
posible combinemos bases de datos para obtener una tendencia similar
a la ley de Benford, lo mejor es mantener
homogéneas o fieles las fuentes para evitar complicar la interpretación

-El conjunto de datos no debe componerse de números asignados. El ar-
quetipo de ejemplo son los números de teléfono, por zonas y regiones se
asigna cierto número de identificación, que luego puede implicar otros
código y finalmente un conteo. Así, si consideramos los números tele-
fónicos dentro de un país y consideramos su clave, los primeros dígitos
serán los mismos dentro de la base de datos. Es decir, tal distribución
de primeros dígitos es uniforme.

De este modo, distribuciones como al lotería o la estatura de una pobla-
ción, o los números telefónicos no siguen la ley de Benford. Las estaturas no
se extienden sobre muchos órdenes de magnitud sino que se acumulan en una
escala específica, por ejemplo entre 140 y 190 cm. Esta clase de distribuciones
se describen mejor por medio de la distribución Gaussiana.
Otro ejemplo, son los precios de productos obtenidos de diferentes comer-
cios. Además de estar ceñidos a un par de decimales, oscilan alrededor de un
valor central. Cuando los números son usados como etiquetas suelen no seguir
la ley de Benford, pero cuando son para medir si la siguen. En cambio, una
variable que se extiende en varios órdenes de magnitud como la población de
los países tienen un mejor ajuste con la distribución de Benford.

Hill (1995) presenta una explicación convincente de por qué es muy co-
mún observar la ley de Benford en tablas numéricas generadas con fenómenos
diversos. De acuerdo con Hill, la distribución logarítmica se establece cuando
el conjunto de números proviene de un proceso aleatorio generado con una
«mezcla estadística». Es decir, una tabla de números sigue la ley de Benford
cuando éstos son producidos a partir de procesos aleatorios de un conjunto
pequeño de distribuciones diferentes que, a su vez, son elegidos aleatoriamen-
te. A manera de ejemplo, este escenario prevalece en una tabla recopilada con
números que aparecen en una revista o periódico, ya que estos números pro-
vienen de diferentes fuentes de datos: estadísticas deportivas, información
financiera, fechas de eventos, precios de productos enunciados.
Theodore P. Hill y Arno Berger argumentan que los datos deben mostrar
ciertas características: independencia, invarianza de escala, invariancia de
base, y contar con varios órdenes de magnitud. Sin embargo, es importante
recordar, de nuevo, que cuando los datos provienen de diferentes fuentes, no
homogéneas, al conjugarse pueden seguir la ley de Benford
                                         
                                         "),
                                         br(),
                                         
                                         h1("5.0 Conclusión"),
                                         p("La Ley de Benford es un concepto matemático fascinante que revela una regularidad oculta en muchos conjuntos de datos reales. Desde su descubrimiento, ha encontrado aplicaciones prácticas en una variedad de campos, particularmente en la detección de fraudes y la auditoría financiera. A pesar de sus limitaciones, la Ley de Benford sigue siendo una herramienta invaluable para quienes buscan analizar y comprender la naturaleza de los datos numéricos en el mundo real."),
                                         
                                         h1("6.0 Fuentes:"),
                                         a(href="https://ru.dgb.unam.mx/bitstream/20.500.14330/TES01000805915/3/0805915.pdf","Tesis UNAM Propuesta Metodológica para Utilizar la Ley de Benford en la Investigación Forense en Resultados Electorales"),
                                         br(),
                                         a(href="https://repositorio.ues.edu.sv/server/api/core/bitstreams/c0fe976c-8abe-4117-9a37-bbedb953b0d7/content","Tesis de la UES LEY DE BENFORD Y SUS APLICACIONES"),
                                         
                                         
                                         
                                ),      
                                
                                
                                
                                
                                tabPanel("Bases", box(title = "Base de Datos Inversión", status = "primary", solidHeader = TRUE,collapsible = TRUE, DT::dataTableOutput("Base1"),width = 14,height = "auto"),
                                         "Base3", box(title = "Base de Datos Compras", status = "danger", solidHeader = TRUE,collapsible = TRUE, DT::dataTableOutput("Base3"),width = 14,height = "auto"),
                                         "Base5", box(title = "Base de Proveedores", status = "warning", solidHeader = TRUE,collapsible = TRUE, DT::dataTableOutput("Base5"),width = 14,height = "auto")
                                ),
                                tabPanel("InversiónTotal",box(title = "InversiónTotal", status = "success", solidHeader = TRUE,collapsible = TRUE, plotOutput("benfordPlot_T"), h2("Pruebas Estadísticas de Validación:",align = "center",style = "color:green"),hr(), h4("MAD Result (Desviación Media Absoluta)"),verbatimTextOutput("madResult_T"), 
                                                              h4("Chi-Square Test Result (Prueba Ji-Cuadrada)"),verbatimTextOutput("chiSquareResult_T"),h4("DFactor Result(Prueba de Factor de Distorsión)"),verbatimTextOutput("dfactorResult_T"),h4("Mantisa"),verbatimTextOutput("mantissa_T"),h4("Mantisa de Arco"),verbatimTextOutput("marc_T"),h4("BFD Result (Tendencia de las series confrontadas)"),verbatimTextOutput("bfdResult_T"),width = 13,height = "auto")),                                       
                                tabPanel("InversiónSectorial",box(title = "InversiónS", status = "primary", solidHeader = TRUE,collapsible= TRUE,plotOutput("benfordPlot"), h2("Pruebas Estadísticas de Validación:",align = "center",style = "color:blue"),hr(),h4("Sector:"),verbatimTextOutput("texsector") ,h4("MAD Result (Desviación Media Absoluta)"),verbatimTextOutput("madResult"), 
                                                                  h4("Chi-Square Test Result (Prueba Ji-Cuadrada)"),verbatimTextOutput("chiSquareResult"),h4("DFactor Result(Prueba de Factor de Distorsión)"), verbatimTextOutput("dfactorResult"), h4("Mantisa"),verbatimTextOutput("mantissa"),h4("Mantisa de Arco"),verbatimTextOutput("marc"),h4("BFD Result (Tendencia de las series confrontadas)"),verbatimTextOutput("bfdResult"),width = 13,height = "auto"),
                                         "Base2", box(title = "Base de Datos Inversión", status = "primary", solidHeader = TRUE,collapsible = TRUE, DT::dataTableOutput("Base2"),width = 14,height = "auto")),
                                
                                tabPanel("ProcesosCompras",box(title = "Compras", status = "danger", solidHeader = TRUE,collapsible= TRUE, plotOutput("benfordPlot_c"), h2("Pruebas Estadísticas de Validación:",align = "center",style = "color:blue"),hr(),h4("Estado del Proceso:"),verbatimTextOutput("estadop") ,h4("MAD Result (Desviación Media Absoluta)"),verbatimTextOutput("madResult_c"), 
                                                               h4("Chi-Square Test Result (Prueba Ji-Cuadrada)"),verbatimTextOutput("chiSquareResult_c"),h4("DFactor Result(Prueba de Factor de Distorsión)"),verbatimTextOutput("dfactorResult_c"),h4("Mantisa"),verbatimTextOutput("mantissa_c"),h4("Mantisa de Arco"),verbatimTextOutput("marc_c"),h4("BFD Result (Tendencia de las series confrontadas)"),verbatimTextOutput("bfdResult_c"),width = 13,height = "auto"),
                                         "Base4", box(title = "Base de Datos Compras", status = "danger", solidHeader = TRUE,collapsible = TRUE, DT::dataTableOutput("Base4"),width = 14,height = "auto")),
                                
                                tabPanel("Estadísticas",box(title = "Sumarios", status = "danger", solidHeader = TRUE,collapsible= TRUE,width = 13,height = "auto",  h1("(T1: Inversión Estatala de RD según sectores)"), tableOutput("Tabla1"), h1("(T2: Monto de Procesos de Compras Estatales según Estado )"), tableOutput("Tabla2"),h1("(T3: Monto de Procesos de Compras Estatales según Estado Contrato )"), tableOutput("Tabla3")),),
                                
                                tabPanel("Pivote Table",box(title = "Pivote Table", status = "primary", solidHeader = TRUE,collapsible = TRUE,rpivotTableOutput("Pivote",width = "20%", height = "100px"),width = 20,height = "1000px")))
                         
                         
                       )
                     )
                     
)


# --------------------------------------------------Server----------------------------------------------

server <- function(input, output) {
  
  #---------------------------------Lanzamiento de Base2
  
  output$Base1<- DT::renderDataTable(
    
    DT::datatable({dfdomi[,c(1,2,4,5,6,7,9,10,11,12)]#%>%filter(Digito==sort(input$filtro,decreasing=F))
      
    },
    options=list(lengthMenu=list(c(7,15,-1),c('5','15','Todo')),
                 pageLength=15),
    filter="top",
    selection="multiple",
    style='bootstrap' 
    
    ))
  
  output$Base2<- DT::renderDataTable(
    
    DT::datatable({dfdomi[,c(1,2,4,5,6,7,9,10,11,12)]%>%filter(Sector2==input$sector) %>%  filter(Digito==input$filtro)
      
    },
    options=list(lengthMenu=list(c(7,15,-1),c('5','15','Todo')),
                 pageLength=15),
    filter="top",
    selection="multiple",
    style='bootstrap' 
    
    ))
  
  output$Base3<- DT::renderDataTable(
    
    DT::datatable({dfdomc[,c(1,2,4,5,6,7,8,9,10,11)]#%>%filter(Digito==sort(input$filtro,decreasing=F))
      
    },
    options=list(lengthMenu=list(c(7,15,-1),c('5','15','Todo')),
                 pageLength=15),
    filter="top",
    selection="multiple",
    style='bootstrap' 
    
    ))
  
  output$Base4<- DT::renderDataTable(
    
    DT::datatable({dfdomc[,c(1,2,4,5,6,7,8,9,10,11)]%>%filter(EstadoProceso==input$estado) %>%  filter(Digito==input$filtro2)
      
    },
    options=list(lengthMenu=list(c(7,15,-1),c('5','15','Todo')),
                 pageLength=15),
    filter="top",
    selection="multiple",
    style='bootstrap' 
    
    ))
  
  output$Base5<- DT::renderDataTable(
    
    DT::datatable({dfdomp[,c(1,2,5,6,7,8,9,10,11,12,13,14)]#%>%filter(EstadoProceso==input$estado) %>%  filter(Digito==input$filtro2)
      
    },
    options=list(lengthMenu=list(c(7,15,-1),c('5','15','Todo')),
                 pageLength=15),
    filter="top",
    selection="multiple",
    style='bootstrap' 
    
    ))
  
  
  #=============================Cuadros
  
  #--Tabla1
  output$Tabla1<- renderTable({ 
    
    dfdomi %>% 
      dplyr::group_by(Sectores=Sector2) %>% 
      dplyr::summarise(ValorEjecutadoDOP=(sum(ValorEjecutado))) %>% 
      dplyr::mutate(Conversion=(ValorEjecutadoDOP*0.017),MontoUSD=dollar(Conversion)) %>% 
      dplyr::arrange(desc(ValorEjecutadoDOP))
    
  },
  striped = TRUE,
  spacing = "l",
  align = "lccr",
  digits = 4,
  width = "90%",
  caption = "Fuente: Bases de Datos Mapa Inversiones."
  
  )
  
  #----Tabla 2
  output$Tabla2<- renderTable({ 
    
    dfdomc %>% 
      dplyr::group_by(Estado_Procesos=EstadoProceso) %>% 
      dplyr::summarise(MontoEjecutadoDOP=(sum(Monto))) %>% 
      dplyr::mutate(Conversion=(MontoEjecutadoDOP*0.017),MontoUSD=dollar(Conversion)) %>% 
      dplyr::arrange(desc(MontoEjecutadoDOP))
    
  },
  striped = TRUE,
  spacing = "l",
  align = "lccr",
  digits = 4,
  width = "90%",
  caption = "Fuente: Bases de Datos Mapa Inversiones."
  
  )
  
  #----Tabla 3
  output$Tabla3<- renderTable({ 
    
    dfdomp %>% 
      dplyr::group_by(EstadoContrato=EstadoContrato) %>% 
      dplyr::summarise(MontoEjecutadoDOP=(sum(Monto))) %>% 
      dplyr::mutate(Conversion=(MontoEjecutadoDOP*0.017),MontoUSD=dollar(Conversion)) %>% 
      dplyr::arrange(desc(MontoEjecutadoDOP))
    
  },
  striped = TRUE,
  spacing = "l",
  align = "lccr",
  digits = 4,
  width = "90%",
  caption = "Fuente: Bases de Datos Mapa Inversiones."
  
  )
  
  
  #---------------------------------Filtrando la base y aplicando Benford
  
  
  #======================BenfordTotal
  
  # Plot the Benford analysis
  output$benfordPlot_T <- renderPlot({
    bfd <-benford(dfdomi$ValorEjecutado, number.of.digits = 1)
    plot(bfd)
    
  })
  
  # Output the MAD results
  output$madResult_T <- renderPrint({
    bfd <-benford(dfdomi$ValorEjecutado, number.of.digits = 1)
    MAD(bfd)
  })
  
  # Output the Chi-Square test results
  output$chiSquareResult_T <- renderPrint({
    bfd <-benford(dfdomi$ValorEjecutado, number.of.digits = 1)
    chisq(bfd)
  })
  
  # Output the DFactor results
  output$dfactorResult_T <- renderPrint({
    bfd <-benford(dfdomi$ValorEjecutado, number.of.digits = 1)
    dfactor(bfd)
  })
  
  # Output the Mantissa results
  output$mantissa_T <- renderPrint({
    bfd <-benford(dfdomi$ValorEjecutado, number.of.digits = 1)
    mantissa(bfd)
  })
  
  # Output the Arc Mantissa results
  output$marc_T <- renderPrint({
    bfd <-benford(dfdomi$ValorEjecutado, number.of.digits = 1)
    marc(bfd)
  })
  
  # Output the BFD results
  output$bfdResult_T <- renderPrint({
    bfd <-benford(dfdomi$ValorEjecutado, number.of.digits = 1)
    getBfd(bfd)
  })
  
  #======================BenfordSectorial
  # Reactive expression to filter the data based on selected type of work
  data_filtered <- reactive({
    req(input$sector)
    dfdomi %>% filter(Sector2==input$sector)
  })
  
  # Reactive expression to compute Benford's Law results
  benford_results <- reactive({
    req(input$sector)
    data <- data_filtered()
    bfd <- benford(data$ValorEjecutado, number.of.digits = 1)
    return(bfd)
  })
  
  output$texsector<-renderPrint({
    req(input$sector)
    #print(input$sector)
  })
  
  # Plot the Benford analysis
  output$benfordPlot <- renderPlot({
    req(benford_results())
    plot(benford_results(),type = "o")
  })
  
  # Output the MAD results
  output$madResult <- renderPrint({
    req(benford_results())
    MAD(benford_results())
  })
  
  # Output the Chi-Square test results
  output$chiSquareResult <- renderPrint({
    req(benford_results())
    chisq(benford_results())
  })
  
  # Output the DFactor results
  output$dfactorResult <- renderPrint({
    req(benford_results())
    dfactor(benford_results())
  })
  
  
  # Output the Mantissa results
  output$mantissa <- renderPrint({
    req(benford_results())
    mantissa(benford_results())
  })
  
  # Output the Arc Mantissa results
  output$marc <- renderPrint({
    req(benford_results())
    marc(benford_results())
  })
  
  # Output the BFD results
  output$bfdResult <- renderPrint({
    req(benford_results())
    getBfd(benford_results())
  })
  
  #======================BenfordCompras
  # Reactive expression to filter the data based on selected type of work
  data_filtered_c<- reactive({
    req(input$estado)
    dfdomc %>% filter(EstadoProceso==input$estado)
  })
  
  # Reactive expression to compute Benford's Law results
  benford_results_c <- reactive({
    req(input$estado)
    data_c<- data_filtered_c()
    bfd_c <- benford(data_c$Monto, number.of.digits = 1)
    return(bfd_c)
  })
  
  
  output$estadop <-renderPrint({
    req(input$estado)
  })
  
  # Plot the Benford analysis
  output$benfordPlot_c <- renderPlot({
    req(benford_results_c())
    plot(benford_results_c())
  })
  
  # Output the MAD results
  output$madResult_c <- renderPrint({
    req(benford_results_c())
    MAD(benford_results_c())
  })
  
  # Output the Chi-Square test results
  output$chiSquareResult_c<- renderPrint({
    req(benford_results_c())
    chisq(benford_results_c())
  })
  
  # Output the DFactor results
  output$dfactorResult_c <- renderPrint({
    req(benford_results_c())
    dfactor(benford_results_c())
  })
  
  # Output the Mantissa results
  output$mantissa_c <- renderPrint({
    req(benford_results_c())
    mantissa(benford_results_c())
  })
  
  # Output the Arc Mantissa results
  output$marc_c <- renderPrint({
    req(benford_results_c())
    marc(benford_results_c())
  })
  
  
  # Output the BFD results
  output$bfdResult_c <- renderPrint({
    req(benford_results_c())
    getBfd(benford_results_c())
  })
  
  
  #-------------------------------Lanzamiento del graf 2
  output$Pivote<-rpivotTable::renderRpivotTable({
    
    rpivotTable(dfdomi[,c(1,3,4,9,10,11,12)])
    
  }) 
  
}

# Run the application 
shinyApp(ui = ui, server = server)

