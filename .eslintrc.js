module.exports = {
	"extends": ["airbnb-base",
	],
	"plugins":[],
	"env": {
		"jest": true
	},
	"rules": {
		indent: ['error', 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 1,
			outerIIFEBody: 1,
			FunctionDeclaration: {
				parameters: 1,
				body: 1
			},
			FunctionExpression: {
				parameters: 1,
				body: 1
			},
			CallExpression: {
				arguments: 1
			},
			ArrayExpression: 1,
			ObjectExpression: 1,
			ImportDeclaration: 1,
			flatTernaryExpressions: false,
			ignoredNodes: ['JSXElement *']
		}],
		'no-tabs': 'off',
		'no-console': 'off',
		'no-underscore-dangle': 'off',
		'linebreak-style': 0,
		'class-methods-use-this': 'off',
		'max-len': 'off'
	}
};