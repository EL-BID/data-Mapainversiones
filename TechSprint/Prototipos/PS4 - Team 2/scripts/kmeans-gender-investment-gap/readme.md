<p dir="ltr" style="text-align: left;"></p>
<div>
    <h1><a name="_925iy67cld4v"></a><b><span lang="es">Planteamiento del problema</span></b></h1>
</div>

<p><span lang="es">&nbsp;</span><span style="font-size: 0.9375rem;">¿Cómo
        podemos mejorar la identificación de brechas en infraestructuras y desarrollo
        en la planificación de inversiones públicas y privadas para apoyar la
        resiliencia climática, la igualdad de género, la buena gobernanza y el
        desarrollo sostenible?</span></p>

<p><span lang="es">&nbsp;</span><span style="font-size: 0.9375rem;">Recursos
        Disponibles en el planteo del problema: se posee un amplio compendio de datos
        abiertos disponibles en diferentes páginas web especialmente de los gobiernos
        de los diferentes países en el enlace de TechSprint:</span></p>

<p><u><span lang="es"><a href="https://idb-air-techsprint.vercel.app/problem-statements/planteamiento-del-problema-4">https://idb-air-techsprint.vercel.app/problem-statements/planteamiento-del-problema-4</a></span></u><span lang="es"> </span></p>
<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla1.png" class="img-fluid atto_image_button_text-bottom"></span></p>
<div>
    <h1><a name="_harxzm6my3dw"></a><b><span lang="es">Objetivos de Negocio</span></b><b><span lang="es"></span></b></h1>
</div>
<div>
    <p>
        <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <!--[endif]--><span lang="es">Integrar y visualizar datos:</span><span lang="es"></span>
    </p>
</div>
<div>
    <p>
        <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <!--[endif]--><span lang="es">Combine datos de gasto público con conjuntos de datos geoespaciales, socioeconómicos y
            medioambientales para identificar carencias en infraestructuras y necesidades
            de inversión en todos los sectores y regiones.</span><span lang="es"></span>
    </p>
</div>
<div>
    <p><span lang="es">Para dar respuesta a este punto teniendo en cuenta las consideraciones de que cada
            país pone a disposición diferentes tipos de datos, con diferentes estructuras
            es que para optimizar el tiempo se opta por utilizar un solo recurso según la
            orientación de la pregunta inicial. Por este motivo se toman datos disponibles
            en Argentina como se detalla más adelante</span></p>
</div>
<div>
    <p>
        <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <!--[endif]--><span lang="es">Análisis basados en IA:</span><span lang="es"></span>
    </p>
</div>
<div>
    <p>
        <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <!--[endif]--><span lang="es">Utilizar análisis basados en IA para evaluar la alineación del
            gasto público con el clima, el género y las metas de los ODS, señalando
            posibles desajustes y oportunidades de optimización.</span><span lang="es"></span>
    </p>
</div>
<div>
    <p><span lang="es">En este
            ítem se decide trabajar con análisis basado en clustering se selecciona el
            algoritmo k-means y la perspectiva es sobre género y niñez en la distribución
            poblacional. En respuesta a las ODS se consideran las ODS 3, 4 y 5,
            centrándonos inicialmente en este tipo de inversiones de infraestructura</span></p>
    <p><u><span lang="es"><a href="https://www.un.org/sustainabledevelopment/es/objetivos-de-desarrollo-sostenible/">https://www.un.org/sustainabledevelopment/es/objetivos-de-desarrollo-sostenible/</a></span></u><span lang="es"> </span></p>
    <p><span lang="es">ODS 3: Salud y Bienestar</span></p>
    <p><span lang="es">ODS 4: Educación de Calidad</span></p>
    <p><span lang="es">ODS
            5: Igualdad de Género</span><span lang="es"></span></p>
</div>
<div>
    <p>
        <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <!--[endif]--><span lang="es">Planificación de escenarios y
            evaluación de impacto:</span><span lang="es"></span>
    </p>
