// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    // if (!startNode || !finishNode || startNode === finishNode)
    //     return false;
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // closestNode.isVisited = true; // this causes the problem here in animation for the dijkstra
        if (closestNode.isWall)// handles case of dijkstra overriding the walls
            continue;
        if (closestNode.distance === Infinity) // handles the case where no path is available due to walls
            return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode)
            return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const neighbours = getUnvisitedNeighbors(node, grid);
    for (const neighbour of neighbours) {
        neighbour.distance = node.distance + 1;
        neighbour.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbours = [];
    const { col, row } = node;
    if (row > 0)
        neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1)
        neighbours.push(grid[row + 1][col]);
    if (col > 0)
        neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1)
        neighbours.push(grid[row][col + 1]);

    return neighbours.filter(neighbour => !neighbour.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodeInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodeInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodeInShortestPathOrder;
}






