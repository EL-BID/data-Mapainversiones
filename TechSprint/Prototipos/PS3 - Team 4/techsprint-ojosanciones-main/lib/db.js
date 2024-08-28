const { Client } = require('@elastic/elasticsearch')

const pageSize = 20;

async function queryItem(type,id,country,relations,keyword) {
    let index = getIndex(type);
    let highlight = {}
    let filtro = {}
    let aggs = {}

    switch (type) {
        case "sancion":
            aggs = {
                "tipo_sancion": {
                    "terms": {
                        "field": "sanciones.fuente.keyword"
                    }
                }
            }


            highlight = {
                "fields": {
                }
            }      

            filtro = {
                "bool": {
                    "must": [
                        {
                            "match_phrase": {
                                "id.keyword": id
                            }
                        }
        
        
                    ]
                }
            }            
        break
    }    
    
    let searchDocument = {
        "index": index,
        "size": 1,
        "query": filtro,
        "highlight": highlight,
        "aggregations": aggs
    }

    // console.log("queryItem searchDocument",JSON.stringify(searchDocument,null,4));
    let result = await client.search(searchDocument)
    // console.log("queryItem result",JSON.stringify(result,null,4));

    if (result.hits.hits.length > 0) {
        if (result.aggregations) {
            result.hits.hits[0].aggs = {};
             Object.keys(result.aggregations).map(agg=> {
                result.hits.hits[0].aggs[agg] = {} 
                result.aggregations[agg].buckets.map(bucket => {
                    result.hits.hits[0].aggs[agg][bucket.key] = bucket.doc_count;
                })
            });
        }
        for (let r in relations) {
            const relationResult = await queryRelation(result.hits.hits[0],relations[r],country);
            if (relationResult) {
                // console.log("rel",r,relations[r].type,relationResult.length)
                result.hits.hits[0]._source[relations[r].type] = relationResult;
            }
        
        }
    }
    return result.hits.hits[0];


}


async function queryRelation(result,relation,country) {
    // console.log(result,relation);
    let indexR = getIndex(relation.type);
    let field_b_value = result._source[relation.field_b];
    if (!field_b_value) {
        console.log("Missing value for",relation.field_b, "in result",result);
        return;
    }
    let filtroR = null;

    if (!Array.isArray(field_b_value)) {
        filtroR = {
            "match_phrase": {
                [relation.field_a]:  field_b_value

            }
        }
    }
    else {

        filtroR = { 
            "terms": {
                [relation.field_a]:  field_b_value
                
            }
        }
    }

    if(country) {

        filtroR = {
            "bool": {
                "must": [
                    filtroR,
                    {
                    "term": {
                        "country.keyword": {
                        "value": country
                        }
                    }
                    }
        
        
                ]
            }

        }    
    }

    let searchDocumentR = {
        "index": indexR,
        "size": 100,
        "query": filtroR,
    }

    // console.log("searchDocumentR",JSON.stringify(searchDocumentR));
    let resultR = await client.search(searchDocumentR);
    // console.log("relation",relation,resultR)

    for (let r in relation.relations) {
        for (h in resultR.hits.hits) {
            let relationResult = await queryRelation(resultR.hits.hits[h],relation.relations[r],country);
            if (relationResult) {
                resultR.hits.hits[h]._source[relation.relations[r].type] = relationResult;
            }
        }
    
    }

    // if (resultR.hits.hits.length == 1) {
    //     return resultR.hits.hits[0]._source
    // }
    // if (resultR.hits.hits.length > 1) {
        return resultR.hits.hits.map(h=>h._source)
    // }

}

const type_indexes = {
    "sancion": {
        index: "ojosanciones",
        label: "sanciones"
    }
}


function getIndex(type) {
    if (type_indexes.hasOwnProperty(type)) {
        return type_indexes[type].index;
    }
    else {
        throw(new Error("No index defined for type "+type));
    }
    
}

