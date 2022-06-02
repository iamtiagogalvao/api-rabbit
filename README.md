# API Rabbit v. 1.0

▄▀█ █▀█ █   █▀█ ▄▀█ █▄▄ █▄▄ █ ▀█▀                  
█▀█ █▀▀ █   █▀▄ █▀█ █▄█ █▄█ █ ░█░  


This is a Vue.JS mixin that intends to make API data requests easier for the Directus API with much fewer lines of code.

# Function params

    getContents(url, requestType="fetchCollection", collection, param = null)

- **url:** String
-   **collection:** String
-   **requestType:** String (fetchCollection - fetchById - filter - search - sort)
-   **param:** not mandatory, only needed for fetchById - filter - search - sort

**If requestType = "filter",  "param" will accept an _{object}_ with the filter options:**

---------> ***filter:*** _contains | equals_

---------> ***field:*** _api content field to filter_

---------> ***string:*** _the string to search_

**If requestType = "sort", "param" will accept an *{object}* or *[array]* of *{objects}* with the filter options:**

_---------> ***sortField:*** will be equal to the field name to sort_

_---------> ***sortType:*** ascending | descending_

# **Instructions to set it up**

**1 - Create a file called** "api.js" **and paste the contents of this snippet to the file.**

**2 - Save the file in your Vue.JS app folder in the following directory:** ./src/assets/js/api.js

**3 - Import the file to the** "View" or "Component" **where you want to have access to this library's functions using the following code inside the `<script>` tags:**

    import api from "./src/assets/js/api.js";

**4 - Then include the** mixin **in your** *export default* **object, like you see below:**

    export default { 
	    mixins: [api], //add this parameter to introduce the mixin to the file.. 
	    data() { 
		    return {
		    //data will be returned here
		   }; 
		}, 
	}


# **How to use**

Below you will find the API calls reference guide that you can make with this mixin.

## Please note:
All requests made by this API calls are saved to a variable / data property called `globalContents`.
So that it the data property / variable you will be using in your "Views" or "Components".

Ex:
```
<div v-for="item in globalContents" :key="item">
	{{item.id}}
</div>
```

### Normal API call

    this.getContents("https://url.directus.app", "fetchCollection", "blogposts");

### Normal API call (short version)

As the most standard fetch for data is usually an entire collection, I have created a reduced version of the function that takes only two parameters: "url" and "collection". This will translate into a "fetchCollection" requestType by default

    this.getContents("url","yourCollection");


### Fetch by ID

    this.getContents("https://url.directus.app", "fetchById", "blogposts", "3");


### Filter

    this.getContents("https://url.directus.app", "filter", "blogposts", {filter:"equals", field:"title", string:"beautiful code snippet"});

### Search

    this.getContents("https://url.directus.app", "search", "blogposts", "string to search");

### Sort
With Single Sort Field

    this.getContents("url","yourCollection","sort",{sortField: "name", sortType:"ascending"});

With Multiple Sort Fields

    this.getContents("url","yourCollection","sort",[{sortField: "name", sortType:"ascending"}, {sortField: "date", sortType:"descending"}]);

# **Author**

> Tiago Galvão a.k.a Slaveworx
> | Released under the MIT License - 2022
