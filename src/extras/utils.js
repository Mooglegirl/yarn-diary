export const compareFuncs = {
	alphabetical_az: (a, b) => (a.brand + " " + a.name).localeCompare(b.brand + " " + b.name),
	alphabetical_za: (a, b) => (b.brand + " " + b.name).localeCompare(a.brand + " " + a.name),
	last_updated_oldest_first: (a, b) => a.lastUpdated.localeCompare(b.lastUpdated),
	last_updated_newest_first: (a, b) => b.lastUpdated.localeCompare(a.lastUpdated),
	date_added_oldest_first: (a, b) => a.dateAdded.localeCompare(b.dateAdded),
	date_added_newest_first: (a, b) => b.dateAdded.localeCompare(a.dateAdded)
};