</div>
<div>
    <p>
        <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <!--[endif]--><span lang="es">Habilitar la planificación de escenarios y la evaluación de
            impacto para priorizar las inversiones que maximizan los retornos sociales,
            ambientales y económicos al tiempo que reducen la desigualdad.</span><span lang="es"></span>
    </p>
</div>
<div>
    <p><span lang="es">El primer escenario es identificar las
            posibles deficiencias de infraestructura por medio del cruce de información que
            relacione los datos de distribución poblacional con las obras e inversiones de
            infraestructura para detectar las diferencias. Al detectar grupos de posible
            mayor sensibilidad es que se puede pensar en una distribución más equitativa de
            la inversión.</span></p>
</div>
<div>
    <p>
        <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp; </span>
        <!--[endif]--><span lang="es">Herramientas interactivas de
            seguimiento:</span><span lang="es"></span>
    </p>
</div>
<div>
    <p>
        <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <!--[endif]--><span lang="es">Proporcionar herramientas interactivas a los ciudadanos, la
            sociedad civil y los socios de desarrollo para supervisar la asignación y el
            impacto de los fondos públicos en relación con el clima, el género y los
            compromisos de los ODS.</span><span lang="es"></span>
    </p>
</div>
<p><span lang="es">Inicialmente
        se presenta el análisis y la propuesta y se evalúan posibles herramientas,
        luego se busca la integración en un ambiente de consulta más disponible y
        accesible.</span><span lang="es"></span></p>
        
<p><b><u><span lang="es">Secuencia para el abordaje del problema</span></b></u></p>
    
<p><span lang="es">Del problema 4 se toma el conjunto de datos Abiertos de Argentina: </span><u><span lang="es"><a href="https://www.datos.gob.ar/">https://www.datos.gob.ar/</a></span></u></p>

<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla2.png"</span></p>


<p><span lang="es">En Dataset se filtra por inversiones y se toma el Mapa de
        Inversiones de Argentina</span></p>
        
<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla3.png"</span></p>
        
<p><span lang="es">Se descarga un set de 7317 datos, como se menciona en la
        web. Datos sobre el presupuesto y la ejecución de las obras del Ministerio de
        Obras Públicas de la República Argentina.</span></p>

<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla4.png"</span></p>
    
<p><span lang="es">Al ir al mapa disponible se ve discriminado por Obra
        públicas y por Proyectos y en ambos casos hay varios ítems de los cuales ya se
        extrae información</span><span lang="es"></span></p>
<p><u><span lang="es"><a href="https://mapainversiones.obraspublicas.gob.ar/#/proyectosnal">https://mapainversiones.obraspublicas.gob.ar/#/proyectosnal</a></span></u><span lang="es"> </span></p>
<p><span lang="es">Por otro lado se busca en el portal del último censo la
        cantidad de mujeres por provincia, en los datos definitivos disponibles en
        formato Excel aparecen los totales por provincia pero no la info discriminada
        por sexo</span><span lang="es"></span></p>
<p><u><span lang="es"><a href="https://censo.gob.ar/index.php/datos_definitivos_total_pais/">https://censo.gob.ar/index.php/datos_definitivos_total_pais/</a></span></u></p>

<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla5.png"</span></p>

<p><u><span lang="es"><a href="https://portalgeoestadistico.indec.gob.ar/?indicator_id=92&amp;members=108,31">https://portalgeoestadistico.indec.gob.ar/?indicator_id=92&amp;members=108,31</a></span></u></p>

<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla6.png"</span></p>

<p><span lang="es">Entonces se busca en la info geoestadistia y aplicando una
        capa se logra ver esta info que se baja en formato XLSX&nbsp; se procesan y cruzan con los datos de
        inversión. Se usan criterios por género (hombre/mujer) y niñez (entre 0-14
        años)</span></p>
