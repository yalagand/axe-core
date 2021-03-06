var tableUtils = axe.commons.table;
var badCells = [];
var cells = tableUtils.getAllCells(node);

cells.forEach(cell => {
	// For each non-empty data cell that doesn't have an aria label
	if (
		axe.commons.dom.hasContent(cell) &&
		tableUtils.isDataCell(cell) &&
		!axe.commons.aria.label(cell)
	) {
		// Check if it has any headers
		const hasHeaders = tableUtils.getHeaders(cell).some(header => {
			return header !== null && !!axe.commons.dom.hasContent(header);
		});

		// If no headers, put it on the naughty list
		if (!hasHeaders) {
			badCells.push(cell);
		}
	}
});

if (badCells.length) {
	this.relatedNodes(badCells);
	return false;
}

return true;
