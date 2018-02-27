
export const pathOr = (d, p, obj) => {
	return defaultTo(d, path(p, obj));
};

export const defaultTo = (d, v) => {
	return v == null || v !== v ? d : v;
};

export const path = (paths, obj) => {
	let val = obj;
	let idx = 0;
	while (idx < paths.length) {
		if (val == null) {
			return;
		}
		val = val[paths[idx]];
		idx += 1;
	}
	return val;
};
