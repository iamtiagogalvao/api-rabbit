/*#########################################################################
##                                                                       ##
##                   ▄▀█ █▀█ █   █▀█ ▄▀█ █▄▄ █▄▄ █ ▀█▀              ##
##                   █▀█ █▀▀ █   █▀▄ █▀█ █▄█ █▄█ █ ░█░              ##
##                                                                       ##
###########################################################################
***** FUNCTION PARAMETERS ******
----> getContents(url,collection,requestType,param)

    + url: String
    + collection: String 
    + requestType: String (fetchCollection|fetchById|filter|search|sort)
    + param: not mandatory, only needed for fetchById - filter - search - sort
        
  - > If requestType = "filter" "param" will accept an {object} 
      with the filter options: 
        
      ---> filter: contains | equals
      ---> field: api content field to filter
      ---> string: the string to search

  ex: getContents("url",
                  "yourCollection",
                  "filter", 
                  {filter: "equals", field: "name", string:"john"})
        

  - > If requestType = "sort", "param" will accept an object or array of objects
      with the filter options: 
        
      ---> sortField: will be equal to the field name to sort
      ---> sortType: ascending | descending
    
  ex: getContents("url",
                  "yourCollection",
                  "sort",
                  {sortField: "name", sortType: "ascending"})

  ex: getContents("url",
                  "yourCollection",
                  "sort",
                  [{sortField: "name", sortType: "ascending"},
                   {sortField: "date", sortType: "descending"}
                  ])
    */

export default {
  data() {
    return {
      globalContents: []
    };
  },
  methods: {
    getContents(
      url,
      collection,
      requestType = "fetchCollection",
      param = null
    ) {
      let composedUrl = null;

      //this function will encode search strings for "search" and "filter" queryTypes ex: "foo+bar+foo"
      function encodeString(str) {
        if (str.includes(" ")) {
          let encodedString = str.split(" ").join("+");
          return encodedString;
        } else {
          return str;
        }
      }
      // this switch validates the requestType parameter and builds the url accordingly
      switch (requestType) {
        //###### CASE FETCH COLLECTION ######
        case "fetchCollection":
          composedUrl = url + "/items/" + collection;
          this.fetchApi(composedUrl);
          break;

        //###### CASE FETCH BY ID ######
        case "fetchById":
          composedUrl =
            url + "/items/" + collection + "/" + param != null ? param : "";
          this.fetchApi(composedUrl);
          break;

        //###### CASE FILTER ######
        case "filter":
          let searchFilter = param.filter;
          let searchField = param.field;
          let searchString = encodeString(param.string);
          composedUrl =
            url +
            "/items/" +
            collection +
            "?filter[" +
            searchField +
            "][" +
            (searchFilter === "equals" ? "_eq" : "_contains") +
            "]=" +
            searchString;

          this.fetchApi(composedUrl);
          break;

        //###### CASE SEARCH ######
        case "search":
          composedUrl =
            url + "/items/" + collection + "?search=" + encodeString(param);
          this.fetchApi(composedUrl);
          break;

        //###### CASE SORT ######
        case "sort":
          if (Array.isArray(param)) {
            let sortFields = [];
            let sortTypes = [];
            let sortString = [];

            //iterates the sort params
            for (let p of param) {
              sortFields.push(p.sortField);
              sortTypes.push(p.sortType);
            }

            sortString = param.map((p) => {
              return p.sortType === "ascending"
                ? `+${p.sortField}`
                : `-${p.sortField}`;
            });

            composedUrl = url + "/items/" + collection + "?sort=" + sortString;

            this.fetchApi(composedUrl);
            break;
          } else {
            //if the sort parameter is singular
            let sortField = param.sortField;
            let sortType = param.sortType;

            composedUrl =
              url +
              "/items/" +
              collection +
              "?sort=" +
              (sortType === "ascending" ? "+" : "-") +
              sortField;

            this.fetchApi(composedUrl);
            break;
          }

        default:
          console.log(
            "The Request Type you entered is not valid. Valid types: fetchCollection, fetchById, filter, search."
          );
          break;
      }
    }, //end of getContent()
    async fetchApi(url) {
      try {
        let res = await fetch(url);
        let data = await res.json();
        this.globalContents = data;
      } catch (error) {
        console.log("The request returned the following error: " + error);
      }
    } //end of fetchApi()
  }
};
