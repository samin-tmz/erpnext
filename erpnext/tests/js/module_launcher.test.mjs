import assert from "node:assert/strict";
import test from "node:test";
import { get_launcher_modules } from "../../public/js/module_launcher_data.mjs";

test("launcher shows only navigable modules from the user's sidebar payload", () => {
	const sidebars = {
		Selling: { label: "Selling" },
		Accounts: { label: "Accounts" },
		Private: { label: "Private" },
		Stock: { label: "Stock" },
	};
	const routes = { Selling: "/desk/selling", Accounts: "/desk/accounts", Private: "/desk/private" };
	const items = get_launcher_modules(sidebars, (name) => routes[name]);
	assert.deepEqual(
		items.map(({ name }) => name),
		["Accounts", "Selling"]
	);
	assert.deepEqual(
		items.map(({ label }) => label),
		["Accounting", "Sales"]
	);
	assert.deepEqual(
		items.map(({ route }) => route),
		["/desk/accounts", "/desk/selling"]
	);
});

test("additional installed modules retain their label, icon and destination", () => {
	const items = get_launcher_modules(
		{ Custom: { label: "My Operations", header_icon: "briefcase" } },
		() => "/desk/custom/operations"
	);
	assert.equal(items[0].label, "My Operations");
	assert.equal(items[0].icon, "briefcase");
	assert.equal(items[0].route, "/desk/custom/operations");
});

test("an empty permission payload produces an empty launcher", () => {
	assert.deepEqual(
		get_launcher_modules({}, () => "/desk"),
		[]
	);
});