async function queryKeywords(filters) {
    let index = "";
    let size = pageSize;
    let from = size*(filters.page.value-1) || 0;
    let highlight = {};
    let sort = {}
    let aggs = {}
    index = getIndex(filters.type.value);

    // console.log("queryKeywords",filters);
    let filtro = null;

    let musts = []

    if (filters["count-field"]) {        
        aggs.count = {
            "value_count": {
                field: filters["count-field"].value
            }
        }
    }

    if (filters.sort && filters["sort-direction"]) {
        sort = {
            [filters.sort.value]: filters["sort-direction"].value
        }
    }

    Object.keys(filters).map(f => {
        let filter = filters[f];
        if (filter.value) {
            // console.log(f,filter);
            switch (f) {
                case "type":
                case "sort":
                case "sort-direction":
                case "page":
                case "count-field":
                    break;
                default:
                    let must = {};
                    if (Array.isArray(filter.field)) {
                        must.multi_match = {
                            fields: filter.field,
                            type: "phrase",
                            query: filter.value
                        };

                    }
                    else {

                        must.match_phrase = {
                            [filter.field]: filter.value
                        };
                    }
                    // console.log("must",must)
                    musts.push(must)
            }
        }
    })

    if (musts) {
        filtro = {
            "bool": {
                "must": musts
            }
        };
    }


    if (filters.keyword) {
        switch (type) {
            case "contract":
                filtro = {
                    "multi_match": {
                        "query": keyword,
                        "type": "phrase",
                        "fields": [
                            "nombre",
                            "nombre.keyword",
                            "descripcion",
                            "descripcion.keyword",
                            "nit.keyword",
                            "nog_concurso.keyword"
                        ]
                    }
                }

                highlight = {
                    "fields": {
                        "nombre": {},
                        "descripcion": {},
                        "nit": {}
                    }
                }
                sort = {
                    "monto": "desc"
                }

                break;
            case "supplier":
                filtro = {
                    "multi_match": {
                        "query": keyword,
                        "fields": [
                            "nombre_razon_social",
                            "nombres_comerciales",
                            "nombre_persona",
                            "representantes_legales.nombre"
                        ]
                    }
                }

                highlight = {
                    "fields": {
                        "nombre_razon_social": {},
                        "nombres_comerciales": {},
                        "nombre_persona": {},
                        "representantes_legales.nombre": {}
                    }
                }

                break;
        }
    }
    
    let searchDocument = {
        "index": index,
        "size": size,
        "from": from,
        "highlight": highlight,
        "query": filtro,
        "sort": sort,
        aggs: aggs
    }

    // console.log(JSON.stringify(searchDocument,null,4));
    const result = await client.search(searchDocument)


    // console.log(result);
    let total = result.aggregations && result.aggregations.count ? result.aggregations.count.value : result.hits.total.value
    return { hits: result.hits.hits, aggregations: result.aggregations, total: total } ;
}

async function queryStats() {


    let index = getIndex("sancion");
    let limit = 0;



    let searchDocument = {
        "index": index,
        "size": limit,
    }

    searchDocument.aggs = {
        "fuente": {
            "terms": {
                "field": "sanciones.fuente.keyword"
            },
            "aggs": {
                "count": {
                    "value_count": {
                        "field": "nombre_razon_social.keyword"
                    }
                }
            }
        }
    }

    // console.log(JSON.stringify(searchDocument,null,4));
    const result = await client.search(searchDocument)
    // console.log(result);


    // console.log(result.aggregations.fuente.buckets);
    const stats = {
        sat_efos_count: result.aggregations.fuente.buckets[0].count.value,
        sfp_count: result.aggregations.fuente.buckets[1].count.value,
        ofac_count: result.aggregations.fuente.buckets[2].count.value,
    }
    return stats;
}



let args = {};
let client = null;
//Connect to ElasticSearch
async function connect(uri,localargs) {
    args = localargs;

    return new Promise((resolve,reject)=>{

        const esclient = new Client({
            node: uri,
            tls: {
                rejectUnauthorized: false
            }
    
        })
        // this.client = client;
    
        try {
            esclient.info().catch((e, d) => {
                esclient.search = () => {
                    const mockData = require("./mockData.json");
                    return mockData;
                }
                // console.log("DB Failed");
                console.log("DB ERROR",e.message);
                reject(e);
    
            })
                .then((res) => {
                    if (res) {
                        console.log("DB connected", res.name,res.version.number);
                        client = esclient;
                        resolve();
                    }
                    else {
                        reject(res);
                    }
                    //console.log(res);
                })
        }
        catch (e) {
            console.error("Elastic couldn't connect")
        }
    
    })

}

module.exports = {
    connect, queryItem, queryKeywords, queryStats, pageSize, type_indexes
}