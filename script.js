(function(glob) {
  function checkOrder(key, order = "ascending") {
    return (a, b) => {
      const first = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const second = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      let comp = 0;
      if (first > second) {
        comp = 1;
      } else if (first < second) {
        comp = -1;
      }
      return order == "descending" ? comp * -1 : comp;
    };
  }

  const items = Vue.component("itemBox", {
    props: ["content"],
    template:
      "<tr>" +
      "<td>{{content.id}}</td>" +
      '<td class="longContent">{{content.name}}</td>' +
      '<td class="longContent">{{content.created_at}}</td>' +
      "<td>{{content.sell_recurring}}</td>" +
      "<td>{{content.sell_recurring_incl_vat}}</td>" +
      "<td>{{content.sell_recurring_vat}}</td>" +
      "<td>{{content.sell_setup}}</td>" +
      "<td>{{content.sell_setup_inc_vat}}</td>" +
      "<td>{{content.sell_setup_vat}}</td>" +
      '<td class="longContent">{{content.sku}}</td>' +
      "<td>{{content.vat_rate}}</td>" +
      "</tr>"
  });

  var myApp = new Vue({
    el: "#app",
    components: {},
    data: {
      elements: null,
      sortFlag: "",
      filterString: ""
    },
    template:
      "<div>" +
      "<h1>Sortable list</h1>" +
      '<input v-model="filterString" value="Toolbox">' +
      "<table>" +
      "<tr>" +
      '<th v-on:click="sortTable($event)">id</th>' +
      '<th v-on:click="sortTable($event)">name</th>' +
      '<th v-on:click="sortTable($event)">created at</th>' +
      '<th v-on:click="sortTable($event)">sell recurring</th>' +
      '<th v-on:click="sortTable($event)">sell recurring inc vat</th>' +
      '<th v-on:click="sortTable($event)">sell recurring vat</th>' +
      '<th v-on:click="sortTable($event)">sell setup</th>' +
      '<th v-on:click="sortTable($event)">sell setup inc vat</th>' +
      '<th v-on:click="sortTable($event)">sell setup vat</th>' +
      '<th v-on:click="sortTable($event)">sku</th>' +
      '<th v-on:click="sortTable($event)">vat rate</th>' +
      "</tr>" +
      '<itemBox v-for="item in elements" v-bind:content="item" v-bind:key="item.id"></itemBox>' +
      "</table>" +
      "</div>",
    methods: {
      sortTable: function(ev) {
        let sorting = ev.target.innerHTML.split(" ").join("_");
        myApp.sortFlag == sorting
          ? myApp.elements.sort(checkOrder(sorting, "descending"))
          : myApp.elements.sort(checkOrder(sorting));
        myApp.sortFlag == sorting
          ? (myApp.sortFlag = "")
          : (myApp.sortFlag = sorting);
      }
    },
    computed: {
      filteredData: function(filterString) {
        return myApp.elements;
      }
    }
  });

  fetch("data.json")
    .then(function(resp) {
      return resp.json();
    })
    .then(function(prom) {
      myApp.elements = prom.data;
    });
  glob.myApp = myApp;
})(window);
