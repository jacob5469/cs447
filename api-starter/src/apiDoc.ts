export default {
  swagger: "2.0",
  basePath: "/api",
	info: {
		"title": "A getting started API.",
		"version": "1.0.0"
	},
	definitions: {
		Message: {
			"type": "object",
			"properties": {
				"message": {
					"description": "An object with a message in it",
					"type": "string"
				}
			},
			"required": ["message"]
		}
	},
	paths: {}
};