<p><b><span lang="es">Hipótesis inicial</span></b><span lang="es"> </span></p>
<p><span lang="es">La deficiencia en infraestructura es la
        falta de correlación entre cantidad de habitantes, cantidad de habitantes
        mujeres, y cantidad de niños entre 0-14 años con respecto a la distribución de
        obras, se podrían llegar a identificar las obras de saneamiento (aguas y
        cloacas), educación, salud y vivienda y hábitat.</span></p>
<p><span lang="es">&nbsp;</span></p>
<p><b><span lang="es">Herramientas: </span></b><span lang="es"></span></p>
<p><span lang="es">Los datos se bajan en formato excel. Para
        encontrar y extraer nueva información se levanta el set de datos en excel e
        integran las fuentes formando un solo set de datos integrados. Detalle de los
        pasos y formato en ANEXO I</span></p>
<p><span lang="es">Luego se usa RapidMiner versión educativa
        (AI Studio 2024) y se procede a generar la aplicación del algoritmo X-Mean que
        es un K mean pero en el cual el mismo software determina cual es la mejor
        cantidad de cluster a ser generados (ya que en K-means este es un dato que te
        solicita el algoritmo). Dio solo un cluster y dice que eso pasa cuando los
        datos son inusualmente raros. Por eso se procede a avanzar con el uso de
        K-Means.</span></p>
