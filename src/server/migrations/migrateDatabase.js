const migrationList = require('./registerMigration');

function checkIfFromAndToExist(curr, to, adjListArray) {
	if (!(curr in adjListArray)) {
		throw new Error('Did not find current version in migration list');
	}
	if (!(to in adjListArray)) {
		throw new Error('Did not find to version in migration list');
	}
}

function findPathToMigrate(curr, to, adjListArray) {
	const queue = [];
	const path = [];
	const visited = [];
	checkIfFromAndToExist(curr, to, adjListArray);
	for (const vertex in adjListArray) {
		if (Object.prototype.hasOwnProperty.call(adjListArray, vertex)) {
			visited[vertex] = false;
			path[vertex] = -1;
		}
	}

	queue.push(curr);
	visited[curr] = true;

	while (queue.length > 0) {
		const currentVertexID = queue.shift();
		const currentVertex = adjListArray[currentVertexID];
		const edges = currentVertex.length;
		for (let i = 0; i < edges; i++) {
			const target = currentVertex[i];
			if (!visited[target]) {
				visited[target] = true;
				path[target] = currentVertexID;
				queue.push(target);
			}
		}
	}
	return path;
}

function printPathToMigrate(curr, to, path) {
	if (curr === to) {
		console.log(`${to} `);
	} else if (path[to] === -1) {
		throw new Error('No path found');
	} else {
		printPathToMigrate(curr, path[to], path);
		console.log(`${to} `);
	}
}

const path = findPathToMigrate('0.1.0', '0.5.0', migrationList);
printPathToMigrate('0.1.0', '0.5.0', path);
