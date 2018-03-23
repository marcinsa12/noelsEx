(function(global) {
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

	const items = Vue.component("itemRow", {
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
		components: {items},
		data: {
			elements: null,
			sortFlag: "",
			filterString: "",
			filteredResults: null
		},
		template:
			"<div>" +
			"<h1>Sortable list</h1>" +
			'<input v-model="filterString" v-on:keyup="filteredData(filterString)">' +
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
			'<itemRow v-for="item in filteredResults" v-bind:content="item" v-bind:key="item.id"></itemRow>' +
			"</table>" +
			"</div>",
		methods: {
			sortTable: function(ev) {
				let sorting = ev.target.innerHTML.split(" ").join("_");
				myApp.sortFlag == sorting
					? myApp.filteredResults.sort(checkOrder(sorting, "descending"))
					: myApp.filteredResults.sort(checkOrder(sorting));
				myApp.sortFlag == sorting ? (myApp.sortFlag = "") : (myApp.sortFlag = sorting);
			},
			filteredData: function(filterString) {
				filterString = filterString.toUpperCase();
				columns = ["id", "name", "sku"];
				let filtered = myApp.elements.filter(el =>
					columns.some(
						s =>
							String(el[s])
								.toUpperCase()
								.indexOf(filterString) > -1
					)
				);
				myApp.filteredResults = filtered;
				let searchBox = document.querySelector("input");
				myApp.filteredResults.length === 0 ? searchBox.classList.add("wrong") : searchBox.classList.remove("wrong");
			}
		}
	});

	fetch("data.json")
		.then(function(resp) {
			return resp.json();
		})
		.then(function(prom) {
			myApp.elements = prom.data;
			myApp.filteredResults = prom.data;
		});
	global.myApp = myApp;
})(window);