<p><span lang="es">Se procede a levantar los datos y
        utilizar componentes que reemplazan los campos nulos (pudiendo filtrarse y
        eliminarse como otra opción), normalizan los datos para una mejor conversión
        del algoritmo k-means y una discretización de datos nominales a numéricos (que
        se podría realizar de manera previa al proceso o quitar estos campos. </span></p>
<p><span lang="es">&nbsp;</span></p>
<p><b><span lang="es">Desarrollo: </span></b></p>
<p><span lang="es">Se prueban inicialmente modelos de 2
        cluster pero a pesar que el índice Davies Bouldin que mide la calidad del
        cluster es buena, se observa una baja distribución de pertenencia a cada grupo
        por lo cual se decide probar una mayor cantidad, se toma el número de 8 por la
        cantidad de tipos de obras que propone el set de datos (se podrían probar
        mejores agrupamientos)</span><b><span lang="es"></span></b></p>
<p><span lang="es">&nbsp;</span></p>
<p><span lang="es">Modelo 2: 8 cluster por la clasificación
        de los 8 tipos de obras</span></p>
<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla7.png"</span></p>
        
<p><span lang="EN-GB">Cluster Model </span></p>
<p><span lang="EN-GB">Cluster 0: 710
        items</span></p>
<p><span lang="EN-GB">Cluster 1: 215
        items</span></p>
<p><span lang="EN-GB">Cluster 2: 1191
        items</span></p>
<p><span lang="EN-GB">Cluster 3: 372
        items</span></p>
<p><span lang="EN-GB">Cluster 4: 2090
        items</span></p>
<p><span lang="EN-GB">Cluster 5: 1377
        items</span></p>
<p><span lang="EN-GB">Cluster 6: 34
        items</span></p>
<p><span lang="EN-GB">Cluster 7: 1328
        items</span></p>
<p><span lang="EN-GB">Total number of
        items: 7317</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance: -17.773</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_0 </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_0: -19.412</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_1 </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_1: -30.256</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_2 </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_2: -16.397</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_3 </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_3: -24.362</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_4 </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_4: -16.238</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_5 </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_5: -18.905</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_6 </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_6: -74.586</span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_7 </span></p>
<p><span lang="EN-GB">Avg. within
        centroid distance_cluster_7: -14.047</span></p>
<p><span lang="es">Davies Bouldin: -2.012</span></p>
<p><span lang="es">Se observa que el índice Davies Bouldin
        anterior&nbsp; era de -0.662 es y ahora es de
        : -2.012, siendo con respecto a la primer prueba pero las distancias de los
        centroides en general de cada cluster tmb aumentaron (ver cluster 1 y 6)</span></p>
<p><span lang="es">&nbsp;A
        Continuación se observa la distribución de datos de cada cluster.</span></p>
<p><span lang="es">&nbsp;</span></p>
<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla8.png"</span></p>

<p><span lang="es">En el análisis de las gráficas generadas buscando la correlación entre
        los datos se puede observar que la distribución de la obras analizadas de
        salud, vivienda y educación tiene una cantidad similar en cada uno de los
        clusters.</span></p>
<p><span lang="es">También habría una mejor distribución de datos con 8 cluster pero se ve
        que la cantidad de obras en salud, vivienda y educación en todos los cluster es
        muy similar (Podria analisarse este item a que responde, puede ser una desición política)</span></p>
<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla9.png"</span></p>
<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla10.png"</span></p>

        
<p><span lang="es">&nbsp;</span><span style="font-size: 0.9375rem;">Sin embargo hay más obras finalizadas donde menos mujeres y niños
        tenemos (cluster 7, 5, 4 y 2)sin embargo en cluster 1, 3 y 6 tenemos menos
        obras finalizadas y una distribución aunque menor pero de similar tendencia en
        obras en ejecución</span></p>

<p><span lang="es">&nbsp;<img src="/scripts/kmeans-gender-investment-gap/imagenes/pantalla11.png"</span></p>

<p><H1></H1><span lang="es">&nbsp;</span><b style="font-size: 0.9375rem;"><span lang="es">Líneas
            para seguir avanzando - trabajos futuros </span></b></H1></p>
<p>
    <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <!--[endif]--><span lang="es">Pensar en una herramienta
        integrada para una mejor consulta de los datos. </span>
</p>
<p>
    <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <!--[endif]--><span lang="es">Pensar en nuevas preguntas
        orientadas a cruzar datos disponibles como agua y cloacas u otros rangos
        etarios utilizando este mismo conjunto de datos</span>
</p>
<p>
    <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <!--[endif]--><span lang="es">Pensar en otras preguntas o
        hipótesis que se puedan responder con otros set de datos (por ejemplo la misma
        preguntas si se puede responder con datos de otros países) u otros datos
        disponibles en las mismas fuentes</span>
</p>
<p>
    <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <!--[endif]--><span lang="es">Si se crea un clasificador,
        se puede armar un árbol de decisiones para cada cluster y revisar la matriz de
        confianza en la clasificación.</span>
</p>
<p>
    <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <!--[endif]--><span lang="es">Probar otras herramientas,
        como tableau. También se puede trabajar con R y Python mediante Aplicaciones
        GUI en Python con Tkinter. En R la librería&nbsp;
        TidyModels.</span>
</p>
<p>
    <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <!--[endif]--><span lang="es">Pensar en plasmar los
        resultados con mejores datos como la geolocalización.</span>
</p>
<p>
    <!--[if !supportLists]--><span lang="es">●&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <!--[endif]--><span lang="es">Pensar en una propuesta de
        integración de datos de diferentes fuentes por medio de la normalización o
        sugerencia de estructuras o contenidos de datos comunes tomando como referencia
        el&nbsp; Programa interamericano para
        identificar brechas de infraestructura y en el ejemplo del Programa Interamericano
        de Datos Abiertos para Prevenir y Combatir la Corrupción (PIDA). </span><u><span lang="es"><a href="https://www.datos.gov.co/stories/s/Programa-Interamericano-de-datos-abiertos-para-la-/k5ma-yb9b">https://www.datos.gov.co/stories/s/Programa-Interamericano-de-datos-abiertos-para-la-/k5ma-yb9b</a></span></u><span lang="es"></span>
</p>
<p><span lang="es">&nbsp;</span></p>
<p><span lang="es">&nbsp;</span></p>
<span lang="es"><br clear="all">
</span>
<p><span lang="es">&nbsp;</span></p><br>
<p></p>
