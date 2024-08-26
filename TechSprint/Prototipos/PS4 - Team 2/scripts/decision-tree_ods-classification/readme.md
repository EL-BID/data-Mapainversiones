<p dir="ltr" style="text-align: left;"></p>
<div>
    <h1><a name="_925iy67cld4v"></a></h1>
</div>
<p><b style="font-size: 2.34375rem;"><span lang="es">Arboles de decisiones</span></b><br></p>
<p><span lang="es">Considerando que el set de datos de obras públicas tiene un registro de clasificación
        humana definiendo a que ODS responde cada obra de infraestructura.</span></p>
<p><span lang="es">Se probó armar un árbol de decisiones quitando algunos atributos del set
        de datos como la url del proyecto y algunas descripciones</span></p>
<p><span lang="es">Para el árbol se tomó como atributo etiqueta un atributo donde se
        identificaba a que ODS se daba cumplimiento</span></p>
<p><span lang="es">Es interesante ver como a futuro aplicando algunas de las reglas creadas
        podrían ayudar a etiquetar obras o infraestructuras que no estén identificadas
        a que ODS pertenecen.</span></p>
<p><span lang="es">A continuación se muestran los atributos seleccionados</span></p>
<p><span lang="es"><img src="/scripts/decision-tree_ods-classification/imagenes/p1.png"<br></span></p>
<p><span lang="es">&nbsp;</span></p>
<p><span lang="es">Se &nbsp;muestran el modelo creado y
        las reglas generadas se ponen en el ANEXO II</span></p>
<p><span lang="es">Cabe destacar que se tuvo que hacer un trabajo intensivo con el
        ordenamiento del atributo de ODS porque era un campo con varias ODS cargadas
        como de cumplimiento directo e indirecto y en diferentes órdenes. La
        transformación consiste en tomar una sola ODS y dar prioridad a las de
        cumplimiento directo y de haber más de una a la de menor valor, para los casos
        donde no había cumplimiento directo se tomaba la primera de cumplimiento
        indirecto.</span></p>
<p><span lang="es">&nbsp;</span></p>
<p><span lang="es">Un ejemplo de regla sería la siguiente </span></p>
<p><span lang="es">&nbsp;</span></p>
<h1><span lang="es">Tree </span></h1>
<pre>sectornombre = AGUA Y CLOACA</pre>
<pre>|&nbsp;&nbsp; mujeres prov &gt; 1367898</pre>
<pre>|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp; mujeres &gt; 91138</pre>
<pre>|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; mujeres prov &gt; 5518968.500</pre>
<pre>|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; avancefinanciero &gt; 5.030: ODS 6 DIRECTA {ODS 6 DIRECTA=1324, ODS 9 DIRECTA=0, ODS 13 INDIRECTA=16, ODS 11 INDIRECTA=0, ODS 3 INDIRECTA=0, ODS 5 INDIRECTA=0, ODS 4 INDIRECTA=0, -=0}</pre>
<p>&nbsp;</p>
<p><span lang="es">donde se observa que si el sector de inversión corresponde a agua y
        cloaca la cantidad de mujeres en la provincia supera el millón trescientos mil
        (1367898) las mujeres de la ciudad superan las noventa y un mil, el nombre de
        la provincia es Buenos Aires (acá se podría reescribir la regla con un índice
        de mujeres correspondiente con el total de habitantes en la provincia (dato que
        se tiene) para aplicar sobre otros casos de estudios y ser más generales. y el
        avance financiero es de 5.03 corresponde a la ODS 6 con incidencia directa. </span></p>
<p><span lang="es">Cabe destacar que la ODS 6 propone “Garantizar la disponibilidad y la
        gestión sostenible del agua y el saneamiento para todos”.</span></p>
<p><span lang="es"><img src="/scripts/decision-tree_ods-classification/imagenes/p2.png"<br></span></p>

<p><span lang="es">&nbsp;</span></p>
<p><span lang="es">&nbsp;</span></p>
<p><span lang="es">&nbsp;</span></p>
<p><span lang="es">&nbsp;</span></p>
<p><b><span lang="es">&nbsp;</span></b></p><br>
<p></p>
