export default {
	swagger: "2.0",
	basePath: "/api",
	info: {
		"title": "Baltimore Crime Data API",
		"version": "1.0.0"
	},
	definitions: {
		CrimeFilters: {
			type: "object",
			properties: {
				crimedate: {
					type: "array",
					items: {
						type: "string"
					}
				},
				crimetime: {
					type: "array",
					items: {
						type: "string"
					}
				},
				locations: {
					type: "array",
					items: {
						type: "string"
					}
				},
				descriptions: {
					type: "array",
					items: {
						type: "string"
					}
				},
				inside: {
					type: "array",
					items: {
						type: "string"
					}
				},
				districts: {
					type: "array",
					items: {
						type: "string"
					}
				},
				neighborhoods: {
					type: "array",
					items: {
						type: "string"
					}
				},
				premises: {
					type: "array",
					items: {
						type: "string"
					}
				},
				weapons: {
					type: "array",
					items: {
						type: "string"
					}
				},
			},
			example: {

				crimedate: ["2014-01-14", "2020-04-04"],
				crimetime: ["13:00:00", "22:00:00"],
				descriptions: ["LARCENY", "BURGLARY"],
				inside: ["I"],
				districts: ["NORTHEAST", "WESTERN"],
				premises: ["ROW/TOWNHOUSE-VAC"],
				neighborhoods: ["FRANKLIN SQUARE", "FRANKFORD"]

			}
		}
	},
	paths: {}
};