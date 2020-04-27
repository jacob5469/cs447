export default {
  swagger: "2.0",
  basePath: "/api",
	info: {
		"title": "A getting started API.",
		"version": "1.0.0"
	},
	definitions: {
		CrimeFilters: {
			"type": "object",
			"properties": {
				"crimedate": {
					"type": "array",
					"items": {
						type: "string"
					}
				},
				"crimetime": {
					"type": "array",
					"items": {
						type: "string"
					}
				},
				"locations": {
					"type": "array",
					"items": {
						type: "string"
					}
				},
				"descriptions": {
					"type": "array",
					"items": {
						type: "string"
					}
				},
				"inside": {
					"type": "array",
					"items": {
						type: "string"
					}
				},
				"districts": {
					"type": "array",
					"items": {
						type: "string"
					}
				},
				"premises": {
					"type": "array",
					"items": {
						type: "string"
					}
				},
				"weapons": {
					"type": "array",
					"items": {
						type: "string"
					}
				},
			},
		}
	},
	paths: {}
};